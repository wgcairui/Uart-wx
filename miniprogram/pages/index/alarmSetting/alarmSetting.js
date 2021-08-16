"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unitCache_1 = require("../../../utils/unitCache");
const api_1 = require("../../../utils/api");
const util_1 = require("../../../utils/util");
Page({
    data: {
        active: 0,
        protocol: '',
        usersetup: {},
        syssetup: {},
        Protocols: {},
        showTag: [],
        alarmStat: [],
        Threshold: []
    },
    onLoad: async function (options) {
        const protocol = options.protocol;
        if (!protocol) {
            wx.navigateTo({
                url: '/pages/index/alarmSetting/index'
            });
            return;
        }
        const active = Number(options.type) || 0;
        this.setData({
            active: active,
            protocol
        });
        await this.getUserProtocolSetup();
        if (active === 1)
            this.updateThre();
        if (active === 2)
            this.updateAlarm();
    },
    async getUserProtocolSetup() {
        wx.showLoading({ title: '获取协议配置' });
        const userSetup = await api_1.default.getUserAlarmProtocol(this.data.protocol);
        const sysSetup = await api_1.default.getAlarmProtocol(this.data.protocol);
        const Protocols = await api_1.default.getProtocol(this.data.protocol);
        wx.hideLoading();
        if (userSetup && sysSetup) {
            this.setData({
                usersetup: userSetup.data,
                syssetup: sysSetup.data,
                Protocols: Protocols.data,
                showTag: userSetup.data.ShowTag
            });
        }
        else {
            wx.showModal({
                title: "Error",
                content: '设备协议b不支持配置'
            });
        }
    },
    parseProtocol() {
        const protocolArray = this.data.Protocols.instruct.map(instruct => {
            return instruct.formResize.map(el => ({ [el.name]: el.isState ? unitCache_1.default.getunitObject(1, el.unit) : {} }));
        }).reduce((pre, cur) => {
            return [...pre, ...cur];
        });
        return Object.assign({}, ...protocolArray);
    },
    tabclick(event) {
        wx.setNavigationBarTitle({ title: '协议配置-' + event.detail.title });
        switch (event.detail.title) {
            case "参数限值":
                this.updateThre();
                break;
            case "参数状态":
                this.updateAlarm();
                break;
        }
    },
    updateThre() {
        const { usersetup, syssetup } = this.data;
        const sys_ThresholdMap = new Map(syssetup.Threshold.map(el => [el.name, el]));
        if (usersetup?.Threshold) {
            [...this.data.Threshold, ...usersetup.Threshold].forEach((val) => {
                sys_ThresholdMap.set(val.name, val);
            });
        }
        this.setData({
            Threshold: Array.from(sys_ThresholdMap.values())
        });
    },
    updateAlarm() {
        const { usersetup, syssetup } = this.data;
        const sys_alarmStatMap = new Map(syssetup.AlarmStat.map(el => [el.name, el]));
        if (usersetup?.AlarmStat) {
            [...usersetup.AlarmStat, ...this.data.alarmStat].forEach(val => {
                sys_alarmStatMap.set(val.name, val);
            });
        }
        const parse = this.parseProtocol();
        sys_alarmStatMap.forEach((el, key) => {
            el.parse = parse[key];
        });
        this.setData({
            alarmStat: Array.from(sys_alarmStatMap.values())
        });
    },
    async ShowTagonChange(event) {
        console.log({ event });
        const tags = event.detail;
        this.setData({
            showTag: tags
        });
        await api_1.default.setUserSetupProtocol(this.data.protocol, 'ShowTag', tags || []);
    },
    ShowTagtoggle(event) {
    },
    async AlarmStatonChange(event) {
        const item = event.currentTarget.dataset.item;
        const value = event.detail;
        const index = this.data.alarmStat.findIndex(el => el.name === item.name);
        this.setData({
            ["alarmStat[" + index + "].alarmStat"]: value
        });
        const data = this.data.alarmStat[index];
        await api_1.default.setUserSetupProtocol(this.data.protocol, 'AlarmStat', data);
    },
    ThresholdClick(event) {
        const item = event.currentTarget.dataset.item;
        const index = event.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/index/alarmSetting/threshold/threshold' + util_1.ObjectToStrquery({ ...item }),
            events: {
                modifyThreshold: async (data) => {
                    await api_1.default.setUserSetupProtocol(this.data.protocol, "Threshold", { type: 'add', data });
                    this.setData({
                        [`Threshold[${index}]`]: { ...data, icon: "star" }
                    });
                }
            }
        });
    },
    addThreshold() {
        const ua = this.data.usersetup?.AlarmStat || [];
        const keys = new Set([...this.data.alarmStat.map(el => el.name), ...ua.map(el => el.name)]);
        wx.navigateTo({
            url: '/pages/index/alarmSetting/addThreshold/addThreshold' + util_1.ObjectToStrquery({ protocol: this.data.protocol, keys: Array.from(keys) }),
            events: {
                addThreshold: async (data) => {
                    await api_1.default.setUserSetupProtocol(this.data.protocol, "Threshold", { type: 'add', data });
                    const newThre = this.data.Threshold.concat(data);
                    this.setData({
                        Threshold: newThre
                    });
                }
            }
        });
    },
    async saveSetup() {
        const { usersetup, alarmStat, Threshold, protocol } = this.data;
        {
            const userShowtags = usersetup.ShowTag || [];
            const showtag = this.data.showTag || [];
            if (userShowtags.sort().join("") !== showtag.sort().join('')) {
                await api_1.default.setUserSetupProtocol(protocol, 'ShowTag', showtag || []);
            }
        }
        {
            const userAlarm = usersetup.AlarmStat || [];
            const alarm = alarmStat || [];
            const b1 = userAlarm.map(el => el.name).sort().join('') !== alarm.map(el => el.name).sort().join('');
            if (b1) {
                await api_1.default.setUserSetupProtocol(protocol, 'AlarmStat', alarmStat);
            }
            else if (alarm.length !== 0) {
                const ua = userAlarm.sort();
                const ka = alarm.sort();
                const compare = ua.every((el, index) => el.alarmStat.sort().join('') !== ka[index].alarmStat.sort().join(''));
                if (compare) {
                    await api_1.default.setUserSetupProtocol(protocol, 'AlarmStat', alarmStat);
                }
            }
        }
        {
            const userThre = usersetup.Threshold || [];
            const thre = Threshold || [];
            const b1 = userThre.map(el => el.name).sort().join('') !== thre.map(el => el.name).sort().join('');
            const data = thre.map(el => ({ name: el.name, min: el.min, max: el.max }));
            if (b1) {
                await api_1.default.setUserSetupProtocol(protocol, "Threshold", data);
            }
            else if (thre.length !== 0) {
                const ua = userThre.sort();
                const ka = thre.sort();
                const compare = ua.every((el, index) => el.min !== ka[index].min || el.max !== ka[index].max);
                if (compare) {
                    await api_1.default.setUserSetupProtocol(protocol, "Threshold", data);
                }
            }
        }
    },
    onUnload: function () {
    },
    onPullDownRefresh: async function () {
        await this.getUserProtocolSetup();
        wx.stopPullDownRefresh();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxhcm1TZXR0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxhcm1TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0RBQWdEO0FBQ2hELDRDQUFvQztBQUNwQyw4Q0FBc0Q7QUFFdEQsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLENBQUM7UUFDVCxRQUFRLEVBQUUsRUFBRTtRQUNaLFNBQVMsRUFBRSxFQUFvQztRQUMvQyxRQUFRLEVBQUUsRUFBb0M7UUFDOUMsU0FBUyxFQUFFLEVBQW1CO1FBQzlCLE9BQU8sRUFBRSxFQUFjO1FBQ3ZCLFNBQVMsRUFBRSxFQUE4QjtRQUN6QyxTQUFTLEVBQUUsRUFBc0I7S0FDbEM7SUFLRCxNQUFNLEVBQUUsS0FBSyxXQUFXLE9BQVk7UUFDbEMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQTtRQUNqQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsRUFBRSxDQUFDLFVBQVUsQ0FBQztnQkFDWixHQUFHLEVBQUUsaUNBQWlDO2FBQ3ZDLENBQUMsQ0FBQTtZQUNGLE9BQU07U0FDUDtRQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVE7U0FDVCxDQUFDLENBQUE7UUFDRixNQUFNLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFBO1FBQ2pDLElBQUksTUFBTSxLQUFLLENBQUM7WUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDbkMsSUFBSSxNQUFNLEtBQUssQ0FBQztZQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN0QyxDQUFDO0lBR0QsS0FBSyxDQUFDLG9CQUFvQjtRQUN4QixFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDbkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxhQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUNwRSxNQUFNLFFBQVEsR0FBRyxNQUFNLGFBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQy9ELE1BQU0sU0FBUyxHQUFHLE1BQU0sYUFBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNELEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtRQUNoQixJQUFJLFNBQVMsSUFBSSxRQUFRLEVBQUU7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUk7Z0JBQ3pCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSTtnQkFDdkIsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJO2dCQUN6QixPQUFPLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPO2FBQ2hDLENBQUMsQ0FBQTtTQUVIO2FBQU07WUFDTCxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNYLEtBQUssRUFBRSxPQUFPO2dCQUNkLE9BQU8sRUFBRSxZQUFZO2FBQ3RCLENBQUMsQ0FBQTtTQUNIO0lBQ0gsQ0FBQztJQUdELGFBQWE7UUFDWCxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hFLE9BQU8sUUFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsbUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hILENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNyQixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxhQUFhLENBQStDLENBQUE7SUFDMUYsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFnQjtRQUN2QixFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxRQUFRLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQzFCLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7Z0JBQ2pCLE1BQUs7WUFDUCxLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUNsQixNQUFLO1NBQ1I7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtRQUN6QyxNQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3RSxJQUFJLFNBQVMsRUFBRSxTQUFTLEVBQUU7WUFFeEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUMvRCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUMsQ0FBQTtTQUNIO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLFNBQVMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pELENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBQ3pDLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdFLElBQUksU0FBUyxFQUFFLFNBQVMsRUFBRTtZQUN4QixDQUFDLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUM3RCxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNyQyxDQUFDLENBQUMsQ0FBQTtTQUNIO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQ2xDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuQyxFQUFFLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWCxTQUFTLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNqRCxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFnQjtRQUNwQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUVyQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsTUFBa0IsQ0FBQTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQ1gsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDLENBQUE7UUFDRixNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBZ0I7SUFNOUIsQ0FBQztJQUVELEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxLQUF3QztRQUM5RCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUE7UUFDN0MsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQWtCLENBQUE7UUFDdEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDeEUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLENBQUMsWUFBWSxHQUFHLEtBQUssR0FBRyxhQUFhLENBQUMsRUFBRSxLQUFLO1NBQzlDLENBQUMsQ0FBQTtRQUNGLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZDLE1BQU0sYUFBRyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUV2RSxDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQWdDO1FBQzdDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtRQUM3QyxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUE7UUFDL0MsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSwrQ0FBK0MsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQUM7WUFDcEYsTUFBTSxFQUFFO2dCQUNOLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBb0IsRUFBRSxFQUFFO29CQUM5QyxNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7b0JBQ3RGLElBQUksQ0FBQyxPQUFPLENBQUM7d0JBQ1gsQ0FBQyxhQUFhLEtBQUssR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFO3FCQUNuRCxDQUFDLENBQUE7Z0JBQ0osQ0FBQzthQUNGO1NBQ0YsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELFlBQVk7UUFFVixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLElBQUksRUFBRSxDQUFBO1FBQy9DLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRixFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ1osR0FBRyxFQUFFLHFEQUFxRCxHQUFHLHVCQUFnQixDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkksTUFBTSxFQUFFO2dCQUNOLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBb0IsRUFBRSxFQUFFO29CQUMzQyxNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7b0JBQ3RGLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQzt3QkFDWCxTQUFTLEVBQUUsT0FBTztxQkFDbkIsQ0FBQyxDQUFBO2dCQUNKLENBQUM7YUFDRjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsU0FBUztRQUNiLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO1FBRS9EO1lBQ0UsTUFBTSxZQUFZLEdBQUcsU0FBUyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUE7WUFDNUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFBO1lBQ3ZDLElBQUksWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM1RCxNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQTthQUNuRTtTQUNGO1FBRUQ7WUFFRSxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQTtZQUMzQyxNQUFNLEtBQUssR0FBRyxTQUFTLElBQUksRUFBRSxDQUFBO1lBQzdCLE1BQU0sRUFBRSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3BHLElBQUksRUFBRSxFQUFFO2dCQUNOLE1BQU0sYUFBRyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7YUFDakU7aUJBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDN0IsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUMzQixNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQ3ZCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2dCQUM3RyxJQUFJLE9BQU8sRUFBRTtvQkFDWCxNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFBO2lCQUNqRTthQUNGO1NBQ0Y7UUFFRDtZQUVFLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFBO1lBQzFDLE1BQU0sSUFBSSxHQUFHLFNBQVMsSUFBSSxFQUFFLENBQUE7WUFDNUIsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDbEcsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUMxRSxJQUFJLEVBQUUsRUFBRTtnQkFDTixNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO2FBQzVEO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzVCLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDMUIsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO2dCQUN0QixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUM3RixJQUFJLE9BQU8sRUFBRTtvQkFDWCxNQUFNLGFBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFBO2lCQUM1RDthQUNGO1NBQ0Y7SUFDSCxDQUFDO0lBS0QsUUFBUSxFQUFFO0lBRVYsQ0FBQztJQUtELGlCQUFpQixFQUFFLEtBQUs7UUFDdEIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQTtRQUNqQyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcbmltcG9ydCBhcGkgZnJvbSBcIi4uLy4uLy4uL3V0aWxzL2FwaVwiXG5pbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uL3V0aWxzL3V0aWxcIlxuXG5QYWdlKHtcbiAgZGF0YToge1xuICAgIGFjdGl2ZTogMCxcbiAgICBwcm90b2NvbDogJycsXG4gICAgdXNlcnNldHVwOiB7fSBhcyBVYXJ0LlByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGQsXG4gICAgc3lzc2V0dXA6IHt9IGFzIFVhcnQuUHJvdG9jb2xDb25zdGFudFRocmVzaG9sZCxcbiAgICBQcm90b2NvbHM6IHt9IGFzIFVhcnQucHJvdG9jb2wsXG4gICAgc2hvd1RhZzogW10gYXMgc3RyaW5nW10sXG4gICAgYWxhcm1TdGF0OiBbXSBhcyBVYXJ0LkNvbnN0YW50QWxhcm1TdGF0W10sXG4gICAgVGhyZXNob2xkOiBbXSBhcyBVYXJ0LlRocmVzaG9sZFtdXG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Yqg6L29XG4gICAqL1xuICBvbkxvYWQ6IGFzeW5jIGZ1bmN0aW9uIChvcHRpb25zOiBhbnkpIHtcbiAgICBjb25zdCBwcm90b2NvbCA9IG9wdGlvbnMucHJvdG9jb2xcbiAgICBpZiAoIXByb3RvY29sKSB7XG4gICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2FsYXJtU2V0dGluZy9pbmRleCdcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgY29uc3QgYWN0aXZlID0gTnVtYmVyKG9wdGlvbnMudHlwZSkgfHwgMFxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhY3RpdmU6IGFjdGl2ZSxcbiAgICAgIHByb3RvY29sXG4gICAgfSlcbiAgICBhd2FpdCB0aGlzLmdldFVzZXJQcm90b2NvbFNldHVwKClcbiAgICBpZiAoYWN0aXZlID09PSAxKSB0aGlzLnVwZGF0ZVRocmUoKVxuICAgIGlmIChhY3RpdmUgPT09IDIpIHRoaXMudXBkYXRlQWxhcm0oKVxuICB9LFxuXG4gIC8vIOiOt+WPlueUqOaIt+WNj+iurumFjee9rlxuICBhc3luYyBnZXRVc2VyUHJvdG9jb2xTZXR1cCgpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn6I635Y+W5Y2P6K6u6YWN572uJyB9KVxuICAgIGNvbnN0IHVzZXJTZXR1cCA9IGF3YWl0IGFwaS5nZXRVc2VyQWxhcm1Qcm90b2NvbCh0aGlzLmRhdGEucHJvdG9jb2wpXG4gICAgY29uc3Qgc3lzU2V0dXAgPSBhd2FpdCBhcGkuZ2V0QWxhcm1Qcm90b2NvbCh0aGlzLmRhdGEucHJvdG9jb2wpXG4gICAgY29uc3QgUHJvdG9jb2xzID0gYXdhaXQgYXBpLmdldFByb3RvY29sKHRoaXMuZGF0YS5wcm90b2NvbClcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgaWYgKHVzZXJTZXR1cCAmJiBzeXNTZXR1cCkge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdXNlcnNldHVwOiB1c2VyU2V0dXAuZGF0YSxcbiAgICAgICAgc3lzc2V0dXA6IHN5c1NldHVwLmRhdGEsXG4gICAgICAgIFByb3RvY29sczogUHJvdG9jb2xzLmRhdGEsXG4gICAgICAgIHNob3dUYWc6IHVzZXJTZXR1cC5kYXRhLlNob3dUYWdcbiAgICAgIH0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgd3guc2hvd01vZGFsKHtcbiAgICAgICAgdGl0bGU6IFwiRXJyb3JcIixcbiAgICAgICAgY29udGVudDogJ+iuvuWkh+WNj+iurmLkuI3mlK/mjIHphY3nva4nXG4gICAgICB9KVxuICAgIH1cbiAgfSxcblxuICAvLyDov5Tlm57ljY/orq7lj4LmlbDlr7nosaHop6PmnpBcbiAgcGFyc2VQcm90b2NvbCgpIHtcbiAgICBjb25zdCBwcm90b2NvbEFycmF5ID0gdGhpcy5kYXRhLlByb3RvY29scy5pbnN0cnVjdC5tYXAoaW5zdHJ1Y3QgPT4ge1xuICAgICAgcmV0dXJuIGluc3RydWN0LmZvcm1SZXNpemUubWFwKGVsID0+ICh7IFtlbC5uYW1lXTogZWwuaXNTdGF0ZSA/IHVuaXRDYWNoZS5nZXR1bml0T2JqZWN0KDEsIGVsLnVuaXQgYXMgc3RyaW5nKSA6IHt9IH0pKVxuICAgIH0pLnJlZHVjZSgocHJlLCBjdXIpID0+IHtcbiAgICAgIHJldHVybiBbLi4ucHJlLCAuLi5jdXJdXG4gICAgfSlcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgLi4ucHJvdG9jb2xBcnJheSkgYXMgeyBbeDogc3RyaW5nXTogeyBbeDogc3RyaW5nXTogc3RyaW5nIH1bXSB9XG4gIH0sXG4gIC8vIOS/ruaUueagh+mimFxuICB0YWJjbGljayhldmVudDogdmFudEV2ZW50KSB7XG4gICAgd3guc2V0TmF2aWdhdGlvbkJhclRpdGxlKHsgdGl0bGU6ICfljY/orq7phY3nva4tJyArIGV2ZW50LmRldGFpbC50aXRsZSB9KVxuICAgIHN3aXRjaCAoZXZlbnQuZGV0YWlsLnRpdGxlKSB7XG4gICAgICBjYXNlIFwi5Y+C5pWw6ZmQ5YC8XCI6XG4gICAgICAgIHRoaXMudXBkYXRlVGhyZSgpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwi5Y+C5pWw54q25oCBXCI6XG4gICAgICAgIHRoaXMudXBkYXRlQWxhcm0oKVxuICAgICAgICBicmVha1xuICAgIH1cbiAgfSxcbiAgLy8g5pu05pawdGhyZeWIl+ihqFxuICB1cGRhdGVUaHJlKCkge1xuICAgIGNvbnN0IHsgdXNlcnNldHVwLCBzeXNzZXR1cCB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3Qgc3lzX1RocmVzaG9sZE1hcCA9IG5ldyBNYXAoc3lzc2V0dXAuVGhyZXNob2xkLm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSlcbiAgICBpZiAodXNlcnNldHVwPy5UaHJlc2hvbGQpIHtcbiAgICAgIC8vIOi/reS7o+eUqOaIt+mFjee9ru+8jOimhuebluezu+e7n+mFjee9rlxuICAgICAgWy4uLnRoaXMuZGF0YS5UaHJlc2hvbGQsIC4uLnVzZXJzZXR1cC5UaHJlc2hvbGRdLmZvckVhY2goKHZhbCkgPT4ge1xuICAgICAgICBzeXNfVGhyZXNob2xkTWFwLnNldCh2YWwubmFtZSwgdmFsKVxuICAgICAgfSlcbiAgICB9XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIFRocmVzaG9sZDogQXJyYXkuZnJvbShzeXNfVGhyZXNob2xkTWFwLnZhbHVlcygpKVxuICAgIH0pXG4gIH0sXG4gIC8vIOabtOaWsGFsYXJt5YiX6KGoXG4gIHVwZGF0ZUFsYXJtKCkge1xuICAgIGNvbnN0IHsgdXNlcnNldHVwLCBzeXNzZXR1cCB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3Qgc3lzX2FsYXJtU3RhdE1hcCA9IG5ldyBNYXAoc3lzc2V0dXAuQWxhcm1TdGF0Lm1hcChlbCA9PiBbZWwubmFtZSwgZWxdKSlcbiAgICBpZiAodXNlcnNldHVwPy5BbGFybVN0YXQpIHtcbiAgICAgIFsuLi51c2Vyc2V0dXAuQWxhcm1TdGF0LCAuLi50aGlzLmRhdGEuYWxhcm1TdGF0XS5mb3JFYWNoKHZhbCA9PiB7XG4gICAgICAgIHN5c19hbGFybVN0YXRNYXAuc2V0KHZhbC5uYW1lLCB2YWwpXG4gICAgICB9KVxuICAgIH1cbiAgICBjb25zdCBwYXJzZSA9IHRoaXMucGFyc2VQcm90b2NvbCgpXG4gICAgc3lzX2FsYXJtU3RhdE1hcC5mb3JFYWNoKChlbCwga2V5KSA9PiB7XG4gICAgICBlbC5wYXJzZSA9IHBhcnNlW2tleV1cbiAgICB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhbGFybVN0YXQ6IEFycmF5LmZyb20oc3lzX2FsYXJtU3RhdE1hcC52YWx1ZXMoKSlcbiAgICB9KVxuICB9LFxuICAvLyAg55uR5ZCs5pi+56S65Y+C5pWw5Y+Y5YyWXG4gIGFzeW5jIFNob3dUYWdvbkNoYW5nZShldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coe2V2ZW50fSk7XG4gICAgXG4gICAgY29uc3QgdGFncyA9IGV2ZW50LmRldGFpbCBhcyBzdHJpbmdbXVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBzaG93VGFnOiB0YWdzXG4gICAgfSlcbiAgICBhd2FpdCBhcGkuc2V0VXNlclNldHVwUHJvdG9jb2wodGhpcy5kYXRhLnByb3RvY29sLCAnU2hvd1RhZycsIHRhZ3MgfHwgW10pXG4gIH0sXG4gIC8vIOS/ruaUueaYvuekuuWPguaVsOWPmOWMluWAvFxuICBTaG93VGFndG9nZ2xlKGV2ZW50OiB2YW50RXZlbnQpIHtcbiAgICAvL2NvbnNvbGUubG9nKGV2ZW50KTtcbiAgICBcbiAgICAvKiBjb25zdCB7IGluZGV4IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQ7XG4gICAgY29uc3QgY2hlY2tib3ggPSB0aGlzLnNlbGVjdENvbXBvbmVudChgLmNoZWNrYm94ZXMtJHtpbmRleH1gKTtcbiAgICBjaGVja2IudG9nZ2xlKCk7ICovXG4gIH0sXG4gIC8vIOebkeWQrOWPguaVsOeKtuaAgeWPmOWMllxuICBhc3luYyBBbGFybVN0YXRvbkNoYW5nZShldmVudDogdmFudEV2ZW50PFVhcnQuQ29uc3RhbnRBbGFybVN0YXQ+KSB7XG4gICAgY29uc3QgaXRlbSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3QgdmFsdWUgPSBldmVudC5kZXRhaWwgYXMgc3RyaW5nW11cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuZGF0YS5hbGFybVN0YXQuZmluZEluZGV4KGVsID0+IGVsLm5hbWUgPT09IGl0ZW0ubmFtZSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgW1wiYWxhcm1TdGF0W1wiICsgaW5kZXggKyBcIl0uYWxhcm1TdGF0XCJdOiB2YWx1ZVxuICAgIH0pXG4gICAgY29uc3QgZGF0YSA9IHRoaXMuZGF0YS5hbGFybVN0YXRbaW5kZXhdXG4gICAgYXdhaXQgYXBpLnNldFVzZXJTZXR1cFByb3RvY29sKHRoaXMuZGF0YS5wcm90b2NvbCwgJ0FsYXJtU3RhdCcsIGRhdGEpXG5cbiAgfSxcbiAgLy8g6Lez6L2s5Yiw5Y+C5pWw6ZmQ5YC85L+u5pS56aG16Z2iXG4gIFRocmVzaG9sZENsaWNrKGV2ZW50OiB2YW50RXZlbnQ8VWFydC5UaHJlc2hvbGQ+KSB7XG4gICAgY29uc3QgaXRlbSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5pdGVtXG4gICAgY29uc3QgaW5kZXggPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaW5kZXhcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvdGhyZXNob2xkL3RocmVzaG9sZCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgLi4uaXRlbSB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBtb2RpZnlUaHJlc2hvbGQ6IGFzeW5jIChkYXRhOiBVYXJ0LlRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgIGF3YWl0IGFwaS5zZXRVc2VyU2V0dXBQcm90b2NvbCh0aGlzLmRhdGEucHJvdG9jb2wsIFwiVGhyZXNob2xkXCIsIHsgdHlwZTogJ2FkZCcsIGRhdGEgfSlcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgW2BUaHJlc2hvbGRbJHtpbmRleH1dYF06IHsgLi4uZGF0YSwgaWNvbjogXCJzdGFyXCIgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9LFxuICAvLyDot7PovazliLDmlrDlop7lj4LmlbDpmZDlgLzpobXpnaJcbiAgYWRkVGhyZXNob2xkKCkge1xuICAgIC8vIOiOt+WPlueOsOacieeahHRocmXlkI3np7BcbiAgICBjb25zdCB1YSA9IHRoaXMuZGF0YS51c2Vyc2V0dXA/LkFsYXJtU3RhdCB8fCBbXVxuICAgIGNvbnN0IGtleXMgPSBuZXcgU2V0KFsuLi50aGlzLmRhdGEuYWxhcm1TdGF0Lm1hcChlbCA9PiBlbC5uYW1lKSwgLi4udWEubWFwKGVsID0+IGVsLm5hbWUpXSlcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogJy9wYWdlcy9pbmRleC9hbGFybVNldHRpbmcvYWRkVGhyZXNob2xkL2FkZFRocmVzaG9sZCcgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCwga2V5czogQXJyYXkuZnJvbShrZXlzKSB9KSxcbiAgICAgIGV2ZW50czoge1xuICAgICAgICBhZGRUaHJlc2hvbGQ6IGFzeW5jIChkYXRhOiBVYXJ0LlRocmVzaG9sZCkgPT4ge1xuICAgICAgICAgIGF3YWl0IGFwaS5zZXRVc2VyU2V0dXBQcm90b2NvbCh0aGlzLmRhdGEucHJvdG9jb2wsIFwiVGhyZXNob2xkXCIsIHsgdHlwZTogJ2FkZCcsIGRhdGEgfSlcbiAgICAgICAgICBjb25zdCBuZXdUaHJlID0gdGhpcy5kYXRhLlRocmVzaG9sZC5jb25jYXQoZGF0YSlcbiAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgVGhyZXNob2xkOiBuZXdUaHJlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG4gIC8vIOS/neWtmOmFjee9rlxuICBhc3luYyBzYXZlU2V0dXAoKSB7XG4gICAgY29uc3QgeyB1c2Vyc2V0dXAsIGFsYXJtU3RhdCwgVGhyZXNob2xkLCBwcm90b2NvbCB9ID0gdGhpcy5kYXRhXG4gICAgLy8g5pu05paw55So5oi3c2hvd1RhZ3PphY3nva5cbiAgICB7XG4gICAgICBjb25zdCB1c2VyU2hvd3RhZ3MgPSB1c2Vyc2V0dXAuU2hvd1RhZyB8fCBbXVxuICAgICAgY29uc3Qgc2hvd3RhZyA9IHRoaXMuZGF0YS5zaG93VGFnIHx8IFtdXG4gICAgICBpZiAodXNlclNob3d0YWdzLnNvcnQoKS5qb2luKFwiXCIpICE9PSBzaG93dGFnLnNvcnQoKS5qb2luKCcnKSkge1xuICAgICAgICBhd2FpdCBhcGkuc2V0VXNlclNldHVwUHJvdG9jb2wocHJvdG9jb2wsICdTaG93VGFnJywgc2hvd3RhZyB8fCBbXSlcbiAgICAgIH1cbiAgICB9XG4gICAgLy8g5pu05paw55So5oi3YWxhcm1TdGF06YWN572uXG4gICAge1xuICAgICAgLy8g5q+U6L6D5ZCN56ewam9pbuaYr+WQpuS4gOiHtO+8jOS4gOiHtOeahOivneajgOafpemUruaYr+WQpuS4gOiHtO+8jOS4jeS4gOiHtOebtOaOpeabtOaWsO+8jOmUruS4gOiHtOWImeavlOi+g+WAvO+8jOWAvOS4jeS4gOiHtOS5n+abtOaWsFxuICAgICAgY29uc3QgdXNlckFsYXJtID0gdXNlcnNldHVwLkFsYXJtU3RhdCB8fCBbXVxuICAgICAgY29uc3QgYWxhcm0gPSBhbGFybVN0YXQgfHwgW11cbiAgICAgIGNvbnN0IGIxID0gdXNlckFsYXJtLm1hcChlbCA9PiBlbC5uYW1lKS5zb3J0KCkuam9pbignJykgIT09IGFsYXJtLm1hcChlbCA9PiBlbC5uYW1lKS5zb3J0KCkuam9pbignJylcbiAgICAgIGlmIChiMSkge1xuICAgICAgICBhd2FpdCBhcGkuc2V0VXNlclNldHVwUHJvdG9jb2wocHJvdG9jb2wsICdBbGFybVN0YXQnLCBhbGFybVN0YXQpXG4gICAgICB9IGVsc2UgaWYgKGFsYXJtLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjb25zdCB1YSA9IHVzZXJBbGFybS5zb3J0KClcbiAgICAgICAgY29uc3Qga2EgPSBhbGFybS5zb3J0KClcbiAgICAgICAgY29uc3QgY29tcGFyZSA9IHVhLmV2ZXJ5KChlbCwgaW5kZXgpID0+IGVsLmFsYXJtU3RhdC5zb3J0KCkuam9pbignJykgIT09IGthW2luZGV4XS5hbGFybVN0YXQuc29ydCgpLmpvaW4oJycpKVxuICAgICAgICBpZiAoY29tcGFyZSkge1xuICAgICAgICAgIGF3YWl0IGFwaS5zZXRVc2VyU2V0dXBQcm90b2NvbChwcm90b2NvbCwgJ0FsYXJtU3RhdCcsIGFsYXJtU3RhdClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyDmm7TmlrDnlKjmiLd0aHJlYWTphY3nva5cbiAgICB7XG4gICAgICAvLyDmr5TovoPlkI3np7Bqb2lu5piv5ZCm5LiA6Ie077yM5LiA6Ie055qE6K+d5qOA5p+l6ZSu5piv5ZCm5LiA6Ie077yM5LiN5LiA6Ie055u05o6l5pu05paw77yM6ZSu5LiA6Ie05YiZ5q+U6L6D5YC877yM5YC85LiN5LiA6Ie05Lmf5pu05pawXG4gICAgICBjb25zdCB1c2VyVGhyZSA9IHVzZXJzZXR1cC5UaHJlc2hvbGQgfHwgW11cbiAgICAgIGNvbnN0IHRocmUgPSBUaHJlc2hvbGQgfHwgW11cbiAgICAgIGNvbnN0IGIxID0gdXNlclRocmUubWFwKGVsID0+IGVsLm5hbWUpLnNvcnQoKS5qb2luKCcnKSAhPT0gdGhyZS5tYXAoZWwgPT4gZWwubmFtZSkuc29ydCgpLmpvaW4oJycpXG4gICAgICBjb25zdCBkYXRhID0gdGhyZS5tYXAoZWwgPT4gKHsgbmFtZTogZWwubmFtZSwgbWluOiBlbC5taW4sIG1heDogZWwubWF4IH0pKVxuICAgICAgaWYgKGIxKSB7XG4gICAgICAgIGF3YWl0IGFwaS5zZXRVc2VyU2V0dXBQcm90b2NvbChwcm90b2NvbCwgXCJUaHJlc2hvbGRcIiwgZGF0YSlcbiAgICAgIH0gZWxzZSBpZiAodGhyZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgY29uc3QgdWEgPSB1c2VyVGhyZS5zb3J0KClcbiAgICAgICAgY29uc3Qga2EgPSB0aHJlLnNvcnQoKVxuICAgICAgICBjb25zdCBjb21wYXJlID0gdWEuZXZlcnkoKGVsLCBpbmRleCkgPT4gZWwubWluICE9PSBrYVtpbmRleF0ubWluIHx8IGVsLm1heCAhPT0ga2FbaW5kZXhdLm1heClcbiAgICAgICAgaWYgKGNvbXBhcmUpIHtcbiAgICAgICAgICBhd2FpdCBhcGkuc2V0VXNlclNldHVwUHJvdG9jb2wocHJvdG9jb2wsIFwiVGhyZXNob2xkXCIsIGRhdGEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIOeUn+WRveWRqOacn+WHveaVsC0t55uR5ZCs6aG16Z2i5Y246L29XG4gICAqL1xuICBvblVubG9hZDogZnVuY3Rpb24gKCkge1xuICAgIC8vdGhpcy5zYXZlU2V0dXAoKVxuICB9LFxuXG4gIC8qKlxuICAgKiDpobXpnaLnm7jlhbPkuovku7blpITnkIblh73mlbAtLeebkeWQrOeUqOaIt+S4i+aLieWKqOS9nFxuICAgKi9cbiAgb25QdWxsRG93blJlZnJlc2g6IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICBhd2FpdCB0aGlzLmdldFVzZXJQcm90b2NvbFNldHVwKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfVxufSkiXX0=
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../utils/util");
const api_1 = require("../../utils/api");
Page({
    data: {
        ready: false,
        DTUs: [],
        dtuItem: [],
        state: '',
        alarm: '',
        alarmNum: 0,
        alarmData: [],
        Vm: [],
        confirm: false,
        sub: false
    },
    devPics: {
        "UPS": '/assert/ups.png',
        "温湿度": '/assert/th.png',
        "电量仪": '/assert/em.png',
        "空调": '/assert/air.png'
    },
    onLoad(query) {
        wx.showLoading({ title: 'login' });
        wx.login({
            success: async (login) => {
                const { code, data } = await api_1.default.login({ js_code: login.code, scene: query.scene ? decodeURIComponent(query.scene) : '' });
                if (code) {
                    const user = await api_1.default.userInfo();
                    wx.hideLoading();
                    switch (user.data.userGroup) {
                        case "admin":
                        case "root":
                            wx.reLaunch({ url: "/pages/admin/index" });
                            break;
                        default:
                            this.setData({ ready: true, sub: Boolean(user.data.wxId) });
                            await this.start();
                            break;
                    }
                }
                else {
                    wx.hideLoading();
                    wx.reLaunch({ url: "/pages/login/login?openid=" + data.openid + "&unionid=" + data.unionid });
                }
            }
        });
    },
    async start() {
        await this.bindDev();
        api_1.default.onMessage('MacUpdate', (mac) => {
            console.log(`listen MacUpdate,mac:${mac}`);
            this.bindDev();
        });
    },
    async subMessage() {
        const url = encodeURIComponent('http://mp.weixin.qq.com/s?__biz=MjM5MjA1MTgxOQ==&mid=304819939&idx=1&sn=d0bcd922033075afa2b5219fc95ebb1e&chksm=3173a9e7060420f1a98d0040d964a2f82af25289a731d1400c5224ca9bb3d225d737700700a8#rd');
        wx.navigateTo({ url: '/pages/index/web/web?url=' + url });
    },
    async bindDev() {
        wx.showLoading({ title: '获取DTU' });
        const { code, data } = await api_1.default.BindDev();
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (code) {
            if (data.UTs.length === 0) {
                this.setData({
                    DTUs: [],
                    dtuItem: []
                });
                if (!this.data.confirm) {
                    wx.showModal({
                        title: '添加设备',
                        content: '您还没有任何设备，是否添加设备?',
                        success: (res) => {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/index/bindDev/bindDev'
                                });
                            }
                            else {
                                this.setData({
                                    confirm: true
                                });
                            }
                        }
                    });
                }
            }
            else {
                this.sortDevs(data.UTs);
                api_1.default.getAlarmunconfirmed().then(({ data: len }) => {
                    if (Number(len) > 0) {
                        this.setData({
                            alarm: `有${len}条未确认的告警信息，点击查看?`,
                            alarmNum: Number(len)
                        });
                    }
                    else {
                        this.setData({
                            alarm: ``,
                            alarmNum: Number(len),
                            alarmData: []
                        });
                    }
                });
            }
        }
    },
    sortDevs(UTs) {
        wx.setStorage({
            key: 'Uts',
            data: UTs
        });
        this.countDev(UTs);
        const devs = UTs.map(dtu => {
            return dtu.mountDevs.map(dev => ({ ...dev, pic: this.devPics[dev.Type], dtu: dtu.name, online: dev.online && dtu.online }));
        }).flat();
        this.setData({
            DTUs: UTs,
            dtuItem: devs
        });
    },
    toDev(event) {
        const { DevMac } = event.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/index/dtu/dtu' + (0, util_1.ObjectToStrquery)({ mac: DevMac })
        });
    },
    showMountDevData(event) {
        const { pid, mountDev, protocol, dtu, Type } = event.currentTarget.dataset.item;
        const { DevMac } = this.data.DTUs.find(el => el.name === dtu);
        wx.navigateTo({
            url: '/pages/index/devs/devs' + (0, util_1.ObjectToStrquery)({ pid: String(pid), mountDev, protocol, DevMac, Type })
        });
    },
    seeAlarm() {
        wx.switchTab({ url: '/pages/index/alarm/alarm' });
    },
    countDev(terminals) {
        const terminal_all = terminals.length;
        const terminal_on = terminals.map(el => el.online).filter(el => el).length;
        const monutDev_all = terminals.map(el => el.mountDevs.length).reduce((pre, cur) => pre + cur);
        const mountDev_on = terminals.map(el => el.mountDevs.filter(el2 => el2.online)).reduce((pre, cur) => [...pre, ...cur]).length;
        const state = `DTU:(全部${terminal_all}/在线${terminal_on}),挂载设备:(全部${monutDev_all}/在线${mountDev_on})`;
        this.setData({
            state
        });
    },
    async onPullDownRefresh() {
        await this.bindDev();
        this.countDev(this.data.DTUs);
        this.start();
        wx.stopPullDownRefresh();
    },
    bindload(event) {
        console.log(`公众号加载success,状态:${event.detail.errMsg}`);
    },
    binderror(event) {
        console.log(`公众号加载error,状态:${event.detail.errMsg}`);
    },
    trial() {
        wx.showLoading({ title: 'login' });
        wx.login({
            success: async (login) => {
                const { code } = await api_1.default.trial({ js_code: login.code });
                if (code) {
                    this.start();
                    wx.hideLoading();
                }
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDJDQUFvRDtBQUNwRCx5Q0FBa0M7QUFFbEMsSUFBSSxDQUFDO0lBQ0gsSUFBSSxFQUFFO1FBQ0osS0FBSyxFQUFFLEtBQUs7UUFFWixJQUFJLEVBQUUsRUFBcUI7UUFFM0IsT0FBTyxFQUFFLEVBQThCO1FBRXZDLEtBQUssRUFBRSxFQUFFO1FBRVQsS0FBSyxFQUFFLEVBQUU7UUFFVCxRQUFRLEVBQUUsQ0FBQztRQUVYLFNBQVMsRUFBRSxFQUE0QjtRQUV2QyxFQUFFLEVBQUUsRUFBcUI7UUFDekIsT0FBTyxFQUFFLEtBQUs7UUFFZCxHQUFHLEVBQUUsS0FBSztLQUNYO0lBRUQsT0FBTyxFQUFFO1FBQ1AsS0FBSyxFQUFFLGlCQUFpQjtRQUN4QixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLGlCQUFpQjtLQUNFO0lBQzNCLE1BQU0sQ0FBQyxLQUFVO1FBQ2YsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFBO1FBQ2xDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDUCxPQUFPLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFO2dCQUVyQixNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLE1BQU0sYUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7Z0JBQzFILElBQUksSUFBSSxFQUFFO29CQUNSLE1BQU0sSUFBSSxHQUFHLE1BQU0sYUFBRyxDQUFDLFFBQVEsRUFBRSxD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SUFDeEQsQ0FBQztJQUNELFNBQVMsQ0FBQyxLQUFnQjtRQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUs7UUFDSCxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUE7UUFDbEMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNQLE9BQU8sRUFBRSxLQUFLLEVBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBRXJCLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxNQUFNLGFBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBQyxDQUFDLENBQUE7Z0JBQ3hELElBQUksSUFBSSxFQUFFO29CQUNSLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtvQkFDWixFQUFFLENBQUMsV0FBVyxFQUFFLENBQUE7aUJBQ2pCO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FpQkYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbmltcG9ydCB7IE9iamVjdFRvU3RycXVlcnkgfSBmcm9tIFwiLi4vLi4vdXRpbHMvdXRpbFwiO1xuaW1wb3J0IGFwaSBmcm9tIFwiLi4vLi4vdXRpbHMvYXBpXCI7XG4vLyDojrflj5blupTnlKjlrp7kvotcblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgcmVhZHk6IGZhbHNlLFxuICAgIC8qKiBEVFXorr7lpIfkv6Hmga8gKi9cbiAgICBEVFVzOiBbXSBhcyBVYXJ0LlRlcm1pbmFsW10sXG4gICAgLy8g5Yi36YCJ5oyC6L296K6+5aSH5YiX6KGoXG4gICAgZHR1SXRlbTogW10gYXMgVWFydC5UZXJtaW5hbE1vdW50RGV2c1tdLFxuICAgIC8vIOaMgui9veeKtuaAgeS/oeaBr1xuICAgIHN0YXRlOiAnJyxcbiAgICAvLyDlkYrorabnirbmgIHkv6Hmga9cbiAgICBhbGFybTogJycsXG4gICAgLy8g5pyq56Gu6K6k5ZGK6K2m5pWw6YePXG4gICAgYWxhcm1OdW06IDAsXG4gICAgLy8g5LqU5p2h5YaF5ZGK6K2m5pWw5o2uXG4gICAgYWxhcm1EYXRhOiBbXSBhcyBVYXJ0LnVhcnRBbGFybU9iamVjdFtdLFxuICAgIC8vIOiZmuaLn+iuvuWkh1xuICAgIFZtOiBbXSBhcyBVYXJ0LlRlcm1pbmFsW10sXG4gICAgY29uZmlybTogZmFsc2UsXG4gICAgLy8g5piv5ZCm6K6i6ZiFXG4gICAgc3ViOiBmYWxzZVxuICB9LFxuXG4gIGRldlBpY3M6IHtcbiAgICBcIlVQU1wiOiAnL2Fzc2VydC91cHMucG5nJyxcbiAgICBcIua4qea5v+W6plwiOiAnL2Fzc2VydC90aC5wbmcnLFxuICAgIFwi55S16YeP5LuqXCI6ICcvYXNzZXJ0L2VtLnBuZycsXG4gICAgXCLnqbrosINcIjogJy9hc3NlcnQvYWlyLnBuZydcbiAgfSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LFxuICBvbkxvYWQocXVlcnk6IGFueSkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICdsb2dpbicgfSlcbiAgICB3eC5sb2dpbih7XG4gICAgICBzdWNjZXNzOiBhc3luYyBsb2dpbiA9PiB7XG4gICAgICAgIC8vIOWPkemAgee9kee7nOivt+axgu+8jOiOt+WPluWcqOe6v+i0puaIt1xuICAgICAgICBjb25zdCB7IGNvZGUsIGRhdGEgfSA9IGF3YWl0IGFwaS5sb2dpbih7IGpzX2NvZGU6IGxvZ2luLmNvZGUsIHNjZW5lOiBxdWVyeS5zY2VuZSA/IGRlY29kZVVSSUNvbXBvbmVudChxdWVyeS5zY2VuZSkgOiAnJyB9KVxuICAgICAgICBpZiAoY29kZSkge1xuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBhcGkudXNlckluZm8oKVxuICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcblxuICAgICAgICAgIC8vIOWIpOaWrXVzZXLnlKjmiLfnu4Qs5aaC5p6c5pivYWRtaW7liJnot7PovazliLDkuJPmnInpobXpnaJcbiAgICAgICAgICBzd2l0Y2ggKHVzZXIuZGF0YS51c2VyR3JvdXApIHtcbiAgICAgICAgICAgIGNhc2UgXCJhZG1pblwiOlxuICAgICAgICAgICAgY2FzZSBcInJvb3RcIjpcbiAgICAgICAgICAgICAgd3gucmVMYXVuY2goeyB1cmw6IFwiL3BhZ2VzL2FkbWluL2luZGV4XCIgfSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoeyByZWFkeTogdHJ1ZSwgc3ViOiBCb29sZWFuKHVzZXIuZGF0YS53eElkKSB9KVxuICAgICAgICAgICAgICBhd2FpdCB0aGlzLnN0YXJ0KClcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgd3guaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIHd4LnJlTGF1bmNoKHsgdXJsOiBcIi9wYWdlcy9sb2dpbi9sb2dpbj9vcGVuaWQ9XCIgKyAoZGF0YSBhcyBhbnkpLm9wZW5pZCArIFwiJnVuaW9uaWQ9XCIgKyAoZGF0YSBhcyBhbnkpLnVuaW9uaWQgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG5cbiAgLy8g55m75b2V6L+Q6KGMXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgLy8g55uR5ZCs55So5oi357uR5a6a55qE6K6+5aSH54q25oCB5Y+Y5pu05LqL5Lu2LOWPiuaXtuWIt+aWsOiuvuWkh+eKtuaAgVxuICAgIGFwaS5vbk1lc3NhZ2U8c3RyaW5nPignTWFjVXBkYXRlJywgKG1hYykgPT4ge1xuICAgICAgY29uc29sZS5sb2coYGxpc3RlbiBNYWNVcGRhdGUsbWFjOiR7bWFjfWApO1xuICAgICAgdGhpcy5iaW5kRGV2KClcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiDorqLpmIXkuIvmrKHlkYroraZcbiAgICovXG4gIGFzeW5jIHN1Yk1lc3NhZ2UoKSB7XG4gICAgY29uc3QgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCdodHRwOi8vbXAud2VpeGluLnFxLmNvbS9zP19fYml6PU1qTTVNakExTVRneE9RPT0mbWlkPTMwNDgxOTkzOSZpZHg9MSZzbj1kMGJjZDkyMjAzMzA3NWFmYTJiNTIxOWZjOTVlYmIxZSZjaGtzbT0zMTczYTllNzA2MDQyMGYxYTk4ZDAwNDBkOTY0YTJmODJhZjI1Mjg5YTczMWQxNDAwYzUyMjRjYTliYjNkMjI1ZDczNzcwMDcwMGE4I3JkJylcbiAgICB3eC5uYXZpZ2F0ZVRvKHsgdXJsOiAnL3BhZ2VzL2luZGV4L3dlYi93ZWI/dXJsPScgKyB1cmwgfSlcbiAgfSxcblxuICAvLyDojrflj5bnlKjmiLfnu5Hlrprorr7lpIdcbiAgYXN5bmMgYmluZERldigpIHtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAn6I635Y+WRFRVJyB9KVxuICAgIGNvbnN0IHsgY29kZSwgZGF0YSB9ID0gYXdhaXQgYXBpLkJpbmREZXYoKVxuICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgICBpZiAoY29kZSkge1xuXG4gICAgICBpZiAoZGF0YS5VVHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgRFRVczogW10sXG4gICAgICAgICAgZHR1SXRlbTogW11cbiAgICAgICAgfSlcbiAgICAgICAgaWYgKCF0aGlzLmRhdGEuY29uZmlybSkge1xuICAgICAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgICAgICB0aXRsZTogJ+a3u+WKoOiuvuWkhycsXG4gICAgICAgICAgICBjb250ZW50OiAn5oKo6L+Y5rKh5pyJ5Lu75L2V6K6+5aSH77yM5piv5ZCm5re75Yqg6K6+5aSHPycsXG4gICAgICAgICAgICBzdWNjZXNzOiAocmVzKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICAgICAgICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2JpbmREZXYvYmluZERldidcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgICBjb25maXJtOiB0cnVlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL3RoaXMuYWRkVm0oKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3J0RGV2cyhkYXRhLlVUcylcbiAgICAgICAgLy8g6I635Y+W5pyq6K+75Y+W55qEYWxhcm3mlbDph49cbiAgICAgICAgYXBpLmdldEFsYXJtdW5jb25maXJtZWQoKS50aGVuKCh7IGRhdGE6IGxlbiB9KSA9PiB7XG4gICAgICAgICAgaWYgKE51bWJlcihsZW4pID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgYWxhcm06IGDmnIkke2xlbn3mnaHmnKrnoa7orqTnmoTlkYrorabkv6Hmga/vvIzngrnlh7vmn6XnnIs/YCxcbiAgICAgICAgICAgICAgYWxhcm1OdW06IE51bWJlcihsZW4pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICBhbGFybTogYGAsXG4gICAgICAgICAgICAgIGFsYXJtTnVtOiBOdW1iZXIobGVuKSxcbiAgICAgICAgICAgICAgYWxhcm1EYXRhOiBbXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIOWkhOeQhuiuvuWkh+WIhuexu1xuICBzb3J0RGV2cyhVVHM6IFVhcnQuVGVybWluYWxbXSkge1xuICAgIHd4LnNldFN0b3JhZ2Uoe1xuICAgICAga2V5OiAnVXRzJyxcbiAgICAgIGRhdGE6IFVUc1xuICAgIH0pXG4gICAgdGhpcy5jb3VudERldihVVHMpXG4gICAgY29uc3QgZGV2cyA9IFVUcy5tYXAoZHR1ID0+IHtcbiAgICAgIHJldHVybiBkdHUubW91bnREZXZzLm1hcChkZXYgPT4gKHsgLi4uZGV2LCBwaWM6IHRoaXMuZGV2UGljc1tkZXYuVHlwZV0sIGR0dTogZHR1Lm5hbWUsIG9ubGluZTogZGV2Lm9ubGluZSAmJiBkdHUub25saW5lIH0pKVxuICAgIH0pLmZsYXQoKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBEVFVzOiBVVHMsXG4gICAgICBkdHVJdGVtOiBkZXZzXG4gICAgfSlcbiAgfSxcblxuICAvLyDmn6XnnIvmjILovb1cbiAgdG9EZXYoZXZlbnQ6IHZhbnRFdmVudDxVYXJ0LlRlcm1pbmFsPikge1xuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2R0dS9kdHUnICsgT2JqZWN0VG9TdHJxdWVyeSh7IG1hYzogRGV2TWFjIH0pXG4gICAgfSlcbiAgfSxcblxuICAvLyDmn6XnnIvorr7lpIfmlbDmja5cbiAgc2hvd01vdW50RGV2RGF0YShldmVudDogdmFudEV2ZW50PFVhcnQuVGVybWluYWxNb3VudERldnMgJiB7IGR0dTogc3RyaW5nIH0+KSB7XG4gICAgY29uc3QgeyBwaWQsIG1vdW50RGV2LCBwcm90b2NvbCwgZHR1LCBUeXBlIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaXRlbVxuICAgIGNvbnN0IHsgRGV2TWFjIH0gPSB0aGlzLmRhdGEuRFRVcy5maW5kKGVsID0+IGVsLm5hbWUgPT09IGR0dSkhXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvZGV2cy9kZXZzJyArIE9iamVjdFRvU3RycXVlcnkoeyBwaWQ6IFN0cmluZyhwaWQpLCBtb3VudERldiwgcHJvdG9jb2wsIERldk1hYywgVHlwZSB9KVxuICAgIH0pXG4gIH0sXG4gIC8vIOafpeeci+WRiuitplxuICBzZWVBbGFybSgpIHtcbiAgICB3eC5zd2l0Y2hUYWIoeyB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm0vYWxhcm0nIH0pXG4gIH0sXG4gIC8vIOe7n+iuoeaJgOacieiuvuWkh+eKtuaAgVxuICBjb3VudERldih0ZXJtaW5hbHM6IFVhcnQuVGVybWluYWxbXSkge1xuXG4gICAgY29uc3QgdGVybWluYWxfYWxsID0gdGVybWluYWxzLmxlbmd0aFxuICAgIGNvbnN0IHRlcm1pbmFsX29uID0gdGVybWluYWxzLm1hcChlbCA9PiBlbC5vbmxpbmUpLmZpbHRlcihlbCA9PiBlbCkubGVuZ3RoXG4gICAgY29uc3QgbW9udXREZXZfYWxsID0gdGVybWluYWxzLm1hcChlbCA9PiBlbC5tb3VudERldnMubGVuZ3RoKS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBwcmUgKyBjdXIpXG4gICAgY29uc3QgbW91bnREZXZfb24gPSB0ZXJtaW5hbHMubWFwKGVsID0+IGVsLm1vdW50RGV2cy5maWx0ZXIoZWwyID0+IGVsMi5vbmxpbmUpKS5yZWR1Y2UoKHByZSwgY3VyKSA9PiBbLi4ucHJlLCAuLi5jdXJdKS5sZW5ndGhcbiAgICAvLyBjb25zb2xlLmxvZyh7IHRlcm1pbmFsX2FsbCwgdGVybWluYWxfb24sIG1vbnV0RGV2X2FsbCwgbW91bnREZXZfb24gfSk7XG4gICAgY29uc3Qgc3RhdGUgPSBgRFRVOijlhajpg6gke3Rlcm1pbmFsX2FsbH0v5Zyo57q/JHt0ZXJtaW5hbF9vbn0pLOaMgui9veiuvuWkhzoo5YWo6YOoJHttb251dERldl9hbGx9L+WcqOe6vyR7bW91bnREZXZfb259KWBcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc3RhdGVcbiAgICB9KVxuICB9LFxuICAvL21hYz05OEQ4NjNDQzg3MEQmcGlkPTAmbW91bnREZXY9RzJLXG4gIGFzeW5jIG9uUHVsbERvd25SZWZyZXNoKCkge1xuICAgIGF3YWl0IHRoaXMuYmluZERldigpXG4gICAgdGhpcy5jb3VudERldih0aGlzLmRhdGEuRFRVcylcbiAgICB0aGlzLnN0YXJ0KClcbiAgICB3eC5zdG9wUHVsbERvd25SZWZyZXNoKClcbiAgfSxcbiAgLy9cbiAgYmluZGxvYWQoZXZlbnQ6IHZhbnRFdmVudCkge1xuICAgIGNvbnNvbGUubG9nKGDlhazkvJflj7fliqDovb1zdWNjZXNzLOeKtuaAgToke2V2ZW50LmRldGFpbC5lcnJNc2d9YCk7XG4gIH0sXG4gIGJpbmRlcnJvcihldmVudDogdmFudEV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYOWFrOS8l+WPt+WKoOi9vWVycm9yLOeKtuaAgToke2V2ZW50LmRldGFpbC5lcnJNc2d9YCk7XG4gIH0sXG5cbiAgdHJpYWwoKXtcbiAgICB3eC5zaG93TG9hZGluZyh7IHRpdGxlOiAnbG9naW4nIH0pXG4gICAgd3gubG9naW4oe1xuICAgICAgc3VjY2VzczogYXN5bmMgbG9naW4gPT4ge1xuICAgICAgICAvLyDlj5HpgIHnvZHnu5zor7fmsYLvvIzojrflj5blnKjnur/otKbmiLdcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBhd2FpdCBhcGkudHJpYWwoeyBqc19jb2RlOiBsb2dpbi5jb2RlfSlcbiAgICAgICAgaWYgKGNvZGUpIHtcbiAgICAgICAgICB0aGlzLnN0YXJ0KClcbiAgICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLy8g5re75Yqg6Jma5ouf6K6+5aSHXG4gIC8qIGFzeW5jIGFkZFZtKCkge1xuICAgIGNvbnN0IHsgb2ssIGFyZyB9ID0gYXdhaXQgYXBpLmFkZFZtKClcbiAgICBpZiAob2spIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIFZtOiBhcmdcbiAgICAgIH0pXG4gICAgICB0aGlzLnNvcnREZXZzKGFyZylcbiAgICB9XG4gIH0sIFxuICAgb25TaG93KCkge1xuICAgIGlmICh0aGlzLmRhdGEucmVhZHkpIHtcbiAgICAgIHRoaXMuYmluZERldigpXG4gICAgfVxuICB9ICovXG59KVxuIl19
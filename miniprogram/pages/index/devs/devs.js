"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../../../utils/util");
const api_1 = require("../../../utils/api");
const unitCache_1 = require("../../../utils/unitCache");
Page({
    data: {
        mac: '',
        pid: '',
        mountDev: "",
        result: {},
        filter: '',
        interval: 0,
        protocol: '',
        Type: '',
        Constant: {},
        upsPic: 'http://www.ladishb.com/upload/342021__ups.gif',
        th: {
            temperature: 0,
            humidity: 0,
        },
        _oprateStat: false
    },
    onLoad: function (options) {
        wx.setNavigationBarTitle({ title: options.mountDev || options.mac || '' });
        this.setData({
            mac: options.DevMac,
            pid: options.pid,
            protocol: options.protocol,
            mountDev: options.mountDev,
            Type: options.Type
        });
    },
    async onReady() {
        wx.showLoading({ title: '获取运行数据' });
        const { arg } = await api_1.default.getUserDevConstant(this.data.protocol);
        this.setData({
            Constant: arg
        });
        await this.GetDevsRunInfo();
        wx.hideLoading();
    },
    onShow: function () {
    },
    onHide: function () {
        clearInterval(this.data.interval);
    },
    onUnload: function () {
        clearInterval(this.data.interval);
    },
    onPullDownRefresh: async function () {
        await this.GetDevsRunInfo();
        wx.stopPullDownRefresh();
    },
    async GetDevsRunInfo() {
        const { mac, pid, filter } = this.data;
        const { ok, arg, msg } = await api_1.default.getDevsRunInfo(mac, pid);
        if (ok && arg) {
            const regStr = new RegExp(filter);
            arg.result = arg.result.filter(el => !filter || regStr.test(el.name)).map(obj => Object.assign(obj, unitCache_1.default.get(obj.value, obj.unit || '')));
            arg.time = util_1.parseTime(arg.time);
            this.setData({
                result: arg,
                interval: setTimeout(() => {
                    this.GetDevsRunInfo();
                }, arg.Interval || 5000)
            });
            switch (this.data.Type) {
                case "UPS":
                    const workMode = arg.result.find(el => el.name === this.data.Constant.sys.Constant.WorkMode)?.value;
                    switch (workMode) {
                        case "电池模式":
                            this.setData({
                                upsPic: 'http://www.ladishb.com/upload/342021__ups1.gif'
                            });
                            break;
                        case "旁路模式":
                            this.setData({
                                upsPic: 'http://www.ladishb.com/upload/342021__ups2.gif'
                            });
                            break;
                        case "在线模式":
                            this.setData({
                                upsPic: 'http://www.ladishb.com/upload/342021__ups3.gif'
                            });
                            break;
                        default:
                            this.setData({
                                upsPic: 'http://www.ladishb.com/upload/342021__ups.gif'
                            });
                            break;
                    }
                    break;
                case "温湿度":
                    const { Temperature, Humidity } = this.data.Constant.sys.Constant;
                    this.setData({
                        th: {
                            temperature: arg.result.find(el => el.name === Temperature)?.value,
                            humidity: arg.result.find(el => el.name === Humidity)?.value
                        }
                    });
                    break;
            }
        }
        else {
            clearInterval(this.data.interval);
            wx.showModal({
                title: 'Error',
                content: msg,
                success: () => {
                    clearInterval(this.data.interval);
                }
            });
        }
    },
    filter(e) {
        const filter = e.detail.filter;
        const regStr = new RegExp(filter);
        const result = this.data.result.result?.filter(el => regStr.test(el.name));
        this.setData({
            filter,
            "result.result": result
        });
    },
    toline(e) {
        wx.navigateTo({
            url: '/pages/index/line/line' + util_1.ObjectToStrquery({ name: e.detail.name, mac: this.data.mac, pid: this.data.pid, protocol: this.data.protocol })
        });
    },
    async oprate(e) {
        if (this.data._oprateStat)
            return;
        const item = e.detail;
        if (item.value.includes("%i") && !item.val) {
            wx.navigateTo({
                url: '/pages/util/setVal/setVal' + util_1.ObjectToStrquery({ item }),
                events: {
                    valueOk: (value) => {
                        item.val = value.val;
                        this.oprate({ detail: item });
                    }
                }
            });
            return;
        }
        wx.showLoading({ title: '正在发送' });
        this.setData({
            _oprateStat: true
        });
        const { ok, msg } = await api_1.default.SendProcotolInstructSet({ mountDev: this.data.mountDev, pid: Number(this.data.pid), protocol: this.data.protocol, DevMac: this.data.mac }, item);
        this.setData({
            _oprateStat: false
        });
        wx.hideLoading();
        if (ok === 4) {
            wx.showModal({
                title: '权限验证',
                content: '操作指令需要验证您的设备,是否通过短信开始验证？',
                success: (res) => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/util/smsValidation/smsValidation',
                            events: {
                                validationSuccess: () => {
                                    console.log('sms validation success');
                                    this.oprate({ detail: item });
                                }
                            }
                        });
                    }
                }
            });
        }
        else {
            wx.showModal({
                title: ok ? 'Success' : 'Error',
                content: msg
            });
        }
    },
    alarm(e) {
        const type = e.detail.type;
        wx.navigateTo({
            url: '/pages/index/alarmSetting/alarmSetting' + util_1.ObjectToStrquery({ type, protocol: this.data.protocol })
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV2cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw4Q0FBaUU7QUFDakUsNENBQW9DO0FBQ3BDLHdEQUFnRDtBQUNoRCxJQUFJLENBQUM7SUFNSCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsRUFBRTtRQUNQLEdBQUcsRUFBRSxFQUFFO1FBQ1AsUUFBUSxFQUFFLEVBQUU7UUFDWixNQUFNLEVBQUUsRUFBaUI7UUFDekIsTUFBTSxFQUFFLEVBQUU7UUFDVixRQUFRLEVBQUUsQ0FBQztRQUNYLFFBQVEsRUFBRSxFQUFFO1FBQ1osSUFBSSxFQUFFLEVBQUU7UUFDUixRQUFRLEVBQUUsRUFFVDtRQUNELE1BQU0sRUFBRSwrQ0FBK0M7UUFDdkQsRUFBRSxFQUFFO1lBQ0YsV0FBVyxFQUFFLENBQUM7WUFDZCxRQUFRLEVBQUUsQ0FBQztTQUNaO1FBQ0QsV0FBVyxFQUFFLEtBQUs7S0FDbkI7SUFLRCxNQUFNLEVBQUUsVUFBVSxPQUFxRjtRQUNyRyxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNYLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTTtZQUNuQixHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUc7WUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxRQUFRO1lBQzFCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtZQUMxQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUk7U0FDbkIsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUNELEtBQUssQ0FBQyxPQUFPO1FBQ1gsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ25DLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxN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QUFFLElBQUksRUFBRSxDQUFDLENBQUE7Z0NBQy9CLENBQUM7NkJBQ0Y7eUJBQ0YsQ0FBQyxDQUFBO3FCQUNIO2dCQUNILENBQUM7YUFDRixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsRUFBRSxDQUFDLFNBQVMsQ0FBQztnQkFDWCxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU87Z0JBQy9CLE9BQU8sRUFBRSxHQUFHO2FBQ2IsQ0FBQyxDQUFBO1NBQ0g7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLENBQVk7UUFDaEIsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFjLENBQUE7UUFDcEMsRUFBRSxDQUFDLFVBQVUsQ0FBQztZQUNaLEdBQUcsRUFBRSx3Q0FBd0MsR0FBRyx1QkFBZ0IsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUN6RyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbWluaXByb2dyYW0vcGFnZXMvaW5kZXgvZGV2cy9kZXZzLmpzXG5pbXBvcnQgeyBPYmplY3RUb1N0cnF1ZXJ5LCBwYXJzZVRpbWUgfSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdXRpbFwiXG5pbXBvcnQgYXBpIGZyb20gXCIuLi8uLi8uLi91dGlscy9hcGlcIlxuaW1wb3J0IHVuaXRDYWNoZSBmcm9tIFwiLi4vLi4vLi4vdXRpbHMvdW5pdENhY2hlXCJcblBhZ2Uoe1xuXG4gIC8qKlxuICAgKiDpobXpnaLnmoTliJ3lp4vmlbDmja5cbiAgICovXG5cbiAgZGF0YToge1xuICAgIG1hYzogJycsXG4gICAgcGlkOiAnJyxcbiAgICBtb3VudERldjogXCJcIixcbiAgICByZXN1bHQ6IHt9IGFzIHF1ZXJ5UmVzdWx0LFxuICAgIGZpbHRlcjogJycsXG4gICAgaW50ZXJ2YWw6IDAsXG4gICAgcHJvdG9jb2w6ICcnLFxuICAgIFR5cGU6ICcnLFxuICAgIENvbnN0YW50OiB7fSBhcyB7XG4gICAgICBzeXM6IFByb3RvY29sQ29uc3RhbnRUaHJlc2hvbGRcbiAgICB9LFxuICAgIHVwc1BpYzogJ2h0dHA6Ly93d3cubGFkaXNoYi5jb20vdXBsb2FkLzM0MjAyMV9fdXBzLmdpZicsXG4gICAgdGg6IHtcbiAgICAgIHRlbXBlcmF0dXJlOiAwLFxuICAgICAgaHVtaWRpdHk6IDAsXG4gICAgfSxcbiAgICBfb3ByYXRlU3RhdDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLliqDovb1cbiAgICovXG4gIG9uTG9hZDogZnVuY3Rpb24gKG9wdGlvbnM6IHsgbW91bnREZXY6IGFueTsgbWFjOiBhbnk7IERldk1hYzogYW55OyBwaWQ6IGFueTsgcHJvdG9jb2w6IGFueTsgVHlwZTogYW55IH0pIHtcbiAgICB3eC5zZXROYXZpZ2F0aW9uQmFyVGl0bGUoeyB0aXRsZTogb3B0aW9ucy5tb3VudERldiB8fCBvcHRpb25zLm1hYyB8fCAnJyB9KVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBtYWM6IG9wdGlvbnMuRGV2TWFjLFxuICAgICAgcGlkOiBvcHRpb25zLnBpZCxcbiAgICAgIHByb3RvY29sOiBvcHRpb25zLnByb3RvY29sLFxuICAgICAgbW91bnREZXY6IG9wdGlvbnMubW91bnREZXYsXG4gICAgICBUeXBlOiBvcHRpb25zLlR5cGVcbiAgICB9KVxuICB9LFxuICBhc3luYyBvblJlYWR5KCkge1xuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfojrflj5bov5DooYzmlbDmja4nIH0pXG4gICAgY29uc3QgeyBhcmcgfSA9IGF3YWl0IGFwaS5nZXRVc2VyRGV2Q29uc3RhbnQodGhpcy5kYXRhLnByb3RvY29sKVxuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBDb25zdGFudDogYXJnXG4gICAgfSlcbiAgICBhd2FpdCB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gIH0sXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouaYvuekulxuICAgKi9cbiAgb25TaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgLyogdGhpcy5zZXREYXRhKHtcbiAgICAgIGludGVydmFsOiBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLkdldERldnNSdW5JbmZvKCksIDUwMDApXG4gICAgfSkgKi9cbiAgfSxcblxuICAvKipcbiAgICog55Sf5ZG95ZGo5pyf5Ye95pWwLS3nm5HlkKzpobXpnaLpmpDol49cbiAgICovXG4gIG9uSGlkZTogZnVuY3Rpb24gKCkge1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kYXRhLmludGVydmFsKVxuICB9LFxuXG4gIC8qKlxuICAgKiDnlJ/lkb3lkajmnJ/lh73mlbAtLeebkeWQrOmhtemdouWNuOi9vVxuICAgKi9cbiAgb25VbmxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgfSxcblxuICAvKipcbiAgICog6aG16Z2i55u45YWz5LqL5Lu25aSE55CG5Ye95pWwLS3nm5HlkKznlKjmiLfkuIvmi4nliqjkvZxcbiAgICovXG4gIG9uUHVsbERvd25SZWZyZXNoOiBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgYXdhaXQgdGhpcy5HZXREZXZzUnVuSW5mbygpXG4gICAgd3guc3RvcFB1bGxEb3duUmVmcmVzaCgpXG4gIH0sXG4gIGFzeW5jIEdldERldnNSdW5JbmZvKCkge1xuICAgIGNvbnN0IHsgbWFjLCBwaWQsIGZpbHRlciB9ID0gdGhpcy5kYXRhXG4gICAgY29uc3QgeyBvaywgYXJnLCBtc2cgfSA9IGF3YWl0IGFwaS5nZXREZXZzUnVuSW5mbyhtYWMsIHBpZClcbiAgICBpZiAob2sgJiYgYXJnKSB7XG4gICAgICBjb25zdCByZWdTdHIgPSBuZXcgUmVnRXhwKGZpbHRlcilcbiAgICAgIGFyZy5yZXN1bHQgPSBhcmcucmVzdWx0LmZpbHRlcihlbCA9PiAhZmlsdGVyIHx8IHJlZ1N0ci50ZXN0KGVsLm5hbWUpKS5tYXAob2JqID0+IE9iamVjdC5hc3NpZ24ob2JqLCB1bml0Q2FjaGUuZ2V0KG9iai52YWx1ZSwgb2JqLnVuaXQgfHwgJycpKSlcbiAgICAgIGFyZy50aW1lID0gcGFyc2VUaW1lKGFyZy50aW1lKVxuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgcmVzdWx0OiBhcmcsXG4gICAgICAgIGludGVydmFsOiBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLkdldERldnNSdW5JbmZvKClcbiAgICAgICAgfSwgYXJnLkludGVydmFsIHx8IDUwMDApXG4gICAgICB9KVxuICAgICAgLy9cblxuICAgICAgc3dpdGNoICh0aGlzLmRhdGEuVHlwZSkge1xuICAgICAgICBjYXNlIFwiVVBTXCI6XG4gICAgICAgICAgY29uc3Qgd29ya01vZGUgPSBhcmcucmVzdWx0LmZpbmQoZWwgPT4gZWwubmFtZSA9PT0gdGhpcy5kYXRhLkNvbnN0YW50LnN5cy5Db25zdGFudC5Xb3JrTW9kZSk/LnZhbHVlIGFzIHN0cmluZ1xuICAgICAgICAgIHN3aXRjaCAod29ya01vZGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCLnlLXmsaDmqKHlvI9cIjpcbiAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICB1cHNQaWM6ICdodHRwOi8vd3d3LmxhZGlzaGIuY29tL3VwbG9hZC8zNDIwMjFfX3VwczEuZ2lmJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBcIuaXgei3r+aooeW8j1wiOlxuICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIHVwc1BpYzogJ2h0dHA6Ly93d3cubGFkaXNoYi5jb20vdXBsb2FkLzM0MjAyMV9fdXBzMi5naWYnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlIFwi5Zyo57q/5qih5byPXCI6XG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgdXBzUGljOiAnaHR0cDovL3d3dy5sYWRpc2hiLmNvbS91cGxvYWQvMzQyMDIxX191cHMzLmdpZidcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgdXBzUGljOiAnaHR0cDovL3d3dy5sYWRpc2hiLmNvbS91cGxvYWQvMzQyMDIxX191cHMuZ2lmJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBcIua4qea5v+W6plwiOlxuICAgICAgICAgIGNvbnN0IHsgVGVtcGVyYXR1cmUsIEh1bWlkaXR5IH0gPSB0aGlzLmRhdGEuQ29uc3RhbnQuc3lzLkNvbnN0YW50XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHRoOiB7XG4gICAgICAgICAgICAgIHRlbXBlcmF0dXJlOiBhcmcucmVzdWx0LmZpbmQoZWwgPT4gZWwubmFtZSA9PT0gVGVtcGVyYXR1cmUpPy52YWx1ZSxcbiAgICAgICAgICAgICAgaHVtaWRpdHk6IGFyZy5yZXN1bHQuZmluZChlbCA9PiBlbC5uYW1lID09PSBIdW1pZGl0eSk/LnZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgICAgIHd4LnNob3dNb2RhbCh7XG4gICAgICAgIHRpdGxlOiAnRXJyb3InLFxuICAgICAgICBjb250ZW50OiBtc2csXG4gICAgICAgIHN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuZGF0YS5pbnRlcnZhbClcbiAgICAgICAgICAvL3d4Lm5hdmlnYXRlQmFjaygpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDliLfpgInlj4LmlbBcbiAgZmlsdGVyKGU6IHZhbnRFdmVudCkge1xuICAgIGNvbnN0IGZpbHRlciA9IGUuZGV0YWlsLmZpbHRlclxuICAgIGNvbnN0IHJlZ1N0ciA9IG5ldyBSZWdFeHAoZmlsdGVyKVxuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuZGF0YS5yZXN1bHQucmVzdWx0Py5maWx0ZXIoZWwgPT4gcmVnU3RyLnRlc3QoZWwubmFtZSkpXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIGZpbHRlcixcbiAgICAgIFwicmVzdWx0LnJlc3VsdFwiOiByZXN1bHRcbiAgICB9KVxuICB9LFxuICAvLyDlr7zoiKrliLDlm77ooahcbiAgdG9saW5lKGU6IHZhbnRFdmVudCkge1xuICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgdXJsOiAnL3BhZ2VzL2luZGV4L2xpbmUvbGluZScgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgbmFtZTogZS5kZXRhaWwubmFtZSwgbWFjOiB0aGlzLmRhdGEubWFjLCBwaWQ6IHRoaXMuZGF0YS5waWQsIHByb3RvY29sOiB0aGlzLmRhdGEucHJvdG9jb2wgfSlcbiAgICB9KVxuICB9LFxuICAvLyDlj5HpgIHmk43kvZzmjIfku6RcbiAgYXN5bmMgb3ByYXRlKGU6IFBpY2s8dmFudEV2ZW50LCAnZGV0YWlsJz4pIHtcbiAgICBpZiAodGhpcy5kYXRhLl9vcHJhdGVTdGF0KSByZXR1cm5cbiAgICBjb25zdCBpdGVtOiBPcHJhdGVJbnN0cnVjdCA9IGUuZGV0YWlsXG4gICAgaWYgKGl0ZW0udmFsdWUuaW5jbHVkZXMoXCIlaVwiKSAmJiAhaXRlbS52YWwpIHtcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6ICcvcGFnZXMvdXRpbC9zZXRWYWwvc2V0VmFsJyArIE9iamVjdFRvU3RycXVlcnkoeyBpdGVtIH0pLFxuICAgICAgICBldmVudHM6IHtcbiAgICAgICAgICB2YWx1ZU9rOiAodmFsdWU6IHsgdmFsOiBudW1iZXIgfSkgPT4ge1xuICAgICAgICAgICAgaXRlbS52YWwgPSB2YWx1ZS52YWxcbiAgICAgICAgICAgIHRoaXMub3ByYXRlKHsgZGV0YWlsOiBpdGVtIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHd4LnNob3dMb2FkaW5nKHsgdGl0bGU6ICfmraPlnKjlj5HpgIEnIH0pXG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIF9vcHJhdGVTdGF0OiB0cnVlXG4gICAgfSlcbiAgICBjb25zdCB7IG9rLCBtc2cgfSA9IGF3YWl0IGFwaS5TZW5kUHJvY290b2xJbnN0cnVjdFNldCh7IG1vdW50RGV2OiB0aGlzLmRhdGEubW91bnREZXYsIHBpZDogTnVtYmVyKHRoaXMuZGF0YS5waWQpLCBwcm90b2NvbDogdGhpcy5kYXRhLnByb3RvY29sLCBEZXZNYWM6IHRoaXMuZGF0YS5tYWMgfSwgaXRlbSlcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgX29wcmF0ZVN0YXQ6IGZhbHNlXG4gICAgfSlcbiAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgLy8g5aaC5p6c6K6+5aSH5pyq6YCa6L+H5qCh6aqM77yM5YiZ6Lez6L2s5Yiw5qCh6aqM55+t5L+h6aqM6K+B56CB6aG16Z2iXG4gICAgaWYgKG9rID09PSA0KSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogJ+adg+mZkOmqjOivgScsXG4gICAgICAgIGNvbnRlbnQ6ICfmk43kvZzmjIfku6TpnIDopoHpqozor4HmgqjnmoTorr7lpIcs5piv5ZCm6YCa6L+H55+t5L+h5byA5aeL6aqM6K+B77yfJyxcbiAgICAgICAgc3VjY2VzczogKHJlcykgPT4ge1xuICAgICAgICAgIGlmIChyZXMuY29uZmlybSkge1xuICAgICAgICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICAgICAgICAgIHVybDogJy9wYWdlcy91dGlsL3Ntc1ZhbGlkYXRpb24vc21zVmFsaWRhdGlvbicsXG4gICAgICAgICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgICAgIHZhbGlkYXRpb25TdWNjZXNzOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc21zIHZhbGlkYXRpb24gc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5vcHJhdGUoeyBkZXRhaWw6IGl0ZW0gfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICB3eC5zaG93TW9kYWwoe1xuICAgICAgICB0aXRsZTogb2sgPyAnU3VjY2VzcycgOiAnRXJyb3InLFxuICAgICAgICBjb250ZW50OiBtc2dcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICAvLyDot7PovazlkYroraborr7nva5cbiAgYWxhcm0oZTogdmFudEV2ZW50KSB7XG4gICAgY29uc3QgdHlwZSA9IGUuZGV0YWlsLnR5cGUgYXMgc3RyaW5nXG4gICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6ICcvcGFnZXMvaW5kZXgvYWxhcm1TZXR0aW5nL2FsYXJtU2V0dGluZycgKyBPYmplY3RUb1N0cnF1ZXJ5KHsgdHlwZSwgcHJvdG9jb2w6IHRoaXMuZGF0YS5wcm90b2NvbCB9KVxuICAgIH0pXG4gIH1cbn0pIl19
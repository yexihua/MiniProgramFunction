"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_qqmapWxJssdk = require("../../utils/qqmap-wx-jssdk.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u_collapse_item2 = common_vendor.resolveComponent("u-collapse-item");
  const _easycom_u_collapse2 = common_vendor.resolveComponent("u-collapse");
  (_easycom_up_input2 + _easycom_up_button2 + _easycom_u_collapse_item2 + _easycom_u_collapse2)();
}
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_collapse_item = () => "../../node-modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_u_collapse = () => "../../node-modules/uview-plus/components/u-collapse/u-collapse.js";
if (!Math) {
  (_easycom_up_input + _easycom_up_button + _easycom_u_collapse_item + _easycom_u_collapse)();
}
const _sfc_main = {
  __name: "map",
  setup(__props) {
    const explain = [{
      title: "地图说明",
      content: [
        "需开通腾讯位置服务",
        "默认驾车（步行、自行车、驾车、公交）、耗时最短路线（路程最短、耗时最短、收费最少）"
      ]
    }, {
      title: "初始化地图",
      content: [
        "1.使用map组件进行展示地图",
        "2.uni.getLocation()获取用户当前位置的经纬度等信息",
        "3.使用腾讯位置服务的接口reverseGeocoder()进行逆地址解析(获取用户当前地址名)"
      ]
    }, {
      title: "地点搜索",
      content: [
        "1.通过腾讯接口getSuggestion(),获取符合条件的地址信息数据",
        "2.调整map组件的markers与经纬度属性，实现地图标点与定位"
      ]
    }, {
      title: "路线规划",
      content: [
        "1.根据起点与终点地址信息(经纬度等)，调用腾讯接口direction()获取路线规划信息",
        "2.根据路线信息调整map组件polyline的属性，实现路线绘制"
      ]
    }];
    const position = common_vendor.reactive({
      longitude: "",
      latitude: "",
      //地图经纬度
      address: "",
      //本地位置描述
      localLongitude: "",
      localLatitude: "",
      //初始经纬度
      markers: [],
      //标点
      polyline: [],
      //路线
      scale: 16
    });
    const search = common_vendor.reactive({
      position: 1,
      //搜索弹出层
      value: "",
      //起始点
      value1: "",
      //终点
      markers: [],
      distance: "",
      //距离
      time: ""
      //耗时
    });
    var qqmapsdk = new utils_qqmapWxJssdk.QQMapWX({
      key: "H7MBZ-EYIC7-2LAX7-HB6J4-DI5NF-7CFSS"
      // 必填
    });
    common_vendor.watch(() => [search.value, search.value1], ([newValue, oldValue], [newValue1, oldValue1]) => {
      if (newValue == "" || newValue1 == "") {
        search.markers = [];
      }
    });
    const navigation = () => {
      if (!search.value || !search.value1 || search.value != position.markers[1].title || search.value1 != position.markers[2].title) {
        return common_vendor.index.showToast({
          title: "起点或终点有误，请重新搜索",
          icon: "none"
        });
      }
      qqmapsdk.direction({
        from: {
          latitude: position.markers[1].latitude,
          longitude: position.markers[1].longitude
        },
        to: {
          latitude: position.markers[2].latitude,
          longitude: position.markers[2].longitude
        },
        policy: "LEAST_TIME",
        success: (res, data) => {
          console.log(res, data);
          let distance = data[0].distance / 100;
          if (distance > 500) {
            position.scale = 7;
          } else if (distance > 200) {
            position.scale = 10;
          } else if (distance > 100) {
            position.scale = 12;
          } else {
            position.scale = 15;
          }
          let ret = res;
          let coors = ret.result.routes[0].polyline, pl = [];
          let kr = 1e6;
          for (let i = 2; i < coors.length; i++) {
            coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
          }
          for (let i = 0; i < coors.length; i += 2) {
            pl.push({ latitude: coors[i], longitude: coors[i + 1] });
          }
          position.polyline = [{
            points: pl,
            color: "#4cd964",
            width: 4
          }];
          search.distance = ret.result.routes[0].distance / 1e3 + "公里";
          search.time = ret.result.routes[0].duration + "分钟";
        }
      });
    };
    const start = () => {
      const mapCtx = common_vendor.index.createMapContext("myMap");
      mapCtx.moveToLocation({
        latitude: position.localLatitude,
        longitude: position.localLongitude,
        success: () => {
          position.longitude = position.localLongitude;
          position.latitude = position.localLatitude;
        }
      });
    };
    const clickTitle = (item) => {
      if (position.polyline.length) {
        position.polyline = [];
      }
      if (search.position == 1) {
        search.value = item.title;
      } else {
        search.value1 = item.title;
      }
      position.longitude = item.longitude;
      position.latitude = item.latitude;
      search.markers = [];
      position.markers[search.position] = {
        title: item.title,
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        width: 20,
        height: 30,
        allow: true
        //可导航
      };
    };
    const startSearch = (e) => {
      if (e == 1 && !search.value) {
        return common_vendor.index.showToast({
          title: "请输入起始点位置",
          icon: "none"
        });
      }
      if (e == 2 && !search.value1) {
        return common_vendor.index.showToast({
          title: "请输入终点位置",
          icon: "none"
        });
      }
      qqmapsdk.getSuggestion({
        keyword: e == 1 ? search.value : search.value1,
        location: `${position.localLatitude},${position.localLongitude}`,
        success: (res, data) => {
          let mks = [];
          for (let i = 0; i < res.data.length; i++) {
            mks.push({
              // 获取返回结果，放到mks数组中
              title: res.data[i].title,
              content: res.data[i].address,
              id: res.data[i].id,
              latitude: res.data[i].location.lat,
              longitude: res.data[i].location.lng,
              // iconPath: "/resources/my_marker.png", //图标路径
              width: 20,
              height: 20
            });
          }
          search.markers = mks;
          search.position = e;
          console.log(search.markers, res, "res");
        }
      });
    };
    common_vendor.onMounted(() => {
      common_vendor.index.getLocation({
        type: "gcj02",
        // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
        isHighAccuracy: true,
        //开启高精度定位
        success: (res) => {
          position.latitude = position.localLatitude = res.latitude;
          position.longitude = position.localLongitude = res.longitude;
          position.markers.push({
            latitude: res.latitude,
            longitude: res.longitude,
            id: 0,
            width: 20,
            height: 30
          });
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            success: (data) => {
              console.log("当前地址信息：", data);
              position.markers[0].title = position.address = search.value = data.result.address;
            },
            fail: (error) => {
              console.error("err:", error);
            }
          });
        },
        fail: (res) => {
          common_vendor.index.showModal({
            title: "温馨提示",
            content: "请进行位置授权后再进入该页面",
            showCancel: false
          });
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => search.value = $event),
        b: common_vendor.p({
          placeholder: "起点",
          prefixIcon: "search",
          suffixIconStyle: "color: #909399",
          modelValue: search.value
        }),
        c: common_vendor.o(($event) => startSearch(1)),
        d: common_vendor.o(($event) => search.value1 = $event),
        e: common_vendor.p({
          placeholder: "终点",
          prefixIcon: "search",
          suffixIconStyle: "color: #909399",
          modelValue: search.value1
        }),
        f: common_vendor.o(($event) => startSearch(2)),
        g: common_vendor.o(navigation),
        h: common_vendor.f(search.markers, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.content),
            c: item,
            d: common_vendor.o(($event) => clickTitle(item), item)
          };
        }),
        i: search.position * 72 + "rpx",
        j: search.markers.length,
        k: common_vendor.o(start),
        l: common_vendor.p({
          type: "primary"
        }),
        m: common_vendor.t(search.distance),
        n: common_vendor.t(search.time),
        o: position.polyline.length,
        p: position.longitude,
        q: position.latitude,
        r: position.scale,
        s: position.polyline,
        t: position.markers,
        v: common_vendor.f(explain, (i, index, i0) => {
          return {
            a: common_vendor.f(i.content, (k, k1, i1) => {
              return {
                a: common_vendor.t(k),
                b: k
              };
            }),
            b: "e06b858f-4-" + i0 + "," + ("e06b858f-3-" + i0),
            c: common_vendor.p({
              title: i.title
            }),
            d: "e06b858f-3-" + i0,
            e: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e06b858f"], ["__file", "D:/项目/小程序试验/pages/map/map.vue"]]);
wx.createPage(MiniProgramPage);

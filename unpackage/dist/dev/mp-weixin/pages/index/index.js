"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const allPage = [{
      title: "地图",
      url: "../map/map"
    }, {
      title: "全景漫游",
      url: "../firstCarema/firstCarema"
    }, {
      title: "支付",
      url: "../payment/payment"
    }];
    const jump = (e) => {
      common_vendor.wx$1.navigateTo({
        url: e
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(allPage, (i, k0, i0) => {
          return {
            a: common_vendor.t(i.title),
            b: i.title,
            c: common_vendor.o(($event) => jump(i.url), i.title)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/项目/小程序试验/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);

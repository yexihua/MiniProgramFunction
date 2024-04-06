"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_u_collapse_item2 = common_vendor.resolveComponent("u-collapse-item");
  const _easycom_u_collapse2 = common_vendor.resolveComponent("u-collapse");
  (_easycom_u_collapse_item2 + _easycom_u_collapse2)();
}
const _easycom_u_collapse_item = () => "../../node-modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_u_collapse = () => "../../node-modules/uview-plus/components/u-collapse/u-collapse.js";
if (!Math) {
  (_easycom_u_collapse_item + _easycom_u_collapse)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      title: "支付说明"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/项目/小程序试验/pages/payment/payment.vue"]]);
wx.createPage(MiniProgramPage);

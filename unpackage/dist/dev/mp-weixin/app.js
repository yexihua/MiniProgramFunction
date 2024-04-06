"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/map/map.js";
  "./pages/payment/payment.js";
  "./pages/firstCarema/firstCarema.js";
  "./pages/login/login.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/项目/小程序试验/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.uviewPlus);
  app.use(common_vendor.TroisJSVuePlugin);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;

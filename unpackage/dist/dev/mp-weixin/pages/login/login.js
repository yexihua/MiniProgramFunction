"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_u_collapse_item2 = common_vendor.resolveComponent("u-collapse-item");
  const _easycom_u_collapse2 = common_vendor.resolveComponent("u-collapse");
  (_easycom_up_avatar2 + _easycom_u_collapse_item2 + _easycom_u_collapse2)();
}
const _easycom_up_avatar = () => "../../node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_u_collapse_item = () => "../../node-modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_u_collapse = () => "../../node-modules/uview-plus/components/u-collapse/u-collapse.js";
if (!Math) {
  (_easycom_up_avatar + _easycom_u_collapse_item + _easycom_u_collapse)();
}
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const hasLogin = common_vendor.ref(false);
    const useinfo = common_vendor.reactive({
      name: "登录",
      imgUrl: ""
    });
    const login = () => {
      if (!hasLogin.value) {
        common_vendor.index.showModal({
          title: "温馨提示",
          content: "亲，授权微信登录后才能正常使用小程序功能",
          success(res) {
            if (res.confirm) {
              hasLogin.value = !hasLogin.value;
              common_vendor.index.getUserProfile({
                desc: "注册用户信息使用",
                lang: "zh_CN",
                success: (res2) => {
                  useinfo.name = res2.userInfo.nickName;
                  useinfo.imgUrl = res2.userInfo.avatarUrl;
                  console.log("useinfo", res2);
                  common_vendor.index.login({
                    provider: "weixin",
                    success: function(loginRes) {
                      console.log("code", loginRes);
                    }
                  });
                }
              });
            } else {
              common_vendor.index.showToast({
                title: "您取消了授权",
                duration: 2e3,
                icon: "error"
              });
            }
          }
        });
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "是否退出?",
          success: (res) => {
            if (res.confirm) {
              hasLogin.value = !hasLogin.value;
              useinfo.name = "登录", useinfo.imgUrl = "";
            } else {
              return;
            }
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: useinfo.imgUrl
        }),
        b: common_vendor.t(useinfo.name),
        c: common_vendor.o(login),
        d: common_vendor.p({
          title: "登录说明"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/项目/小程序试验/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);

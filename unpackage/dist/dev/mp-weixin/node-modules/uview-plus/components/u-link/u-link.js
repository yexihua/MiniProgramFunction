"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-link",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$11],
  computed: {
    linkStyle() {
      const style = {
        color: this.color,
        fontSize: common_vendor.index.$u.addUnit(this.fontSize),
        // line-height设置为比字体大小多2px
        lineHeight: common_vendor.index.$u.addUnit(common_vendor.index.$u.getPx(this.fontSize) + 2),
        textDecoration: this.underLine ? "underline" : "none"
      };
      return style;
    }
  },
  emits: ["click"],
  methods: {
    openLink() {
      common_vendor.index.setClipboardData({
        data: this.href,
        success: () => {
          common_vendor.index.hideToast();
          this.$nextTick(() => {
            common_vendor.index.$u.toast(this.mpTips);
          });
        }
      });
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t(_ctx.text),
    b: common_vendor.o((...args) => $options.openLink && $options.openLink(...args)),
    c: common_vendor.s($options.linkStyle),
    d: common_vendor.s(_ctx.$u.addStyle(_ctx.customStyle))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dedad317"], ["__file", "D:/项目/小程序试验/node_modules/uview-plus/components/u-link/u-link.vue"]]);
wx.createComponent(Component);

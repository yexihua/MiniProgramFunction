"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-collapse",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$3],
  watch: {
    needInit() {
      this.init();
    },
    // 当父组件需要子组件需要共享的参数发生了变化，手动通知子组件
    parentData() {
      if (this.children.length) {
        this.children.map((child) => {
          typeof child.updateParentData === "function" && child.updateParentData();
        });
      }
    }
  },
  created() {
    this.children = [];
  },
  computed: {
    needInit() {
      return [this.accordion, this.value];
    }
  },
  emits: ["open", "close", "change"],
  methods: {
    // 重新初始化一次内部的所有子元素
    init() {
      this.children.map((child) => {
        child.init();
      });
    },
    /**
     * collapse-item被点击时触发，由collapse统一处理各子组件的状态
     * @param {Object} target 被操作的面板的实例
     */
    onChange(target) {
      let changeArr = [];
      this.children.map((child, index) => {
        if (this.accordion) {
          child.expanded = child === target ? !target.expanded : false;
          child.setContentAnimate();
        } else {
          if (child === target) {
            child.expanded = !child.expanded;
            child.setContentAnimate();
          }
        }
        changeArr.push({
          // 如果没有定义name属性，则默认返回组件的index索引
          name: child.name || index,
          status: child.expanded ? "open" : "close"
        });
      });
      this.$emit("change", changeArr);
      this.$emit(target.expanded ? "open" : "close", target.name);
    }
  }
};
if (!Array) {
  const _easycom_u_line2 = common_vendor.resolveComponent("u-line");
  _easycom_u_line2();
}
const _easycom_u_line = () => "../u-line/u-line.js";
if (!Math) {
  _easycom_u_line();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.border
  }, _ctx.border ? {} : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1935688"], ["__file", "D:/项目/小程序试验/node_modules/uview-plus/components/u-collapse/u-collapse.vue"]]);
wx.createComponent(Component);

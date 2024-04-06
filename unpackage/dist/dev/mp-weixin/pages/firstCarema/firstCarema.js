"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_controls = require("../../utils/controls.js");
if (!Array) {
  const _easycom_u_upload2 = common_vendor.resolveComponent("u-upload");
  const _easycom_u_collapse_item2 = common_vendor.resolveComponent("u-collapse-item");
  const _easycom_u_collapse2 = common_vendor.resolveComponent("u-collapse");
  (_easycom_u_upload2 + _easycom_u_collapse_item2 + _easycom_u_collapse2)();
}
const _easycom_u_upload = () => "../../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_u_collapse_item = () => "../../node-modules/uview-plus/components/u-collapse-item/u-collapse-item.js";
const _easycom_u_collapse = () => "../../node-modules/uview-plus/components/u-collapse/u-collapse.js";
if (!Math) {
  (_easycom_u_upload + _easycom_u_collapse_item + _easycom_u_collapse)();
}
const _sfc_main = {
  __name: "firstCarema",
  setup(__props) {
    let Three, canvas, geometry, sqhere, camera, scene, renderer, controls;
    const fileList1 = common_vendor.ref([]);
    const deletePic = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const afterRead = async (event) => {
      fileList1.value.push({
        ...event.file
      });
      console.log(event.file, event.file.url);
      const hallTexture = new Three.TextureLoader().load(`${event.file.url}`);
      const material = new Three.MeshBasicMaterial({ map: hallTexture, opacity: 1, transparent: true });
      sqhere.material = material;
      animate();
    };
    const instance = common_vendor.getCurrentInstance();
    const animate = () => {
      renderer.render(scene, camera);
      canvas.requestAnimationFrame(animate);
      controls.update();
    };
    const touchMove = (e) => {
      controls.onTouchMove(e);
    };
    const touchEnd = (e) => {
      controls.onTouchEnd(e);
    };
    const touchStart = (e) => {
      controls.onTouchStart(e);
    };
    common_vendor.onMounted(() => {
      common_vendor.index.createSelectorQuery().in(instance).select("#webgl").fields({ node: true }).exec((res) => {
        canvas = res[0].node;
        Three = common_vendor.dist.createScopedThreejs(canvas);
        scene = new Three.Scene();
        camera = new Three.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1e3);
        renderer = new Three.WebGLRenderer();
        renderer.setSize(canvas.width, canvas.height);
        renderer.setPixelRatio(common_vendor.index.getSystemInfoSync().pixelRatio);
        geometry = new Three.SphereGeometry(16, 128, 128);
        geometry.scale(1, 1, -1);
        camera.position.z = 0.1;
        sqhere = new Three.Mesh(geometry);
        sqhere.rotation.y = Math.PI / 2;
        scene.add(sqhere);
        const orbits = utils_controls.registerOrbit(Three);
        controls = new orbits.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(afterRead),
        b: common_vendor.o(deletePic),
        c: common_vendor.p({
          fileList: fileList1.value,
          name: "1",
          maxCount: 1,
          width: "100",
          height: "100",
          uploadIcon: "plus"
        }),
        d: fileList1.value[0],
        e: common_vendor.o(touchStart),
        f: common_vendor.o(touchMove),
        g: common_vendor.o(touchEnd),
        h: common_vendor.p({
          title: "全景预览说明"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-50405faa"], ["__file", "D:/项目/小程序试验/pages/firstCarema/firstCarema.vue"]]);
wx.createPage(MiniProgramPage);

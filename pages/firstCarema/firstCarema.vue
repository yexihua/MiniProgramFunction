<template>
	<u-upload
		:fileList="fileList1"
		name="1"
		:maxCount="1"
		@afterRead="afterRead"
		@delete="deletePic"
		width="100"
		height="100"
		uploadIcon='plus'
	>
	</u-upload>
	<canvas id="webgl" type='webgl' v-show="fileList1[0]" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"></canvas>
	<u-collapse>
		<u-collapse-item title="全景预览说明">
			<text class="u-collapse-content">上传全景图片，即可生成第一人称vr视角全景预览</text>
			<text class="u-collapse-content">1.下载threejs-miniprogram解决three.js在小程序的兼容问题</text>
			<text class="u-collapse-content">2.新建场景scene、渲染器renderer、摄像机camera；即"世界"、"可视区域"、"眼睛"</text>
			<text class="u-collapse-content">3.场景scene添加球形网格对象/正方形网格对象，并为其表面附上贴图（全景图）</text>
			<text class="u-collapse-content">4.将摄像机camera置于对象中心，同时翻转网格对象贴图使其对内</text>
			<text class="u-collapse-content">5.设置控制器controls，使之能触屏滑动来实现视角变动</text>
		</u-collapse-item>
	</u-collapse>
</template>

<script setup>
import { onMounted, ref,getCurrentInstance  } from 'vue';
import { createScopedThreejs } from 'threejs-miniprogram'
import registerOrbit from '@/utils/controls.js';

let Three,canvas,geometry,sqhere,camera,scene,renderer,controls;
const fileList1 = ref([]);
// 删除图片
const deletePic = (event) => {
  fileList1.value.splice(event.index, 1);
};
// 新增图片
const afterRead = async (event) => {
    fileList1.value.push({
      ...event.file,
    });
	console.log(event.file,event.file.url)
	const hallTexture = new Three.TextureLoader().load(`${event.file.url}`);
	const material = new Three.MeshBasicMaterial({ map: hallTexture, opacity: 1, transparent: true });//设置对象材质
	sqhere.material = material;
	animate()
};

const instance = getCurrentInstance(); // 获取组件实例
const animate=()=> {
	//小程序没有window.requestAnimationFrame
	renderer.render(scene, camera);
	canvas.requestAnimationFrame(animate);
	controls.update();
}
const touchMove=(e)=>{
	controls.onTouchMove(e);
}
const touchEnd=(e)=>{
	controls.onTouchEnd(e);
}
const touchStart=(e)=>{
	controls.onTouchStart(e);
}
onMounted(()=>{
	uni.createSelectorQuery().in(instance).select('#webgl')
	.fields({ node: true }).exec(res => {
		canvas=res[0].node
		Three = createScopedThreejs(canvas)
		scene = new Three.Scene();//创建大厅场景
		camera = new Three.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
	    renderer = new Three.WebGLRenderer();//创建渲染器
		renderer.setSize(canvas.width, canvas.height);//设置渲染大小
		renderer.setPixelRatio(uni.getSystemInfoSync().pixelRatio);//设备像素比适配
		geometry = new Three.SphereGeometry(16, 128, 128)//设置圆半径，长宽分段数
		geometry.scale(1, 1, -1)
		camera.position.z = 0.1;//避免摄像机摄像不到设置点距离
		sqhere = new Three.Mesh(geometry);//设置网格对象
		sqhere.rotation.y = Math.PI / 2;//旋转90度
		scene.add(sqhere);//场景添加物品，默认添加位置（0,0,0）
		const orbits = registerOrbit(Three);
		controls = new orbits.OrbitControls(camera, renderer.domElement);//设置控制器，鼠标拖拽可使相机围绕目标进行运动
		controls.enableDamping = true//开启旋转阻力
	});
})
</script>

<style scoped>
#webgl{
	width: 100%;
	height: 650rpx;
}
</style>
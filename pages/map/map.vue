<template>
	<div class="search">
		<up-input
		    placeholder="起点"
		    prefixIcon="search"
		    suffixIconStyle="color: #909399"
			v-model="search.value"
		></up-input>
		<button @click="startSearch(1)" class="button">搜索</button>
	</div>
	<div class="search">
		<up-input
		    placeholder="终点"
		    prefixIcon="search"
		    suffixIconStyle="color: #909399"
			v-model="search.value1"
		></up-input>
		<button @click="startSearch(2)" class="button">搜索</button>
		<button @click="navigation" class="button">路线</button>
	</div>
	
	<view class="showBox" :style="{top:search.position*72+'rpx'}" v-show="search.markers.length">
		<view class="item" v-for="item in search.markers" :key='item' @click="clickTitle(item)">
			<div>{{item.title}}</div>
			<div class="content">{{item.content}}</div>
		</view>
	</view>

	<map 
	id="myMap"
	ref="myMap"
	:longitude="position.longitude"
	:latitude="position.latitude" 
	:scale="position.scale"
	:polyline="position.polyline"
	show-location
	:markers='position.markers'
	style="width: 100%; height: 70vh;"
	> 
	<div class="start">
		<up-button type="primary" @click="start" >返回原点</up-button>
	</div>
	<div class="message" v-show="position.polyline.length">
		<div>距离:{{search.distance}}</div>
		<div>预计耗时:{{search.time}}</div>
	</div>
	</map>
   
  <template v-for="(i,index) in explain" :key="index">
  	<u-collapse>
  		<u-collapse-item :title="i.title">
			<text class="u-collapse-content" v-for="k in i.content" :key="k">{{k}}</text>
  		</u-collapse-item>
  	</u-collapse>
  </template>
  <!-- <template>
  	<u-collapse>
  		<u-collapse-item title="初始化地图">
  			<text class="u-collapse-content">1.使用map组件展示地图</text>
  			<text class="u-collapse-content">2.uni.getLocation()获取用户当前位置的经纬度等信息</text>
  			<text class="u-collapse-content">3.使用腾讯位置服务reverseGeocoder()进行</text>
  		</u-collapse-item>
  	</u-collapse>
  </template> -->
</template>

<script setup>
import { onMounted, reactive,ref,watch } from 'vue';
import QQMapWX from '../../utils/qqmap-wx-jssdk'
const explain=[{
	title:'地图说明',
	content:[
		'需开通腾讯位置服务',
		'默认驾车（步行、自行车、驾车、公交）、耗时最短路线（路程最短、耗时最短、收费最少）'
	]
},{
	title:'初始化地图',
	content:[
		'1.使用map组件进行展示地图',
		'2.uni.getLocation()获取用户当前位置的经纬度等信息',
		'3.使用腾讯位置服务的接口reverseGeocoder()进行逆地址解析(获取用户当前地址名)'
	]
},{
	title:'地点搜索',
	content:[
		'1.通过腾讯接口getSuggestion(),获取符合条件的地址信息数据',
		'2.调整map组件的markers与经纬度属性，实现地图标点与定位',
	]
},{
	title:'路线规划',
	content:[
		'1.根据起点与终点地址信息(经纬度等)，调用腾讯接口direction()获取路线规划信息',
		'2.根据路线信息调整map组件polyline的属性，实现路线绘制',
	]
}]
const position=reactive({
	longitude:'',
	latitude:'',//地图经纬度
	address:"",//本地位置描述
	localLongitude:'',
	localLatitude:'',//初始经纬度
	markers:[],//标点
	polyline:[],//路线
	scale:16,
})
const search=reactive({
	position:1,//搜索弹出层
	value:'',//起始点
	value1:'',//终点
	markers:[],
	distance:'',//距离
	time:'',//耗时
},)
var qqmapsdk = new QQMapWX({
	key: 'H7MBZ-EYIC7-2LAX7-HB6J4-DI5NF-7CFSS' // 必填
});
watch(()=>[search.value,search.value1],([newValue,oldValue],[newValue1,oldValue1])=>{//若搜索数据为空则清空选择列表
	if(newValue==''||newValue1==''){
		search.markers=[]
	}
})
const navigation=()=>{//路线
	if(!search.value||!search.value1||search.value!=position.markers[1].title||search.value1!=position.markers[2].title){
		return uni.showToast({
			title:'起点或终点有误，请重新搜索',
			icon:'none'
		})
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
		policy: 'LEAST_TIME',
		success:(res,data)=>{
			console.log(res,data)
			let distance = data[0].distance/100;
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
			//坐标解压（返回的点串坐标，通过前向差分进行压缩）
			let kr = 1000000;
			for (let i = 2; i < coors.length; i++) {
			  coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
			}
			//将解压后的坐标放入点串数组pl中
			for (let i = 0; i < coors.length; i += 2) {
			  pl.push({ latitude: coors[i], longitude: coors[i + 1] })
			}
			position.polyline=[{
				points: pl,
				color: '#4cd964',
				width: 4
			}]
			search.distance=ret.result.routes[0].distance/1000+'公里'
			search.time=ret.result.routes[0].duration+'分钟'
		}
	})
}
const start=()=>{//返回远点
    const mapCtx = uni.createMapContext("myMap");//创建地图上下文(地图实例)
	mapCtx.moveToLocation({
	  latitude: position.localLatitude,
	  longitude: position.localLongitude,
	  success: () => {
		  position.longitude=position.localLongitude
		  position.latitude=position.localLatitude
	  }
	})
}
const clickTitle=(item)=>{//下拉选择框选择
   if(position.polyline.length){//清空路线
		position.polyline=[]
	}
	if(search.position==1){
		search.value = item.title
	}else{
		search.value1 = item.title
	}
	position.longitude=item.longitude
	position.latitude=item.latitude
	search.markers=[]
	position.markers[search.position]={
		title: item.title,
		id: item.id,
		latitude: item.latitude,
		longitude: item.longitude,
		width: 20,
		height: 30,
		allow:true,//可导航
	}
}
const startSearch=(e)=>{//因接口调用次数有限，故地点搜索不使用快查模式，而通过按钮触发
	if(e==1&&!search.value){
		return uni.showToast({
			title:'请输入起始点位置',
			icon:'none'
		})
	}
	if(e==2&&!search.value1){
		return uni.showToast({
			title:'请输入终点位置',
			icon:'none'
		})
	}
	// qqmapsdk.search({
	// })
	qqmapsdk.getSuggestion({
		keyword:e==1?search.value:search.value1,
		location:`${position.localLatitude},${position.localLongitude}`,
		success:(res,data)=>{
			let mks = []
				for (let i = 0; i < res.data.length; i++) {
					mks.push({ // 获取返回结果，放到mks数组中
						title: res.data[i].title,
						content:res.data[i].address,
						id: res.data[i].id,
						latitude: res.data[i].location.lat,
						longitude: res.data[i].location.lng,
						// iconPath: "/resources/my_marker.png", //图标路径
						width: 20,
						height: 20
					})
				}
				search.markers=mks
				search.position=e
				console.log(search.markers,res,'res')
		},
	})
}
onMounted(()=>{
	uni.getLocation({
		  type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
		  isHighAccuracy: true, //开启高精度定位
		  success: (res) => {
			  position.latitude=position.localLatitude=res.latitude
			  position.longitude=position.localLongitude=res.longitude//获取用户当前经纬度
			  position.markers.push({
				  latitude:res.latitude,
				  longitude:res.longitude,
				  id:0,
				  width: 20,
				  height: 30,
			  })
			  qqmapsdk.reverseGeocoder({
				location: {
				  latitude: res.latitude,
				  longitude: res.longitude
				},
				success: (data) => {
				  console.log("当前地址信息：", data);
				  // 存储 详细地址 
					 position.markers[0].title=position.address=search.value=data.result.address 
				},
				fail: (error) => {
				  console.error("err:", error)
				},
			  })
		  },
		  fail:(res)=>{
			  uni.showModal({
			  	title: '温馨提示',
			  	content: '请进行位置授权后再进入该页面',
				showCancel:false,
			  })
		  }
		})
})
	
</script>

<style scoped lang="less">
.search{
	display: flex;
	height: 72rpx;
}
.button{
	display: flex;
	justify-content: center;
	align-items: center;
}
.showBox {
	position: absolute;
	top: 72rpx;
	z-index: 11;
	width: 100%;
	background-color: rgba(255, 255, 255, .8);
	font-size: 30rpx;
	height: 350rpx;
	overflow: scroll;

	.item {
		border-bottom: 1px solid  rgba(157, 157, 157, .6);
		padding: 5rpx 15rpx;
	}
}
.start{
	position: absolute;
	right: 20rpx;
	top: 30rpx;
	width: 100px;
	height: 50px;
}
.content{
	font-size: 20rpx;
	color: #999;
}
.message{
	position: absolute;
	left: 25rpx;
	bottom: 30px;
	background-color: rgba(255, 255, 255, .8);
	font-size: 30rpx;
	padding: 10rpx;
}
</style>



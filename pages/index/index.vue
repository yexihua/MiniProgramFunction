<template>
	<button v-for="i in allPage" :key="i.title" @click="jump(i.url)">{{i.title}}</button>
</template>

<script setup>
const allPage=[{
	title:'地图',
	url:'../map/map'
},{
	title:'全景漫游',
	url:'../firstCarema/firstCarema'
},{
	title:'支付',
	url:'../payment/payment'
}]
const jump=(e)=>{
	wx.navigateTo({
		url:e
	})
}
</script>

<style>
	
</style>

<template>
	<div class="page">
		<div>
			<up-avatar :src="useinfo.imgUrl"></up-avatar>
			<div class="login" @click="login">{{useinfo.name}}</div>
		</div>
	</div>
	<template>
		<u-collapse>
			<u-collapse-item title="登录说明">
				<text class="u-collapse-content">1.uni.getUserProfile()获取用户信息。</text>
				<text class="u-collapse-content">2.uni.login()获取临时code。</text>
				<text class="u-collapse-content">3.发请求将code传给后端获取token。</text>
				<text class="u-collapse-content">4.将token通过wx.setStorageSync()保存在本地存储。</text>
				<text class="u-collapse-content">5.后续进入页面会先通过wx.getStorageSync() 方法判断token是否有值，若无则进行登录操作。</text>
			</u-collapse-item>
		</u-collapse>
	</template>
</template>

<script setup>
	import {
		reactive,
		ref
	} from "vue"
	const hasLogin = ref(false)
	const useinfo = reactive({
		name: '登录',
		imgUrl: ''
	})
	const login = () => {
		if (!hasLogin.value) { //是否登录
			uni.showModal({
				title: '温馨提示',
				content: '亲，授权微信登录后才能正常使用小程序功能',
				success(res) {
					if (res.confirm) {
						hasLogin.value = !hasLogin.value
						uni.getUserProfile({
							desc: "注册用户信息使用",
							lang: "zh_CN",
							success: (res) => {
								useinfo.name = res.userInfo.nickName
								useinfo.imgUrl = res.userInfo.avatarUrl
								console.log('useinfo', res)
								uni.login({
									provider: 'weixin',
									success: function(loginRes) {
										console.log('code', loginRes);
										// 在这个地方普通开发中就应该去调用后端给的api进行登录操作了
										// 现在这个地方我们需要换成云函数进行相关操作
									}
								});
							}
						})
					} else {
						uni.showToast({
							title: '您取消了授权',
							duration: 2000,
							icon: 'error'
						});
					}
				}
			})
		} else {
			uni.showModal({
				title: "提示",
				content: '是否退出?',
				success: (res) => {
					if (res.confirm) {
						hasLogin.value = !hasLogin.value
						useinfo.name = '登录',
							useinfo.imgUrl = ''
					} else {
						return
					}
				}
			})
		}
	}
</script>

<style scoped>
	.page {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100vh;
		flex-wrap: wrap;
	}

	.login {
		text-align: center;
		margin: 10rpx;
	}
</style>
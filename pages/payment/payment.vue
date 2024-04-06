<template>
	<template>
		<u-collapse>
			<u-collapse-item title="支付说明">
				<text class="u-collapse-content">1.uni.login()获取临时code，发请求传code给后端获得唯一标识openid与密钥sessionKey</text>
				<text class="u-collapse-content">2.将openid、sessionKey和其他订单信息（商品id、单价等）发请求给后端获得预支付订单信息</text>
				<text class="u-collapse-content">3.根据返回的预支付订单信息，发起微信支付uni.requestPayment()</text>
				<text class="u-collapse-content">4.根据支付结果（点击微信支付成功页面的‘完成’按钮）返回支付成功/支付失败页面</text>
			</u-collapse-item>
		</u-collapse>
	</template>
</template>

<script setup>
	
</script>

<style scoped>
	
</style>
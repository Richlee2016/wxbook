<template>
	<view class="c-book-more">
		<view class="btn" v-for="(btn,i) in btns" :key="i" @click="MoreGo(btn,i+1)">{{btn.name}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			btns: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {
			MoreGo(btn, i) {
				if (btn.url) {
					uni.navigateTo({
						url: btn.url
					})
				} else if (btn.onOk) {
					btn.onOk(btn, i)
				}
				this.$emit('onBtn', {
					opt:btn,
					type: i
				})
			}
		}
	}
</script>

<style lang="less">
	.c-book-more {
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		font-size: 30upx;
		display: flex;
		border-top: 1upx solid #f0f0f0;

		.btn {
			flex: 1;
			background: white;
			font-size: 24upx;
		}
	}
</style>

<template>
	<scroll-view scroll-y class="c-scroll" :lower-threshold="30" @scrolltolower="$emit('ToLower')">
		<slot></slot>
		<view class="scroll-lower">
			<view class="txt" v-if="isLower">"没有更多⊙﹏⊙‖∣°"</view>
			<image class="loading" src="../../static/images/bookloading.gif" v-else></image>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {
				active: true
			}
		},
		props: {
			isLower: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 			PageDown(){
			// 				console.log(88888)
			// 			}
		}
	}
</script>

<style lang="less">
	.c-scroll {
		height: 100vh;

		.scroll-lower {
			height: 100upx;
			text-align: center;
			overflow: hidden;
			margin-top: -20upx;

			.loading {
				width: 200upx;
				height: 120upx;
			}

			.txt {
				width: 200upx;
				height: 120upx;
				line-height: 120upx;
				text-align: center;
				font-size: 30upx;
			}
		}
	}
</style>

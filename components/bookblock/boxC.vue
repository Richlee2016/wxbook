<template>
	<view class="block-box-b">
		<info-line v-for="(info,i) in List" :key="i" :info="info"></info-line>
	</view>
</template>

<script>
	import InfoLine from '../common/infoline'
	export default {
		props: {
			List: {
				type: Array,
				default () {
					return []
				}
			}
		},
		components: {
			InfoLine
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>

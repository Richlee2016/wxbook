<template>
	<view class="block-box-a">
		<view class="box" v-for="(box,i) in List" :key="i" @click="PageGo(box.id)">
			<image class="img" :src="box.cover" mode=""></image>
			<text class="txt">{{box.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {}
		},
		props: {
			List: {
				type: Array,
				default () {
					return []
				}
			}
		},
		methods:{
			PageGo(id){
				uni.navigateTo({
					url: `/pages/book/index?id=${id}`
				})
			}
		}
	}
</script>

<style lang="less">
	.block-box-a {
		padding-bottom: 30upx;
		overflow: hidden;

		.box {
			width: 250upx;
			float: left;
			text-align: center;
			margin-top: 30upx;
		}

		.img {
			width: 230upx;
			height: 330upx;
		}

		.txt {
			padding: 0 20upx;
			font-size: 26upx;
			line-height: 40upx;
			overflow: hidden;
			display: block;
			word-break: keep-all;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>

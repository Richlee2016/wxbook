<template>
	<view class="category-box">
		<view class="cate-vod" v-for="o in Data" :key="o.id" @click="$emit('goToVod',o)">
			<view class="cate-txt">
				<view>{{o.name}}</view>
				<view>{{o.count}}</view>
			</view>
			<image class="cate-img" :src="o.cover1 || o.cover2" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			Data: {
				type: Array,
				default () {
					return []
				}
			}
		},
		created(){
			console.log(this.Data)
		}
	}
</script>

<style lang="less">
	.category-box {
		overflow: hidden;

		.cate-vod {
			padding: 10upx;
			width: 355upx;
			height: 200upx;
			float: left;
			position: relative;
		}

		.cate-img {
			width: 100%;
			height: 100%;
		}

		.cate-txt {
			position: absolute;
			left: 20upx;
			top: 20upx;
			font-size: 28upx;
			color: #666;
			line-height: 40upx;
		}
	}
</style>

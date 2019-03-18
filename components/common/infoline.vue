<template>
	<view class="c-book-infoline" @click="PageGo(info.id)">
		<image class="img" :src="info.cover" mode=""></image>
		<view class="right">
			<text class="h3">{{info.title}}</text>
			<text class="label">{{info.authors}}</text>
			<text class="p">{{info.summary}}</text>
			<view class="ul">
				<text class="li" v-for="o in categories" :key="o.category_id">{{o.label}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		computed: {
			categories() {
				return this.info.categories ? this.info.categories.slice(0, 3) : []
			}
		},
		methods: {
			PageGo() {
				uni.navigateTo({
					url: `/pages/book/index?id=${id}`
				})
			}
		},
		onReady(){
			// console.log(this.info)
		}
	}
</script>

<style lang="less">
	.c-book-infoline {
		padding: 24upx;
		border-bottom: 2upx solid #f0f0f0;
		overflow: hidden;

		.right {
			padding-left: 30upx;
			width: 470upx;
			float: left;
		}

		.img {
			float: left;
			width: 180upx;
			height: 240upx;
		}

		.h3 {
			line-height: 52upx;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}

		.label {
			color: rgba(0, 0, 0, 0.7);
			line-height: 20upx;
			font-size: 28upx;
		}

		.p {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			font-size: 24upx;
			height: 80upx;
			line-height: 40upx;
			color: rgba(0, 0, 0, 0.6);
		}

		.ul {
			max-height: 120upx;
			overflow: hidden;

			.li {
				margin-top: 12upx;
				display: inline-block;
				padding: 4upx 12upx;
				border: #53ac7d 1upx solid;
				color: #53ac7d;
				font-size: 24upx;
				margin-right: 12upx;
				border-radius: 4upx;
			}
		}
	}
</style>

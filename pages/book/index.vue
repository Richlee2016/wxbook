<template>
	<view class='book'>
		<view class='b-head'>
			<view class='left'>
				<image class='img' :src="Detail.cover" />
			</view>
			<view class='right'>
				<view class='h1'>{{Detail.title}}</view>
				<view class='label'>{{Detail.authors}}</view>
				<view class='span'>状态: {{Detail.finish ? '已完结' : '更新中'}}</view>
			</view>
		</view>
		<view class='chp'>
			<view class='btnbox'>
				<button :class="['btn',BtnClass]" :loading="BtnLoad" @click="GoChapter">{{FreeStatusText[FreeStatus]}}</button>
			</view>
			<view class='btnbox'>
				<button :class="['btn',BtnClass]">继续阅读</button>
			</view>
		</view>
		<view class='infor'>{{Detail.summary}}</view>
		<view class='newest'>最新章节...</view>
		<view class='clear-line' />
		<view class='types'>
			<view class='h1'>类别标签</view>
			<view class='ul'>
				<navigator class="li" v-for="(o,i) in Detail.categories" :key="o.category_id" :url="'/pages/base/categoryvod?id=' + o.category_id"
				 :style="{background:labelBd[i%3]}">{{o.label}}</navigator>
			</view>
		</view>
		<view class='clear-line' />
		<view class='associated'>
			<view class='h1'>作者其他书</view>
			<block-box-a :List="AuthBooks"></block-box-a>
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters
	} from 'vuex'
	import BlockBoxA from '../../components/bookblock/boxA'
	export default {
		data() {
			return {
				labelBd: ['#fbebe8', '#fcedda', '#e8f9db']
			}
		},
		components: {
			BlockBoxA
		},
		computed: {
			...mapState('Book', ['Detail', 'AuthBooks', 'FreeStatus', 'FreeStatusText', 'FreeReader']),
			...mapGetters('Book', ['BtnClass', 'BtnLoad'])
		},
		methods: {
			...mapActions('Book', ['BookDetail']),
			GoChapter() {
				if (this.FreeStatus !== 4) return false
				const { href: [type, chapter] } = this.FreeReader
				uni.navigateTo({ url: `/pages/book/chapter?type=${type}&chapter=${chapter}` })
			}
		},
		async onLoad({ id }) {
			await this.BookDetail({ id })
		}
	}
</script>

<style lang="less">
	.book {
		.b-head {
			display: flex;
			margin-top: 60upx;
			width: 100%;

			.left {
				flex: 1;
				text-align: center;

				.img {
					width: 190upx;
					height: 250upx;
				}
			}

			.right {
				text-align: left;
				flex: 1;

				.h1 {
					line-height: 60upx;
					font-size: 32upx;
				}

				.label {
					line-height: 48upx;
					font-size: 24upx;
					color: #4b99a7;
				}

				.span {
					line-height: 48upx;
					font-size: 28upx;
					color: #727272;
				}
			}
		}

		.chp {
			display: flex;
			margin-top: 40upx;

			.btnbox {
				flex: 1;
				text-align: center;
			}

			.btn {
				width: 90%;
				height: 66upx;
				line-height: 66upx;
				font-size: 28upx;
			}

			.chapter {
				color: white;
				background: #f35d02;
				border: #f35d02 1upx solid;
			}

			.history {
				color: #ddd;
				background: white;
				border: #ddd 1upx solid;
			}
		}

		.infor {
			margin: 20upx 40upx;
			font-size: 28upx;
			color: #666666;
			line-height: 40upx;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 6;
			-webkit-box-orient: vertical;
			word-break: break-all;
		}

		.newest {
			border-top: #dddddd 1upx solid;
			text-align: center;
			line-height: 80upx;
			color: #666666;
			font-size: 30upx;
		}

		.types {
			padding: 34upx 40upx;

			.h1 {
				color: rgb(102, 102, 102);
				font-size: 32upx;
			}

			.ul {
				overflow: hidden;
				margin-top: 20upx;

				.li {
					display: inline-block;
					padding: 10upx 40upx;
					border: #ddd 1upx solid;
					border-radius: 8upx;
					margin-left: 20upx;
					margin-bottom: 20upx;
					font-size: 28upx;
				}
			}
		}

		.associated {
			.h1 {
				padding-left: 40upx;
				color: rgb(102, 102, 102);
				font-size: 32upx;
			}
		}
	}
</style>

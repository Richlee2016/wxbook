<template>
	<view class="block-box-b">
		<info-line v-if="Lines.info" :info="Lines.info"></info-line>
		<view class="line" v-for="(line,i) in Lines.lines" :key="line.id" @click="PageGo(line.id)">
			<text class="rank">{{i + 2}}</text>
			<text class="p">{{line.title}}</text>
			<text class="label">作者:{{line.authors}}</text>
		</view>
	</view>
</template>

<script>
	import InfoLine from '../common/infoline'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		components: {
			InfoLine
		},
		props: {
			List: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed: {
			Lines() {
				const [info, ...lines] = this.List
				return {
					info,
					lines
				}
			}
		},
		methods: {
			PageGo(id) {
				uni.navigateTo({
					url: `/pages/book/index?id=${id}`
				})
			}
		},
		onReady(){
			// console.log(this.Lines)
		}
	}
</script>

<style lang="less">
	.block-box-b {
		.line {
			width: 100%;
			height: 96upx;
			padding: 24upx 20upx;
			line-height: 48upx;
			border-bottom: 2upx solid #f0f0f0;

			.rank {
				display: inline-block;
				width: 40upx;
				height: 40upx;
				color: red;
				font-size: 30upx;
			}

			.p {
				display: inline-block;
				padding-right: 20upx;
				font-size: 30upx;
			}

			.label {
				font-size: 24upx;
				color: rgba(0, 0, 0, 0.4);
			}
		}
	}
</style>

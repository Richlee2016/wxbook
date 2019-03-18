<template>
	<view class="c-book-title">
		<text class="title">{{title}}</text>
		<text class="label" v-if="label">{{label}}</text>
		<view class="tab" v-if="tab">
			<text :class="['tab-t',{active:active}]" @click="TabChange(1)">男</text>
			<text>丨</text>
			<text :class="['tab-t',{active:!active}]" @click="TabChange(2)">女</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: true
			}
		},
		props: {
			title: {
				type: String,
				default: '标题'
			},
			label: [String],
			tab: {
				type: Boolean,
				default:false
			}
		},
		computed: {
			
		},
		methods: {
			TabChange(num) {
				console.log(num)
				this.active = (num === 1)
				this.$emit('onTab', num)
			}
		}
	}
</script>

<style lang="less">
	.c-book-title {
		height: 80upx;
		line-height: 80upx;
		border-bottom: 2upx solid #f0f0f0;
		padding-left: 40upx;
		border-left: 12upx solid #ffab18;
		overflow: hidden;

		.title {
			float: left;
			font-size: 32upx;
		}

		.label {
			display: inline-block;
			width: 52upx;
			height: 32upx;
			line-height: 32upx;
			color: white;
			text-align: center;
			background: #53ac7d;
			font-size: 24upx;
			margin-left: 16upx;
		}

		.active {
			color: #528ae8;
		}

		.tab {
			float: right;
			font-size: 26upx;
			margin-right: 20upx;

			.tab-t {
				padding: 20upx 20upx;
			}
		}
	}
</style>

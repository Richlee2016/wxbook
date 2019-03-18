<template>
	<view class="c-book-more">
		<view class="btn" v-for="(btn,i) in btns" :key="i" @click="$emit('onBtn',i+1)">{{btn}}</view>
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
		}
	}
</script>

<style lang="less">
	.c-book-more {
		width: 100%;
		height: 80px;
		line-height: 80px;
		text-align: center;
		font-size: 30px;
		display: flex;
		border-top: 1px solid #f0f0f0;

		.btn {
			flex: 1;
			background: white;
			font-size: 24px;
		}
	}
</style>

<template>
	<view class='chapter-box'>
		<view v-for="(o,i) in List" :class="['dl',o.type]" :key="i" @click="ChapterGo(o.href)">{{o.text}}</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
	} from 'vuex'

	export default {
		components: {

		},
		computed: {
			...mapState('Book', ['FreeChapters']),
			List() {
				return this.FreeChapters.list.slice(0, 1000)
			}
		},
		methods: {
			...mapActions('Base', ['CommonFetch']),
			ChapterGo(href) {
				uni.navigateTo({
					url: `/pages/book/context?id=${href}`
				})
			}
		},
		async onLoad() {

		}
	}
</script>

<style lang="less">
	.chapter-box {
		background: #f5f5f5;

		.dl {
			background: white;
			line-height: 80upx;
			padding: 0 40upx;
			border-top: #efeff0 1upx solid;
			font-size: 32upx;
			display: block;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.dt {
			text-align: center;
			margin-top: 20upx;
		}
	}
</style>

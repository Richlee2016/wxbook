<template>
	<view class="context-box">
		<v-scroll @ToLower="BookFallDown">
			<view v-for="o in FreeReadList.list" :key="o.id" class='chap'>
				<view class='title'>{{o.title}}</view>
				<view v-for="(c, i) in o.context" :key="i" class='line'>{{c}}</view>
			</view>
		</v-scroll>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'

	import VScroll from '../../components/scroll'

	export default {
		components: {
			VScroll
		},
		computed: {
			...mapState('Book', ['FreeReadList']),
		},
		methods: {
			...mapActions('Book', ['BookFallDown', 'BookReader']),
		},
		async onLoad({ id }) {
			await this.BookReader({ id, start: true })
		}
	}
</script>

<style lang="less">
	.context-box {
		padding: 0 20upx;
		background: #f7eee5;

		.chap {
			padding: 40upx 0upx;
			border-bottom: 1upx solid #cccccc;

			.title {
				line-height: 60upx;
			}

			.line {
				text-indent: 50upx;
				margin-top: 40upx;
				font-size: 32upx;
				line-height: 40upx;
			}
		}
	}
</style>

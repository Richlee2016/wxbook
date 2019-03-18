<template>
	<view class="banner">
		<view>
			<image class="cover" :src="Banner.banner"></image>
			<view class="description">{{Banner.description}}</view>
		</view>
		<view className='clear-line' />
		<block-box-c :List="Banner.list" />
		<c-more :btns="[{name:'查看更多>>',url:'/pages/base/recommend'}]" />
	</view>
</template>

<script>
	import {
		mapActions,
		mapState,
		mapGetters,
		mapMutations
	} from 'vuex'
	import CMore from '../../components/common/more'
	import BlockBoxC from '../../components/bookblock/boxC'
	export default {
		components: {
			CMore,
			BlockBoxC
		},
		computed: {
			...mapState('Base', ['Banner']),
		},
		methods: {
			...mapActions('Base', ['CommonFetch']),
		},
		async onLoad({
			id
		}) {
			await this.CommonFetch({
				url: `/store/v0/fiction/list/${id}`,
				name: 'Banner'
			})
		}
	}
</script>

<style lang="less">
	.banner {
		.cover {
			width: 100%;
			height: 300upx;
		}

		.description {
			padding: 20upx;
			font-size: 28upx;
			line-height: 40upx;
		}
	}
</style>

<template>
	<view class="recommend">
		<v-scroll @ToLower="FetchRecommend" :isLower="Recommend.isLower">
			<view class='rec-box' v-for="o in Recommend.list" :key="o.id">
				<view class='clear-line' />
				<view class='title'>{{o.name}}</view>
				<view class='txt'>{{o.description}}</view>
				<image class='img' :src="o.cover" />
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
		data() {
			return {
				
			}
		},
		components: {
			VScroll
		},
		computed: {
			...mapState('Base', ['Recommend']),
		},
		methods: {
			...mapActions('Base', ['FetchRecommend']),
		},
		async onLoad() {
			await this.FetchRecommend()
		}
	}
</script>

<style lang="less">
	.recommend {
		.rec-box {
			.title {
				font-size: 36upx;
				color: #333;
				padding: 20upx;
				font-weight: 600;
			}

			.txt {
				padding: 0upx 20upx;
				font-size: 28upx;
				color: #666;
				line-height: 40upx;
				margin-bottom: 20upx;
			}

			.img {
				width: 100%;
				height: 400upx;
			}
		}
	}
</style>

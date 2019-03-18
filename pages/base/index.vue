<template>
	<view class="index">
		<v-scroll @ToLower="FallsDown">
	
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
	import CTitle from '../../components/common/title'
	import CMore from '../../components/common/more'
	import VSearch from '../../components/search'
	import VScroll from '../../components/scroll'
	import BlockBoxA from '../../components/bookblock/boxA'
	import BlockBoxB from '../../components/bookblock/boxB'
	import BlockBoxC from '../../components/bookblock/boxC'
	export default {
		data() {
			return {
				
			}
		},
		components: {
			VScroll,
			VSearch,
			CTitle,
			CMore,
			BlockBoxA,
			BlockBoxB,
			BlockBoxC
		},
		computed: {
			...mapState('Home', ['Data', 'Falls']),
			...mapGetters('Home', ['Recommend', 'Girl', 'Boy'])
		},
		methods: {
			...mapActions('Home', ['GetHomeData', 'FallsDown']),
			...mapMutations('Home', ['RECOMMEND_MORE', 'RECOMMEND_TAB', 'PERSON_TAB'])
		},
		async onLoad() {
		
		}
	}
</script>

<style lang="less">
	.swiper-box {
		height: 360upx;

		.img {
			width: 100%;
			height: 100%;
		}
	}

	.nav-bar {
		display: flex;
		margin-top: 20upx;
		padding-bottom: 20upx;

		.bar-box {
			flex: 1;
			text-align: center;
			overflow: hidden;
		}

		.bar-icon {
			float: left;
			width: 100%;

			.img {
				width: 60upx;
				height: 60upx;
				margin: auto;
			}
		}

		.bar-text {
			width: 100%;
			float: left;
			font-size: 30upx;
		}
	}

	.home-topic {
		display: flex;
		border-bottom: 2upx solid #f0f0f0;
		padding: 20upx 0upx;

		.box {
			flex: 1;
			text-align: center;
		}

		.img {
			width: 90%;
			height: 240upx;
		}
	}
</style>

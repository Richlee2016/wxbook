<template>
	<view class="index">
		<v-scroll @ToLower="FallsDown">
			<v-search />
			<!-- 轮播图 -->
			<swiper class="swiper-box" :indicator-dots="myswipre.indicatorDots" :autoplay="myswipre.autoplay" :interval="myswipre.interval"
			 :duration="myswipre.duration">
				<swiper-item class="swiper-item" v-for="ban in Data.banner" :key="ban.img">
					<image class="img" :src="ban.img" mode="scaleToFill"></image>
				</swiper-item>
			</swiper>
			<!-- 导航 -->
			<view class="nav-bar">
				<navigator class="bar-box" v-for="(nav,i) in NavBarConf" :url="nav.url" :key="i">
					<view class="bar-icon">
						<image class="img" :src="nav.icon" mode=""></image>
					</view>
					<text class="bar-text">{{nav.name}}</text>
				</navigator>
			</view>
			<view class="clear-line"></view>
			<!-- 本周最火 -->
			<view class='home-box'>
				<c-title title='本周最火'></c-title>
				<block-box-a :List="Data.hot.list"></block-box-a>
				<c-more :btns="[{name:'查看更多',url:'/pages/base/banner?id=11059'}]" />
			</view>
			<view class='clear-line' />

			<!-- 重磅推荐 -->
			<view class='home-box'>
				<c-title title='重磅推荐' tab @onTab="RECOMMEND_TAB" />
				<block-box-b :List="Recommend" />
				<c-more :btns="[{name:'换一换'},{name:'查看全部'}]" @onBtn="RECOMMEND_MORE" />
			</view>
			<!-- 女生最爱 -->
			<view class='clear-line' />
			<view class='home-box'>
				<c-title title='女生最爱' />
				<block-box-c :List="Girl" />
				<c-more :btns="[{name:'换一换',sex:2}, {name:'女生频道>>',sex:2}]" @onBtn="PERSON_TAB" />
			</view>
			<!-- 男生最爱 -->
			<view class='clear-line' />
			<view class='home-box'>
				<c-title title='男生最爱' />
				<block-box-c :List="Boy" />
				<c-more :btns="[{name:'换一换',sex:1}, {name:'男生频道>>',sex:1}]" @onBtn="PERSON_TAB" />
			</view>
			<!-- 限时免费 -->
			<view className='clear-line' />
			<view className='home-box'>
				<c-title title='限时免费' />
				<block-box-a :List="Data.free.list"></block-box-a>
				<c-more :btns="[{name:'更多限免佳作>>'}]" />
			</view>
			<!-- 精选专题 -->
			<view class='clear-line' />
			<view class='home-box'>
				<c-title title='精选专题' label='热' />
				<view class='home-topic'>
					<navigator class="box" :key="top.referenceId" v-for="top in Data.topic.list" :url="'/pages/base/banner?id=' + top.referenceId">
						<image class="img" :src="top.img"></image>
					</navigator>
				</view>
				<c-more :btns="[{name:'更多限免佳作>>',url:'/pages/base/recommend'}]" />
			</view>
			<!-- 瀑布流 -->
			<view class='clear-line' />
			<View className='clear-line' />
			<block-box-c :List="Falls" />
		</v-scroll>
	</view>
</template>

<script>
	import {
		NavBarConf
	} from '../../config/index'
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
				NavBarConf,
				myswipre: {
					indicatorDots: false,
					autoplay: true,
					loop: true,
					interval: 5000,
					duration: 1000
				}
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
			await this.GetHomeData()
			await this.FallsDown()
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

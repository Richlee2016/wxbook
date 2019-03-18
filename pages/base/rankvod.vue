<template>
	<view class="rankvod">
		<v-scroll @ToLower="FetchRankVod" :isLower="RankVod.isLower">
			<view class='ran-head'>
				<view class='nav-box'>
					<View class='rank-nav' v-for="(o,i) in RankGroup.group" :key="o.id" @click="SetNav(i)">{{o.label}}</View>
					<view class='active-line' :style="{left:RankGroup.index * 88 + 'px'}">
						<view class='line' />
					</view>
				</view>
				<view class='clear-line' />
			</view>
			<view class='re-box'>
				<block-box-c :List="RankVod.list" />
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
	import BlockBoxC from '../../components/bookblock/boxC'
	export default {
		data() {
			return {

			}
		},
		components: {
			VScroll,
			BlockBoxC
		},
		computed: {
			...mapState('Base', ['RankVod', 'RankGroup'])
		},
		methods: {
			...mapActions('Base', ['FetchRankVod']),
			...mapMutations('Base', ['SET_RANK_GROUP']),
			async SetNav(i) {
				this.SET_RANK_GROUP({ index: i })
				await this.FetchRankVod()
			}
		},
		async onLoad({ id }) {
			this.SET_RANK_GROUP({ index: 0, group: id })
			await this.FetchRankVod()
		}
	}
</script>

<style lang="less">
	.rankvod {
		padding-top: 100upx;

		.ran-head {
			position: fixed;
			left: 0upx;
			top: 0upx;
			width: 100%;
			background: white;
			border-top: 2upx solid #ddd;

			.nav-box {
				width: 480upx;
				display: flex;
				margin: auto;
				position: relative;

				.rank-nav {
					flex: 1;
					text-align: center;
					line-height: 80upx;
				}
			}

			.active-line {
				width: 160upx;
				position: absolute;
				bottom: 0upx;
				left: 0upx;
				display: block;
				height: 6upx;
				transition: 0.3s ease-in-out;

				.line {
					float: left;
					width: 60%;
					margin-left: 20%;
					height: 6upx;
					background: #50c3d8;
				}
			}
		}
	}
</style>

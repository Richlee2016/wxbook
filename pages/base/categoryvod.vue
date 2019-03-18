<template>
	<view class="cate-vod">
		<v-scroll @ToLower="FetchScroll" :isLower="CategoryVod.isLower">
			<view class='rec-head'>
				<view class='head'>
					<view v-for="(o,i) in CategoryGroups.group" :key="o.category_id" :class="['hbox',{active:i === CategoryGroups.index}]" @click="GroupChange(i)">
						{{o.label}}
					</view>
				</view>
				<view class='head'>
					<view v-for="o in typeList" :key="o.value" :class="['hbox',{active:o.value === CategoryVod.type}]" @click="TypeChange(o.value)">
						{{o.label}}
					</view>
				</view>
				<view class='clear-line' />
			</view>
			<view class='re-box'>
				<block-box-c :List="dataBox" />
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
				typeList: [{
						label: '热门',
						value: 'click'
					},
					{
						label: '最新',
						value: 'latest'
					},
					{
						label: '完结',
						value: 'finish'
					}
				]
			}
		},
		components: {
			BlockBoxC,
			VScroll
		},
		computed: {
			...mapState('Base', ['CategoryGroups', 'CategoryVod']),
			dataBox() {
				return this.CategoryVod.list[this.CategoryVod.type]
			}
		},
		methods: {
			...mapActions('Base', ['FetchCategoryVod']),
			...mapMutations('Base', ['SET_CATEGORY_GROUP']),
			async FetchScroll() {
				const { id, type } = this.CategoryVod
				await this.FetchCategoryVod({ id, type })
			},
			async GroupChange(i) {
				this.SET_CATEGORY_GROUP(i)
				const { index, group } = this.CategoryGroups
				const id = group[index].category_id
				await this.FetchCategoryVod({ id })
			},
			async TypeChange(type) {
				const { id } = this.CategoryVod
				this.FetchCategoryVod({ id, type })
			}
		},
		async onLoad({ id }) {
			await this.FetchCategoryVod({ id })
		}
	}
</script>

<style lang="less">
	.cate-vod {
		padding-top: 40upx;

		.re-box {
			padding-top: 60upx;
		}

		.rec-head {
			position: fixed;
			left: 0upx;
			top: 0upx;
			width: 100%;
			padding-top: 20upx;
			background: white;

			.head:nth-of-type(2) {
				margin-bottom: 20upx;
			}

			.head {
				padding: 0upx 20upx;
				font-size: 28upx;

				.hbox {
					display: inline-block;
					height: 40upx;
					line-height: 40upx;
					padding: 0 8upx;
				}

				.active {
					color: #4b99a7;
					font-weight: 600;
				}
			}
		}
	}
</style>

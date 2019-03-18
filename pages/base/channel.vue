<template>
	<view class='channel'>
		<view class='home-box' v-for="o in Channel.list" :key="o.referenceId">
			<view class='clear-line' />
			<c-title :title="o.name" />
			<block-box-c :List="o.list" />
			<c-more :btns="[{name:'查看更多',url:'/pages/base/recommend'}]" />
		</view>
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import CTitle from '../../components/common/title'
	import CMore from '../../components/common/more'
	import BlockBoxC from '../../components/bookblock/boxC'
	export default {
		data() {
			return {

			}
		},
		components: {
			CTitle,
			CMore,
			BlockBoxC
		},
		computed: {
			...mapState('Base', ['Channel']),
		},
		methods: {
			...mapActions('Base', ['CommonFetch']),
		},
		async onLoad({
			id
		}) {
			await this.CommonFetch({
				url: `/hs/v3/channel/${id}`,
				name: 'Channel'
			})
		}
	}
</script>

<style lang="less">

</style>

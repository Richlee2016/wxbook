<template>
	<view class='category'>
		<c-title title="男生小说" />
		<c-category :Data="Category.male" />
		<view class='clear-line' />
		<c-title title="女生小说" />
		<c-category :Data="Category.female" />
	</view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	import CTitle from '../../components/common/title'
	import CMore from '../../components/common/more'
	import Category from '../../components/common/category'
	export default {
		data() {
			return {

			}
		},
		components: {
			CTitle,
			CMore,
			'c-category':Category
		},
		computed: {
			...mapState('Base', ['Category']),
		},
		methods: {
			...mapActions('Base', ['CommonFetch']),
		},
		async onLoad({
			id
		}) {
			await this.CommonFetch({
				url: '/hs/v0/android/store/category',
				name: 'Category'
			})
		}
	}
</script>

<style lang="less">
	.category {
		overflow: hidden;
	}
</style>

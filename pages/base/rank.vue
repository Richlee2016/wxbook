<template>
	 <view class='rank'>
       <view class='rank-box' v-for="o in Rank" :key="o.id">
          <Image class='rank-img' :src="o.cover" />
          <view class='rank-txt'>
            <view v-for="(d,idx) in o.description" :key="idx">{{idx + 1}}、{{d}}</view>
          </view>
        </view>
      </view>
</template>

<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('Base', ['Rank']),
		},
		methods: {
			...mapActions('Base', ['CommonFetch']),
		},
		async onLoad() {
			await this.CommonFetch({
				url: '/store/v0/ad/ranks',
				name: 'Rank'
			})
		}
	}
</script>

<style lang="less">
.rank-box{
    padding: 20upx;
    border-bottom: #ddd 2upx solid;
    overflow: hidden;
    .rank-img{
        width: 160upx;
        height: 160upx;
        float: left;
    }
    .rank-txt{
        float: left;
        width: 510upx;
        padding-left: 20upx;
        color: #666;
        font-size: 26upx;
        line-height: 40upx;
    }
}
</style>

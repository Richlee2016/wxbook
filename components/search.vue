<template>
	<view class="c-search">
		<view class="s-icon">
			<u-icon size=40 type="search"></u-icon>
		</view>
		<input class="s-inp" type="text" confirm-type="search" value="" />
	</view>
</template>

<script>
	import uIcon from './uni/uni-icon'
	export default {
		data() {
			return {
				active: true
			}
		},
		components:{
			uIcon
		},
		props: {
			
		},
		computed: {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	.c-search{
    margin: 20upx 75upx;
    width: 600upx;
    height: 72upx;
    border: 2upx solid #f5f5f5;
    overflow: hidden;
    .s-icon{
        width: 72upx;
        height: 72upx;
        line-height: 72upx;
        text-align: center;
        border-right: 1upx solid #f5f5f5;
        float: left;
        .icon{
            height: 56upx;
            padding-top: 12upx;
        }
    }
    .s-inp{
        float: left;
        width: 510upx;
        height: 72upx;
        padding-left: 18upx;
    }
}
</style>

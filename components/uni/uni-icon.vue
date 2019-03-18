<template>
    <view class="icon uni-icon" :class="['uni-icon-'+type]" :style="{color:color,'font-size':fontSize}" @click="onClick()"></view>
</template>

<script>
    export default {
        props: {
            /**
             * 图标类型
             */
            type: String,
            /**
             * 图标颜色
             */
            color: {
				type:String,
				default:'rgb(143, 143, 148)'
			},
            /**
             * 图标大小
             */
            size: [Number, String]
        },
        computed: {
            fontSize() {
                return uni.upx2px(this.size) + 'px'
            }
        },
        methods: {
            onClick() {
                this.$emit('click')
            }
        }
    }
</script>
<style lang="less">
	.icon{
		display: inline-block;
	}
</style>


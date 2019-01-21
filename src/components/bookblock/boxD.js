import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './zstyle.less'

// 热点模块
export default class Block extends Component {
  render () {
    const { data = [] } = this.props
    if (!data) return <View />
    const mapLines = data.map((info, i) => <View />)
    return (
      <View className='block-box-d'>
        {mapLines}
      </View>
    )
  }
}

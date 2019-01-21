import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { Cinfoline } from '../common'
import './zstyle.less'

export default class Block extends Component {
  render () {
    const { data = [] } = this.props
    if (!data) return <View />
    const mapLines = data.map((info, i) => <Cinfoline key={info.id} info={info} />)
    return (
      <View className='block-box-b'>
        {mapLines}
      </View>
    )
  }
}

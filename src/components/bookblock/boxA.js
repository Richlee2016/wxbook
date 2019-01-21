import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './zstyle.less'

export default class Block extends Component {
  render () {
    const { data = { list: [] } } = this.props
    const boxes = data.list.map(box => {
      return (
        <View key={box.cover} className='box'>
          <Image className='img' src={box.cover} />
          <Text className='txt'>{box.title}</Text>
        </View>
      )
    })
    return (
      <View className='block-box-a'>
        {boxes}
      </View>
    )
  }
}

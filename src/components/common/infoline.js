import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './zstyle.less'

// 热点模块
export default class InfoLine extends Component {
  render () {
    const { info } = this.props
    if (!info) return <View />
    return (
      <View className='c-book-infoline'>
        <Image className='img' src={info.cover} />
        <View className='right'>
          <Text className='h3'>{info.title}</Text>
          <Text className='label'>一笔烟云</Text>
          <Text className='p'>身怀绝技的方少阳，带着对大都市的美好憧憬，本想投靠师娘，却当上了医院妇科的男医生，泡了个美女医生，误...</Text>
          <View className='ul'>
            <Text className='li'>都市情缘</Text>
            <Text className='li'>都市生活</Text>
            <Text className='li'>热血都市</Text>
          </View>
        </View>
      </View>
    )
  }
}

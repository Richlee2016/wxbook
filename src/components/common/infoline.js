import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './zstyle.less'

// 热点模块
export default class InfoLine extends Component {
  render () {
    const { info } = this.props
    if (!info) return <View />
    let categories = info.categories ? info.categories.slice(0, 3) : []
    const mapCategories = categories.map(o => {
      return <Text key={o.category_id} className='li'>{o.label}</Text>
    })
    return (
      <View className='c-book-infoline'>
        <Image className='img' src={info.cover} />
        <View className='right'>
          <Text className='h3'>{info.title}</Text>
          <Text className='label'>{info.authors}</Text>
          <Text className='p'>{info.summary}</Text>
          <View className='ul'>
            {mapCategories}
          </View>
        </View>
      </View>
    )
  }
}

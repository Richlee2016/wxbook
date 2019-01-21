import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Cinfoline } from '../common'
import './zstyle.less'

export default class Block extends Component {
  render () {
    const { data = [] } = this.props
    if (!data || data.length === 0) return <View />
    const [info, ...lines] = data
    const mapLines = lines.map((line, i) => {
      return (
        <View className='line' key={line.id}>
          <Text className='rank'>{i + 2}</Text>
          <Text className='p'>{line.title}</Text>
          <Text className='label'>作者</Text>
        </View>
      )
    })
    return (
      <View className='block-box-b'>
        {info ? <Cinfoline info={info} /> : null}
        {mapLines}
      </View>
    )
  }
}

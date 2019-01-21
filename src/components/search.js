import Taro, { Component } from '@tarojs/taro'
import { View, Input, Icon, Button } from '@tarojs/components'
import './zstyle.less'
export default class Search extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <View className='c-search'>
        <View className='s-icon'>
          <Icon className='icon' type='search' size='20' />
        </View>
        <Input className='s-inp' confirmType='search' />
      </View>
    )
  }
}

import Taro, { Component } from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import bookloading from '../assets/images/bookloading.gif'
import './zstyle.less'
export default class Scroll extends Component {
  async ToLower () {
    const { onLower, isLower } = this.props
    !isLower && onLower && await onLower()
  }
  render () {
    let { isLower } = this.props
    isLower = isLower || false
    console.log(isLower)
    return (
      <ScrollView
        className='c-scroll'
        scroll-y
        lowerThreshold={30}
        onScrolltolower={this.ToLower.bind(this)}>
        {this.props.children}
        <View className='scroll-lower'>
          {isLower ? <Text className='txt'>"没有更多⊙﹏⊙‖∣°"</Text> : <Image className='loading' src={bookloading} /> }
        </View>
      </ScrollView>
    )
  }
}

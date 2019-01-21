import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './zstyle.less'
export default class More extends Component {
  render () {
    const { btns = [] } = this.props
    const btnGroup = btns.map((btn, i) => {
      return <View className='btn' key={i} onClick={this.props.onBtn.bind(this, i + 1)}>{btn}</View>
    })
    return (
      <View className='c-book-more'>
        {btnGroup}
      </View>
    )
  }
}

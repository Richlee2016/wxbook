import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './zstyle.less'
export default class Title extends Component {
  constructor (props) {
    super(props)
    this.state = {
      active: true
    }
  }
  handleTab (num) {
    const { onTab } = this.props
    this.setState({
      active: num === 1
    })
    onTab && onTab(num)
  }
  render () {
    const { title = '标题', label, tab } = this.props
    const { active } = this.state
    return (
      <View className='c-book-title'>
        <Text className='title'>{title}</Text>
        {label ? <Text className='label'>{label}</Text> : null}
        {tab ? <View className='tab'>
          <Text className={`tab-t ${active ? 'active' : ''}`} onClick={this.handleTab.bind(this, 1)}>男</Text>
          <Text>丨</Text>
          <Text className={`tab-t ${active ? '' : 'active'}`} onClick={this.handleTab.bind(this, 2)}>女</Text>
        </View> : null}
      </View>
    )
  }
}

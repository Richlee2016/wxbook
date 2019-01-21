import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Scroll from '../../components/scroll'
import { observer, inject } from '@tarojs/mobx'
import { BlockBoxC } from '../../components/bookblock/boxC'
import { toJS } from 'mobx'
import './index.less'

@inject('DataBase')
@observer
class Recommend extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url) {
    Taro.navigateTo({ url: url })
  }

  componentDidMount () {
    this.props.DataBase.FetchRecommend()
  }

  FetchScroll = () => this.props.DataBase.FetchRecommend()

  render () {
    const { DataBase: { Recommend } } = this.props
    const mapRecommend = Recommend.list.map(o => {
      return (
        <View className='rec-box' key={o.id}>
          <View className='title'>{o.name}</View>
          <View className='txt'>{o.info}</View>
          <Image src={o.cover} />
        </View>
      )
    })
    return (
      <View className='recommend'>
        <Scroll onLower={this.FetchScroll} isLower={Recommend.isLower}>
          {mapRecommend}
        </Scroll>
      </View>
    )
  }
}

export default Recommend

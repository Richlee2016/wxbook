import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Scroll from '../../components/scroll'
import { observer, inject } from '@tarojs/mobx'
import { BlockBoxC } from '../../components/bookblock/boxC'
import { toJS } from 'mobx'
import './index.less'

@inject('DataBase')
@observer
class Banner extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url) {
    Taro.navigateTo({ url: url })
  }

  componentDidMount () {
    this.props.DataBase.FetchBanner(this.$router.params.id)
  }

  FetchBanner = () => this.props.DataBase.FetchBanner(this.$router.params.id)

  render () {
    const { DataBase: { Banner } } = this.props
    return (
      <View className='banner'>
        <Scroll onLower={this.FetchBanner} isLower={Banner.isLower}>
          <Image className='cover' src={Banner.banner} />
          <View className='description'>{Banner.description}</View>
          <View className='clear-line' />
          <BlockBoxC data={toJS(Banner.list)} />
        </Scroll>
      </View>
    )
  }
}

export default Banner

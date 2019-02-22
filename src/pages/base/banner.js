import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Scroll from '../../components/scroll'
import { observer, inject } from '@tarojs/mobx'
import { BlockBoxC } from '../../components/bookblock/boxC'
import { Cmore } from '../../components/common'
import { toJS } from 'mobx'
import './index.less'

@inject('DataBase')
@observer
class Banner extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url, a) {
    Taro.navigateTo({ url: url })
  }

  componentDidMount () {
    this.props.DataBase.FetchBanner(this.$router.params.id)
  }

  FetchBanner = () => this.props.DataBase.FetchBanner(this.$router.params.id)

  render () {
    let { DataBase: { Banner } } = this.props
    Banner = toJS(Banner)
    return (
      <View className='banner'>
        {Banner.banner ? <Image className='cover' src={Banner.banner} /> : null}
        {Banner.description ? <View className='description'>{Banner.description}</View> : null}
        <View className='clear-line' />
        <BlockBoxC data={Banner.list} />
        <Cmore btns={['查看更多']} onBtn={this.navigateTo.bind(this, '../../pages/base/recommend')} />
      </View>
    )
  }
}

export default Banner

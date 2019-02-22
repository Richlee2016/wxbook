import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Ctitle, Cmore } from '../../components/common'
import { BlockBoxC } from '../../components/bookblock'
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
    this.props.DataBase.FetchChannel(this.$router.params.id)
  }

  render () {
    const { DataBase: { Channel } } = this.props
    const mapChannel = toJS(Channel).list.map(o => {
      return (
        <View className='home-box' key={o.referenceId}>
          <View className='clear-line' />
          <Ctitle title={o.name} />
          <BlockBoxC data={o.list} />
          <Cmore btns={['查看更多']} onBtn={this.navigateTo} />
        </View>
      )
    })
    return (
      <View className='channel'>
        {mapChannel}
      </View>
    )
  }
}

export default Banner

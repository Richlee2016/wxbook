import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Scroll from '../../components/scroll'
import { observer, inject } from '@tarojs/mobx'
import { toJS } from 'mobx'
import { BlockBoxC } from '../../components/bookblock'
import './index.less'
// FIXME:记录滚动条位置
@inject('DataBase')
@observer
class RankVod extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url) {
    Taro.navigateTo({ url: url })
  }

  componentDidMount () {
    this.props.DataBase.SetRankGroup(0, this.$router.params.id)
    this.props.DataBase.FetchRankVod()
  }

  FetchScroll = () => this.props.DataBase.FetchRankVod()
  SetNav = i => {
    this.props.DataBase.SetRankGroup(i)
    this.props.DataBase.FetchRankVod()
  }
  render () {
    const { DataBase: { RankVod, RankGroup } } = this.props
    const mapNav = toJS(RankGroup).group.map((o, i) => <View onClick={this.SetNav.bind(this, i)} className='rank-nav' key={o.id}>{o.label}</View>)
    const isActive = { left: RankGroup.index * 88 + 'px' }
    return (
      <View className='rankvod'>
        <Scroll onLower={this.FetchScroll} isLower={RankVod.isLower}>
          <View className='ran-head'>
            <View className='nav-box'>
              {mapNav}
              <View className='active-line' style={isActive}><View className='line' /></View>
            </View>
            <View className='clear-line' />
          </View>
          <View className='re-box'>
            <BlockBoxC data={toJS(RankVod.list)} />
          </View>
        </Scroll>
      </View>
    )
  }
}

export default RankVod

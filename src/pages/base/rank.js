import Taro, { Component } from '@tarojs/taro'
import { View, Image, NavigateTo } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { toJS } from 'mobx'
import './index.less'

@inject('DataBase')
@observer
class Rank extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (vod) {
    console.log(`/rankvod?id=${vod.id}`)
    Taro.navigateTo({ url: `rankvod?id=${vod.id}` })
  }

  componentDidMount () {
    this.props.DataBase.FetchRank()
  }

  render () {
    const { DataBase: { Rank } } = this.props
    const mapRanks = toJS(Rank).map(o => {
      const mapText = o.description.map((d, di) => <View key={di}>{di + 1}、{d}</View>)
      return (
        <View className='rank-box' onClick={this.navigateTo.bind(this, o)} key={o.id}>
          <Image className='rank-img' src={o.cover} />
          <View className='rank-txt'>
            {mapText}
          </View>
        </View>
      )
    })
    return (
      <View className='rank'>
        {mapRanks}
      </View>
    )
  }
}

export default Rank

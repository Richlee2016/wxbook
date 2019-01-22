import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './zstyle.less'
export default class More extends Component {
  goToVod (vod) {
    this.props.onVod(vod)
  }
  render () {
    const { data } = this.props
    const mapCategory = data.map(o => {
      return (
        <View className='cate-vod' key={o.id} onClick={this.goToVod.bind(this, o)}>
          <View className='cate-txt'>
            <View>{o.name}</View>
            <View>{o.count}</View>
          </View>
          <Image className='cate-img' src={o.cover1 || o.cover2} />
        </View>
      )
    })
    return (
      <View className='category-box'>
        {mapCategory}
      </View>
    )
  }
}

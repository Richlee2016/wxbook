import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Ctitle, Ccategory } from '../../components/common'
import './index.less'

@inject('DataBase')
@observer
class Category extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (vod) {
    vod.children.unshift({ label: '全部', category_id: vod.id })
    this.props.DataBase.SetCategoryGroup(0, vod.children)
    Taro.navigateTo({ url: `categoryvod?id=${vod.id}` })
  }

  componentDidMount () {
    this.props.DataBase.FetchCategory()
  }

  render () {
    const { DataBase: { Category } } = this.props
    return (
      <View className='category'>
        <Ctitle title={'男生小说'} />
        <Ccategory data={Category.male} onVod={this.navigateTo} />
        <View className='clear-line' />
        <Ctitle title={'女生小说'} />
        <Ccategory data={Category.female} />
      </View>
    )
  }
}

export default Category

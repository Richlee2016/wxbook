import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import Scroll from '../../components/scroll'
import { observer, inject } from '@tarojs/mobx'
import { toJS } from 'mobx'
import { BlockBoxC } from '../../components/bookblock'
import './index.less'
// FIXME:记录每个id的滑动距离
@inject('DataBase')
@observer
class Categoryvod extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url) {
    Taro.navigateTo({ url: url })
  }

  componentDidMount () {
    this.props.DataBase.SetCategoryGroup(0)
    this.props.DataBase.FetchCategoryVod({ id: this.$router.params.id })
  }

  FetchScroll = () => {
    const { id, type } = this.props.DataBase.CategoryVod
    this.props.DataBase.FetchCategoryVod({ id, type })
  }
  GroupChange = (i) => {
    this.props.DataBase.SetCategoryGroup(i)
    const { index, group } = this.props.DataBase.CategoryGroups
    const id = group[index].category_id
    this.props.DataBase.FetchCategoryVod(id)
  }
  TypeChange = type => {
    const { id } = this.props.DataBase.CategoryVod
    this.props.DataBase.FetchCategoryVod({ id, type })
  }

  render () {
    const typeList = [
      {
        label: '热门',
        value: 'click'
      },
      {
        label: '最新',
        value: 'latest'
      },
      {
        label: '完结',
        value: 'finish'
      }
    ]
    let { DataBase: { CategoryVod, CategoryGroups } } = this.props
    const dataBox = toJS(CategoryVod).list[toJS(CategoryVod).type]
    const mapGroup = toJS(CategoryGroups).group.map((o, i) => {
      return (
        <View
          key={o.category_id}
          className={i === CategoryGroups.index ? 'active hbox' : 'hbox'}
          onClick={this.GroupChange.bind(this, i)}>
          {o.label}
        </View>
      )
    })
    const mapType = typeList.map((o, i) => {
      return (
        <View
          key={o.value}
          className={o.value === CategoryVod.type ? 'active hbox' : 'hbox'}
          onClick={this.TypeChange.bind(this, o.value)}>
          {o.label}
        </View>
      )
    })
    return (
      <View className='recommend'>
        <Scroll onLower={this.FetchScroll} isLower={CategoryVod.isLower}>
          <View className='rec-head'>
            <View className='head'>{mapGroup}</View>
            <View className='head'>{mapType}</View>
            <View className='clear-line' />
          </View>
          <View className='re-box'>
            <BlockBoxC data={dataBox} />
          </View>
        </Scroll>
      </View>
    )
  }
}

export default Categoryvod

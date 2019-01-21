import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Swiper, SwiperItem, CoverImage, Navigator, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { toJS } from 'mobx'
import Search from '../../components/search'
import Scroll from '../../components/scroll'
import { Ctitle, Cmore } from '../../components/common'
import { BlockBoxA, BlockBoxB, BlockBoxC } from '../../components/bookblock'
import { imgBody, imgClassfy, imgFree, imgGirl, imgRank } from './icon'
import './index.less'

@inject('HomeStore')
@observer
class Index extends Component {
  config = {
    navigationBarTitleText: '熊猫人之书城联盟'
  }

  navigateTo (url) {
    console.log(url)
    // Taro.navigateTo({ url: url })
  }
  /** handle 处理 */
  RecommendTab = type => this.props.HomeStore.RecommendTab(type)
  RecommendMore =type => this.props.HomeStore.RecommendMore(type)
  GirlTab =type => this.props.HomeStore.GirlTab(type)
  BoyTab =type => this.props.HomeStore.BoyTab(type)
  FallsDown = () => this.props.HomeStore.FallsDown()
  /** handle 处理 */
  tolower () {
    console.log(321)
  }
  componentDidMount () {
    this.props.HomeStore.FallsDown()
  }
  render () {
    const { HomeStore: { Data, Recommend, Girl, Boy, Falls } } = this.props
    const mapTopic = Data.topic.list.map(top => {
      return (
        <Navigator key={top.referenceId} className='box'>
          <Image className='img' src={top.img} />
        </Navigator>
      )
    })
    const myswipre = {
      imgUrls: Data.banner,
      indicatorDots: false,
      autoplay: true,
      loop: true,
      interval: 5000,
      duration: 1000
    }

    const banners = myswipre.imgUrls.map(ban => {
      return (
        <SwiperItem key={ban.img} className='swiper-item'>
          <CoverImage src={ban.img} />
        </SwiperItem>
      )
    })
    const barSet = [
      {
        icon: imgFree,
        name: '免费'
      },
      {
        icon: imgGirl,
        name: '女生'
      },
      {
        icon: imgBody,
        name: '男生'
      },
      {
        icon: imgClassfy,
        name: '分类'
      },
      {
        icon: imgRank,
        name: '排行'
      }
    ]
    const navBar = barSet.map((nav, index) => {
      return (
        <Navigator className='bar-box' key={index}>
          <CoverImage className='bar-icon'src={nav.icon} />
          <Text className='bar-text'>{nav.name}</Text>
        </Navigator>
      )
    })
    return (
      <View className='index'>
        <Scroll onLower={this.FallsDown}>
          <Search />
          <Swiper
            className='swiper-box'
            indicatorDots={myswipre.indicatorDots}
            loop={myswipre.loop}
            autoplay={myswipre.autoplay}
            interval={myswipre.interval}
            duration={myswipre.duration}>
            {banners}
          </Swiper>
          <View className='nav-bar'>
            {navBar}
          </View>
          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='本周最火' />
            <BlockBoxA data={Data.hot} />
            <Cmore btns={['查看更多']} onBtn={this.navigateTo} />
          </View>

          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='重磅推荐' tab onTab={this.RecommendTab} />
            <BlockBoxB data={Recommend} />
            <Cmore btns={['换一换', '查看全部']} onBtn={this.RecommendMore} />
          </View>
          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='女生最爱' />
            <BlockBoxC data={Girl} />
            <Cmore btns={['换一换', '女生频道>>']} onBtn={this.GirlTab} />
          </View>
          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='男生最爱' />
            <BlockBoxC data={Boy} />
            <Cmore btns={['换一换', '男生频道>>']} onBtn={this.BoyTab} />
          </View>

          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='限时免费' />
            <BlockBoxA data={Data.free} />
            <Cmore btns={['更多限免佳作>>']} onBtn={this.navigateTo} />
          </View>
          <View className='clear-line' />
          <View className='home-box'>
            <Ctitle title='精选专题' label='热' />
            <View className='home-topic'>
              {mapTopic}
            </View>
            <Cmore btns={['更多精彩专题>>']} onBtn={this.navigateTo} />
          </View>
          <View className='clear-line' />
          <BlockBoxC data={toJS(Falls)} />
        </Scroll>
      </View>
    )
  }
}

export default Index

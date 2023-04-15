/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '阿晴帮助',
  subTitle: 'Yunzai-Bot & AQing-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  }
}

export const helpList = [{
  group: '基础功能',
  list: [{
    icon: 61,
    title: '来份舔狗日记',
    desc: '舔狗的专属日记'
  }, {
    icon: 63,
    title: '#星座',
    desc: '星座运势，如#白羊'
  }, {
    icon: 66,
    title: '来份鸡汤',
    desc: '毒鸡汤'
  }]
}, {
  group: '管理命令，仅管理员可用',
  auth: 'master',
  list: [{
    icon: 85,
    title: '#阿晴更新',
    desc: '更新插件'
  }]
}]

export const isSys = true

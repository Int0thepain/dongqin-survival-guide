import { defineConfig } from 'vitepress'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'dongqin-survival-guide'
const base = process.env.VITEPRESS_BASE ?? (process.env.GITHUB_ACTIONS ? `/${repoName}/` : '/')
const siteUrl = 'https://int0thepain.github.io/dongqin-survival-guide'
const repoUrl = 'https://github.com/Int0thepain/dongqin-survival-guide'
const pdfUrl = `${siteUrl}/downloads/dongqin-survival-guide.pdf`

export default defineConfig({
  title: '东秦生存手册',
  description: '东北大学秦皇岛校区生活与学习经验手册',
  lang: 'zh-CN',
  base,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/images/campus-map.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '阅读指南', link: '/00-项目说明与更新规则' },
      { text: '全书阅读', link: '/book-print' },
      { text: '下载 PDF', link: pdfUrl },
      { text: '待补充', link: '/TODO-可补充内容' },
      { text: 'GitHub 仓库', link: repoUrl }
    ],
    sidebar: [
      {
        text: '序',
        items: [
          { text: '项目说明与更新规则', link: '/00-项目说明与更新规则' },
          { text: '校区概况', link: '/01-校区概况' }
        ]
      },
      {
        text: '入学篇',
        items: [
          { text: '报到入学', link: '/02-报到入学' },
          { text: '军训与智慧校园', link: '/03-军训与智慧校园' },
          { text: '学费缴费与证件', link: '/09-学费缴费与证件' }
        ]
      },
      {
        text: '生活篇',
        items: [
          { text: '宿舍生活', link: '/04-宿舍生活' },
          { text: '宿舍详解与选择建议', link: '/13-宿舍详解与选择建议' },
          { text: '饮食指南', link: '/05-饮食指南' },
          { text: '生活服务', link: '/07-生活服务' },
          { text: '交通与周边', link: '/08-交通与周边' },
          { text: '生活常见问题', link: '/15-生活常见问题' }
        ]
      },
      {
        text: '学习与经验篇',
        items: [
          { text: '学习场所与校园跑', link: '/06-学习场所与校园跑' },
          { text: '学习选课与成绩 FAQ', link: '/14-学习选课与成绩FAQ' },
          { text: '学长学姐经验', link: '/11-学长学姐经验' }
        ]
      },
      {
        text: '附录',
        items: [
          { text: '重要联系方式与安全', link: '/10-重要联系方式与安全' },
          { text: '地图与电话簿', link: '/12-附件地图与电话簿' },
          { text: '校园社群与信息渠道', link: '/16-校园社群与信息渠道' },
          { text: '可补充内容清单', link: '/TODO-可补充内容' },
          { text: '全书阅读版', link: '/book-print' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      label: '本页目录',
      level: [2, 3]
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新'
    },
    editLink: false,
    socialLinks: []
  }
})

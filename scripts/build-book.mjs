import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const docsDir = join(root, 'docs')

const chapters = [
  ['序', [
    ['项目说明与更新规则', '00-项目说明与更新规则.md'],
    ['校区概况', '01-校区概况.md']
  ]],
  ['入学篇', [
    ['报到入学', '02-报到入学.md'],
    ['军训与智慧校园', '03-军训与智慧校园.md'],
    ['学费缴费与证件', '09-学费缴费与证件.md']
  ]],
  ['生活篇', [
    ['宿舍生活', '04-宿舍生活.md'],
    ['宿舍详解与选择建议', '13-宿舍详解与选择建议.md'],
    ['饮食指南', '05-饮食指南.md'],
    ['生活服务', '07-生活服务.md'],
    ['交通与周边', '08-交通与周边.md'],
    ['生活常见问题', '15-生活常见问题.md']
  ]],
  ['学习与经验篇', [
    ['学习场所与校园跑', '06-学习场所与校园跑.md'],
    ['学习选课与成绩 FAQ', '14-学习选课与成绩FAQ.md'],
    ['学长学姐经验', '11-学长学姐经验.md']
  ]],
  ['附录', [
    ['重要联系方式与安全', '10-重要联系方式与安全.md'],
    ['地图与电话簿', '12-附件地图与电话簿.md'],
    ['校园社群与信息渠道', '16-校园社群与信息渠道.md'],
    ['更新日志', '17-更新日志.md'],
    ['贡献榜', '18-贡献榜.md'],
    ['可补充内容清单', 'TODO-可补充内容.md']
  ]]
]

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\s*/, '')
}

function stripFirstHeading(content) {
  return content.replace(/^# .+\r?\n+/, '')
}

function demoteHeadings(content) {
  return content
    .replace(/^# /gm, '### ')
    .replace(/^## /gm, '#### ')
    .replace(/^### /gm, '##### ')
}

let body = `---
title: 全书阅读版
aside: false
editLink: false
lastUpdated: false
---

# 东秦生存手册：全书阅读版

> 本页面由各章节 Markdown 自动合并生成，适合连续阅读、浏览器打印或导出 PDF。

[[toc]]

`

for (const [partTitle, items] of chapters) {
  body += `\n## ${partTitle}\n\n`
  for (const [title, file] of items) {
    const raw = readFileSync(join(docsDir, file), 'utf8')
    const content = demoteHeadings(stripFirstHeading(stripFrontmatter(raw)))
    body += `\n### ${title}\n\n${content.trim()}\n\n`
  }
}

writeFileSync(join(docsDir, 'book-print.md'), body, 'utf8')

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import MarkdownIt from 'markdown-it'
import { chromium } from 'playwright'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const docs = join(root, 'docs')
const dist = join(root, 'docs', '.vitepress', 'dist')
const downloads = join(dist, 'downloads')
const tmp = join(root, 'tmp', 'pdf')
mkdirSync(downloads, { recursive: true })
mkdirSync(tmp, { recursive: true })

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})

const bookMarkdown = readFileSync(join(docs, 'book-print.md'), 'utf8')
  .replace(/^---[\s\S]*?---\s*/, '')
  .replace('[[toc]]', '')
  .replace(/^# 东秦生存手册：全书阅读版\s*/, '')
  .replace(/^> 本页面由各章节 Markdown 自动合并生成，适合连续阅读、浏览器打印或导出 PDF。\s*/m, '')

const imagesUrl = pathToFileURL(join(docs, 'public', 'images')).href
const contentHtml = md.render(bookMarkdown)
  .replaceAll('src="/images/', `src="${imagesUrl}/`)

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <title>东秦生存手册</title>
  <style>
    @page {
      size: A4;
      margin: 22mm 18mm 20mm 18mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      color: #1f2933;
      background: #fff;
      font-family: "Microsoft YaHei", "Noto Sans CJK SC", "PingFang SC", "Source Han Sans SC", Arial, sans-serif;
      font-size: 10.8pt;
      line-height: 1.78;
    }

    .cover {
      min-height: 248mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      page-break-after: always;
      border-top: 8px solid #244c8f;
      border-bottom: 1px solid #d8dee9;
      padding: 12mm 0;
    }

    .cover-kicker {
      color: #5b6f92;
      font-size: 12pt;
      letter-spacing: 0;
      margin-bottom: 8mm;
    }

    .cover h1 {
      margin: 0;
      color: #12233f;
      font-size: 34pt;
      line-height: 1.18;
      font-weight: 800;
    }

    .cover-subtitle {
      margin-top: 8mm;
      max-width: 138mm;
      color: #46566f;
      font-size: 14pt;
      line-height: 1.7;
    }

    .cover-meta {
      margin-top: 28mm;
      color: #68758a;
      font-size: 10pt;
      line-height: 1.9;
    }

    .toc {
      page-break-after: always;
    }

    .toc h2 {
      margin-top: 0;
      border-bottom: 2px solid #244c8f;
      padding-bottom: 4mm;
      color: #12233f;
      font-size: 20pt;
    }

    .toc ol {
      margin: 7mm 0 0;
      padding-left: 0;
      list-style: none;
      columns: 2;
      column-gap: 14mm;
    }

    .toc li {
      break-inside: avoid;
      margin: 0 0 3mm;
      color: #32445c;
      font-size: 10.5pt;
    }

    main {
      max-width: 170mm;
      margin: 0 auto;
    }

    h2 {
      margin: 0 0 8mm;
      padding-top: 5mm;
      color: #12233f;
      font-size: 22pt;
      line-height: 1.25;
      page-break-before: always;
      border-bottom: 2px solid #244c8f;
      padding-bottom: 4mm;
    }

    h2:first-child {
      page-break-before: auto;
    }

    h3 {
      margin: 9mm 0 4mm;
      color: #1b3158;
      font-size: 16pt;
      line-height: 1.35;
      page-break-after: avoid;
    }

    h4 {
      margin: 6mm 0 2mm;
      color: #23364f;
      font-size: 12.5pt;
      line-height: 1.45;
      page-break-after: avoid;
    }

    h5 {
      margin: 4mm 0 1.5mm;
      color: #35465e;
      font-size: 11.2pt;
      page-break-after: avoid;
    }

    p {
      margin: 0 0 3.2mm;
      text-align: justify;
    }

    blockquote {
      margin: 5mm 0;
      padding: 3mm 5mm;
      color: #3c4a5f;
      background: #f5f7fb;
      border-left: 3px solid #244c8f;
    }

    ul, ol {
      margin: 0 0 4mm 6mm;
      padding-left: 6mm;
    }

    li {
      margin: 1.2mm 0;
    }

    a {
      color: #244c8f;
      text-decoration: none;
      overflow-wrap: anywhere;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 5mm 0 7mm;
      font-size: 9.2pt;
      page-break-inside: avoid;
    }

    th {
      background: #eef3fb;
      color: #1b3158;
      font-weight: 700;
    }

    th, td {
      border: 1px solid #ccd6e3;
      padding: 2.2mm 2.6mm;
      vertical-align: top;
    }

    img {
      display: block;
      max-width: 100%;
      max-height: 235mm;
      object-fit: contain;
      margin: 5mm auto 8mm;
      page-break-inside: avoid;
    }

    hr {
      border: none;
      border-top: 1px solid #d8dee9;
      margin: 7mm 0;
    }

    code {
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.92em;
      background: #f4f6f8;
      padding: 0.2em 0.35em;
      border-radius: 3px;
    }

    pre {
      white-space: pre-wrap;
      background: #f4f6f8;
      padding: 4mm;
      border: 1px solid #d9e0ea;
      border-radius: 4px;
      page-break-inside: avoid;
    }
  </style>
</head>
<body>
  <section class="cover">
    <div class="cover-kicker">东北大学秦皇岛校区生活与学习经验手册</div>
    <h1>东秦生存手册</h1>
    <p class="cover-subtitle">从报到、宿舍、食堂、校园网到选课和生活服务，把新生最容易卡住的地方整理成可以持续更新的版本。</p>
    <div class="cover-meta">
      <div>Markdown 归档版 / 网页发布版 / PDF 阅读版</div>
      <div>项目地址：https://github.com/Int0thepain/dongqin-survival-guide</div>
      <div>网页地址：https://int0thepain.github.io/dongqin-survival-guide/</div>
    </div>
  </section>
  <section class="toc">
    <h2>目录</h2>
    <ol>
      <li>序</li>
      <li>校区概况</li>
      <li>入学篇</li>
      <li>报到入学</li>
      <li>军训与智慧校园</li>
      <li>学费缴费与证件</li>
      <li>生活篇</li>
      <li>宿舍生活</li>
      <li>饮食指南</li>
      <li>生活服务</li>
      <li>交通与周边</li>
      <li>学习与经验篇</li>
      <li>重要联系方式与安全</li>
      <li>地图与电话簿</li>
    </ol>
  </section>
  <main>${contentHtml}</main>
</body>
</html>`

const htmlPath = join(tmp, 'dongqin-survival-guide.html')
writeFileSync(htmlPath, html, 'utf8')

const browser = await chromium.launch({ headless: true })
const page = await browser.newPage()
const target = pathToFileURL(resolve(htmlPath)).href

await page.goto(target, { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })
await page.pdf({
  path: join(downloads, 'dongqin-survival-guide.pdf'),
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: '<div style="font-size:8px;color:#8a94a6;width:100%;padding:0 18mm;text-align:right;">东秦生存手册</div>',
  footerTemplate: '<div style="font-size:8px;color:#8a94a6;width:100%;padding:0 18mm;display:flex;justify-content:space-between;"><span>int0thepain.github.io/dongqin-survival-guide</span><span><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>',
  margin: {
    top: '20mm',
    right: '16mm',
    bottom: '20mm',
    left: '16mm'
  }
})

await browser.close()

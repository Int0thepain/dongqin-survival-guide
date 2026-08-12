import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const docsDir = fileURLToPath(new URL('../docs/', import.meta.url))
const updated = '2026-08-12'
const pdfSource = '《东北大学(秦皇岛)2026届新生入学生活指南.pdf》（源文件修改时间：2026-08-11）'

const sources = new Map([
  ['00-', pdfSource],
  ['01-', pdfSource],
  ['02-', pdfSource],
  ['03-', pdfSource],
  ['04-', pdfSource],
  ['05-', pdfSource],
  ['06-', pdfSource],
  ['07-', pdfSource],
  ['08-', pdfSource],
  ['09-', pdfSource],
  ['10-', pdfSource],
  ['11-', pdfSource],
  ['12-', pdfSource],
  ['13-', '《关于住宿情况（图文版）2026小修版.docx》（源文件修改时间：2026-08-11）'],
  ['14-', '《学习类Q&A.docx》与补充材料记录（源文件修改时间：2026-08-11）'],
  ['15-', '《生活常见问题解答.docx》（源文件修改时间：2026-08-11）'],
  ['16-', '《一些你可能用到的群.docx》（源文件修改时间：2026-08-11）'],
  ['TODO-', 'PDF 与补充材料整理后的缺口清单（整理时间：2026-08-12）']
])

const marker = '<!-- meta:start -->'
const end = '<!-- meta:end -->'
const files = readdirSync(docsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => entry.name)

for (const [prefix, source] of sources) {
  const name = files.find((file) => file.startsWith(prefix))
  if (!name) throw new Error(`No Markdown file found for prefix ${prefix}`)

  const path = join(docsDir, name)
  let text = readFileSync(path, 'utf8')
  const block = `${marker}\n> 最后更新：${updated}  \n> 信息来源：${source}\n${end}\n\n`

  if (text.includes(marker) && text.includes(end)) {
    const before = text.slice(0, text.indexOf(marker))
    const after = text.slice(text.indexOf(end) + end.length).replace(/^\n+/, '')
    text = before + block + after
  } else {
    text = text.replace(/^(# .+\n)/, `$1\n${block}`)
  }

  writeFileSync(path, text, 'utf8')
  console.log(name)
}

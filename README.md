# 东秦生存手册

> 基于《东北大学(秦皇岛)2026届新生入学生活指南.pdf》整理的 Markdown 归档版。

**在线阅读**：[https://int0thepain.github.io/dongqin-survival-guide/](https://int0thepain.github.io/dongqin-survival-guide/)

**下载 PDF**：[dongqin-survival-guide.pdf](https://int0thepain.github.io/dongqin-survival-guide/downloads/dongqin-survival-guide.pdf)

Cloudflare Pages 备用部署后，也可以在 Cloudflare 站点顶部点击“下载 PDF”，文件由 `docs/public/downloads/` 随站点一起发布。

本仓库适合继续扩展为班级版、年级版或公开网页版生存手册。当前内容先按主题拆分，方便后续在 GitHub、GitHub Pages、VitePress 或其他文档站中维护。

## 网站预览

本项目已配置为 VitePress 文档站，公开网页地址为：

- [东秦生存手册在线阅读](https://int0thepain.github.io/dongqin-survival-guide/)
- [提交反馈或补充](https://github.com/Int0thepain/dongqin-survival-guide/issues)

本地预览：

```powershell
npm install
npm run docs:dev
```

本地预览默认打开 `http://127.0.0.1:5173/`。

生成全书 PDF：

```powershell
npm run book:pdf
```

PDF 输出位置：`docs/.vitepress/dist/downloads/dongqin-survival-guide.pdf`。线上部署后可在网站顶部点击“下载 PDF”。

## 阅读入口

- [项目说明与更新规则](docs/00-项目说明与更新规则.md)
- [校区概况](docs/01-校区概况.md)
- [报到入学](docs/02-报到入学.md)
- [军训与智慧校园](docs/03-军训与智慧校园.md)
- [宿舍生活](docs/04-宿舍生活.md)
- [宿舍详解与选择建议](docs/13-宿舍详解与选择建议.md)
- [饮食指南](docs/05-饮食指南.md)
- [学习场所与校园跑](docs/06-学习场所与校园跑.md)
- [学习选课与成绩 FAQ](docs/14-学习选课与成绩FAQ.md)
- [生活服务](docs/07-生活服务.md)
- [交通与周边](docs/08-交通与周边.md)
- [生活常见问题](docs/15-生活常见问题.md)
- [学费缴费与证件](docs/09-学费缴费与证件.md)
- [重要联系方式与安全](docs/10-重要联系方式与安全.md)
- [学长学姐经验](docs/11-学长学姐经验.md)
- [附件：地图与电话簿](docs/12-附件地图与电话簿.md)
- [校园社群与信息渠道](docs/16-校园社群与信息渠道.md)
- [可补充内容清单](docs/TODO-可补充内容.md)

## 本地归档

- 原始 PDF：`东北大学(秦皇岛)2026届新生入学生活指南.pdf`
- 原始抽取文本：`archive/original-extracted-text.md`
- 附件图片：`assets/images/`

## 许可证

本项目正文内容采用 [CC BY-NC-SA 4.0](LICENSE) 授权：允许分享和改编，但需注明来源、不得用于商业用途，并以相同方式共享。

学校官方通知、规章制度、系统信息、地图图片、第三方材料等，其版权和解释权仍归原权利人所有。

## 维护建议

- 日常编辑使用 Markdown。
- 重要信息保留“最后更新时间”和“信息来源”。
- 涉及收费、报到时间、系统入口、电话号码的信息，每学期开学前统一校对一次。
- 如果发布为网页，建议使用 GitHub Pages + VitePress。

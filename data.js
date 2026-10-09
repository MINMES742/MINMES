/* ============================================================
 *  personal-site/data.js
 *  这里是你唯一需要修改的文件。
 *  把下面的占位内容换成你自己的信息，保存后刷新浏览器即可生效。
 *  单引号 ' 或双引号 " 都行；每项末尾的逗号不要漏。
 * ============================================================ */

const PROFILE = {
  /* ---------- 基本资料 ---------- */
  name: '林舟',
  avatar: '林',                    // 头像占位字符；想用自己的图片就填图片路径，如 'avatar.jpg'
  role: '产品设计师 / 前端开发',
  tagline: '把复杂的事情做简单，把简单的事情做扎实。',
  location: '中国 · 杭州',
  availability: '开放合作机会',     // 留空字符串则不显示这枚小标签

  /* ---------- 关于我 ---------- */
  about: [
    '你好，我是林舟。过去几年我一直在做同一件事：让产品既好用，也好看。',
    '我喜欢从真实的使用场景出发——先弄清楚人在为什么发愁，再去谈界面和代码。工作日写设计稿和组件，周末折腾副业项目和技术博客。',
    '如果你有想法想聊聊，或者只是想交换一下看法，随时写信给我。'
  ],

  /* ---------- 关键数字（想删就设为空数组 []） ---------- */
  stats: [
    { value: '5+', label: '从业年限' },
    { value: '20+', label: '完成项目' },
    { value: '3', label: '长期维护的开源库' }
  ],

  /* ---------- 技能：level 为 0-100，用于进度条 ---------- */
  skills: [
    {
      group: '设计',
      items: [
        { name: '交互设计', level: 90 },
        { name: '视觉与排版', level: 82 },
        { name: '设计系统', level: 78 }
      ]
    },
    {
      group: '开发',
      items: [
        { name: 'HTML / CSS', level: 92 },
        { name: 'JavaScript / TypeScript', level: 85 },
        { name: 'React / Vue', level: 80 },
        { name: 'Node.js', level: 68 }
      ]
    },
    {
      group: '其他',
      items: [
        { name: '产品需求梳理', level: 75 },
        { name: '数据分析', level: 62 },
        { name: '团队协作与文档', level: 88 }
      ]
    }
  ],

  /* ---------- 项目经历 ---------- */
  projects: [
    {
      name: '云端笔记应用',
      period: '2024 — 至今',
      summary: '一款以本地优先为原则的笔记工具，支持离线编辑与端到端加密同步。',
      tags: ['React', 'IndexedDB', '加密同步'],
      link: 'https://example.com',
      linkText: '查看项目'
    },
    {
      name: '设计系统 Aurora',
      period: '2023 — 2024',
      summary: '为团队搭建的组件库与设计规范，覆盖 60+ 组件，接入 4 条业务线。',
      tags: ['设计系统', '组件库', '文档'],
      link: 'https://example.com',
      linkText: '查看项目'
    },
    {
      name: '数据看板重构',
      period: '2023',
      summary: '把原本堆满表格的后台改造成可自由拼装的看板，人均操作步骤减少约 40%。',
      tags: ['可视化', '性能优化'],
      link: 'https://example.com',
      linkText: '查看项目'
    },
    {
      name: '个人博客',
      period: '长期',
      summary: '记录工程实践与设计思考，累计 80 余篇长文，订阅者约 3000。',
      tags: ['写作', '静态站点'],
      link: 'https://example.com',
      linkText: '去逛逛'
    }
  ],

  /* ---------- 联系方式：icon 可选 github / mail / link ---------- */
  contacts: [
    { label: 'GitHub', value: 'github.com/yourname', link: 'https://github.com/yourname', icon: 'github' },
    { label: '邮箱', value: 'you@example.com', link: 'mailto:you@example.com', icon: 'mail' },
    { label: '博客', value: 'blog.example.com', link: 'https://blog.example.com', icon: 'link' }
  ],

  /* ---------- 页脚 ---------- */
  footer: '用 HTML 与 CSS 手写而成，没有框架。'
};

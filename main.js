/* ============================================================
 *  personal-site/main.js
 *  负责把 data.js 里的内容渲染成页面，并处理交互。
 *  一般情况下你不需要改这个文件。
 * ============================================================ */

(function () {
  'use strict';

  var P = typeof PROFILE !== 'undefined' ? PROFILE : {};
  var $ = function (id) { return document.getElementById(id); };

  /* ---------- 小工具 ---------- */

  // 安全创建元素：文本用 textContent，绝不拼接 HTML
  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text !== undefined && text !== null && text !== '') n.textContent = text;
    return n;
  }

  function clear(node) { if (node) node.textContent = ''; }

  function safeUrl(url) {
    if (typeof url !== 'string') return '';
    var u = url.trim();
    if (/^(https?:|mailto:|tel:|#|\/|\.\/|\.\.\/)/i.test(u)) return u;
    if (u && u.indexOf('://') === -1) return 'https://' + u;
    return '';
  }

  /* ---------- 图标 ---------- */
  var NS = 'http://www.w3.org/2000/svg';

  function svg(paths, extra) {
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('fill', 'none');
    s.setAttribute('stroke', 'currentColor');
    s.setAttribute('stroke-width', '1.8');
    s.setAttribute('stroke-linecap', 'round');
    s.setAttribute('stroke-linejoin', 'round');
    s.setAttribute('aria-hidden', 'true');
    (extra || []).forEach(function (a) { s.setAttribute(a[0], a[1]); });
    paths.forEach(function (d) {
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d);
      s.appendChild(p);
    });
    return s;
  }

  var ICONS = {
    github: function () {
      var s = document.createElementNS(NS, 'svg');
      s.setAttribute('viewBox', '0 0 24 24');
      s.setAttribute('fill', 'currentColor');
      s.setAttribute('aria-hidden', 'true');
      var p = document.createElementNS(NS, 'path');
      p.setAttribute('d', 'M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z');
      s.appendChild(p);
      return s;
    },
    mail: function () {
      return svg(['M3.5 6.5h17v11h-17z', 'm3.9 7.2 8.1 6 8.1-6']);
    },
    link: function () {
      return svg(['M10 13.5a4 4 0 0 0 5.7 0l2.6-2.6a4 4 0 0 0-5.7-5.7l-1.3 1.3',
                  'M14 10.5a4 4 0 0 0-5.7 0l-2.6 2.6a4 4 0 0 0 5.7 5.7l1.3-1.3']);
    },
    arrow: function () {
      return svg(['M7 17 17 7', 'M8.5 7H17v8.5']);
    }
  };

  function icon(name) {
    var fn = ICONS[name] || ICONS.link;
    return fn();
  }

  /* ============================================================
   *  渲染
   * ============================================================ */

  var NAV = [
    { id: 'about', label: '关于' },
    { id: 'skills', label: '技能' },
    { id: 'projects', label: '项目' },
    { id: 'contact', label: '联系' }
  ];

  function renderHead() {
    var name = P.name || '个人主页';
    document.title = name + ' · 个人主页';
    $('brandName').textContent = name;
    $('footerText').textContent = P.footer || '';
    $('footerCopy').textContent = '© ' + new Date().getFullYear() + ' ' + name;
  }

  function renderNav() {
    var nav = $('navLinks');
    clear(nav);
    NAV.forEach(function (item) {
      var a = el('a', '', item.label);
      a.href = '#' + item.id;
      a.dataset.target = item.id;
      nav.appendChild(a);
    });
  }

  function renderHero() {
    // 头像：填了图片路径就显示图片，否则显示首字
    var av = $('avatar');
    clear(av);
    if (P.avatar && /\.(png|jpe?g|webp|gif|svg|avif)$/i.test(P.avatar)) {
      var img = document.createElement('img');
      img.src = P.avatar;
      img.alt = (P.name || '') + ' 的头像';
      av.appendChild(img);
      av.removeAttribute('aria-hidden');
    } else {
      av.textContent = P.avatar || (P.name || '·').trim().charAt(0);
    }

    $('eyebrow').textContent = P.location ? '📍 ' + P.location : '';
    $('heroName').textContent = P.name || '';
    $('heroRole').textContent = P.role || '';
    $('heroTagline').textContent = P.tagline || '';

    var pills = $('heroPills');
    clear(pills);
    if (P.availability) {
      var pill = el('span', 'pill');
      pill.appendChild(el('span', 'dot'));
      pill.appendChild(document.createTextNode(P.availability));
      pills.appendChild(pill);
    }
    if (P.role) {
      var p2 = el('span', 'pill', P.role);
      pills.appendChild(p2);
    }

    var actions = $('heroActions');
    clear(actions);
    var mail = (P.contacts || []).filter(function (c) {
      return c.icon === 'mail' || /^mailto:/i.test(c.link || '');
    })[0];

    var a1 = el('a', 'btn btn-primary', '联系我');
    a1.href = mail && safeUrl(mail.link) ? safeUrl(mail.link) : '#contact';
    actions.appendChild(a1);

    var a2 = el('a', 'btn', '看看项目');
    a2.href = '#projects';
    actions.appendChild(a2);
  }

  function renderAbout() {
    var box = $('aboutBody');
    clear(box);
    var paras = Array.isArray(P.about) ? P.about : (P.about ? [P.about] : []);
    paras.forEach(function (t) { box.appendChild(el('p', '', t)); });

    var stats = $('stats');
    clear(stats);
    var list = Array.isArray(P.stats) ? P.stats : [];
    if (!list.length) { stats.remove(); return; }
    list.forEach(function (s) {
      var item = el('div', 'stat');
      item.appendChild(el('div', 'stat-value', s.value));
      item.appendChild(el('div', 'stat-label', s.label));
      stats.appendChild(item);
    });
  }

  function renderSkills() {
    var grid = $('skillsGrid');
    clear(grid);
    var groups = Array.isArray(P.skills) ? P.skills : [];

    groups.forEach(function (g) {
      var wrap = el('div', 'skill-group');
      wrap.appendChild(el('h3', '', g.group));
      (g.items || []).forEach(function (it) {
        var row = el('div', 'skill');

        var top = el('div', 'skill-top');
        top.appendChild(el('span', '', it.name));
        var lv = Number(it.level);
        if (isFinite(lv)) top.appendChild(el('span', '', Math.max(0, Math.min(100, lv)) + '%'));
        row.appendChild(top);

        var bar = el('div', 'bar');
        var fill = el('div', 'bar-fill');
        fill.dataset.level = String(isFinite(lv) ? Math.max(0, Math.min(100, lv)) : 0);
        bar.appendChild(fill);
        row.appendChild(bar);

        wrap.appendChild(row);
      });
      grid.appendChild(wrap);
    });
  }

  function renderProjects() {
    var list = $('projectsList');
    clear(list);
    var projects = Array.isArray(P.projects) ? P.projects : [];

    projects.forEach(function (p) {
      var card = el('article', 'project');

      var head = el('div', 'project-head');
      head.appendChild(el('h3', '', p.name));
      if (p.period) head.appendChild(el('span', 'project-period', p.period));
      card.appendChild(head);

      if (p.summary) card.appendChild(el('p', '', p.summary));

      if (Array.isArray(p.tags) && p.tags.length) {
        var tags = el('div', 'tags');
        p.tags.forEach(function (t) { tags.appendChild(el('span', 'tag', t)); });
        card.appendChild(tags);
      }

      var href = safeUrl(p.link);
      if (href) {
        var link = el('a', 'project-link');
        link.href = href;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.appendChild(document.createTextNode(p.linkText || '查看'));
        link.appendChild(ICONS.arrow());
        card.appendChild(link);
      }

      list.appendChild(card);
    });
  }

  function renderContacts() {
    var grid = $('contactGrid');
    clear(grid);
    var contacts = Array.isArray(P.contacts) ? P.contacts : [];

    contacts.forEach(function (c) {
      var href = safeUrl(c.link);
      var node = document.createElement(href ? 'a' : 'div');
      node.className = 'contact';
      if (href) {
        node.href = href;
        if (!/^mailto:|^tel:/i.test(href)) {
          node.target = '_blank';
          node.rel = 'noopener noreferrer';
        }
      }

      var ic = el('span', 'contact-icon');
      ic.appendChild(icon(c.icon));
      node.appendChild(ic);

      var txt = el('span');
      txt.appendChild(el('span', 'contact-label', c.label));
      txt.appendChild(document.createElement('br'));
      txt.appendChild(el('span', 'contact-value', c.value || c.link || ''));
      node.appendChild(txt);

      grid.appendChild(node);
    });
  }

  /* ============================================================
   *  交互
   * ============================================================ */

  function initTheme() {
    var saved = null;
    try { saved = localStorage.getItem('personal-site-theme'); } catch (e) {}
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');

    $('themeToggle').addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('personal-site-theme', next); } catch (e) {}
    });
  }

  function initReveal() {
    var targets = document.querySelectorAll('[data-reveal]');
    var fills = document.querySelectorAll('.bar-fill');

    if (!('IntersectionObserver' in window)) {
      targets.forEach ? targets.forEach(show) : Array.prototype.forEach.call(targets, show);
      Array.prototype.forEach.call(fills, function (f) { f.style.width = f.dataset.level + '%'; });
      return;
    }

    function show(node) { node.classList.add('is-in'); }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);

        // 区块进入视口时，让进度条动起来
        var bars = en.target.querySelectorAll('.bar-fill');
        Array.prototype.forEach.call(bars, function (f, i) {
          setTimeout(function () { f.style.width = f.dataset.level + '%'; }, 90 * i);
        });
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (t) { io.observe(t); });
  }

  function initScrollUi() {
    var header = $('siteHeader');
    var toTop = $('toTop');
    var links = Array.prototype.slice.call(document.querySelectorAll('#navLinks a'));

    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      header.classList.toggle('is-stuck', y > 8);
      toTop.classList.toggle('is-visible', y > 520);

      // 高亮当前区块
      var current = '';
      NAV.forEach(function (item) {
        var sec = document.getElementById(item.id);
        if (sec && sec.getBoundingClientRect().top <= 140) current = item.id;
      });
      links.forEach(function (a) {
        a.classList.toggle('is-active', a.dataset.target === current);
      });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });

    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    onScroll();
  }

  /* ---------- 启动 ---------- */
  function boot() {
    renderHead();
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderProjects();
    renderContacts();
    initTheme();
    initReveal();
    initScrollUi();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();

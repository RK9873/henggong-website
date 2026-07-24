/* 恒工五金官网 — 共享导航/页脚注入 + 交互 */
(function () {
  var COMPANY = "恒工五金制造有限公司"; // TODO: 替换为公司真实全称
  var PHONE = "0000-0000 0000";          // TODO: 替换为真实电话
  var EMAIL = "sales@henggong-hw.com";   // TODO: 替换为真实邮箱
  var ADDR = "本地工业园区 XX 路 88 号";  // TODO: 替换为真实地址

  var page = document.body.getAttribute("data-page") || "";

  var headerHTML =
    '<div class="nav-wrap">' +
    '  <a class="brand" href="index.html">' +
    '    <span class="brand-mark">恒</span>' +
    '    <span><span class="brand-name">恒工五金</span><br>' +
    '    <span class="brand-sub">SINCE 1998 · HARDWARE MFG.</span></span>' +
    '  </a>' +
    '  <button class="nav-toggle" aria-label="菜单">☰</button>' +
    '  <ul class="main-nav">' +
    '    <li><a href="index.html" data-nav="home">首页</a></li>' +
    '    <li><a href="about.html" data-nav="about">公司概况</a></li>' +
    '    <li><a href="factory.html" data-nav="factory">厂区环境</a></li>' +
    '    <li>' +
    '      <a href="products-appliance.html" data-nav="products">产品中心<span class="caret">▼</span></a>' +
    '      <ul class="dropdown-menu">' +
    '        <li><a href="products-appliance.html">家电五金</a></li>' +
    '        <li><a href="products-furniture.html">家具五金</a></li>' +
    '        <li><a href="products-machinery.html">机械设备五金</a></li>' +
    '        <li><a class="reserved">汽车零部件（筹备中）</a></li>' +
    '        <li><a class="reserved">定制加工服务（筹备中）</a></li>' +
    '      </ul>' +
    '    </li>' +
    '    <li><a href="cooperation.html" data-nav="coop">招商合作</a></li>' +
    '    <li><a href="contact.html" data-nav="contact">联系我们</a></li>' +
    '  </ul>' +
    '</div>';

  var footerHTML =
    '<div class="container">' +
    '  <div class="footer-grid">' +
    '    <div class="footer-brand">' +
    '      <div class="brand">' +
    '        <span class="brand-mark">恒</span>' +
    '        <span><span class="brand-name">恒工五金</span><br>' +
    '        <span class="brand-sub">SINCE 1998</span></span>' +
    '      </div>' +
    '      <p>' + COMPANY + '</p>' +
    '      <p style="margin-top:8px">深耕本地28年 · 成立于1998年</p>' +
    '    </div>' +
    '    <div>' +
    '      <h4>快速链接</h4>' +
    '      <ul>' +
    '        <li><a href="index.html">首页</a></li>' +
    '        <li><a href="products-appliance.html">产品中心</a></li>' +
    '        <li><a href="cooperation.html">招商合作</a></li>' +
    '      </ul>' +
    '    </div>' +
    '    <div>' +
    '      <h4>联系方式</h4>' +
    '      <ul class="footer-contact">' +
    '        <li><strong>电话：</strong>' + PHONE + '</li>' +
    '        <li><strong>邮箱：</strong>' + EMAIL + '</li>' +
    '        <li><strong>地址：</strong>' + ADDR + '</li>' +
    '      </ul>' +
    '    </div>' +
    '  </div>' +
    '</div>' +
    '<div class="footer-bottom">' +
    '  <div class="container">' + COMPANY +
    '  <span class="yellow"> 1998-2026 ©</span> 版权所有 All Rights Reserved. · 规格尺寸可依据图纸定制</div>' +
    '</div>';

  var headerEl = document.querySelector(".site-header");
  var footerEl = document.querySelector(".site-footer");
  if (headerEl) headerEl.innerHTML = headerHTML;
  if (footerEl) footerEl.innerHTML = footerHTML;

  // 移动端一键拨号悬浮按钮（电话取自 PHONE，仅手机端显示）
  var telDigits = PHONE.replace(/[^0-9]/g, "");
  var callHTML =
    '<a class="mobile-call" href="tel:' + telDigits + '" aria-label="电话咨询">' +
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z"/>' +
    '</svg><span>电话咨询</span></a>';
  document.body.insertAdjacentHTML("beforeend", callHTML);

  // 当前页高亮
  var active = document.querySelector('[data-nav="' + page + '"]');
  if (active) active.classList.add("active");

  // 移动端菜单
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () { nav.classList.toggle("open"); });
  }

  // 数字滚动动画
  var nums = document.querySelectorAll("[data-count]");
  if (nums.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target, target = parseInt(el.getAttribute("data-count"), 10);
        var start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          el.childNodes[0].nodeValue = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }

  // 表单本地提交提示（正式上线请对接后端/表单服务）
  var forms = document.querySelectorAll("form[data-demo]");
  forms.forEach(function (f) {
    f.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var ok = f.querySelector(".form-ok");
      if (ok) ok.style.display = "block";
      f.reset();
    });
  });

  // 产品"咨询该产品"按钮 → 跳转联系页并带上产品名
  document.querySelectorAll("[data-inquiry]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-inquiry");
      location.href = "contact.html?product=" + encodeURIComponent(name);
    });
  });

  // 联系页自动填充咨询产品
  if (page === "contact") {
    var m = location.search.match(/product=([^&]+)/);
    if (m) {
      var ta = document.querySelector("#need");
      if (ta) ta.value = "您好，我想咨询【" + decodeURIComponent(m[1]) + "】，请与我联系。";
    }
  }
})();

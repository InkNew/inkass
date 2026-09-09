/* ==========================================================================
   沃普乐斯 · 纯静态版交互逻辑
   ========================================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     1. 导航栏滚动毛玻璃效果
  ----------------------------------------------------------- */
  var navbar = document.getElementById("navbar");
  var mobileMenu = document.getElementById("mobileMenu");

  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  /* -----------------------------------------------------------
     2. 平滑滚动到锚点
  ----------------------------------------------------------- */
  window.scrollToSection = function (event, id) {
    event.preventDefault();
    closeMenu();
    var target = document.getElementById(id);
    if (target) {
      var offset = id === "hero" ? 0 : 60;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  };

  /* -----------------------------------------------------------
     3. 移动端汉堡菜单
  ----------------------------------------------------------- */
  window.toggleMenu = function () {
    mobileMenu.classList.toggle("open");
  };

  function closeMenu() {
    mobileMenu.classList.remove("open");
  }

  // 点击菜单外部关闭
  document.addEventListener("click", function (e) {
    var isInside = navbar.contains(e.target);
    if (!isInside && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  /* -----------------------------------------------------------
     4. 滚动渐入动画（Intersection Observer）
  ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // 可见后停止观察（仅触发一次）
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // 兼容不支持 IntersectionObserver 的浏览器：直接显示
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* -----------------------------------------------------------
     5. 留言表单提交处理
  ----------------------------------------------------------- */
  var form = document.getElementById("contactForm");
  var success = document.getElementById("formSuccess");

  if (form && success) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      // 隐藏表单，显示成功提示
      form.style.display = "none";
      success.classList.add("show");
    });
  }
})();
/* ==================== 产品详情弹窗 ==================== */
const PRODUCTS = {
  spd1024: {
    img: "images/products/psd-spd1024.jpg",
    tag: "现货 · 国产兼容替代",
    title: "EASY-LASER S单元 PSD读数板 SPD1024",
    desc: "适配 EASY-LASER 全系激光对中仪 S 单元的 PSD 读数板，高精度光电位置信号采集，参数、接口与进口原版完全一致，即插即用、直接替代。",
    brand: "湖南达嘉",
    warranty: "1 年",
    stock: "现货 10 件",
    specs: [
      ["品牌", "湖南达嘉（国产兼容替代）"],
      ["适配设备", "EASY-LASER 全系激光对中仪 S 单元"],
      ["型号", "SPD1024"],
      ["目录分类", "测量检测 / 电子检测 / 数据采集器"],
      ["质保期", "1 年"],
      ["最小起订量", "1 件"],
      ["库存", "现货 10 件"],
      ["计量单位", "件"]
    ],
    features: [
      "参数、接口与进口原版完全适配，即插即用",
      "高精度 PSD 光电位置信号采集，读数稳定",
      "直接替代 EASY-LASER 原版 S 单元读数板",
      "高性价比，货期短，避免停产断供风险"
    ],
    app: "主要用于激光对中仪接收端（S 单元）光电信号采集与精密测量，已配套中国航发南方工业有限公司等精密制造与设备维保单位。"
  },
  srd7610: {
    img: "images/products/srd-7610.jpg",
    tag: "现货 · 核心主控板",
    title: "EASY-LASER S单元主板 SRD-7610",
    desc: "EASY-LASER 激光对中仪 S 单元核心信号处理主板，负责光电数据运算与系统控制，软硬件完全兼容原版，可直接替换修复进口设备主板故障。",
    brand: "湖南达嘉",
    warranty: "1 年",
    stock: "现货 8 件",
    specs: [
      ["品牌", "湖南达嘉（国产兼容替代）"],
      ["适配设备", "EASY-LASER 激光对中仪 S 单元"],
      ["型号", "SRD-7610"],
      ["目录分类", "测量检测 / 电子检测 / 数据采集器"],
      ["质保期", "1 年"],
      ["最小起订量", "1 件"],
      ["库存", "现货 8 件"],
      ["计量单位", "件"]
    ],
    features: [
      "S 单元核心主控板，负责信号处理与系统运算",
      "软硬件与进口原版完全兼容，替换后设备性能不变",
      "解决原版主板维修贵、停产无替代问题",
      "国产高性价比，现货供应、交付快速"
    ],
    app: "用于 EASY-LASER 激光对中仪 S 单元主板损坏、老化后的国产化替换修复，恢复设备对中测量与数据采集功能，服务精密制造、设备运维企业。"
  }
};

function openModal(id) {
  const p = PRODUCTS[id];
  if (!p) return;
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalImg").alt = p.title;
  document.getElementById("modalTag").textContent = p.tag;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalDesc").textContent = p.desc;
  document.getElementById("modalBrand").textContent = p.brand;
  document.getElementById("modalWarranty").textContent = p.warranty;
  document.getElementById("modalStock").textContent = p.stock;
  document.getElementById("modalSpecs").innerHTML = p.specs
    .map(function (s) { return '<div class="spec-row"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>'; })
    .join("");
  document.getElementById("modalFeatures").innerHTML = p.features
    .map(function (f) { return "<li>" + f + "</li>"; })
    .join("");
  document.getElementById("modalApp").textContent = p.app;
  document.getElementById("productModal").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("productModal").classList.remove("open");
  document.body.style.overflow = "";
}

function closeModalBg(e) {
  if (e.target.id === "productModal") closeModal();
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

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
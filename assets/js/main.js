/* main.js — 정확히 2종(햄버거 토글 + 복사버튼). 그 외 기능 금지. */
(function () {
  "use strict";

  /* 1) 모바일 햄버거 메뉴 */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("navMenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* 2) 복사 버튼 — 대상 pre 텍스트를 클립보드로 */
  var buttons = document.querySelectorAll(".copy-btn");
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () {
      var sel = btn.getAttribute("data-target");
      var pre = sel
        ? document.querySelector(sel)
        : (btn.closest(".copy-wrap") || document).querySelector("pre");
      if (!pre) return;
      var text = pre.innerText;
      var ok = function () {
        var prev = btn.textContent;
        btn.textContent = "복사됨 ✓";
        setTimeout(function () { btn.textContent = prev; }, 2000);
      };
      var fail = function () {
        var note = btn.parentNode.querySelector(".copy-fallback");
        if (note) note.hidden = false;
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok).catch(fail);
      } else {
        fail();
      }
    });
  });
})();

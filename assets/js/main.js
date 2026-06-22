/* main.js — 3종(햄버거 토글 + 복사버튼 + 방문 카운터). 그 외 기능 금지. */
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

  /* 3) 방문 카운터 — 푸터에 사이트 전체 조회수 표시.
        정적 사이트(GitHub Pages)라 외부 익명 카운터(abacus) 사용.
        순수 방문자가 아니라 '페이지 열린 횟수'라 표기는 '방문 N회'.
        실패하면 조용히 숨김 — 카운터가 깨져도 페이지는 멀쩡. */
  var fc = document.querySelector("footer .container");
  if (fc && window.fetch) {
    var hc = document.createElement("p");
    hc.className = "gov";
    hc.id = "hit-counter";
    hc.setAttribute("aria-live", "polite");
    fc.appendChild(hc);
    fetch("https://abacus.jasoncameron.dev/hit/time-hero-ax-hub/site")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && typeof d.value === "number") {
          hc.textContent = "방문 " + d.value.toLocaleString() + "회";
        } else if (hc.parentNode) {
          hc.parentNode.removeChild(hc);
        }
      })
      .catch(function () {
        if (hc.parentNode) hc.parentNode.removeChild(hc);
      });
  }
})();

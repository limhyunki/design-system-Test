/**
 * main.js
 * SKT UX Design System — 인터랙션 로직
 */

(function () {
  'use strict';

  /* ── DOM References ── */
  const navLinks   = document.querySelectorAll('.nav-links a');
  const cards      = document.querySelectorAll('.card');
  const btnLike    = document.getElementById('btnLike');
  const btnDislike = document.getElementById('btnDislike');


  /* ════════════════════════════════════════
     NAV: Active link 처리
     ════════════════════════════════════════ */
  function setActiveNav(targetLink) {
    navLinks.forEach(l => l.classList.remove('active'));
    targetLink.classList.add('active');
  }

  function initNav() {
    navLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        setActiveNav(this);
      });
    });
  }


  /* ════════════════════════════════════════
     CARDS: 클릭 시 nav 항목 동기화
     ════════════════════════════════════════ */
  function initCards() {
    cards.forEach(card => {
      card.addEventListener('click', function (e) {
        e.preventDefault();
        const match = document.querySelector(`.nav-links a[data-section="${this.dataset.section}"]`);
        if (match) setActiveNav(match);
      });
    });
  }


  /* ════════════════════════════════════════
     FEEDBACK: 좋아요 / 별로에요 토글
     ════════════════════════════════════════ */
  function initFeedback() {
    [btnLike, btnDislike].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', function () {
        const already = this.classList.contains('selected');
        [btnLike, btnDislike].forEach(b => b && b.classList.remove('selected'));
        if (!already) this.classList.add('selected');
      });
    });
  }


  /* ════════════════════════════════════════
     SCROLL: 네비 그림자
     ════════════════════════════════════════ */
  function initScrollShadow() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(0,0,0,0.07)'
        : 'none';
    }, { passive: true });
  }


  /* ════════════════════════════════════════
     VERSION DROPDOWN
     ════════════════════════════════════════ */
  function initVersionDropdown() {
    const btn   = document.getElementById('versionBtn');
    const menu  = document.getElementById('versionMenu');
    const label = document.getElementById('versionLabel');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('open');
      menu.classList.toggle('open', !isOpen);
      btn.classList.toggle('open', !isOpen);
    });

    menu.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        menu.querySelectorAll('li').forEach(l => l.classList.remove('selected'));
        li.classList.add('selected');
        label.textContent = li.dataset.value;
        menu.classList.remove('open');
        btn.classList.remove('open');
      });
    });

    // 외부 클릭 시 닫기
    document.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
    });
  }


  /* ════════════════════════════════════════
     SEARCH: 검색바 열기 / 닫기
     ════════════════════════════════════════ */
  function initSearch() {
    const searchBtn     = document.getElementById('navSearchBtn');
    const searchBarWrap = document.getElementById('searchBarWrap');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput   = document.getElementById('searchInput');
    const searchClose   = document.getElementById('searchCloseBtn');
    if (!searchBtn) return;

    function openSearch() {
      searchBarWrap.classList.add('open');
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 220);
    }

    function closeSearch() {
      searchBarWrap.classList.remove('open');
      searchOverlay.classList.remove('open');
      searchInput.value = '';
    }

    searchBtn.addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
    searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', closeSearch);

    // ESC 키로도 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });
  }


  /* ════════════════════════════════════════
     INIT
     ════════════════════════════════════════ */
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCards();
    initFeedback();
    initScrollShadow();
    initVersionDropdown();
    initSearch();
  });

})();

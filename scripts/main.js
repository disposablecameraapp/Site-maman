/* Nathalie Astruc — interactions */
(function () {
  'use strict';

  // --- Year in footer ---
  var yEl = document.getElementById('year');
  if (yEl) yEl.textContent = String(new Date().getFullYear());

  // --- Header on scroll ---
  var header = document.getElementById('siteHeader');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primaryNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Reveal on scroll ---
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    var ans = item.querySelector('.faq-a');
    if (!btn || !ans) return;
    btn.addEventListener('click', function () {
      var open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      ans.style.maxHeight = open ? ans.scrollHeight + 'px' : '0px';
    });
  });

  // --- Contact form (graceful fallback : opens mailto) ---
  var form = document.getElementById('contactForm');
  if (form) {
    var msg = document.getElementById('formMsg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var firstName = (data.get('firstName') || '').toString().trim();
      var lastName = (data.get('lastName') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var phone = (data.get('phone') || '').toString().trim();
      var topic = (data.get('topic') || '').toString().trim();
      var message = (data.get('message') || '').toString().trim();

      if (!firstName || !email || !message) {
        if (msg) {
          msg.hidden = false;
          msg.textContent = 'Merci de remplir au moins votre prénom, votre email et votre message.';
          msg.style.color = '#8a4d36';
        }
        return;
      }

      var subject = '[Site] ' + (topic || 'Contact') + ' — ' + firstName + (lastName ? ' ' + lastName : '');
      var body =
        'Prénom : ' + firstName + '\n' +
        (lastName ? 'Nom : ' + lastName + '\n' : '') +
        'Email : ' + email + '\n' +
        (phone ? 'Téléphone : ' + phone + '\n' : '') +
        'Sujet : ' + topic + '\n\n' +
        message + '\n';

      var mailto = 'mailto:Nathalie_astruc@outlook.com'
        + '?subject=' + encodeURIComponent(subject)
        + '&body=' + encodeURIComponent(body);

      window.location.href = mailto;

      if (msg) {
        msg.hidden = false;
        msg.textContent = 'Votre client mail va s’ouvrir. Si rien ne se passe, écrivez directement à Nathalie_astruc@outlook.com.';
        msg.style.color = '#7d8a6c';
      }
    });
  }

})();

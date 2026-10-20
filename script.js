document.addEventListener('DOMContentLoaded', () => {

  /* ============ YEAR ============ */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ============ HEADER SCROLL STATE + PROGRESS BAR ============ */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  function onScroll(){
    const scrollTop = window.scrollY;
    header.classList.toggle('scrolled', scrollTop > 20);
    backToTop.classList.toggle('visible', scrollTop > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ============ MOBILE NAV ============ */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============ SCROLLSPY (active nav link) ============ */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -45% 0px' });

  sections.forEach(sec => spyObserver.observe(sec));

  /* ============ RESUME DROPDOWN ============ */
  const resumeBtn = document.getElementById('resumeBtn');
  const resumeDropdown = resumeBtn.closest('.resume-dropdown');

  resumeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    resumeDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => resumeDropdown.classList.remove('open'));

  /* ============ TYPING ROLE ROTATOR ============ */
  const roles = [
    'Java Developer',
    'Web Developer',
    'SQL Developer',
    'Manual Tester',
    'Automation Tester'
  ];
  const typedEl = document.getElementById('typedRole');
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];
    if (!deleting){
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 45 : 85);
  }
  typeLoop();

  /* ============ TERMINAL PROGRESS BAR FILL ============ */
  const progressFill = document.getElementById('progressFill');
  const terminal = document.querySelector('.terminal');
  let filled = false;
  const termObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !filled){
        filled = true;
        setTimeout(() => { progressFill.style.width = '100%'; }, 400);
      }
    });
  }, { threshold: 0.4 });
  if (terminal) termObserver.observe(terminal);

  /* ============ SKILLS TABS ============ */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.querySelector(`.tab-panel[data-panel="${target}"]`).classList.add('active');
    });
  });

  /* ============ SCROLL REVEAL ============ */
  const revealTargets = document.querySelectorAll(
    '.about-text, .about-stats, .stat-card, .timeline-item, .project-card, .edu-item, .cert-list, .contact-card, .contact-form, .skill-groups'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => revealObserver.observe(el));

  /* ============ CONTACT FORM (mailto fallback, no backend) ============ */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:shriyashdethe5@gmail.com?subject=${subject}&body=${body}`;

    formNote.textContent = 'Opening your email app to send this message…';
    form.reset();
  });

});

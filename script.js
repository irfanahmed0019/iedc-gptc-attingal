  const TEAM = [
    { name: "John Doe",   role: "Chief Executive Officer", dept: "Hardware Engg." },
    { name: "Jane Smith", role: "Chief Technology Officer", dept: "Electrical" },
    { name: "Arjun V.",   role: "Chief Operating Officer",  dept: "Mechanical" },
    { name: "Sara Khan",  role: "Finance Lead",             dept: "Automobile" },
    { name: "Kiran Raj",  role: "Technical Lead",           dept: "Hardware Engg." },
    { name: "Meera P.",   role: "Creative Lead",            dept: "Electrical" },
    { name: "Rahul S.",   role: "Events Coordinator",       dept: "Mechanical" },
    { name: "Anu Tomy",   role: "Social Media Manager",     dept: "Automobile" },
  ];

  const grid = document.getElementById('team-grid');
  const frag = document.createDocumentFragment();
  TEAM.forEach((m, i) => {
    const initials = m.name.split(' ').map(n => n[0]).join('');
    const card = document.createElement('div');
    card.className = 'member-card reveal-pop';
    card.dataset.delay = (i * 0.06).toFixed(2);
    card.innerHTML = `
      <div class="member-avatar">${initials}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role}</div>
      <div class="member-dept">${m.dept}</div>`;
    frag.appendChild(card);
  });
  grid.appendChild(frag);

  const WORDS = ["Innovation","Entrepreneurship","Prototyping","Mentorship","Hackathons","Startups","Engineering","KSUM","Kerala","Attingal"];
  const triple = [...WORDS, ...WORDS, ...WORDS];
  const track = document.getElementById('ticker-track');
  track.innerHTML = triple.map(w =>
    `<span class="ticker-word">${w}<span class="ticker-dot">·</span></span>`
  ).join('');

  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu   = document.getElementById('icon-menu');
  const iconClose  = document.getElementById('icon-close');
  let menuOpen = false;
  document.getElementById('menu-toggle').addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    iconMenu.style.display  = menuOpen ? 'none'  : 'inline-block';
    iconClose.style.display = menuOpen ? 'inline-block' : 'none';
  });
  function closeMenu() {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    iconMenu.style.display  = 'inline-block';
    iconClose.style.display = 'none';
  }

  const REVEAL_CLASSES = ['reveal','reveal-left','reveal-right','reveal-pop','reveal-clip','reveal-skew'];
  function checkReveals() {
    REVEAL_CLASSES.forEach(cls => {
      document.querySelectorAll('.' + cls + ':not(.visible)').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 40 && rect.bottom > 0) {
          const delay = parseFloat(el.dataset.delay || 0);
          setTimeout(() => el.classList.add('visible'), delay * 1000);
        }
      });
    });
  }
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseFloat(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay * 1000);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.05 });
  requestAnimationFrame(() => {
    REVEAL_CLASSES.forEach(cls => {
      document.querySelectorAll('.' + cls).forEach(el => revealObserver.observe(el));
    });
    checkReveals();
  });
  window.addEventListener('scroll', checkReveals, { passive: true });

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const duration = 1800;
      let start = null;
      const tick = (ts) => {
        if (!start) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.floor(ease * target) + suffix;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

  const progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });

  const orb = document.getElementById('glow-orb');
  const SECTIONS = ['hero','stats','about','programs','why','team','join'];
  const ORB_POSITIONS = {
    hero:     { x: 30, y: 30 }, stats:    { x: 70, y: 50 },
    about:    { x: 20, y: 60 }, programs: { x: 60, y: 40 },
    why:      { x: 80, y: 55 }, team:     { x: 40, y: 70 },
    join:     { x: 50, y: 50 },
  };
  const orbObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pos = ORB_POSITIONS[entry.target.id];
        if (pos) { orb.style.left = pos.x + 'vw'; orb.style.top = pos.y + 'vh'; }
      }
    });
  }, { threshold: 0.3 });
  SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) orbObserver.observe(el); });

  const heroLines = document.querySelectorAll('.hero-line');
  const heroDesc  = document.querySelector('.hero-desc');
  const heroBg1   = document.querySelector('.hero-bg-1');
  const heroBg2   = document.querySelector('.hero-bg-2');
  function onScroll() {
    const sy = window.scrollY;
    if (heroLines[0]) heroLines[0].style.transform = `translateY(${sy * 0.10}px)`;
    if (heroLines[1]) heroLines[1].style.transform = `translateY(${sy * 0.15}px)`;
    if (heroLines[2]) heroLines[2].style.transform = `translateY(${sy * 0.20}px)`;
    if (heroDesc)  heroDesc.style.transform  = `translateY(${sy * 0.08}px)`;
    if (heroBg1)   heroBg1.style.transform   = `translateY(${sy * 0.30}px)`;
    if (heroBg2)   heroBg2.style.transform   = `translateY(${sy * 0.20}px)`;
    updateProgress();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  const dots = document.querySelectorAll('.s-dot');
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  const dotObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach(d => d.classList.toggle('active', d.dataset.target === id));
      }
    });
  }, { threshold: 0.4 });
  SECTIONS.forEach(id => { const el = document.getElementById(id); if (el) dotObserver.observe(el); });

  let lastSY = 0;
  const tickerEl = document.querySelector('.animate-marquee');
  let tickerSpeed = 30;
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    const delta = Math.abs(sy - lastSY);
    tickerSpeed = Math.max(10, 30 - delta * 0.5);
    if (tickerEl) tickerEl.style.animationDuration = tickerSpeed + 's';
    lastSY = sy;
  }, { passive: true });

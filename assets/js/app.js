// ==========================================================================
// RUDRA PRAKASH YADAV — PORTFOLIO MAIN JAVASCRIPT CONTROLLER
// ==========================================================================

// --- Sound Effects System (Web Audio API) ---
class SoundController {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playTone(freq = 440, type = 'sine', duration = 0.08, gainVal = 0.05) {
    if (!this.enabled) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  playClick() {
    this.playTone(880, 'triangle', 0.04, 0.03);
  }

  playBeep() {
    this.playTone(1200, 'sine', 0.06, 0.04);
  }

  playSuccess() {
    this.playTone(523.25, 'sine', 0.08, 0.04);
    setTimeout(() => this.playTone(659.25, 'sine', 0.08, 0.04), 80);
    setTimeout(() => this.playTone(783.99, 'sine', 0.12, 0.05), 160);
  }
}

const sounds = new SoundController();

// --- Main App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollAnimations();
  initTypingTerminalHero();
  initToxicityDetectorDemo();
  initSmartLuggageDemo();
  initSkillsFilter();
  initComicModal();
  initCVModal();
  initSoundToggle();
  initContactForm();
  lucide.createIcons();
});

// --- Sound Toggle ---
function initSoundToggle() {
  const toggleBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    sounds.enabled = !sounds.enabled;
    if (sounds.enabled) {
      sounds.playSuccess();
      toggleBtn.classList.remove('opacity-60');
      toggleBtn.classList.add('text-cyan-400');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-2');
    } else {
      toggleBtn.classList.add('opacity-60');
      toggleBtn.classList.remove('text-cyan-400');
      if (soundIcon) soundIcon.setAttribute('data-lucide', 'volume-x');
    }
    lucide.createIcons();
  });

  // Attach subtle audio to all interactive buttons
  document.querySelectorAll('button, a, .interactive-card').forEach(el => {
    el.addEventListener('mouseenter', () => sounds.playBeep());
    el.addEventListener('click', () => sounds.playClick());
  });
}

// --- Sticky Navigation & Mobile Menu ---
function initNavbar() {
  const nav = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('glass-nav', 'py-3');
      nav.classList.remove('py-5');
    } else {
      nav.classList.remove('glass-nav', 'py-3');
      nav.classList.add('py-5');
    }

    // Scrollspy active indicator
    const sections = document.querySelectorAll('section[id]');
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400', 'border-cyan-400');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('text-cyan-400', 'border-cyan-400');
      }
    });
  });

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

// --- Scroll Reveal Animations ---
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

// --- Hero Dynamic Terminal Typing Animation ---
function initTypingTerminalHero() {
  const terminalElement = document.getElementById('hero-code-typing');
  if (!terminalElement) return;

  const lines = [
    'print("Building ideas")',
    'print("Solving problems")',
    'print("Learn every day")',
    'print("Make an impact")'
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let renderedLines = [];

  function type() {
    const currentFullLine = lines[lineIdx];
    
    let html = '';
    for (let i = 0; i < lineIdx; i++) {
      html += `<div class="text-cyan-400/80 font-mono text-xs md:text-sm"><span class="text-blue-500">>>></span> ${lines[i]}</div>`;
    }

    const currentPartial = currentFullLine.substring(0, charIdx);
    html += `<div class="text-cyan-300 font-mono text-xs md:text-sm"><span class="text-blue-500">>>></span> ${currentPartial}<span class="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span></div>`;

    terminalElement.innerHTML = html;

    if (!isDeleting && charIdx < currentFullLine.length) {
      charIdx++;
      setTimeout(type, 50);
    } else if (!isDeleting && charIdx === currentFullLine.length) {
      if (lineIdx === lines.length - 1) {
        // Finished all 4 lines, pause before restarting
        setTimeout(() => {
          lineIdx = 0;
          charIdx = 0;
          type();
        }, 5000);
      } else {
        lineIdx++;
        charIdx = 0;
        setTimeout(type, 300);
      }
    }
  }

  type();
}

// --- Interactive AI Toxicity Detector Simulator ---
function initToxicityDetectorDemo() {
  const input = document.getElementById('toxicity-input');
  const checkBtn = document.getElementById('toxicity-check-btn');
  const resultCard = document.getElementById('toxicity-result-card');
  const scoreBadge = document.getElementById('toxicity-score');
  const labelBadge = document.getElementById('toxicity-label');
  const latencyBadge = document.getElementById('toxicity-latency');
  const gaugeFill = document.getElementById('toxicity-gauge-fill');
  const exampleBtns = document.querySelectorAll('.toxicity-example-btn');

  if (!checkBtn || !input) return;

  exampleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.getAttribute('data-sample');
      analyzeText(input.value);
    });
  });

  checkBtn.addEventListener('click', () => {
    analyzeText(input.value);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      analyzeText(input.value);
    }
  });

  function analyzeText(text) {
    if (!text.trim()) {
      input.focus();
      return;
    }

    checkBtn.disabled = true;
    checkBtn.innerHTML = `<span class="inline-block animate-spin mr-2">⚙️</span> Processing NLP Model...`;

    // Authentic NLP scoring heuristics simulation
    setTimeout(() => {
      const lower = text.toLowerCase();
      let toxicScore = 0.08; // default baseline safe

      const severeWords = ['hate', 'kill', 'idiot', 'stupid', 'garbage', 'worst', 'ugly', 'trash', 'shut up', 'attack', 'horrible'];
      const mildWords = ['bad', 'annoying', 'dumb', 'crazy', 'disagree', 'nonsense', 'lame'];
      const positiveWords = ['great', 'awesome', 'inspiring', 'love', 'fantastic', 'helpful', 'thanks', 'good', 'brilliant'];

      let severeCount = 0;
      let mildCount = 0;
      let posCount = 0;

      severeWords.forEach(w => { if (lower.includes(w)) severeCount++; });
      mildWords.forEach(w => { if (lower.includes(w)) mildCount++; });
      positiveWords.forEach(w => { if (lower.includes(w)) posCount++; });

      if (severeCount > 0) {
        toxicScore = Math.min(0.75 + severeCount * 0.1, 0.98);
      } else if (mildCount > 0) {
        toxicScore = Math.min(0.40 + mildCount * 0.15, 0.68);
      } else if (posCount > 0) {
        toxicScore = Math.max(0.02, 0.12 - posCount * 0.04);
      }

      const scorePercent = (toxicScore * 100).toFixed(1);
      const latency = (Math.random() * 25 + 35).toFixed(0);

      if (resultCard) resultCard.classList.remove('hidden');
      if (scoreBadge) scoreBadge.innerText = toxicScore.toFixed(2);
      if (latencyBadge) latencyBadge.innerText = `${latency}ms (Streamlit Inference)`;

      if (gaugeFill) {
        gaugeFill.style.width = `${scorePercent}%`;
        if (toxicScore > 0.6) {
          gaugeFill.className = 'h-full bg-red-500 rounded-full transition-all duration-500';
          labelBadge.className = 'px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40';
          labelBadge.innerText = '⚠️ Toxic Content Detected';
        } else if (toxicScore > 0.3) {
          gaugeFill.className = 'h-full bg-yellow-500 rounded-full transition-all duration-500';
          labelBadge.className = 'px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-500/20 text-yellow-400 border border-yellow-500/40';
          labelBadge.innerText = '⚡ Borderline / Mild';
        } else {
          gaugeFill.className = 'h-full bg-emerald-500 rounded-full transition-all duration-500';
          labelBadge.className = 'px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40';
          labelBadge.innerText = '✅ Safe / Non-Toxic';
        }
      }

      checkBtn.disabled = false;
      checkBtn.innerHTML = `<span>Check Toxicity</span>`;
      sounds.playSuccess();
    }, 450);
  }
}

// --- Smart Luggage Autonomous System Simulation ---
function initSmartLuggageDemo() {
  const followBtn = document.getElementById('luggage-toggle-follow');
  const alarmBtn = document.getElementById('luggage-toggle-alarm');
  const statusLabel = document.getElementById('luggage-status-label');
  const distanceValue = document.getElementById('luggage-distance');
  const radarBlip = document.getElementById('radar-user-blip');
  const trolleyBlip = document.getElementById('radar-trolley-blip');

  let isFollowing = true;
  let isAlarmArmed = false;

  if (!followBtn || !alarmBtn) return;

  followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    if (isFollowing) {
      followBtn.classList.remove('bg-slate-800', 'text-slate-400');
      followBtn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
      if (statusLabel) statusLabel.innerText = 'AUTONOMOUS TRACKING ACTIVE';
      if (statusLabel) statusLabel.className = 'text-xs font-mono font-bold text-cyan-400 animate-pulse';
    } else {
      followBtn.classList.add('bg-slate-800', 'text-slate-400');
      followBtn.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
      if (statusLabel) statusLabel.innerText = 'STANDBY / IDLE';
      if (statusLabel) statusLabel.className = 'text-xs font-mono font-bold text-slate-400';
    }
  });

  alarmBtn.addEventListener('click', () => {
    isAlarmArmed = !isAlarmArmed;
    if (isAlarmArmed) {
      alarmBtn.classList.remove('bg-slate-800', 'text-slate-400');
      alarmBtn.classList.add('bg-red-500/20', 'text-red-400', 'border-red-500/50');
      alarmBtn.innerText = '🔔 Anti-Theft: ARMED';
      sounds.playSuccess();
    } else {
      alarmBtn.classList.add('bg-slate-800', 'text-slate-400');
      alarmBtn.classList.remove('bg-red-500/20', 'text-red-400', 'border-red-500/50');
      alarmBtn.innerText = '🔕 Anti-Theft: DISARMED';
    }
  });

  // Dynamic telemetry simulator
  setInterval(() => {
    if (isFollowing) {
      const dist = (Math.random() * 0.4 + 1.1).toFixed(2);
      if (distanceValue) distanceValue.innerText = `${dist} m`;
      
      if (trolleyBlip) {
        const randOffset = (Math.random() * 8 - 4);
        trolleyBlip.style.transform = `translate(${randOffset}px, ${randOffset}px)`;
      }
    }
  }, 1200);
}

// --- Skills Filter ---
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-item-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      
      filterBtns.forEach(b => {
        b.classList.remove('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
        b.classList.add('bg-slate-900/60', 'text-slate-400');
      });
      btn.classList.add('bg-cyan-500/20', 'text-cyan-400', 'border-cyan-500/50');
      btn.classList.remove('bg-slate-900/60', 'text-slate-400');

      skillCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat.includes(category)) {
          card.style.display = 'block';
          card.classList.add('reveal-on-scroll', 'is-visible');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// --- Comic Journey 8 Chapters Modal & Viewer ---
const comicChapters = [
  {
    num: "01",
    title: "MY INTRODUCTION",
    subtitle: "The Spark & Passion",
    image: "assets/images/panel-1-intro.jpg",
    content: "Hi! I'm Rudra Prakash Yadav, a Computer Science student passionate about technology, problem solving and building real-world solutions.",
    motto: "BUILD • LEARN • SOLVE • GROW",
    terminal: ['print("Building ideas")', 'print("Solving problems")', 'print("Learn every day")', 'print("Make an impact")']
  },
  {
    num: "02",
    title: "MY EDUCATION",
    subtitle: "The Foundation",
    image: "assets/images/panel-2-education.jpg",
    content: "Building core engineering rigor at Lovely Professional University (B.Tech CSE, CGPA 7.98 / 10, 2025–2029) and Lucknow Public School (Class XII 76%, Class X 90%).",
    motto: "A BETTER VERSION OF MYSELF EVERYDAY • STAY FOCUSED",
    terminal: ["Core Subjects: DSA, DBMS, Computer Networks, Software Engineering"]
  },
  {
    num: "03",
    title: "MY SKILLS",
    subtitle: "The Technical Arsenal",
    image: "assets/images/panel-3-skills.jpg",
    content: "Specializing in Python, C, C++, Streamlit, MySQL, PostgreSQL, GitHub, Vercel, VS Code, Git, Arduino IDE, DSA, and modern AI/LLMs (Claude, ChatGPT, Gemini).",
    motto: "SKILLS CREATE OPPORTUNITIES </>",
    terminal: ["Languages: Python, C, C++", "Frameworks: Streamlit, Transformers", "Databases: MySQL, PostgreSQL"]
  },
  {
    num: "04",
    title: "MY INTERNSHIP / LEARNING",
    subtitle: "Discipline & Growth",
    image: "assets/images/panel-4-learning.jpg",
    content: "Dedicated to continuous learning, building real-world projects, mastering algorithms, and exploring cutting-edge AI / LLM frameworks every single day.",
    motto: "DISCIPLINE TURNS GOALS INTO RESULTS • LEARNING EVERY DAY </ >",
    terminal: ["Continuous Learning", "Software Engineering", "AI / LLM Integration"]
  },
  {
    num: "05",
    title: "MY PROJECTS",
    subtitle: "Applied Engineering & Inventions",
    image: "assets/images/panel-5-projects.jpg",
    content: "Developed the AI Toxicity Detector (NLP Web App with Streamlit & Transformers for GeeksforGeeks Hackathon) and the Autonomous Smart Luggage Trolley (Arduino, Computer Vision, Security Sensors).",
    motto: "INNOVATING REAL-WORLD SOLUTIONS",
    terminal: ["AI Toxicity Detector [Apr–May 2026]", "Smart Luggage Trolley [Oct–Nov 2025]"]
  },
  {
    num: "06",
    title: "MY ACHIEVEMENTS",
    subtitle: "The Hackathon Arena",
    image: "assets/images/panel-6-achievements.jpg",
    content: "Participated in GeeksforGeeks Hackathon 2026 and engineered an AI-based Toxicity Detector within rapid development deadlines.",
    motto: "A SMALL STEP EVERYDAY LEADS TO BIG RESULTS",
    terminal: ["GeeksforGeeks Hackathon Participant 2026"]
  },
  {
    num: "07",
    title: "MY CERTIFICATIONS",
    subtitle: "Mastery & Validation",
    image: "assets/images/panel-7-certifications.jpg",
    content: "Verified certifications in Fundamentals of AI & ML (Infosys Springboard), Python Programming (Infosys), and Effective Time Management (Tech Veda).",
    motto: "KNOWLEDGE BUILDS CONFIDENCE • CERTIFIED TO KEEP GROWING </>",
    terminal: ["Infosys Springboard: AI & ML", "Infosys: Python", "Tech Veda: Time Management"]
  },
  {
    num: "08",
    title: "MY GOAL",
    subtitle: "The Future Horizon",
    image: "assets/images/panel-8-goal.jpg",
    content: "To become a skilled software engineer, build impactful technologies, solve real-world problems and make a positive difference in society.",
    motto: "SAME GUY... BIGGER GOALS! • HIGHER IMPACT • INNOVATION • SUCCESS • GIVE BACK",
    terminal: ["Mission: Build impactful technologies", "Let's Build Something Meaningful."]
  }
];

let currentChapterIdx = 0;

function initComicModal() {
  const modal = document.getElementById('comic-modal');
  const openBtns = document.querySelectorAll('.open-comic-btn');
  const closeBtn = document.getElementById('close-comic-btn');
  const prevBtn = document.getElementById('prev-chapter-btn');
  const nextBtn = document.getElementById('next-chapter-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const chIdx = parseInt(btn.getAttribute('data-chapter') || '0', 10);
      currentChapterIdx = isNaN(chIdx) ? 0 : chIdx;
      renderChapter(currentChapterIdx);
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      sounds.playSuccess();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentChapterIdx > 0) {
        currentChapterIdx--;
        renderChapter(currentChapterIdx);
        sounds.playClick();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentChapterIdx < comicChapters.length - 1) {
        currentChapterIdx++;
        renderChapter(currentChapterIdx);
        sounds.playClick();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowLeft' && currentChapterIdx > 0) {
        currentChapterIdx--;
        renderChapter(currentChapterIdx);
      } else if (e.key === 'ArrowRight' && currentChapterIdx < comicChapters.length - 1) {
        currentChapterIdx++;
        renderChapter(currentChapterIdx);
      }
    }
  });
}

function renderChapter(idx) {
  const ch = comicChapters[idx];
  const titleEl = document.getElementById('modal-chapter-title');
  const subEl = document.getElementById('modal-chapter-sub');
  const badgeEl = document.getElementById('modal-chapter-badge');
  const imgEl = document.getElementById('modal-chapter-img');
  const descEl = document.getElementById('modal-chapter-desc');
  const mottoEl = document.getElementById('modal-chapter-motto');
  const termEl = document.getElementById('modal-chapter-term');
  const counterEl = document.getElementById('modal-chapter-counter');

  if (titleEl) titleEl.innerText = ch.title;
  if (subEl) subEl.innerText = ch.subtitle;
  if (badgeEl) badgeEl.innerText = `CHAPTER ${ch.num}`;
  if (imgEl) imgEl.src = ch.image;
  if (descEl) descEl.innerText = ch.content;
  if (mottoEl) mottoEl.innerText = `"${ch.motto}"`;
  if (counterEl) counterEl.innerText = `Chapter ${idx + 1} of ${comicChapters.length}`;

  if (termEl) {
    termEl.innerHTML = ch.terminal.map(t => `<div class="text-cyan-300 font-mono text-xs"><span class="text-blue-500">></span> ${t}</div>`).join('');
  }

  // Update dots indicator
  const dotsContainer = document.getElementById('chapter-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = comicChapters.map((c, i) => `
      <button onclick="renderChapter(${i}); currentChapterIdx = ${i};" class="w-2.5 h-2.5 rounded-full transition-all ${i === idx ? 'bg-cyan-400 w-6' : 'bg-slate-700 hover:bg-slate-500'}"></button>
    `).join('');
  }
}

// --- CV Viewer & Download Modal ---
function initCVModal() {
  const modal = document.getElementById('cv-modal');
  const openBtns = document.querySelectorAll('.open-cv-btn');
  const closeBtn = document.getElementById('close-cv-btn');
  const printBtn = document.getElementById('print-cv-btn');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      sounds.playSuccess();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = 'auto';
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const msg = document.getElementById('contact-msg').value;

    if (!name || !email || !msg) return;

    if (feedback) {
      feedback.innerHTML = `
        <div class="p-3 bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono animate-pulse">
          ⚡ Preparing transmission to rudraprakashyadav222@gmail.com... Launching your default mail client!
        </div>
      `;
      sounds.playSuccess();
    }

    const mailtoUri = `mailto:rudraprakashyadav222@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(msg + "\n\nFrom: " + name + " (" + email + ")")}`;
    setTimeout(() => {
      window.location.href = mailtoUri;
      form.reset();
    }, 600);
  });
}

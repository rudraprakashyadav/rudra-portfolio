// Interactive Terminal Emulator for Rudra Prakash Yadav's Portfolio
class InteractiveTerminal {
  constructor(containerId, inputId, outputId) {
    this.container = document.getElementById(containerId);
    this.input = document.getElementById(inputId);
    this.output = document.getElementById(outputId);
    this.history = [];
    this.historyIndex = -1;

    if (!this.input || !this.output) return;

    this.init();
  }

  init() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.history.push(cmd);
          this.historyIndex = this.history.length;
          this.executeCommand(cmd);
          this.input.value = '';
        }
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
        e.preventDefault();
      }
    });

    // Auto-focus when clicking anywhere inside terminal
    if (this.container) {
      this.container.addEventListener('click', () => {
        this.input.focus();
      });
    }
  }

  executeCommand(rawCmd) {
    const args = rawCmd.split(' ');
    const cmd = args[0].toLowerCase();
    
    this.appendOutput(`<div class="flex items-center gap-2 text-cyan-400 mt-2 font-mono"><span class="text-blue-500">guest@rudra-os:~$</span> <span>${this.escapeHtml(rawCmd)}</span></div>`);

    switch (cmd) {
      case 'help':
        this.appendOutput(`
<div class="text-slate-300 space-y-1 font-mono text-xs md:text-sm my-1">
  <div><span class="text-cyan-400 font-semibold">whoami</span>        - Display quick bio & background</div>
  <div><span class="text-cyan-400 font-semibold">skills</span>        - List technical & soft skills matrix</div>
  <div><span class="text-cyan-400 font-semibold">projects</span>      - View detailed project portfolio</div>
  <div><span class="text-cyan-400 font-semibold">education</span>     - Display academic history & scores</div>
  <div><span class="text-cyan-400 font-semibold">certs</span>         - View verified certifications</div>
  <div><span class="text-cyan-400 font-semibold">achievements</span>  - Show GeeksforGeeks hackathon & accolades</div>
  <div><span class="text-cyan-400 font-semibold">story</span>         - Read the 8-chapter comic journey</div>
  <div><span class="text-cyan-400 font-semibold">contact</span>       - View email, phone, GitHub & LinkedIn</div>
  <div><span class="text-cyan-400 font-semibold">sudo hire</span>     - Recruiter priority access protocol</div>
  <div><span class="text-cyan-400 font-semibold">clear</span>         - Clear the terminal console</div>
</div>`);
        break;

      case 'whoami':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 p-3 bg-slate-900/60 rounded border border-cyan-500/20">
  <div class="text-cyan-400 font-bold">Rudra Prakash Yadav</div>
  <div class="text-blue-300">Computer Science Student & Aspiring Software Engineer</div>
  <div class="text-slate-400 mt-1">"Passionate about technology, problem solving, and building real-world solutions."</div>
  <div class="text-emerald-400 mt-1 text-xs">Motto: BUILD • LEARN • SOLVE • GROW</div>
</div>`);
        break;

      case 'skills':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-1">
  <div><span class="text-cyan-400 font-semibold">Languages:</span> Python, C, C++, HTML, CSS</div>
  <div><span class="text-cyan-400 font-semibold">Frameworks:</span> Streamlit, Transformers</div>
  <div><span class="text-cyan-400 font-semibold">Databases:</span> MySQL, PostgreSQL</div>
  <div><span class="text-cyan-400 font-semibold">Cloud/DevOps:</span> GitHub, Vercel</div>
  <div><span class="text-cyan-400 font-semibold">Tools:</span> VS Code, Git, Replit, Arduino IDE, Proteus</div>
  <div><span class="text-cyan-400 font-semibold">Core CS:</span> DSA, DBMS, Computer Networks, Software Engineering</div>
  <div><span class="text-cyan-400 font-semibold">AI/LLMs:</span> Claude, ChatGPT, Gemini, Transformers, NLP</div>
  <div><span class="text-cyan-400 font-semibold">Soft Skills:</span> Problem Solving, Teamwork, Communication</div>
</div>`);
        break;

      case 'projects':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-3">
  <div class="p-2.5 bg-slate-900/70 rounded border border-blue-500/30">
    <div class="text-cyan-300 font-bold">1. AI Toxicity Detector (AI/NLP Web Application)</div>
    <div class="text-slate-400 text-xs mt-0.5">Tech: Python, Streamlit, Transformers, NLP [Apr - May 2026]</div>
    <div class="text-slate-300 text-xs mt-1">• Analyzes text & detects toxic content using transformer NLP models in real-time.</div>
    <div class="text-slate-300 text-xs">• Built and tested during GeeksforGeeks Hackathon.</div>
  </div>
  <div class="p-2.5 bg-slate-900/70 rounded border border-blue-500/30">
    <div class="text-cyan-300 font-bold">2. Smart Luggage Trolley (Autonomous Smart Luggage)</div>
    <div class="text-slate-400 text-xs mt-0.5">Tech: Arduino IDE, Sensors, Computer Vision, C++ [2025]</div>
    <div class="text-slate-300 text-xs mt-1">• Follows the user automatically with person-detection and anti-theft buzzer sensors.</div>
    <div class="text-slate-300 text-xs">• Built prototype for hands-free airport navigation.</div>
  </div>
</div>`);
        break;

      case 'education':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-2">
  <div class="border-l-2 border-cyan-500 pl-3">
    <div class="text-cyan-300 font-bold">Lovely Professional University (Phagwara, Punjab)</div>
    <div class="text-slate-400 text-xs">B.Tech - Computer Science & Engineering (Aug 2025 - Jul 2029)</div>
    <div class="text-emerald-400 text-xs font-semibold">CGPA: 7.98 / 10</div>
  </div>
  <div class="border-l-2 border-blue-500 pl-3">
    <div class="text-blue-300 font-bold">Lucknow Public School (UP)</div>
    <div class="text-slate-400 text-xs">Senior Secondary (Class XII, 2023 - 2024) - <span class="text-cyan-300">76%</span></div>
    <div class="text-slate-400 text-xs">Secondary (Class X, 2021 - 2022) - <span class="text-cyan-300">90%</span></div>
  </div>
</div>`);
        break;

      case 'certs':
      case 'certifications':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-1.5">
  <div>• <span class="text-cyan-300 font-semibold">Fundamentals of AI & ML</span> - Infosys Springboard (Feb 2026)</div>
  <div>• <span class="text-cyan-300 font-semibold">Python Programming</span> - Infosys (May 2026)</div>
  <div>• <span class="text-cyan-300 font-semibold">Effective Time Management</span> - Tech Veda (Nov 2025)</div>
</div>`);
        break;

      case 'achievements':
      case 'hackathon':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 p-3 bg-blue-950/40 rounded border border-cyan-500/30">
  <div class="text-amber-400 font-bold flex items-center gap-1">🏆 GeeksforGeeks Hackathon Participant (2026)</div>
  <div class="text-slate-300 text-xs mt-1">Built AI-based Toxicity Detector within the hackathon timeframe.</div>
  <div class="text-slate-400 text-xs italic mt-1">"A small step everyday leads to big results."</div>
</div>`);
        break;

      case 'story':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-1">
  <div class="text-cyan-400 font-bold">Comic Journey: 8 Chapters of Growth</div>
  <div>1. <span class="text-blue-300">The Spark</span> (Introduction & Passion for CS)</div>
  <div>2. <span class="text-blue-300">The Foundation</span> (Education at LPU & LPS)</div>
  <div>3. <span class="text-blue-300">The Arsenal</span> (Technical Skill Stack)</div>
  <div>4. <span class="text-blue-300">The Crucible</span> (Discipline & Deep Learning)</div>
  <div>5. <span class="text-blue-300">The Inventions</span> (AI Detector & Smart Luggage)</div>
  <div>6. <span class="text-blue-300">The Arena</span> (GeeksforGeeks Hackathon)</div>
  <div>7. <span class="text-blue-300">The Mastery</span> (Infosys & Tech Veda Certifications)</div>
  <div>8. <span class="text-blue-300">The Horizon</span> (Goal: Impactful Software Engineer)</div>
</div>`);
        break;

      case 'contact':
        this.appendOutput(`
<div class="text-slate-300 font-mono text-xs md:text-sm my-2 space-y-1">
  <div>📧 <span class="text-cyan-300">Email:</span> rudraprakashyadav222@gmail.com</div>
  <div>📱 <span class="text-cyan-300">Phone:</span> +91 6307373036</div>
  <div>💼 <span class="text-cyan-300">LinkedIn:</span> linkedin.com/in/rudra-prakash-yadav-92b902404</div>
  <div>🐙 <span class="text-cyan-300">GitHub:</span> github.com/rudraprakashyadav</div>
</div>`);
        break;

      case 'sudo':
        if (args[1] === 'hire' || args[1] === 'recruiter') {
          this.appendOutput(`
<div class="text-emerald-400 font-mono text-xs md:text-sm my-2 p-3 bg-emerald-950/40 rounded border border-emerald-500/40 animate-pulse">
  <div class="font-bold">[SUCCESS 200] Recruiter Priority Access Granted!</div>
  <div class="text-slate-200 mt-1">Thank you for considering Rudra for your software engineering / internship roles.</div>
  <div class="mt-2 flex gap-3 flex-wrap">
    <a href="mailto:rudraprakashyadav222@gmail.com?subject=Opportunity%20for%20Rudra%20Prakash%20Yadav" class="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-2 py-1 rounded inline-block font-semibold">Send Direct Email</a>
    <a href="#contact" class="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-300 px-2 py-1 rounded inline-block">View Contact Form</a>
  </div>
</div>`);
        } else {
          this.appendOutput(`<div class="text-amber-400 font-mono text-xs md:text-sm my-1">Usage: sudo hire</div>`);
        }
        break;

      case 'clear':
        this.output.innerHTML = '';
        return;

      default:
        this.appendOutput(`<div class="text-red-400 font-mono text-xs md:text-sm my-1">Command not recognized: '${this.escapeHtml(cmd)}'. Type <span class="text-cyan-300 font-bold underline cursor-pointer" onclick="document.getElementById('term-input').value='help';document.getElementById('term-input').dispatchEvent(new KeyboardEvent('keydown',{'key':'Enter'}))">help</span> to view all available commands.</div>`);
        break;
    }

    this.container.scrollTop = this.container.scrollHeight;
  }

  appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    this.output.appendChild(div);
  }

  escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new InteractiveTerminal('terminal-container', 'term-input', 'terminal-output');
});

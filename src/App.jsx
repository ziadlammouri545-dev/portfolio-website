import { useEffect, useRef, useState } from "react";
import {
  Globe,
  Workflow,
  Terminal,
  GraduationCap,
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Sun,
  Moon,
} from "lucide-react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const EMAIL = "ziadlammouri545@gmail.com";
const NAME = "Ziad Lammourri";

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function Mark({ text, serif = [], className = "" }) {
  const [ref, inView] = useInView(0.3);
  const words = text.split(" ");
  return (
    <span className={`mark ${className}`} ref={ref}>
      {words.map((w, i) => (
        <span className="mw" key={i}>
          <span
            className={`mi ${inView ? "in" : ""} ${serif.includes(i) ? "serif" : ""}`}
            style={{ transitionDelay: `${(i * 0.045).toFixed(3)}s` }}
          >
            {w}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}

function Eyebrow({ num, label }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-num">{num}</span>
      <span className="eyebrow-line" />
      <span className="eyebrow-label">{label}</span>
    </div>
  );
}

function Chip({ children, accent = false }) {
  return <span className={`chip ${accent ? "chip-accent" : ""}`}>{children}</span>;
}

function SpotCard({ index, icon: Icon, title, body, chips }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };
  return (
    <div className="spot" ref={ref} onMouseMove={onMove}>
      <div className="spot-top">
        <span className="spot-num">0{index}</span>
        <span className="spot-icon">
          <Icon size={18} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="spot-chips">
        {chips.map((c) => (
          <Chip key={c}>{c}</Chip>
        ))}
      </div>
    </div>
  );
}

const covers = [
  ["#0e7fff", "#6d5ae6"],
  ["#12907f", "#1fb8a3"],
  ["#0e7fff", "#38bdf8"],
  ["#6d5ae6", "#a78bfa"],
  ["#1fb8a3", "#34d399"],
  ["#38bdf8", "#6d5ae6"],
];

function ProjectRow({ p, i }) {
  return (
    <a className="proj" href={p.url} target="_blank" rel="noreferrer">
      <div className="proj-cover" style={{ background: `linear-gradient(135deg, ${covers[i % 6][0]}, ${covers[i % 6][1]})` }}>
        <span className="proj-cover-idx">0{i + 1}</span>
        <span className="proj-cover-name">{p.name}</span>
        <span className="proj-cover-line" />
      </div>
      <div className="proj-body">
        <span className="proj-top">
          <span className="proj-idx">0{i + 1}</span>
          {i < 2 && <Chip accent>Featured</Chip>}
          <span className="proj-open">Source <ArrowUpRight size={14} /></span>
        </span>
        <h3 className="proj-title">{p.name}</h3>
        <p className="proj-desc">{p.desc}</p>
        <div className="proj-tags">
          {p.stack.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
      </div>
    </a>
  );
}

const langs = [
  ["JavaScript", 80],
  ["HTML", 75],
  ["CSS", 65],
  ["Python", 25],
  ["C", 22],
];

const toolbox = [
  "React", "Vite", "Node.js", "Express", "SQLite", "n8n",
  "Git", "npm", "Figma", "GitHub", "Vercel", "Telegram API",
];

function App() {
  const [dark, setDark] = useState(
    () => (typeof localStorage !== "undefined" && localStorage.getItem("theme") === "dark") || false
  );
  const [sent, setSent] = useState(false);
  const [glass, setGlass] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setGlass(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(form.subject || `Hello from ${form.name || "your site"}`);
    const body = encodeURIComponent(`Hi Ziad,\n\n${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const nav = ["About", "Skills", "Stack", "Work", "Experience", "Contact"];

  return (
    <div className="page">
      <div className="grain" aria-hidden />

      <header className={glass ? "hdr glass" : "hdr"}>
        <div className="cw hdr-in">
          <a href="#top" className="logo">
            <span className="logo-tile">ZL</span>
            <span className="logo-word">Ziad Lammourri</span>
          </a>
          <nav className="hdr-nav">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>
            ))}
          </nav>
          <div className="hdr-right">
            <button
              className="theme-btn"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a className="pill pill-accent" href="#contact">
              Hire me <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-glow" />
          <div className="cw">
            <div className="hero-eyebrow">
              <span className="pulse" />
              Software Engineering Student — Algiers, Algeria
            </div>
            <h1 className="hero-name">
              <Mark text="Ziad" />
              <Mark text="Lammourri" />
            </h1>
            <p className="hero-lead">
              I build modern web applications, CLI tools, and automation
              systems that actually solve problems —{" "}
              <Mark text="clean engineering with a human touch" serif={[0, 1, 2]} />
              .
            </p>
            <div className="hero-cta">
              <a className="pill pill-accent" href="#work">View my work <ArrowDown size={15} /></a>
              <a className="pill pill-ghost" href="#contact">Say hello <ArrowUpRight size={15} /></a>
            </div>
          </div>
          <div className="cw hero-bar">
            <span className="mono-chip">[ 01 — Hero ]</span>
            <a className="hero-scroll" href="#about">Scroll <ArrowDown size={13} /></a>
            <div className="hero-links">
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </div>
        </section>

        <section className="sec" id="about">
          <div className="cw">
            <Eyebrow num="01" label="About me" />
            <h2 className="h2"><Mark text="A builder in the making" serif={[3]} /></h2>
            <a className="email-link" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <p className="lede">
              I'm a software engineering student from Algiers who spends his
              days on the web stack and his evenings on the terminal. Everything
              here is small, public, and mine.
            </p>
            <p className="lede">
              Today that mostly means React and Node.js — building interfaces
              that feel good to use and APIs with tests so nothing sneaks up on
              me later. I wire up n8n to quietly handle the repetitive work, and
              C plus Python are the slow burn I level up on the side.
            </p>
            <div className="facts">
              <div className="fact"><span className="fact-k">Based in</span><span className="fact-v">Algiers, Algeria</span></div>
              <div className="fact"><span className="fact-k">Studying</span><span className="fact-v">CS · LMD Year 2</span></div>
              <div className="fact"><span className="fact-k">Focus</span><span className="fact-v">Web + Automation</span></div>
              <div className="fact"><span className="fact-k">Languages</span><span className="fact-v">English · Arabic</span></div>
            </div>
            <div className="glass edu">
              <div className="edu-head">
                <span className="edu-icon"><GraduationCap size={18} /></span>
                <div>
                  <h3>Université d'Alger 1 — Benyoucef Benkhedda</h3>
                  <span className="edu-sub">LMD Year 2 · Computer Science (Informatique)</span>
                </div>
              </div>
              <div className="edu-chips">
                <Chip>Algorithms</Chip>
                <Chip>Data Structures</Chip>
                <Chip>Systems</Chip>
                <Chip>Software Engineering</Chip>
              </div>
            </div>
          </div>
        </section>

        <section className="sec" id="skills">
          <div className="cw">
            <Eyebrow num="02" label="Skills" />
            <h2 className="h2"><Mark text="What I do best" serif={[3]} /></h2>
            <p className="lede">
              Three disciplines I bring together when building — each one
              practised, not just listed.
            </p>
            <div className="spots">
              <SpotCard
                index={1}
                icon={Globe}
                title="Web Development"
                body="Fast, component-based interfaces with React and Vite, backed by Node.js and Express APIs with real tests."
                chips={["React & Vite", "Node.js & Express", "APIs & SQLite"]}
              />
              <SpotCard
                index={2}
                icon={Workflow}
                title="Automation"
                body="n8n workflows that remove busywork — digests, reports and alerts scheduled so I don't have to remember them."
                chips={["n8n workflows", "Webhooks", "Scheduled jobs"]}
              />
              <SpotCard
                index={3}
                icon={Terminal}
                title="Terminal & CLI"
                body="Small command-line tools that do one job well and stay out of the way. Built because I find myself repeating commands."
                chips={["Node.js CLIs", "Python scripts", "local-first"]}
              />
            </div>
          </div>
        </section>

        <section className="sec" id="stack">
          <div className="cw">
            <Eyebrow num="03" label="Tech Stack" />
            <h2 className="h2"><Mark text="Tools & languages" serif={[2]} /></h2>
            <p className="lede">The stack I reach for when building — plus what I'm levelling up.</p>
          </div>
          <div className="marquee">
            <div className="marquee-track">
              {[4, 3, 2, 1, 0].flatMap(() =>
                ["React", "Vite", "JavaScript", "Node.js", "Express", "SQLite", "HTML", "CSS", "n8n", "Python", "C", "Git"].map((s, i) => (
                  <span className="marquee-item" key={`${s}-${i}`}>
                    {s} <span className="mq-star">✦</span>
                  </span>
                ))
              )}
            </div>
          </div>
          <div className="cw">
            <div className="stack-grid">
              <div className="stack-col">
                <h3 className="stack-title">Programming languages</h3>
                {langs.map(([name, pct]) => (
                  <Bar key={name} name={name} value={pct} />
                ))}
              </div>
              <div className="stack-col">
                <h3 className="stack-title">Toolbox</h3>
                <div className="toolbox">
                  {toolbox.map((t, i) => (
                    <span className="toolbox-row" key={t}>
                      <span className="toolbox-idx">0{i + 1}</span>
                      <span className="toolbox-name">{t}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="lede stack-out">
              Comfortable picking up whatever a project needs — the fundamentals
              travel, the tools just change.
            </p>
          </div>
        </section>

        <section className="sec" id="work">
          <div className="cw">
            <div className="work-head">
              <div>
                <Eyebrow num="04" label="Work" />
                <h2 className="h2"><Mark text="Featured projects" serif={[1]} /></h2>
              </div>
              <span className="mono-chip">( 06 )</span>
            </div>
            <p className="lede">
              Everything here is public on GitHub. Some are older than others —
              all of them are real.
            </p>
            <div className="projs">
              {projects.map((p, i) => (
                <ProjectRow key={p.name} p={p} i={i} />
              ))}
            </div>
          </div>
        </section>

        <section className="sec" id="experience">
          <div className="cw">
            <Eyebrow num="05" label="Experience" />
            <h2 className="h2"><Mark text="Journey so far" serif={[0]} /></h2>
            <div className="timeline">
              <div className="tl-item">
                <span className="tl-dot" />
                <div>
                  <span className="tl-date">2024 — Present</span>
                  <h3>BSc Computer Science · LMD Year 2</h3>
                  <span className="tl-place">Université d'Alger 1 — Benyoucef Benkhedda</span>
                  <p>
                    Studying computer science fundamentals — algorithms, data
                    structures, systems and software engineering — while shipping
                    real projects in web development and automation.
                  </p>
                  <div className="tl-chips">
                    <Chip>Algorithms</Chip>
                    <Chip>Data Structures</Chip>
                    <Chip>Software Engineering</Chip>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass next">
              <div>
                <h3>Next chapter</h3>
                <span className="next-sub">Open to internships & freelance work</span>
              </div>
              <p>Looking for a place to learn fast and ship real things. Currently available.</p>
              <a className="pill pill-accent" href="#contact">Let's talk <ArrowUpRight size={14} /></a>
            </div>
          </div>
        </section>

        <section className="sec" id="contact">
          <div className="cw">
            <Eyebrow num="06" label="Contact" />
            <h2 className="h2"><Mark text="Let's build together" serif={[3]} /></h2>
            <p className="lede">
              Have a project in mind, an internship to fill, or just want to say
              hi? My inbox is open.
            </p>
            <div className="contact-chips">
              <Chip accent>@ziadlammouri545-dev — GitHub</Chip>
              <Chip accent>✉ Response within ~a day</Chip>
            </div>
            <form className="glass form" onSubmit={submit}>
              <div className="form-row">
                <label>Name <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ziad Lammourri" /></label>
                <label>Email <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              </div>
              <label>Subject <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="A project, an opportunity." /></label>
              <label>Message <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me what you're building and how I can help." /></label>
              <button className="pill pill-accent form-btn" type="submit">
                {sent ? "Opening your email app…" : "Send message"} <ArrowUpRight size={14} />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="cw">
          <div className="eyebrow"><span className="eyebrow-label">Algiers, Algeria</span></div>
          <h2 className="foot-cta"><Mark text="Let's build something memorable." serif={[4]} /></h2>
          <a className="foot-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="foot-cols">
            <div className="foot-col">
              <span className="foot-title">Navigate</span>
              {nav.map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>
              ))}
            </div>
            <div className="foot-col">
              <span className="foot-title">Elsewhere</span>
              <a href={GITHUB} target="_blank" rel="noreferrer">GitHub</a>
              <a href={`mailto:${EMAIL}`}>Email</a>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Lammouri Mohamed Ziad</span>
            <span>Designed & built with React and a lot of coffee.</span>
            <a className="foot-top" href="#top">Back to top <ArrowUp size={13} /></a>
          </div>
        </div>
        <div className="foot-water">ZIAD<br />LAMMOURRI</div>
      </footer>
    </div>
  );
}

function Bar({ name, value }) {
  const [ref, inView] = useInView(0.4);
  return (
    <div className="bar" ref={ref}>
      <div className="bar-top">
        <span className="bar-name">{name}</span>
        <span className="bar-val">{value}%</span>
      </div>
      <div className="bar-track">
        <span className={`bar-fill ${inView ? "in" : ""}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

const projects = [
  {
    name: "taskly",
    desc: "The CLI task manager I use daily. Tasks live in a local JSON file — no setup, no service, just Node.",
    stack: ["Node.js", "CLI", "JSON"],
    url: `${GITHUB}/taskly`,
  },
  {
    name: "github-explorer",
    desc: "Paste any GitHub username, get back their profile, top languages and repos in a clean interface.",
    stack: ["React", "Vite", "REST"],
    url: `${GITHUB}/github-explorer`,
  },
  {
    name: "snipurl",
    desc: "Self-hosted URL shortener with a tested Express API and a small web UI on top.",
    stack: ["Express", "SQLite", "EJS"],
    url: `${GITHUB}/snipurl`,
  },
  {
    name: "n8n-automations",
    desc: "Ready workflows that email you a daily news digest and a weekly GitHub activity report.",
    stack: ["n8n", "REST"],
    url: `${GITHUB}/n8n-automations`,
  },
  {
    name: "auth-todo-api",
    desc: "REST API with JWT login and per-user to-do lists, fully covered by tests.",
    stack: ["Express", "SQLite", "JWT"],
    url: `${GITHUB}/auth-todo-api`,
  },
  {
    name: "price-scraper",
    desc: "Python watcher that texts you on Telegram the moment a product's price drops.",
    stack: ["Python", "Telegram"],
    url: `${GITHUB}/price-scraper`,
  },
];

export default App;
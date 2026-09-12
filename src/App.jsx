import { useEffect, useState } from "react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const USERNAME = "ziadlammouri545-dev";
const EMAIL = "ziadlammouri545@gmail.com";

const words = ["React apps", "Node.js APIs", "CLI tools", "n8n automations", "C code"];

const stack = [
  "React",
  "Vite",
  "JavaScript",
  "Node.js",
  "Express",
  "SQLite",
  "HTML",
  "CSS",
  "n8n",
  "Python",
  "C",
  "Git",
];

const projects = [
  {
    name: "taskly",
    desc: "The CLI task manager I actually use every day. Tasks live in a local JSON file.",
    stack: ["Node.js", "CLI"],
    url: `${GITHUB}/taskly`,
  },
  {
    name: "github-explorer",
    desc: "Paste any GitHub username, get their profile, top languages and repos back.",
    stack: ["React", "Vite", "REST"],
    url: `${GITHUB}/github-explorer`,
  },
  {
    name: "snipurl",
    desc: "Self-hosted URL shortener with a tested Express API and a small web UI.",
    stack: ["Express", "SQLite", "EJS"],
    url: `${GITHUB}/snipurl`,
  },
  {
    name: "n8n-automations",
    desc: "Ready workflows that email you a daily news digest and a weekly GitHub report.",
    stack: ["n8n"],
    url: `${GITHUB}/n8n-automations`,
  },
  {
    name: "auth-todo-api",
    desc: "REST API with JWT login and per-user todo lists, covered by tests.",
    stack: ["Express", "SQLite", "JWT"],
    url: `${GITHUB}/auth-todo-api`,
  },
  {
    name: "price-scraper",
    desc: "Python watcher that texts you on Telegram when a product's price drops.",
    stack: ["Python", "Telegram"],
    url: `${GITHUB}/price-scraper`,
  },
];

function useGitHubUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setUser({
          repos: d.public_repos,
          followers: d.followers,
          following: d.following,
        });
      })
      .catch(() => {});
  }, []);
  return user;
}

function useCountUp(target = 0, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(target * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

function LiveStat({ label, target }) {
  const value = useCountUp(target);
  return (
    <span className="stat">
      <strong>{target ? value.toLocaleString() : "—"}</strong>
      <span>{label}</span>
    </span>
  );
}

function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const pause = !deleting && txt === word ? 1300 : deleting && txt === "" ? 250 : 0;
    const delay = pause || (deleting ? 35 : 85);

    const t = setTimeout(() => {
      if (deleting) {
        setTxt(word.slice(0, txt.length - 1));
        if (txt.length === 1) {
          setDeleting(false);
          setI((v) => v + 1);
        }
      } else if (txt === word) {
        setDeleting(true);
      } else {
        setTxt(word.slice(0, txt.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [txt, deleting, i, words]);

  return (
    <span className="typewriter">
      {txt}
      <span className="caret">_</span>
    </span>
  );
}

export default function App() {
  const user = useGitHubUser();
  const today = new Date().getFullYear();

  useEffect(() => {
    const els = [...document.querySelectorAll(".reveal")];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="page">
      <nav className="nav">
        <div className="inner nav-inner">
          <a href="#top" className="brand">
            <span className="brand-mark">z</span>
            <span>Ziad<span className="dot">.</span>dev</span>
          </a>
          <div className="nav-links">
            <a href="#projects">Work</a>
            <a href="#stack">Stack</a>
            <a href="#about">About</a>
            <a className="nav-gh" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="dots" />
        <div className="glow" />
        <div className="inner hero-inner">
          <p className="kicker reveal">@ {USERNAME}</p>
          <h1 className="hero-title">
            Lammouri
            <br />
            Ziad
          </h1>
          <p className="typing reveal">
            Building with <Typewriter words={words} />
          </p>
          <p className="lead reveal">
            2nd-year computer science student at Université d'Alger 1. I write
            web apps, command-line tools and automations — and everything here
            is public.
          </p>
          <div className="cta-row reveal">
            <a className="btn btn-primary" href="#projects">
              See my work
            </a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
              Email me
            </a>
          </div>
          <div className="stats reveal">
            <LiveStat label="public repos" target={user?.repos} />
            <LiveStat label="followers" target={user?.followers} />
            <LiveStat label="following" target={user?.following} />
          </div>
        </div>
      </header>

      <div className="marquee" id="stack">
        <div className="marquee-track">
          {[...stack, ...stack].map((s, i) => (
            <span className="marquee-item" key={i}>
              {s}
              <span className="marquee-dot">/</span>
            </span>
          ))}
        </div>
      </div>

      <main>
        <section className="section" id="projects">
          <div className="inner">
            <div className="section-head reveal">
              <p className="kicker">Work</p>
              <h2>Projects I use</h2>
              <p className="muted">Small, public, and mine. Click to open the repo.</p>
            </div>
            <div className="projects-grid">
              {projects.map((p) => (
                <a
                  className="project reveal"
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="project-path">~/ {p.name}</span>
                  <p className="project-desc">{p.desc}</p>
                  <span className="project-stack">
                    {p.stack.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </span>
                  <span className="project-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="inner about-inner">
            <div className="about-copy reveal">
              <p className="kicker">About</p>
              <h2>Not much, but it's mine.</h2>
              <p>
                I got into code two years ago and kept going. Most days I write
                JavaScript — React on the front, Node on the back — and when a
                task repeats itself, I teach n8n to do it instead.
              </p>
              <p>
                Univerity is Université d'Alger 1; I'm in my second year. C and Python are the slow burn — I know just
                enough to be dangerous.
              </p>
              <p className="facts">
                <span>Based in Algiers, Algeria</span>
                <span>Languages — Arabic, English</span>
                <span>UTC+1</span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="inner footer-inner">
          <div>
            <p className="kicker">Contact</p>
            <h2 className="footer-cta">
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </h2>
            <p className="muted">Open to collabs, internships and small contracts.</p>
          </div>
          <div className="footer-links">
            <a className="btn btn-ghost" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn-ghost" href={`mailto:${EMAIL}`}>
              Email
            </a>
          </div>
          <span className="footer-note">
            © {today} Lammouri Mohamed Ziad · hand-built
          </span>
        </div>
      </footer>
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  SquareStack,
  Sparkles,
  Copy,
  CheckCheck,
  ArrowRight,
  CircleUserRound,
  Server,
  Workflow,
  Terminal,
  CheckCircle2,
  UserPlus,
  Mail,
  Github,
  SquareCode,
} from "lucide-react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const USERNAME = "ziadlammouri545-dev";

const projects = [
  {
    name: "taskly",
    desc: "A CLI task manager I use every day. Tasks live in a local JSON file, no setup needed.",
    url: `${GITHUB}/taskly`,
  },
  {
    name: "github-explorer",
    desc: "React app that takes any GitHub username and shows their profile, top languages and repos.",
    url: `${GITHUB}/github-explorer`,
  },
  {
    name: "snipurl",
    desc: "Self-hosted URL shortener. Express backend, SQLite storage, small web UI, tested API.",
    url: `${GITHUB}/snipurl`,
  },
  {
    name: "n8n-automations",
    desc: "Ready-made n8n workflows: a daily news digest email and a weekly GitHub activity report.",
    url: `${GITHUB}/n8n-automations`,
  },
  {
    name: "auth-todo-api",
    desc: "A REST API with JWT login and protected to-do lists. Built to practise authentication.",
    url: `${GITHUB}/auth-todo-api`,
  },
  {
    name: "price-scraper",
    desc: "Python script that watches a product page and sends a Telegram alert when the price drops.",
    url: `${GITHUB}/price-scraper`,
  },
];

const skills = [
  {
    icon: SquareCode,
    title: "Frontend",
    body: "React apps built with Vite. Clean, responsive, component-first interfaces.",
  },
  {
    icon: Server,
    title: "Backend",
    body: "Node.js, Express and SQLite. REST APIs with proper validation and tests.",
  },
  {
    icon: Workflow,
    title: "Automation",
    body: "n8n workflows, webhooks and scheduled jobs that remove the boring work.",
  },
  {
    icon: Terminal,
    title: "Terminal & CLI",
    body: "Small tools that live in the command line and do one job well.",
  },
];

const profileJson = `{
  "name": "Lammouri Mohamed Ziad",
  "role": "Full-Stack Developer",
  "location": "Algiers, Algeria",
  "field": "n8n automation",
  "languages": ["Arabic", "English"],
  "stack": ["React", "Node.js", "Express", "SQLite", "n8n", "C", "Python"],
  "studying": "CS, Year 2 · U. Alger 1",
  "contact": "ziadlammouri545@gmail.com"
}`;

function useGitHubStats() {
  const [stats, setStats] = useState({
    projects: "—",
    followers: "—",
    following: "—",
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!d) return;
        setStats({
          projects: d.public_repos.toLocaleString(),
          followers: d.followers.toLocaleString(),
          following: d.following.toLocaleString(),
        });
      })
      .catch(() => {});
  }, []);

  return stats;
}

function ProfileCard() {
  const stats = useGitHubStats();
  return (
    <article className="profile-card">
      <span className="accent-bar" />
      <div className="avatar-wrap">
        <div className="avatar">
          <img
            src="https://avatars.githubusercontent.com/u/268178767?v=4"
            alt="Ziad avatar"
          />
        </div>
        <span className="verified">
          <CheckCheck />
        </span>
      </div>

      <div className="name-block">
        <h2>Lammouri Mohamed Ziad</h2>
        <p className="role">Full-Stack Developer · n8n builder</p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <strong>{stats.projects}</strong>
          <span>Projects</span>
        </div>
        <div className="stat">
          <strong>{stats.followers}</strong>
          <span>Followers</span>
        </div>
        <div className="stat">
          <strong>{stats.following}</strong>
          <span>Following</span>
        </div>
      </div>

      <p className="bio">
        2nd-year CS student at Université d’Alger 1. I build web apps with
        React and Node.js, and automate the boring stuff with n8n.
      </p>

      <div className="tag-row">
        <span className="pill pill-fill">React</span>
        <span className="pill">Node.js</span>
        <span className="pill">n8n</span>
      </div>

      <div className="actions">
        <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">
          <UserPlus size={16} />
          Follow
        </a>
        <a className="btn btn-secondary" href="mailto:ziadlammouri545@gmail.com">
          <SquareCode size={16} />
          Email
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const stats = useGitHubStats();
  const today = new Date().getFullYear();

  return (
    <div className="page">
      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-tile">
              <SquareStack size={18} />
            </span>
            <span className="wordmark">
              Ziad<span className="dot">.</span>
            </span>
          </div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav-cta" href="#projects">
            See my work
            <ArrowRight size={15} />
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="glow" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="pill-badge">
              <Sparkles size={13} />
              My profile card
            </span>
            <h1>
              The developer, <span className="gradient-word">perfected.</span>
            </h1>
            <p className="lead">
              I’m Ziad — a full-stack developer and n8n automation builder from
              Algeria. I turn ideas into small, working products and I write it
              all down.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#projects">
                <SquareCode size={16} />
                View my projects
              </a>
              <a className="btn btn-secondary" href="mailto:ziadlammouri545@gmail.com">
                <Mail size={16} />
                Email me
              </a>
            </div>
            <div className="trust-row">
              <span>
                <CheckCircle2 size={14} /> Based in Algeria
              </span>
              <span>
                <CheckCircle2 size={14} /> CS student · Year 2
              </span>
              <span>
                <CheckCircle2 size={14} /> Open to collab
              </span>
            </div>
          </div>

          <div className="hero-card">
            <ProfileCard />
          </div>
        </div>
      </header>

      <main>
        <section className="section anatomy" id="about">
          <div className="section-inner">
            <div className="section-head">
              <h2>What I build</h2>
              <p className="section-lead">
                Every small tool has a job to do. Nothing decorative, everything
                useful.
              </p>
            </div>
            <div className="anatomy-grid">
              {skills.map((s) => (
                <div className="feature" key={s.title}>
                  <div className="icon-tile">
                    <s.icon size={20} />
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section projects" id="projects">
          <div className="section-inner">
            <div className="section-head">
              <h2>Projects</h2>
              <p className="section-lead">
                Open source, all public on GitHub. Click a card to open the repo.
              </p>
            </div>
            <div className="project-grid">
              {projects.map((p) => (
                <a className="project" key={p.name} href={p.url} target="_blank" rel="noreferrer">
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <span>Open repo</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section dark" id="contact">
          <div className="section-inner dark-inner">
            <div className="dark-copy">
              <h2>My stack, in one file</h2>
              <p className="dark-lead">
                A snapshot of who I am as a developer — languages, tools and
                where I’m heading. See the code behind this page on GitHub.
              </p>
              <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">
                <Github size={16} />
                Open on GitHub
              </a>
            </div>
            <div className="code-panel">
              <div className="code-bar">
                <Terminal size={15} />
                <span className="code-label">profile.json</span>
                <button className="copy-btn">
                  <Copy size={13} /> Copy
                </button>
              </div>
              <pre className="code-body">
                <code>{profileJson}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-inner">
          <div className="brand">
            <span className="brand-tile small">
              <SquareStack size={14} />
            </span>
            <span className="wordmark">
              Ziad<span className="dot">.</span>
            </span>
          </div>
          <span className="footer-tag">Built with React + Vite.</span>
          <span className="footer-note">
            © {today} Ziad Lammouri · {stats.projects} public repos
          </span>
        </div>
      </footer>
    </div>
  );
}
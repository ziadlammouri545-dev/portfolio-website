import { useEffect, useState } from "react";
import {
  SquareStack,
  ArrowRight,
  Mail,
  Github,
  SquareCode,
  Server,
  Workflow,
  Terminal,
  MapPin,
} from "lucide-react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const USERNAME = "ziadlammouri545-dev";
const EMAIL = "ziadlammouri545@gmail.com";

const projects = [
  {
    name: "taskly",
    desc: "CLI task manager I use every day. Tasks live in a local JSON file, no setup needed.",
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
    body: "React with Vite. Component-based, responsive, deployed on Pages.",
  },
  {
    icon: Server,
    title: "Backend",
    body: "Node.js, Express and SQLite. REST APIs I actually wrote tests for.",
  },
  {
    icon: Workflow,
    title: "Automation",
    body: "n8n wires the boring parts — digests, reports, alerts.",
  },
  {
    icon: Terminal,
    title: "Terminal & CLI",
    body: "Small command-line tools that do one job and stay out of the way.",
  },
];

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
        2nd-year CS student at Université d'Alger 1. I build small, working
        tools — mostly for the web — and I write tests because I've been
        bitten before.
      </p>

      <div className="tag-row">
        <span className="pill pill-fill">React</span>
        <span className="pill">Node.js</span>
        <span className="pill">n8n</span>
      </div>

      <div className="actions">
        <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">
          <Github size={16} />
          GitHub
        </a>
        <a className="btn btn-secondary" href={`mailto:${EMAIL}`}>
          <Mail size={16} />
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
            <a href="#about">What I build</a>
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
            <span className="pill-badge">Algiers, Algeria</span>
            <h1>
              I build <span className="gradient-word">working</span> software.
            </h1>
            <p className="lead">
              2nd-year CS student at Université d'Alger 1. I write React,
              Node and small CLI tools, and I wire up n8n for whatever gets
              repetitive. Everything on this page is mine and public.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#projects">
                <SquareCode size={16} />
                See the projects
              </a>
              <a className="btn btn-secondary" href={`mailto:${EMAIL}`}>
                <Mail size={16} />
                Email me
              </a>
            </div>
            <div className="trust-row">
              <span>Based in Algiers, Algeria</span>
              <span>CS student, second year</span>
              <span>UTC+1</span>
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
                The tools I reach for when something has to get done.
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
                All public on GitHub, some older than others. Click a card to
                open the repo.
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
              <h2>Find me here</h2>
              <p className="dark-lead">
                The quickest way to reach me is email. I reply within a couple
                of days, usually faster.
              </p>
              <a className="btn btn-primary" href={GITHUB} target="_blank" rel="noreferrer">
                <Github size={16} />
                Open on GitHub
              </a>
            </div>
            <div className="code-panel contact-panel">
              <div className="contact-row">
                <span className="contact-icon">
                  <Github size={16} />
                </span>
                <span className="contact-label">GitHub</span>
                <span className="contact-value">ziadlammouri545-dev</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">
                  <Mail size={16} />
                </span>
                <span className="contact-label">Email</span>
                <span className="contact-value">{EMAIL}</span>
              </div>
              <div className="contact-row">
                <span className="contact-icon">
                  <MapPin size={16} />
                </span>
                <span className="contact-label">Location</span>
                <span className="contact-value">Algiers, Algeria (UTC+1)</span>
              </div>
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
          <span className="footer-tag">Hand-built with React + Vite.</span>
          <span className="footer-note">
            © {today} Lammouri Mohamed Ziad · {stats.projects} public repos
          </span>
        </div>
      </footer>
    </div>
  );
}
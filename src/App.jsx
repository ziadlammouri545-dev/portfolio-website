import { useEffect, useState } from "react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const USERNAME = "ziadlammouri545-dev";
const EMAIL = "ziadlammouri545@gmail.com";

const projects = [
  {
    name: "taskly",
    desc: "CLI task manager I use daily; tasks stored in a local JSON file. Node.js + Commander, 7 tests.",
    stack: "Node.js · CLI",
    url: `${GITHUB}/taskly`,
  },
  {
    name: "github-explorer",
    desc: "React app that searches any GitHub profile and shows its repos and top languages.",
    stack: "React · Vite · GitHub API",
    url: `${GITHUB}/github-explorer`,
  },
  {
    name: "snipurl",
    desc: "Self-hosted URL shortener with an Express API, SQLite storage and a small web UI.",
    stack: "Express · SQLite · EJS",
    url: `${GITHUB}/snipurl`,
  },
  {
    name: "n8n-automations",
    desc: "Ready-made n8n workflows: a daily news digest email and a weekly GitHub report.",
    stack: "n8n · REST",
    url: `${GITHUB}/n8n-automations`,
  },
  {
    name: "portfolio-website",
    desc: "This site. Built with React and Vite, deployed on GitHub Pages.",
    stack: "React · Vite",
    url: `${GITHUB}/portfolio-website`,
  },
  {
    name: "auth-todo-api",
    desc: "REST API with JWT login and protected to-do lists. Express + SQLite, 7 tests.",
    stack: "Express · SQLite · JWT",
    url: `${GITHUB}/auth-todo-api`,
  },
];

const skills = [
  "JavaScript",
  "HTML",
  "CSS",
  "C",
  "Python",
  "React",
  "Node.js",
  "Express",
  "SQLite",
  "n8n",
  "Git",
];

function GitHubStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${USERNAME}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setStats({ repos: d.public_repos, following: d.following }))
      .catch(() => {});
  }, []);
  if (!stats) return null;
  return (
    <span className="stats">
      {stats.repos} public repos · {stats.following} following on GitHub
    </span>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="wrap">
      <nav className="nav">
        <a className="logo" href="#top">Ziad<span className="dot">.</span></a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href={GITHUB}>GitHub</a>
        </div>
      </nav>

      <header className="hero" id="top">
        <img
          className="avatar"
          src="https://avatars.githubusercontent.com/u/268178767?v=4"
          alt="Ziad's avatar"
        />
        <h1>Hi, I'm Ziad.</h1>
        <p className="tagline">
          Full-stack developer and n8n automation builder from Algeria.
          I like small, working products.
        </p>
        <p className="note">CS student, year 2 · Université d'Alger 1</p>
        <div className="hero-actions">
          <a className="btn" href="#projects">See my projects</a>
          <a className="btn ghost" href={`mailto:${EMAIL}`}>Email me</a>
        </div>
      </header>

      <main className="content">
        <section id="projects" className="section">
          <h2>Projects</h2>
          <ul className="list">
            {projects.map((p) => (
              <li key={p.name}>
                <a href={p.url} className="row" target="_blank" rel="noreferrer">
                  <div>
                    <span className="proj-name">{p.name}</span>
                    <span className="proj-desc">{p.desc}</span>
                    <span className="proj-stack">{p.stack}</span>
                  </div>
                  <span className="arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section">
          <h2>About</h2>
          <p>
            I'm a second-year computer science student who loves building for
            the web and the terminal. Most of my time goes into JavaScript and
            React; I use n8n to automate whatever is worth automating, and I'm
            learning C and Python on the side.
          </p>
          <p className="skills">
            <strong>Skills:</strong> {skills.join(" · ")}
          </p>
          <p>
            <strong>Languages:</strong> Arabic (native), English.
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© {year} Lammouri Mohamed Ziad</span>
        <GitHubStats />
      </footer>
    </div>
  );
}
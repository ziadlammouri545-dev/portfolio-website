import { useEffect, useState } from "react";
import {
  Link as LinkIcon,
  Share2,
  Github,
  Mail,
  Coffee,
  ArrowUpRight,
  MapPin,
  Send,
  Terminal,
  Zap,
  Server,
  Database,
  Workflow,
  FileCode2,
  Cpu,
  Code2,
  Palette,
  GitBranch,
} from "lucide-react";

const GITHUB = "https://github.com/ziadlammouri545-dev";
const EMAIL = "ziadlammouri545@gmail.com";
const NAME = "Ziad Lammourri";

function useFollowers() {
  const [followers, setFollowers] = useState(null);
  useEffect(() => {
    fetch("https://api.github.com/users/ziadlammouri545-dev")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setFollowers(d.followers))
      .catch(() => {});
  }, []);
  return followers;
}

function useAlgiersTime() {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Algiers",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(t);
}

function TopBar() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-tile">ZL</span>
        <span className="brand-word">ziad.lammourri</span>
      </div>
      <div className="topbar-right">
        <button className="pill white" onClick={copy}>
          <LinkIcon size={15} />
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button className="icon-btn" onClick={copy} aria-label="Share">
          <Share2 size={15} />
        </button>
      </div>
    </header>
  );
}

function SocialBtn({ href, icon: Icon, label }) {
  return (
    <a className="social-btn" href={href} target="_blank" rel="noreferrer" aria-label={label} title={label}>
      <Icon size={18} />
    </a>
  );
}

function ProfileTile() {
  return (
    <div className="tile s2 r2 profile">
      <div className="profile-top">
        <span className="avatar"><img src="https://avatars.githubusercontent.com/u/268178767?v=4" alt={NAME} /></span>
        <span className="pill status">
          <span className="status-dot" />
          Open to internships
        </span>
      </div>
      <h1 className="bric name">{NAME}</h1>
      <p className="role">Software engineering student &amp; maker</p>
      <p className="bio">
        2nd year CS at Université d'Alger 1. I build small web apps, CLI
        tools and automations, and I push it all to GitHub.
      </p>
      <div className="socials">
        <SocialBtn href={GITHUB} icon={Github} label="GitHub" />
        <SocialBtn href={`mailto:${EMAIL}`} icon={Mail} label="Email" />
        <SocialBtn href={`${GITHUB}/taskly`} icon={Terminal} label="My CLI, taskly" />
        <SocialBtn href={`${GITHUB}/n8n-automations`} icon={Workflow} label="n8n workflows" />
      </div>
    </div>
  );
}

function PhotoTile() {
  return (
    <div className="tile s2 photo">
      <div className="desk">
        <span className="desk-screen" />
        <span className="desk-keyboard" />
        <span className="desk-cup" />
        <span className="desk-note" />
      </div>
      <span className="glass-chip">
        <Coffee size={14} className="ico-apricot" />
        On the desk today
      </span>
    </div>
  );
}

function Currently() {
  return (
    <div className="tile dark-tile np">
      <div className="np-eyebrow">
        <Cpu size={13} className="ico-teal" />
        Currently
      </div>
      <div className="np-thumb">
        <Code2 size={18} />
      </div>
      <div className="np-meta">
        <span className="np-track">Learning C &amp; Python</span>
        <span className="np-artist">the slow burn, on the side</span>
      </div>
      <div className="proj-tags np-bottom">
        <span className="tag">Algorithms</span>
        <span className="tag">Systems</span>
      </div>
    </div>
  );
}

function StatTile() {
  const followers = useFollowers();
  return (
    <div className="tile teal-tile stat-tile">
      <div className="stat-top">
        <Github size={16} className="ico-white" />
        <span className="trend"><Send size={12} /> live</span>
      </div>
      <div>
        <div className="bric stat-num">{followers ?? "—"}</div>
        <div className="stat-cap">followers on GitHub</div>
      </div>
    </div>
  );
}

function ProjectTile() {
  return (
    <a className="tile s2 project" href={`${GITHUB}/taskly`} target="_blank" rel="noreferrer">
      <span className="proj-thumb">
        <Terminal size={26} />
      </span>
      <span className="proj-mid">
        <span className="eyebrow-label">Latest project</span>
        <span className="proj-title bric">taskly</span>
        <span className="proj-tags">
          <span className="tag">Node.js</span>
          <span className="tag">CLI</span>
          <span className="chip-live">daily driver</span>
        </span>
      </span>
      <span className="go-btn">
        <ArrowUpRight size={18} />
      </span>
    </a>
  );
}

function MapTile() {
  const time = useAlgiersTime();
  return (
    <div className="tile map-tile">
      <svg className="map-svg" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="200" height="200" fill="none" />
        <path d="M10 140 C 60 120, 130 160, 190 130" stroke="rgba(15,157,143,0.22)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M30 60 C 80 90, 120 40, 170 70" stroke="rgba(15,157,143,0.22)" strokeWidth="22" fill="none" strokeLinecap="round" />
        <path d="M0 90 C 60 110, 140 80, 200 95" stroke="rgba(15,157,143,0.13)" strokeWidth="14" fill="none" />
        <path d="M40 0 C 70 60, 60 140, 90 200" stroke="rgba(15,157,143,0.13)" strokeWidth="14" fill="none" />
      </svg>
      <span className="pin">
        <span className="pin-halo" />
        <span className="pin-dot" />
      </span>
      <div className="map-bottom">
        <span className="loc-chip">
          <MapPin size={13} className="ico-apricotdeep" />
          Algiers, Algeria
        </span>
        <span className="loc-time">{time}</span>
      </div>
    </div>
  );
}

function NewsletterTile() {
  return (
    <div className="tile apricot-tile news">
      <div className="news-top">
        <span className="eyebrow-label ink-soft">The weekly</span>
        <Send size={16} />
      </div>
      <div>
        <span className="bric news-title">Someday a<br />newsletter</span>
        <span className="news-sub">Currently: more repos, fewer words.</span>
      </div>
    </div>
  );
}

const tools = [
  { name: "React", icon: Code2, c: "teal" },
  { name: "Vite", icon: Zap, c: "apricot" },
  { name: "Node.js", icon: Server, c: "teal" },
  { name: "Express", icon: Terminal, c: "apricot" },
  { name: "SQLite", icon: Database, c: "teal" },
  { name: "n8n", icon: Workflow, c: "apricot" },
  { name: "JavaScript", icon: FileCode2, c: "teal" },
  { name: "Python", icon: Cpu, c: "apricot" },
  { name: "C", icon: GitBranch, c: "teal" },
  { name: "HTML", icon: Code2, c: "apricot" },
  { name: "CSS", icon: Palette, c: "teal" },
  { name: "Git", icon: GitBranch, c: "apricot" },
];

function ToolboxTile() {
  return (
    <div className="tile s2 toolbox">
      <span className="eyebrow-label">Toolbox</span>
      <div className="tool-chips">
        {tools.map((t) => (
          <span className="tool-chip" key={t.name}>
            <t.icon size={14} className={t.c === "teal" ? "ico-teal" : "ico-apricotdeep"} />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function CtaTile() {
  return (
    <div className="tile s2 cta">
      <div className="cta-glow" />
      <div className="cta-copy">
        <span className="bric cta-title">Let's make something</span>
        <span className="cta-sub">Open for internships and small projects.</span>
      </div>
      <a className="pill teal" href={`mailto:${EMAIL}`}>
        Say hello <ArrowUpRight size={15} />
      </a>
    </div>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  return (
    <div className="page">
      <TopBar />

      <main className="grid">
        <ProfileTile />
        <PhotoTile />
        <Currently />
        <StatTile />
        <ProjectTile />
        <MapTile />
        <NewsletterTile />
        <ToolboxTile />
        <CtaTile />
      </main>

      <footer className="footer">
        <span>(c) {year} Lammouri Mohamed Ziad</span>
        <span>Made with React and a grid of rounded rectangles.</span>
      </footer>
    </div>
  );
}
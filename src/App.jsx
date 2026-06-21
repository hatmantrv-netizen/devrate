import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  Star, Search, Plus, ExternalLink, Code2, Terminal,
  MessageSquare, ThumbsUp, X, LogOut, Award,
  BookOpen, Layers, ChevronRight, Menu, FileCode,
  Globe, Cpu, Smartphone, Gamepad2, Server, Brain,
  Check, AlertCircle, Sparkles, Zap,
  Link2, Image, Lock, Mail, Eye, EyeOff, Upload, Trash2
} from "lucide-react";

// ─── Icônes custom ───
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
const DiscordIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.09 9a3 3 0 0 1 5.83 0"/><circle cx="9.09" cy="14.5" r="1.25"/><circle cx="14.91" cy="14.5" r="1.25"/>
    <path d="M7.5 4.5c-1.5.5-3 1.5-4 3 0 0-2 3-2.5 9.5 1.5 1.5 4 2.5 4 2.5l1-2s1.5.5 3 .5h2c1.5 0 3-.5 3-.5l1 2s2.5-1 4-2.5c-.5-6.5-2.5-9.5-2.5-9.5-1-1.5-2.5-2.5-4-3l-1 2h-4l-1-2z"/>
  </svg>
);

// ═══════════════════════════════════════════════
// CONSTANTES
// ═══════════════════════════════════════════════

const AVATARS = [
  { id: "a1", emoji: "🧑‍💻", bg: "from-blue-500 to-cyan-400" },
  { id: "a2", emoji: "👩‍💻", bg: "from-violet-500 to-fuchsia-400" },
  { id: "a3", emoji: "🧠", bg: "from-emerald-500 to-teal-400" },
  { id: "a4", emoji: "🚀", bg: "from-orange-500 to-amber-400" },
  { id: "a5", emoji: "⚡", bg: "from-rose-500 to-pink-400" },
  { id: "a6", emoji: "🎯", bg: "from-indigo-500 to-blue-400" },
];
const ROLES = ["Développeur Junior", "Développeur Senior", "Tech Lead", "Designer", "Data Scientist", "DevOps Engineer", "Fullstack Dev", "Freelance"];
const TECHS = ["React", "Vue.js", "Angular", "Next.js", "Node.js", "Python", "Django", "FastAPI", "Rust", "Go", "TypeScript", "Tailwind", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Firebase", "AWS", "Svelte", "Flutter", "Swift", "Kotlin"];
const CATEGORIES = [
  { id: "web", label: "Web", icon: Globe },
  { id: "mobile", label: "Mobile", icon: Smartphone },
  { id: "ia", label: "IA / ML", icon: Brain },
  { id: "jeu", label: "Jeu Vidéo", icon: Gamepad2 },
  { id: "devops", label: "DevOps", icon: Server },
  { id: "api", label: "API / Backend", icon: Cpu },
];
const REVIEW_TYPES = ["Conseil technique", "Retour UI/UX", "Bug trouvé", "Encouragement"];
const TECH_COLORS = {
  React: "bg-sky-500/20 text-sky-300 border-sky-500/30", "Vue.js": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Angular: "bg-red-500/20 text-red-300 border-red-500/30", "Next.js": "bg-white/10 text-white border-white/20",
  "Node.js": "bg-green-500/20 text-green-300 border-green-500/30", Python: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Django: "bg-green-600/20 text-green-300 border-green-600/30", FastAPI: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  Rust: "bg-orange-500/20 text-orange-300 border-orange-500/30", Go: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  TypeScript: "bg-blue-500/20 text-blue-300 border-blue-500/30", Tailwind: "bg-teal-400/20 text-teal-300 border-teal-400/30",
  Docker: "bg-blue-400/20 text-blue-300 border-blue-400/30", Kubernetes: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  PostgreSQL: "bg-blue-600/20 text-blue-300 border-blue-600/30", MongoDB: "bg-green-500/20 text-green-300 border-green-500/30",
  Redis: "bg-red-500/20 text-red-300 border-red-500/30", GraphQL: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  Firebase: "bg-amber-500/20 text-amber-300 border-amber-500/30", AWS: "bg-orange-400/20 text-orange-300 border-orange-400/30",
  Svelte: "bg-orange-500/20 text-orange-300 border-orange-500/30", Flutter: "bg-sky-400/20 text-sky-300 border-sky-400/30",
  Swift: "bg-orange-500/20 text-orange-300 border-orange-500/30", Kotlin: "bg-violet-500/20 text-violet-300 border-violet-500/30",
};

const DISCORD_URL = "https://discord.gg/dKv2CYRqa8";

// Compte admin caché
const ADMIN_ACCOUNT = {
  id: "admin_root", email: "brashow@proton.me", username: "Brashow",
  password: "devrate_admin_2025",
  avatar: { id: "a6", emoji: "🎯", bg: "from-indigo-500 to-blue-400" },
  role: "Administrateur", joinedAt: "2024-01-01",
  bio: "Fondateur & administrateur de DevRate.", isAdmin: true,
};

// ═══════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════

const generateId = () => Math.random().toString(36).substr(2, 9);
const formatDate = (d) => new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const timeAgo = (dateStr) => {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return "À l'instant";
  if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `Il y a ${Math.floor(diff / 86400)}j`;
  return formatDate(dateStr);
};
const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const hashPassword = (p) => { let h = 0; for (let i = 0; i < p.length; i++) { h = ((h << 5) - h + p.charCodeAt(i)) | 0; } return "h_" + Math.abs(h).toString(36) + "_" + p.length; };

// Routing par hash
const buildHash = (view, id) => `#/${view}${id ? "/" + id : ""}`;
const parseHash = () => {
  const h = window.location.hash.replace("#/", "");
  if (!h) return { view: "home" };
  const parts = h.split("/");
  if (parts[0] === "project" && parts[1]) return { view: "detail", projectId: parts[1] };
  if (parts[0] === "profile" && parts[1]) return { view: "profile", profileId: parts[1] };
  return { view: parts[0] || "home" };
};

// Conversion fichier → base64
const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

// ═══════════════════════════════════════════════
// COMPOSANTS RÉUTILISABLES
// ═══════════════════════════════════════════════

function StarRating({ rating, onRate, size = 18, interactive = false }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button key={s} type="button" disabled={!interactive}
          className={`transition-all duration-150 ${interactive ? "cursor-pointer hover:scale-125" : "cursor-default"}`}
          onMouseEnter={() => interactive && setHover(s)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onRate?.(s)}>
          <Star size={size} className={`transition-colors ${s <= (hover || rating) ? "fill-amber-400 text-amber-400" : "text-zinc-600 fill-transparent"}`} />
        </button>
      ))}
    </div>
  );
}

function TechBadge({ tech, removable, onRemove }) {
  const c = TECH_COLORS[tech] || "bg-zinc-500/20 text-zinc-300 border-zinc-500/30";
  return (<span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${c} transition-all hover:scale-105`}>{tech}{removable && <button onClick={() => onRemove?.(tech)} className="ml-0.5 hover:text-white"><X size={12} /></button>}</span>);
}

function Toast({ message, type = "success", onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (<div className={`fixed bottom-6 right-6 z-[100] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-xl animate-slide-up ${type === "success" ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-300" : type === "error" ? "bg-red-500/15 border-red-500/30 text-red-300" : "bg-blue-500/15 border-blue-500/30 text-blue-300"}`}>
    {type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}<span className="text-sm font-medium">{message}</span><button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={14} /></button></div>);
}

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;
  return (<div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}><div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
    <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/95 backdrop-blur-xl rounded-t-2xl"><h2 className="text-lg font-semibold text-zinc-100">{title}</h2><button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200"><X size={18} /></button></div>
      <div className="p-6">{children}</div></div></div>);
}

function CodeBlock({ code }) {
  const hl = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/.*$|#.*$)/gm, '<span class="text-zinc-500 italic">$1</span>')
    .replace(/("[^"]*"|'[^']*'|`[^`]*`)/g, '<span class="text-amber-300">$1</span>')
    .replace(/(@\w+)/g, '<span class="text-fuchsia-400">$1</span>')
    .replace(/\b(const|let|var|function|return|import|from|export|default|class|if|else|switch|case|break|new|async|await|try|catch|throw|for|while|typeof|this|def|self|with|lambda|yield|raise|except|finally|pass|print|elif|and|or|not|None|True|False|app|router)\b/g, '<span class="text-sky-400 font-medium">$1</span>');
  return (<div className="rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-950">
    <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/60 border-b border-zinc-700/30"><div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/70" /><div className="w-3 h-3 rounded-full bg-yellow-500/70" /><div className="w-3 h-3 rounded-full bg-green-500/70" /></div><span className="text-xs text-zinc-500 ml-2 font-mono">source</span></div>
    <pre className="p-4 overflow-x-auto text-sm leading-relaxed font-mono"><code dangerouslySetInnerHTML={{ __html: hl(code) }} /></pre></div>);
}

function ShareButton({ hash, label }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.origin + window.location.pathname + hash;
  const go = (e) => { e.stopPropagation(); navigator.clipboard.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }); };
  return (<button onClick={go} title={`Copier le lien ${label}`} className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60 transition-colors">
    {copied ? <Check size={15} className="text-emerald-400" /> : <Link2 size={15} />}</button>);
}

// Composant upload d'image (fichier local → base64)
function ImageUploader({ value, onChange }) {
  const inputRef = useRef(null);
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) { alert("L'image ne doit pas dépasser 5 Mo."); return; }
    const base64 = await fileToBase64(file);
    onChange(base64);
  };
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5"><Image size={14} /> Image du projet *</label>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-zinc-700/50 bg-zinc-950 h-44 mb-2">
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <button onClick={() => onChange("")} className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-red-400 hover:bg-black/80 transition-colors"><Trash2 size={14} /></button>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()}
          className="w-full h-36 rounded-xl border-2 border-dashed border-zinc-700 hover:border-blue-500/40 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300 cursor-pointer">
          <Upload size={24} />
          <span className="text-sm">Cliquer pour uploader une image</span>
          <span className="text-xs text-zinc-600">PNG, JPG, WebP — Max 5 Mo</span>
        </button>
      )}
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

// ═══════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════

export default function App() {
  const load = (key, fb) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fb; } catch { return fb; } };

  const [users, setUsers] = useState(() => load("dr_users", []));
  const [projects, setProjects] = useState(() => load("dr_projects", []));
  const [reviews, setReviews] = useState(() => load("dr_reviews", []));
  const [currentUser, setCurrentUser] = useState(() => load("dr_currentUser", null));

  const [view, setView] = useState("home");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  const [authModal, setAuthModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterTechs, setFilterTechs] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  // Auth
  const [authUsername, setAuthUsername] = useState("");
  const [authEmailField, setAuthEmailField] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authShowPw, setAuthShowPw] = useState(false);
  const [authRole, setAuthRole] = useState(ROLES[0]);
  const [authAvatarId, setAuthAvatarId] = useState("a1");
  const [authError, setAuthError] = useState("");

  // Publish
  const [pubTitle, setPubTitle] = useState("");
  const [pubShortDesc, setPubShortDesc] = useState("");
  const [pubDescription, setPubDescription] = useState("");
  const [pubCategory, setPubCategory] = useState("web");
  const [pubTechs, setPubTechs] = useState([]);
  const [pubDemoUrl, setPubDemoUrl] = useState("");
  const [pubRepoUrl, setPubRepoUrl] = useState("");
  const [pubCodeSnippet, setPubCodeSnippet] = useState("");
  const [pubRunInstructions, setPubRunInstructions] = useState("");
  const [pubImageData, setPubImageData] = useState("");
  const [pubStep, setPubStep] = useState(0);
  const [pubTechInput, setPubTechInput] = useState("");

  // Detail
  const [detailTab, setDetailTab] = useState("presentation");
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewType, setReviewType] = useState("Encouragement");
  const [reviewSort, setReviewSort] = useState("recent");

  // Persistence
  useEffect(() => { localStorage.setItem("dr_users", JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem("dr_projects", JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem("dr_reviews", JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem("dr_currentUser", JSON.stringify(currentUser)); }, [currentUser]);

  // Hash routing
  useEffect(() => {
    const h = () => { const r = parseHash(); setView(r.view); if (r.projectId) { setSelectedProjectId(r.projectId); setDetailTab("presentation"); } if (r.profileId) setSelectedProfileId(r.profileId); };
    h(); window.addEventListener("hashchange", h); return () => window.removeEventListener("hashchange", h);
  }, []);

  // Calculs
  const getUserRating = useCallback((uid) => {
    const up = projects.filter((p) => p.authorId === uid);
    if (!up.length) return 0;
    const rs = reviews.filter((r) => up.some((p) => p.id === r.projectId));
    return rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : 0;
  }, [projects, reviews]);

  const getProjectRating = useCallback((pid) => {
    const rs = reviews.filter((r) => r.projectId === pid);
    if (!rs.length) return { avg: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
    return { avg: rs.reduce((s, r) => s + r.rating, 0) / rs.length, count: rs.length, distribution: [1, 2, 3, 4, 5].map((star) => rs.filter((r) => r.rating === star).length) };
  }, [reviews]);

  const getCommentCount = useCallback((pid) => reviews.filter((r) => r.projectId === pid).length, [reviews]);

  const filteredProjects = useMemo(() => {
    let res = [...projects];
    if (searchQuery.trim()) { const q = searchQuery.toLowerCase(); res = res.filter((p) => p.title.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q) || p.techs.some((t) => t.toLowerCase().includes(q))); }
    if (filterTechs.length) res = res.filter((p) => filterTechs.every((t) => p.techs.includes(t)));
    if (filterCategory) res = res.filter((p) => p.category === filterCategory);
    if (sortBy === "top") res.sort((a, b) => getProjectRating(b.id).avg - getProjectRating(a.id).avg);
    else if (sortBy === "comments") res.sort((a, b) => getCommentCount(b.id) - getCommentCount(a.id));
    else res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res;
  }, [projects, searchQuery, filterTechs, filterCategory, sortBy, getProjectRating, getCommentCount]);

  // Actions
  const showToast = (m, t = "success") => setToast({ message: m, type: t });
  const navigateTo = (v, o = {}) => {
    setView(v);
    if (o.projectId) { setSelectedProjectId(o.projectId); setDetailTab("presentation"); window.location.hash = buildHash("project", o.projectId); }
    else if (o.profileId) { setSelectedProfileId(o.profileId); window.location.hash = buildHash("profile", o.profileId); }
    else window.location.hash = buildHash(v);
    setMobileMenu(false); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetAuthForm = () => { setAuthUsername(""); setAuthEmailField(""); setAuthPassword(""); setAuthShowPw(false); setAuthAvatarId("a1"); setAuthRole(ROLES[0]); };

  const handleSignup = () => {
    if (!authUsername.trim() || authUsername.length < 3) { setAuthError("Pseudo : min. 3 caractères."); return; }
    if (!authEmailField.trim() || !isValidEmail(authEmailField)) { setAuthError("Adresse email invalide."); return; }
    if (!authPassword || authPassword.length < 6) { setAuthError("Mot de passe : min. 6 caractères."); return; }
    if (!/[A-Z]/.test(authPassword) || !/[0-9]/.test(authPassword)) { setAuthError("Mot de passe : 1 majuscule + 1 chiffre minimum."); return; }
    if (users.some((u) => u.username.toLowerCase() === authUsername.toLowerCase())) { setAuthError("Pseudo déjà pris."); return; }
    if (users.some((u) => u.email?.toLowerCase() === authEmailField.toLowerCase())) { setAuthError("Email déjà utilisé."); return; }
    const nu = { id: "u_" + generateId(), username: authUsername.trim(), email: authEmailField.trim().toLowerCase(), avatar: AVATARS.find((a) => a.id === authAvatarId) || AVATARS[0], role: authRole, joinedAt: new Date().toISOString().split("T")[0], bio: "", passwordHash: hashPassword(authPassword), isAdmin: false };
    setUsers((p) => [...p, nu]); setCurrentUser(nu); setAuthModal(false); setAuthError(""); resetAuthForm();
    showToast(`Bienvenue ${nu.username} ! 🎉`);
  };

  const handleLogin = () => {
    const input = authEmailField.trim().toLowerCase();
    if (!input) { setAuthError("Saisis ton adresse email."); return; }
    if (!authPassword) { setAuthError("Saisis ton mot de passe."); return; }
    // Admin caché
    if (input === ADMIN_ACCOUNT.email && authPassword === ADMIN_ACCOUNT.password) {
      let admin = users.find((u) => u.id === ADMIN_ACCOUNT.id);
      if (!admin) { admin = { ...ADMIN_ACCOUNT, passwordHash: hashPassword(ADMIN_ACCOUNT.password) }; setUsers((p) => [...p, admin]); }
      setCurrentUser(admin); setAuthModal(false); setAuthError(""); resetAuthForm();
      showToast("Bienvenue Brashow 🔐"); return;
    }
    const user = users.find((u) => u.email?.toLowerCase() === input);
    if (!user) { setAuthError("Aucun compte associé à cette adresse."); return; }
    if (user.passwordHash !== hashPassword(authPassword)) { setAuthError("Mot de passe incorrect."); return; }
    setCurrentUser(user); setAuthModal(false); setAuthError(""); resetAuthForm();
    showToast(`Bon retour ${user.username} ! 👋`);
  };

  const handleLogout = () => { setCurrentUser(null); navigateTo("home"); showToast("Déconnexion réussie", "info"); };

  const handlePublish = () => {
    if (!pubTitle.trim() || !pubShortDesc.trim() || !pubDescription.trim()) { showToast("Remplis le titre, la description courte et la description.", "error"); return; }
    if (!pubImageData) { showToast("Ajoute au moins une image.", "error"); return; }
    const np = {
      id: "p_" + generateId(), authorId: currentUser.id, title: pubTitle.trim(),
      shortDesc: pubShortDesc.trim(), description: pubDescription.trim(), category: pubCategory,
      techs: pubTechs, demoUrl: pubDemoUrl.trim(), repoUrl: pubRepoUrl.trim(),
      imageData: pubImageData, codeSnippet: pubCodeSnippet.trim(), runInstructions: pubRunInstructions.trim(),
      hasCode: !!pubCodeSnippet.trim(), hasInstructions: !!pubRunInstructions.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    setProjects((p) => [np, ...p]);
    setPubTitle(""); setPubShortDesc(""); setPubDescription(""); setPubCategory("web");
    setPubTechs([]); setPubDemoUrl(""); setPubRepoUrl(""); setPubCodeSnippet("");
    setPubRunInstructions(""); setPubImageData(""); setPubStep(0);
    navigateTo("home"); showToast("Projet publié ! 🚀");
  };

  const handleSubmitReview = () => {
    if (!reviewRating || !reviewComment.trim()) { showToast("Ajoute une note et un commentaire.", "error"); return; }
    setReviews((p) => [{ id: "r_" + generateId(), projectId: selectedProjectId, authorId: currentUser.id, rating: reviewRating, type: reviewType, comment: reviewComment.trim(), createdAt: new Date().toISOString(), upvotes: 0, upvotedBy: [] }, ...p]);
    setReviewRating(0); setReviewComment(""); setReviewType("Encouragement"); showToast("Évaluation publiée ! ✨");
  };

  const handleUpvote = (rid) => {
    if (!currentUser) { setAuthModal("login"); return; }
    setReviews((p) => p.map((r) => { if (r.id !== rid) return r; const a = r.upvotedBy.includes(currentUser.id); return { ...r, upvotes: a ? r.upvotes - 1 : r.upvotes + 1, upvotedBy: a ? r.upvotedBy.filter((i) => i !== currentUser.id) : [...r.upvotedBy, currentUser.id] }; }));
  };

  const deleteProject = (pid) => { setProjects((p) => p.filter((x) => x.id !== pid)); setReviews((r) => r.filter((x) => x.projectId !== pid)); showToast("Projet supprimé.", "info"); if (view === "detail") navigateTo("home"); };
  const deleteReview = (rid) => { setReviews((r) => r.filter((x) => x.id !== rid)); showToast("Commentaire supprimé.", "info"); };
  const deleteUser = (uid) => { if (uid === ADMIN_ACCOUNT.id) return; setUsers((u) => u.filter((x) => x.id !== uid)); setProjects((p) => p.filter((x) => x.authorId !== uid)); setReviews((r) => r.filter((x) => x.authorId !== uid)); showToast("Utilisateur supprimé.", "info"); if (view === "profile" && selectedProfileId === uid) navigateTo("home"); };

  const isAdmin = currentUser?.isAdmin === true;
  const urRating = currentUser ? getUserRating(currentUser.id) : 0;
  const selProject = projects.find((p) => p.id === selectedProjectId);
  const selAuthor = selProject ? users.find((u) => u.id === selProject.authorId) : null;
  const selRating = selProject ? getProjectRating(selProject.id) : { avg: 0, count: 0, distribution: [0, 0, 0, 0, 0] };
  const selReviews = selProject ? reviews.filter((r) => r.projectId === selProject.id).sort((a, b) => reviewSort === "top" ? b.upvotes - a.upvotes : new Date(b.createdAt) - new Date(a.createdAt)) : [];
  const profUser = users.find((u) => u.id === selectedProfileId);
  // Utilisateurs réels (pas admin)
  const realUsers = users.filter(u => !u.isAdmin);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      <div className="fixed inset-0 pointer-events-none"><div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-[120px]" /><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/3 rounded-full blur-[120px]" /></div>

      <div className="relative z-10">

        {/* ═══ HEADER ═══ */}
        <header className="fixed top-0 left-0 right-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <button onClick={() => navigateTo("home")} className="flex items-center gap-3 group">
              <img src="/logo.png" alt="DevRate" className="w-10 h-10 rounded-xl object-contain drop-shadow-lg" />
              <span className="text-xl font-bold tracking-tight text-zinc-100 hidden sm:block">Dev<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Rate</span></span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              <button onClick={() => navigateTo("home")} className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${view === "home" ? "text-blue-400 bg-blue-500/10" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"}`}>Explorer</button>
              {currentUser && (
                <>
                  <button onClick={() => navigateTo("profile", { profileId: currentUser.id })} className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${view === "profile" && selectedProfileId === currentUser.id ? "text-blue-400 bg-blue-500/10" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"}`}>Mon Profil</button>
                  {isAdmin && <button onClick={() => navigateTo("admin")} className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${view === "admin" ? "text-red-400 bg-red-500/10" : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60"}`}>🔐 Admin</button>}
                  <button onClick={() => navigateTo("publish")} className="ml-1 px-3.5 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-1.5"><Plus size={15} /> Publier</button>
                </>
              )}
            </nav>
            <div className="flex items-center gap-3">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <button onClick={() => navigateTo("profile", { profileId: currentUser.id })} className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-zinc-800/60 transition-colors">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentUser.avatar.bg} flex items-center justify-center text-sm`}>{currentUser.avatar.emoji}</div>
                    <div className="hidden sm:block text-left"><p className="text-sm font-medium text-zinc-200 leading-none">{currentUser.username}</p>
                      <div className="flex items-center gap-1 mt-0.5">{isAdmin ? <span className="text-xs text-red-400">Admin</span> : <><Star size={11} className="fill-amber-400 text-amber-400" /><span className="text-xs text-zinc-400">{urRating.toFixed(1)}</span></>}</div>
                    </div>
                  </button>
                  <button onClick={handleLogout} className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60"><LogOut size={16} /></button>
                </div>
              ) : (
                <button onClick={() => { setAuthModal("login"); setAuthError(""); }} className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-zinc-700/50">Se connecter</button>
              )}
              <button onClick={() => setMobileMenu(!mobileMenu)} className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-800"><Menu size={20} /></button>
            </div>
          </div>
          {mobileMenu && (<div className="md:hidden border-t border-zinc-800 bg-zinc-950/95 backdrop-blur-xl px-4 py-3 space-y-1">
            <button onClick={() => navigateTo("home")} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800">Explorer</button>
            {currentUser && (<><button onClick={() => navigateTo("profile", { profileId: currentUser.id })} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:bg-zinc-800">Mon Profil</button>
              {isAdmin && <button onClick={() => navigateTo("admin")} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-zinc-800">🔐 Admin</button>}
              <button onClick={() => navigateTo("publish")} className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-blue-400 hover:bg-zinc-800">+ Publier</button></>)}
          </div>)}
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-8">

          {/* ──── HOME ──── */}
          {view === "home" && (<div className="space-y-8">
            <div className="relative text-center py-14 sm:py-20">
              <div className="absolute inset-0 overflow-hidden"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-blue-500/8 via-violet-500/4 to-transparent rounded-full blur-3xl" /></div>
              <div className="relative">
                <img src="/logo.png" alt="DevRate" className="w-28 h-28 mx-auto mb-6 drop-shadow-[0_0_30px_rgba(99,102,241,0.25)]" />
                <h1 className="text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">Publie. Partage. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-fuchsia-400">Progresse.</span></h1>
                <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">La plateforme où les développeurs partagent leurs projets et reçoivent des retours constructifs.</p>
                <div className="mt-6 flex justify-center gap-3 flex-wrap">
                  {!currentUser && <button onClick={() => setAuthModal("signup")} className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"><Zap size={16} /> Rejoindre DevRate</button>}
                  {currentUser && <button onClick={() => navigateTo("publish")} className="px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2"><Plus size={16} /> Publier un projet</button>}
                  <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl font-medium text-zinc-300 bg-zinc-800 border border-zinc-700/50 hover:bg-zinc-700 transition-colors flex items-center gap-2"><DiscordIcon size={16} /> Discord</a>
                </div>
              </div>
            </div>
            {/* Filtres */}
            <div className="space-y-4">
              <div className="relative"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={searchQuery} placeholder="Rechercher…" onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/10" /></div>
              <div className="flex gap-2 flex-wrap">
                <button onClick={() => setFilterCategory("")} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${!filterCategory ? "bg-blue-500/15 text-blue-300 border-blue-500/30" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}>Tous</button>
                {CATEGORIES.map((c) => { const I = c.icon; return (<button key={c.id} onClick={() => setFilterCategory(filterCategory === c.id ? "" : c.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-1.5 ${filterCategory === c.id ? "bg-blue-500/15 text-blue-300 border-blue-500/30" : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700"}`}><I size={13} /> {c.label}</button>); })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-1.5 flex-wrap">{["React", "Python", "Node.js", "TypeScript", "Docker", "Rust"].map((t) => (<button key={t} onClick={() => setFilterTechs((p) => p.includes(t) ? p.filter((x) => x !== t) : [...p, t])} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-all ${filterTechs.includes(t) ? "bg-violet-500/15 text-violet-300 border-violet-500/30" : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300"}`}>{t}</button>))}</div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 border border-zinc-800 text-zinc-400 appearance-none cursor-pointer"><option value="recent">Récents</option><option value="top">Notés</option><option value="comments">Commentés</option></select>
              </div>
            </div>
            {/* Grille */}
            {filteredProjects.length === 0 ? (<div className="text-center py-20"><Search size={40} className="mx-auto text-zinc-700 mb-4" /><p className="text-zinc-500">{projects.length === 0 ? "Aucun projet publié. Sois le premier !" : "Aucun résultat."}</p></div>) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">{filteredProjects.map((project) => {
                const author = users.find((u) => u.id === project.authorId);
                const { avg, count } = getProjectRating(project.id);
                const cc = getCommentCount(project.id);
                const ar = getUserRating(project.authorId);
                return (<div key={project.id} className="relative group">
                  <button onClick={() => navigateTo("detail", { projectId: project.id })} className="w-full text-left bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700/80 hover:bg-zinc-900/90 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5">
                    {project.imageData && <div className="w-full h-40 bg-zinc-800 overflow-hidden"><img src={project.imageData} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" /></div>}
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3"><div className="flex items-center gap-2.5"><div className={`w-8 h-8 rounded-full bg-gradient-to-br ${author?.avatar?.bg || "from-zinc-600 to-zinc-700"} flex items-center justify-center text-sm`}>{author?.avatar?.emoji || "?"}</div><div><p className="text-sm font-medium text-zinc-300">{author?.username || "?"}</p><div className="flex items-center gap-1"><Star size={10} className="fill-amber-400 text-amber-400" /><span className="text-xs text-zinc-500">{ar.toFixed(1)}</span></div></div></div><span className="text-xs text-zinc-600">{timeAgo(project.createdAt)}</span></div>
                      <h3 className="text-base font-semibold text-zinc-100 mb-1.5 group-hover:text-blue-300 transition-colors leading-snug">{project.title}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-3 line-clamp-2">{project.shortDesc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">{project.techs.slice(0, 4).map((t) => <TechBadge key={t} tech={t} />)}{project.techs.length > 4 && <span className="text-xs text-zinc-600 self-center">+{project.techs.length - 4}</span>}</div>
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60"><div className="flex items-center gap-1"><StarRating rating={Math.round(avg)} size={14} /><span className="text-xs text-zinc-400 ml-1">{avg.toFixed(1)}</span><span className="text-xs text-zinc-600">({count})</span></div><div className="flex items-center gap-3 text-xs text-zinc-500"><span className="flex items-center gap-1"><MessageSquare size={12} /> {cc}</span>{project.hasCode && <span className="flex items-center gap-1"><FileCode size={12} /> Code</span>}</div></div>
                    </div>
                  </button>
                  <div className="absolute top-2 right-2 z-10 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ShareButton hash={buildHash("project", project.id)} label="projet" />
                    {isAdmin && <button onClick={() => deleteProject(project.id)} className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30"><X size={14} /></button>}
                  </div>
                </div>);
              })}</div>
            )}
          </div>)}

          {/* ──── DÉTAIL ──── */}
          {view === "detail" && selProject && (() => {
            const { avg, count, distribution } = selRating;
            const aR = selAuthor ? getUserRating(selAuthor.id) : 0;
            const already = currentUser && selReviews.some((r) => r.authorId === currentUser.id);
            const isOwn = currentUser && currentUser.id === selProject.authorId;
            const mD = Math.max(...distribution, 1);
            const tabs = [{ id: "presentation", label: "Présentation", icon: BookOpen }, { id: "code", label: "Code", icon: Code2, disabled: !selProject.hasCode }, { id: "guide", label: "Guide", icon: Terminal, disabled: !selProject.hasInstructions }];
            return (<div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-between"><button onClick={() => navigateTo("home")} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"><ChevronRight size={14} className="rotate-180" /> Retour</button><ShareButton hash={buildHash("project", selProject.id)} label="projet" /></div>
              {selProject.imageData && <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/60"><img src={selProject.imageData} alt="" className="w-full h-full object-cover" /></div>}
              <div>
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-0"><h1 className="text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">{selProject.title}</h1>
                    <div className="flex items-center gap-3 flex-wrap"><button onClick={() => navigateTo("profile", { profileId: selAuthor?.id })} className="flex items-center gap-2 hover:opacity-80"><div className={`w-7 h-7 rounded-full bg-gradient-to-br ${selAuthor?.avatar?.bg} flex items-center justify-center text-xs`}>{selAuthor?.avatar?.emoji}</div><span className="text-sm text-zinc-300">{selAuthor?.username}</span><Star size={11} className="fill-amber-400 text-amber-400" /><span className="text-xs text-zinc-500">{aR.toFixed(1)}</span></button><span className="text-xs text-zinc-600">•</span><span className="text-xs text-zinc-500">{formatDate(selProject.createdAt)}</span><span className="text-xs text-zinc-600">•</span><span className="text-xs text-zinc-500">{CATEGORIES.find(c => c.id === selProject.category)?.label}</span></div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {isAdmin && <button onClick={() => deleteProject(selProject.id)} className="px-3 py-2 rounded-xl text-sm font-medium bg-red-600/15 text-red-300 border border-red-500/20 hover:bg-red-600/25 flex items-center gap-1.5"><X size={14} /> Supprimer</button>}
                    {selProject.demoUrl && <a href={selProject.demoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl text-sm font-medium bg-blue-600/15 text-blue-300 border border-blue-500/20 hover:bg-blue-600/25 flex items-center gap-1.5"><Globe size={14} /> Démo</a>}
                    {selProject.repoUrl && <a href={selProject.repoUrl} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700 flex items-center gap-1.5"><GithubIcon size={14} /> GitHub</a>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-4">{selProject.techs.map((t) => <TechBadge key={t} tech={t} />)}</div>
                {count > 0 && <div className="flex items-center gap-3 mt-4 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60"><div className="text-3xl font-bold text-zinc-100">{avg.toFixed(1)}</div><div><StarRating rating={Math.round(avg)} size={16} /><p className="text-xs text-zinc-500 mt-0.5">{count} évaluation{count > 1 ? "s" : ""}</p></div></div>}
              </div>
              <div className="border-b border-zinc-800"><div className="flex gap-1">{tabs.map((t) => { const I = t.icon; return (<button key={t.id} disabled={t.disabled} onClick={() => setDetailTab(t.id)} className={`px-4 py-2.5 text-sm font-medium border-b-2 flex items-center gap-1.5 ${detailTab === t.id ? "border-blue-500 text-blue-400" : t.disabled ? "border-transparent text-zinc-700 cursor-not-allowed" : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"}`}><I size={14} /> {t.label}</button>); })}</div></div>
              <div>{detailTab === "presentation" && <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed text-[15px]">{selProject.description}</div>}{detailTab === "code" && selProject.codeSnippet && <CodeBlock code={selProject.codeSnippet} />}{detailTab === "guide" && selProject.runInstructions && <div className="whitespace-pre-wrap text-zinc-300 text-sm leading-relaxed font-mono bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5">{selProject.runInstructions}</div>}</div>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-zinc-100 flex items-center gap-2"><MessageSquare size={20} className="text-blue-400" /> Évaluations</h2>
                {count > 0 && <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 space-y-2">{[5,4,3,2,1].map((s) => (<div key={s} className="flex items-center gap-3"><span className="text-xs text-zinc-400 w-3 text-right">{s}</span><Star size={12} className="fill-amber-400 text-amber-400" /><div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: `${(distribution[s-1]/mD)*100}%` }} /></div><span className="text-xs text-zinc-500 w-6">{distribution[s-1]}</span></div>))}</div>}
                {currentUser && !already && !isOwn && (<div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-medium text-zinc-300">Ton évaluation</h3>
                  <div className="flex items-center gap-3"><span className="text-sm text-zinc-400">Note :</span><StarRating rating={reviewRating} onRate={setReviewRating} interactive size={22} />{reviewRating > 0 && <span className="text-sm text-zinc-400">{reviewRating}/5</span>}</div>
                  <div><label className="block text-sm text-zinc-400 mb-1.5">Type</label><div className="flex gap-2 flex-wrap">{REVIEW_TYPES.map((tp) => (<button key={tp} onClick={() => setReviewType(tp)} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${reviewType === tp ? "bg-violet-500/15 text-violet-300 border-violet-500/30" : "bg-zinc-800/60 text-zinc-500 border-zinc-700/50 hover:text-zinc-300"}`}>{tp}</button>))}</div></div>
                  <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Ton retour constructif…" rows={3} className="w-full px-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 text-sm resize-none" />
                  <button onClick={handleSubmitReview} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500">Publier</button>
                </div>)}
                {!currentUser && <div className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-5 text-center"><p className="text-sm text-zinc-500 mb-3">Connecte-toi pour évaluer.</p><button onClick={() => setAuthModal("login")} className="px-4 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700">Se connecter</button></div>}
                {already && <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-2 text-emerald-300 text-sm"><Check size={16} /> Déjà évalué.</div>}
                {selReviews.length > 0 && (<div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="text-sm text-zinc-400">{selReviews.length} commentaire{selReviews.length > 1 ? "s" : ""}</span><select value={reviewSort} onChange={(e) => setReviewSort(e.target.value)} className="text-xs bg-zinc-900 border border-zinc-800 text-zinc-400 rounded-lg px-2 py-1 appearance-none cursor-pointer"><option value="recent">Récents</option><option value="top">Utiles</option></select></div>
                  {selReviews.map((rv) => { const ra = users.find((u) => u.id === rv.authorId); const voted = currentUser && rv.upvotedBy.includes(currentUser.id); return (
                    <div key={rv.id} className="bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between"><div className="flex items-center gap-2.5"><button onClick={() => navigateTo("profile", { profileId: ra?.id })} className={`w-7 h-7 rounded-full bg-gradient-to-br ${ra?.avatar?.bg} flex items-center justify-center text-xs`}>{ra?.avatar?.emoji}</button><div><button onClick={() => navigateTo("profile", { profileId: ra?.id })} className="text-sm font-medium text-zinc-300 hover:text-blue-300">{ra?.username}</button><span className="text-xs text-zinc-600 ml-2">{ra?.role}</span></div></div><div className="flex items-center gap-2"><span className="text-xs text-zinc-600">{timeAgo(rv.createdAt)}</span>{isAdmin && <button onClick={() => deleteReview(rv.id)} className="p-1 rounded text-red-400/60 hover:text-red-400 hover:bg-red-500/10"><X size={12} /></button>}</div></div>
                      <div className="flex items-center gap-2"><StarRating rating={rv.rating} size={13} /><span className={`px-2 py-0.5 rounded text-xs font-medium ${rv.type === "Conseil technique" ? "bg-blue-500/15 text-blue-300" : rv.type === "Retour UI/UX" ? "bg-violet-500/15 text-violet-300" : rv.type === "Bug trouvé" ? "bg-red-500/15 text-red-300" : "bg-emerald-500/15 text-emerald-300"}`}>{rv.type}</span></div>
                      <p className="text-sm text-zinc-400 leading-relaxed">{rv.comment}</p>
                      <button onClick={() => handleUpvote(rv.id)} className={`flex items-center gap-1.5 text-xs ${voted ? "text-blue-400" : "text-zinc-600 hover:text-zinc-400"}`}><ThumbsUp size={13} className={voted ? "fill-blue-400" : ""} /> Utile{rv.upvotes > 0 && ` (${rv.upvotes})`}</button>
                    </div>); })}
                </div>)}
              </div>
            </div>);
          })()}

          {/* ──── PROFIL ──── */}
          {view === "profile" && profUser && (() => {
            const r = getUserRating(profUser.id); const up = projects.filter((p) => p.authorId === profUser.id);
            const cw = reviews.filter((rv) => rv.authorId === profUser.id).length;
            const tu = reviews.filter((rv) => up.some((p) => p.id === rv.projectId)).reduce((s, rv) => s + rv.upvotes, 0);
            const premium = r >= 4.5 && up.length > 0;
            const trr = reviews.filter((rv) => up.some((p) => p.id === rv.projectId)).length;
            return (<div className="max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-between"><button onClick={() => navigateTo("home")} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"><ChevronRight size={14} className="rotate-180" /> Retour</button><ShareButton hash={buildHash("profile", profUser.id)} label="profil" /></div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <div className="relative"><div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${profUser.avatar.bg} flex items-center justify-center text-3xl shadow-xl`}>{profUser.avatar.emoji}</div>{premium && <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"><Award size={14} className="text-white" /></div>}</div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap"><h1 className="text-2xl font-bold text-zinc-100">{profUser.username}</h1>{profUser.isAdmin && <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">ADMIN</span>}{premium && <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">PREMIUM</span>}</div>
                    <p className="text-sm text-zinc-400 mt-0.5">{profUser.role}</p>{profUser.bio && <p className="text-sm text-zinc-500 mt-2">{profUser.bio}</p>}
                    <div className="flex items-center gap-3 mt-3 justify-center sm:justify-start"><StarRating rating={Math.round(r)} size={15} /><span className="text-sm font-medium text-zinc-300">{r.toFixed(1)}</span><span className="text-xs text-zinc-500">({trr} avis)</span></div>
                    <p className="text-xs text-zinc-600 mt-2">Membre depuis {formatDate(profUser.joinedAt)}</p>
                    {isAdmin && profUser.id !== currentUser?.id && !profUser.isAdmin && <button onClick={() => deleteUser(profUser.id)} className="mt-3 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-600/15 text-red-300 border border-red-500/20 hover:bg-red-600/25">Supprimer</button>}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-zinc-800/60"><div className="text-center"><p className="text-2xl font-bold text-zinc-100">{up.length}</p><p className="text-xs text-zinc-500 mt-0.5">Projets</p></div><div className="text-center"><p className="text-2xl font-bold text-zinc-100">{cw}</p><p className="text-xs text-zinc-500 mt-0.5">Commentaires</p></div><div className="text-center"><p className="text-2xl font-bold text-zinc-100">{tu}</p><p className="text-xs text-zinc-500 mt-0.5">Upvotes</p></div></div>
              </div>
              <div><h2 className="text-lg font-semibold text-zinc-200 mb-4">Projets ({up.length})</h2>
                {up.length === 0 ? <p className="text-sm text-zinc-500">Aucun projet.</p> : (<div className="space-y-3">{up.map((p) => { const { avg, count } = getProjectRating(p.id); return (<button key={p.id} onClick={() => navigateTo("detail", { projectId: p.id })} className="w-full text-left bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-4 hover:border-zinc-700/60 group"><div className="flex items-center justify-between"><div className="flex-1 min-w-0 mr-3"><h3 className="font-medium text-zinc-200 group-hover:text-blue-300 truncate">{p.title}</h3><p className="text-sm text-zinc-500 truncate mt-0.5">{p.shortDesc}</p></div><div className="flex items-center gap-2 shrink-0"><StarRating rating={Math.round(avg)} size={13} /><span className="text-xs text-zinc-400">{avg.toFixed(1)} ({count})</span><ChevronRight size={14} className="text-zinc-600" /></div></div><div className="flex gap-1.5 mt-2.5">{p.techs.slice(0, 5).map((t) => <TechBadge key={t} tech={t} />)}</div></button>); })}</div>)}
              </div>
            </div>);
          })()}

          {/* ──── PUBLIER ──── */}
          {view === "publish" && (() => {
            if (!currentUser) return (<div className="text-center py-20"><p className="text-zinc-500 mb-4">Connecte-toi pour publier.</p><button onClick={() => setAuthModal("login")} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700">Se connecter</button></div>);
            const steps = [{ label: "Infos", icon: BookOpen }, { label: "Stack & Image", icon: Layers }, { label: "Code & Guide", icon: Code2 }];
            const addT = (t) => { if (t && !pubTechs.includes(t)) setPubTechs([...pubTechs, t]); setPubTechInput(""); };
            return (<div className="max-w-2xl mx-auto space-y-8">
              <button onClick={() => navigateTo("home")} className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300"><ChevronRight size={14} className="rotate-180" /> Annuler</button>
              <h1 className="text-2xl font-bold text-zinc-100">Publier un projet</h1>
              <div className="flex items-center gap-2">{steps.map((s, i) => { const I = s.icon; return (<button key={i} onClick={() => setPubStep(i)} className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-medium border ${pubStep === i ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : pubStep > i ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-zinc-900/40 text-zinc-500 border-zinc-800"}`}>{pubStep > i ? <Check size={14} /> : <I size={14} />}<span className="hidden sm:inline">{s.label}</span></button>); })}</div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-2xl p-6 space-y-5">
                {pubStep === 0 && (<>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Titre *</label><input type="text" value={pubTitle} onChange={(e) => setPubTitle(e.target.value)} placeholder="Nom du projet" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50" /></div>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Description courte *</label><input type="text" value={pubShortDesc} onChange={(e) => setPubShortDesc(e.target.value)} placeholder="Une phrase accrocheuse" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50" /></div>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Description détaillée *</label><textarea value={pubDescription} onChange={(e) => setPubDescription(e.target.value)} placeholder="Décris ton projet…" rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 text-sm resize-none" /></div>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Catégorie</label><div className="grid grid-cols-3 sm:grid-cols-6 gap-2">{CATEGORIES.map((c) => { const I = c.icon; return (<button key={c.id} onClick={() => setPubCategory(c.id)} className={`flex flex-col items-center gap-1 py-3 rounded-xl text-xs font-medium border ${pubCategory === c.id ? "bg-blue-500/10 text-blue-400 border-blue-500/30" : "bg-zinc-800/40 text-zinc-500 border-zinc-700/30 hover:text-zinc-300"}`}><I size={18} /> {c.label}</button>); })}</div></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Démo (optionnel)</label><input type="url" value={pubDemoUrl} onChange={(e) => setPubDemoUrl(e.target.value)} placeholder="https://…" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50" /></div><div><label className="block text-sm font-medium text-zinc-400 mb-1.5">GitHub (optionnel)</label><input type="url" value={pubRepoUrl} onChange={(e) => setPubRepoUrl(e.target.value)} placeholder="https://github.com/…" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50" /></div></div>
                </>)}
                {pubStep === 1 && (<>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Technologies</label>
                    <div className="flex gap-2 mb-3"><input type="text" value={pubTechInput} onChange={(e) => setPubTechInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addT(pubTechInput.trim()); } }} placeholder="Ajouter…" className="flex-1 px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50" /><button onClick={() => addT(pubTechInput.trim())} className="px-4 py-2.5 rounded-xl bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700 text-sm">Ajouter</button></div>
                    {pubTechs.length > 0 && <div className="flex flex-wrap gap-2 mb-4">{pubTechs.map((t) => <TechBadge key={t} tech={t} removable onRemove={(t) => setPubTechs(pubTechs.filter((x) => x !== t))} />)}</div>}
                    <p className="text-xs text-zinc-600 mb-2">Suggestions :</p>
                    <div className="flex flex-wrap gap-1.5">{TECHS.filter((t) => !pubTechs.includes(t)).slice(0, 12).map((t) => (<button key={t} onClick={() => addT(t)} className="px-2.5 py-1 rounded-md text-xs text-zinc-500 bg-zinc-800/40 border border-zinc-700/30 hover:text-zinc-300 hover:border-zinc-600">+ {t}</button>))}</div>
                  </div>
                  <ImageUploader value={pubImageData} onChange={setPubImageData} />
                </>)}
                {pubStep === 2 && (<>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Code clé (optionnel)</label><textarea value={pubCodeSnippet} onChange={(e) => setPubCodeSnippet(e.target.value)} placeholder="Extrait de code…" rows={8} className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 text-sm font-mono resize-none" /></div>
                  <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Instructions (optionnel)</label><textarea value={pubRunInstructions} onChange={(e) => setPubRunInstructions(e.target.value)} placeholder="Comment lancer le projet…" rows={5} className="w-full px-4 py-3 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 text-sm resize-none" /></div>
                </>)}
                <div className="flex justify-between pt-2">
                  {pubStep > 0 ? <button onClick={() => setPubStep(pubStep - 1)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200">Précédent</button> : <div />}
                  {pubStep < 2 ? <button onClick={() => setPubStep(pubStep + 1)} className="px-5 py-2.5 rounded-xl text-sm font-medium bg-zinc-800 text-zinc-300 border border-zinc-700/50 hover:bg-zinc-700 flex items-center gap-1.5">Suivant <ChevronRight size={14} /></button>
                  : <button onClick={handlePublish} className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/20 flex items-center gap-1.5"><Sparkles size={14} /> Publier</button>}
                </div>
              </div>
            </div>);
          })()}

          {/* ──── ADMIN ──── */}
          {view === "admin" && isAdmin && (<div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-2xl font-bold text-zinc-100">🔐 Administration</h1>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-zinc-100">{realUsers.length}</p><p className="text-xs text-zinc-500 mt-1">Utilisateurs</p></div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-zinc-100">{projects.length}</p><p className="text-xs text-zinc-500 mt-1">Projets</p></div>
              <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-5 text-center"><p className="text-3xl font-bold text-zinc-100">{reviews.length}</p><p className="text-xs text-zinc-500 mt-1">Évaluations</p></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-zinc-200 mb-4">Utilisateurs inscrits ({realUsers.length})</h2>
              {realUsers.length === 0 ? <p className="text-sm text-zinc-500">Aucun utilisateur inscrit.</p> : (
                <div className="space-y-2">{realUsers.map((u) => (
                  <div key={u.id} className="flex items-center justify-between bg-zinc-900/40 border border-zinc-800/40 rounded-xl p-3">
                    <div className="flex items-center gap-3"><div className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.avatar.bg} flex items-center justify-center text-sm`}>{u.avatar.emoji}</div>
                      <div><p className="text-sm font-medium text-zinc-200">{u.username}</p><p className="text-xs text-zinc-500">{u.email} · {u.role} · {formatDate(u.joinedAt)} · {projects.filter(p => p.authorId === u.id).length} projet(s)</p></div></div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => navigateTo("profile", { profileId: u.id })} className="px-2.5 py-1.5 rounded-lg text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700">Voir</button>
                      <button onClick={() => deleteUser(u.id)} className="px-2.5 py-1.5 rounded-lg text-xs bg-red-600/15 text-red-300 border border-red-500/20 hover:bg-red-600/25">Supprimer</button>
                    </div>
                  </div>
                ))}</div>
              )}
            </div>
            <div className="pt-4 border-t border-zinc-800/60">
              <button onClick={() => { if (window.confirm("Effacer TOUTES les données ?")) { setUsers([]); setProjects([]); setReviews([]); setCurrentUser(null); showToast("Reset total.", "info"); } }} className="px-4 py-2.5 rounded-xl text-sm font-medium bg-red-600/15 text-red-300 border border-red-500/20 hover:bg-red-600/25">Réinitialiser toutes les données</button>
            </div>
          </div>)}

        </main>

        {/* ═══ FOOTER ═══ */}
        <footer className="mt-20 border-t border-zinc-800/60 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
            <div className="flex items-center gap-2.5"><img src="/logo.png" alt="DevRate" className="w-7 h-7 rounded object-contain" /><span>DevRate — Partage, apprends, progresse.</span></div>
            <div className="flex items-center gap-4"><a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300"><DiscordIcon size={14} /> Discord</a><span>React · Tailwind · Lucide</span></div>
          </div>
        </footer>
      </div>

      {/* ═══ MODAL AUTH ═══ */}
      <Modal isOpen={!!authModal} onClose={() => { setAuthModal(false); setAuthError(""); }} title={authModal === "signup" ? "Créer un compte" : "Connexion"}>
        <div className="space-y-5">
          <div className="flex rounded-xl bg-zinc-800/50 p-1">
            <button onClick={() => { setAuthModal("login"); setAuthError(""); }} className={`flex-1 py-2 rounded-lg text-sm font-medium ${authModal === "login" ? "bg-zinc-700 text-white shadow" : "text-zinc-400 hover:text-zinc-300"}`}>Connexion</button>
            <button onClick={() => { setAuthModal("signup"); setAuthError(""); }} className={`flex-1 py-2 rounded-lg text-sm font-medium ${authModal === "signup" ? "bg-zinc-700 text-white shadow" : "text-zinc-400 hover:text-zinc-300"}`}>Inscription</button>
          </div>
          <div><label className="block text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5"><Mail size={14} /> Adresse email</label><input type="email" value={authEmailField} onChange={(e) => setAuthEmailField(e.target.value)} placeholder="email@exemple.com" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20" /></div>
          {authModal === "signup" && <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Pseudo</label><input type="text" value={authUsername} onChange={(e) => setAuthUsername(e.target.value)} placeholder="ex: DevMaster42" className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20" /></div>}
          <div><label className="block text-sm font-medium text-zinc-400 mb-1.5 flex items-center gap-1.5"><Lock size={14} /> Mot de passe</label><div className="relative"><input type={authShowPw ? "text" : "password"} value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 pr-11 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20" /><button type="button" onClick={() => setAuthShowPw(!authShowPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">{authShowPw ? <EyeOff size={16} /> : <Eye size={16} />}</button></div>{authModal === "signup" && <p className="text-xs text-zinc-600 mt-1">Min. 6 caractères, 1 majuscule, 1 chiffre.</p>}</div>
          {authModal === "signup" && (<>
            <div><label className="block text-sm font-medium text-zinc-400 mb-2">Avatar</label><div className="flex gap-2 flex-wrap">{AVATARS.map((a) => (<button key={a.id} onClick={() => setAuthAvatarId(a.id)} className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.bg} flex items-center justify-center text-xl ${authAvatarId === a.id ? "ring-2 ring-blue-400 ring-offset-2 ring-offset-zinc-900 scale-110" : "opacity-60 hover:opacity-90"}`}>{a.emoji}</button>))}</div></div>
            <div><label className="block text-sm font-medium text-zinc-400 mb-1.5">Rôle</label><select value={authRole} onChange={(e) => setAuthRole(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-zinc-800/60 border border-zinc-700/50 text-zinc-200 focus:outline-none focus:border-blue-500/50 appearance-none">{ROLES.map((r) => <option key={r} value={r}>{r}</option>)}</select></div>
          </>)}
          {authError && <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"><AlertCircle size={14} /> {authError}</div>}
          <button onClick={authModal === "signup" ? handleSignup : handleLogin} className="w-full py-3 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-500/20">{authModal === "signup" ? "Créer mon compte" : "Se connecter"}</button>
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <style>{`@keyframes slide-up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}.animate-slide-up{animation:slide-up .3s ease-out}.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>
    </div>
  );
}

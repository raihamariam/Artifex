import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers3,
  Menu,
  Move3d,
  MousePointer2,
  Orbit,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";

type View = "landing" | "journey";
type DemoStep = "intent" | "material" | "form" | "pattern" | "impact" | "approve";

const stepMeta: Record<DemoStep, { number: string; title: string; kicker: string; body: string }> = {
  intent: {
    number: "01",
    title: "Start with intent.",
    kicker: "CREATIVE DIRECTION",
    body: "Begin with the feeling, silhouette, and point of view — not with a blank technical file.",
  },
  material: {
    number: "02",
    title: "Give it a material language.",
    kicker: "FIT + MATERIAL",
    body: "Select the tension between fluid, structured, matte, and reflective. The garment responds as a connected idea.",
  },
  form: {
    number: "03",
    title: "Let the idea hold form.",
    kicker: "3D GARMENT",
    body: "Explore the garment as a living object. Rotate the concept. Zoom into the surface. See what the eye cannot hold in a sketch.",
  },
  pattern: {
    number: "04",
    title: "Open the construction.",
    kicker: "PATTERN INTELLIGENCE",
    body: "The underlying pieces unfold from the silhouette — another view of the same product state.",
  },
  impact: {
    number: "05",
    title: "See what a decision touches.",
    kicker: "CONNECTED DEPENDENCIES",
    body: "Material, fit, pattern, construction, and documentation remain visibly related as the garment evolves.",
  },
  approve: {
    number: "06",
    title: "Keep the designer in control.",
    kicker: "HUMAN APPROVAL",
    body: "Artifex can propose a direction. The designer decides what becomes part of the product.",
  },
};

const steps = Object.keys(stepMeta) as DemoStep[];

function Garment({ mode = "hero", material = "silver", pattern = false }: { mode?: "hero" | "studio" | "mini"; material?: string; pattern?: boolean }) {
  return (
    <div className={`garment-scene ${mode} material-${material} ${pattern ? "is-pattern" : ""}`}>
      <div className="garment-shadow" />
      <div className="garment-aura" />
      <div className="garment-body">
        <div className="garment-neck" />
        <div className="garment-shoulder left" />
        <div className="garment-shoulder right" />
        <div className="garment-torso" />
        <div className="garment-waist" />
        <div className="garment-skirt">
          <span className="fold fold-a" />
          <span className="fold fold-b" />
          <span className="fold fold-c" />
          <span className="fold fold-d" />
        </div>
        <div className="garment-panel panel-a" />
        <div className="garment-panel panel-b" />
        <div className="garment-sleeve sleeve-left" />
        <div className="garment-sleeve sleeve-right" />
        <div className="garment-seam seam-a" />
        <div className="garment-seam seam-b" />
      </div>
      <div className="garment-wire wire-a" />
      <div className="garment-wire wire-b" />
      {pattern && (
        <div className="pattern-orbit" aria-label="Conceptual pattern pieces">
          <div className="pattern-piece piece-1" />
          <div className="pattern-piece piece-2" />
          <div className="pattern-piece piece-3" />
        </div>
      )}
    </div>
  );
}

function Progress({ step }: { step: DemoStep }) {
  return (
    <div className="progress-track">
      {steps.map((item, index) => (
        <span key={item} className={index <= steps.indexOf(step) ? "active" : ""} />
      ))}
    </div>
  );
}

function Nav({ view, onView, onJoin, menuOpen, setMenuOpen }: { view: View; onView: (view: View) => void; onJoin: () => void; menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <header className="site-nav">
      <button className="brand-lockup" onClick={() => onView("landing")} aria-label="Return to Artifex landing page">
        <span className="brand-mark">A</span>
        <span>ARTIFEX</span>
      </button>
      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button className={view === "journey" ? "nav-link active" : "nav-link"} onClick={() => { onView("journey"); setMenuOpen(false); }}>Designer journey <ArrowUpRight size={14} /></button>
        <a className="nav-link" href="#principle" onClick={() => setMenuOpen(false)}>Why Artifex</a>
        <a className="nav-link" href="#position" onClick={() => setMenuOpen(false)}>Positioning</a>
        <button className="nav-join" onClick={() => { onJoin(); setMenuOpen(false); }}>Join early access <ArrowUpRight size={15} /></button>
      </nav>
      <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}

function Waitlist({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className={`waitlist ${compact ? "compact" : ""}`}>
      {submitted ? (
        <div className="success-state"><span className="success-icon"><Check size={15} /></span><span><strong>You are on the list.</strong><small>We’ll let you know when the next chapter is ready.</small></span></div>
      ) : (
        <form onSubmit={(event) => { event.preventDefault(); if (email.includes("@")) setSubmitted(true); }}>
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="Your email address" aria-label="Email address" required />
          <button type="submit">{compact ? "Join" : "Join early access"}<ArrowUpRight size={16} /></button>
        </form>
      )}
    </div>
  );
}

function Landing({ onJourney, onJoin }: { onJourney: () => void; onJoin: () => void }) {
  return (
    <main className="landing-page">
      <section className="hero-section" id="top">
        <div className="hero-copy reveal-up">
          <p className="eyebrow"><span className="eyebrow-line" /> Creative engineering for fashion</p>
          <h1>From creative<br /><em>intent</em> to<br /><span>production reality.</span></h1>
          <p className="hero-lede">A conceptual environment for keeping the idea, the garment, and the decisions connected as fashion moves toward making.</p>
          <div className="hero-actions"><button className="button button-dark" onClick={onJourney}>Explore the designer journey <ArrowUpRight size={17} /></button><a className="text-link" href="#principle">See the principle <ArrowDownRight size={16} /></a></div>
        </div>
        <div className="hero-visual reveal-in">
          <div className="visual-topline"><span>01 / CONCEPT GARMENT</span><span>SCROLL TO ENTER <ChevronDown size={14} /></span></div>
          <div className="hero-stage-grid" />
          <Garment mode="hero" />
          <div className="hero-caption"><span>ARTIFEX / 001</span><span>SCULPTURAL READY-TO-WEAR</span></div>
          <div className="orbit-label label-one">SILHOUETTE <i>01</i></div><div className="orbit-label label-two">SURFACE <i>02</i></div><div className="orbit-label label-three">CONSTRUCTION <i>03</i></div>
        </div>
        <div className="scroll-cue"><span>Scroll to enter</span><ChevronDown size={18} /></div>
      </section>

      <section className="friction-section dark-section">
        <div className="section-meta"><span>01 / THE PROBLEM</span><span>FRAGMENTED TRANSLATION</span></div>
        <div className="friction-layout">
          <div><p className="eyebrow muted"><span className="eyebrow-line" /> The garment gets translated</p><h2>Too many<br /><em>times.</em></h2></div>
          <div className="fragment-story"><div className="fragment-core"><div className="fragment-glyph">◌</div><span>one garment</span></div><div className="fragment-row"><div className="fragment-card">SKETCH <small>creative intent</small></div><div className="fragment-card">3D <small>form study</small></div><div className="fragment-card">PATTERN <small>geometry</small></div><div className="fragment-card">TECH PACK <small>production</small></div></div><p className="fragment-note">The same product is repeatedly re-entered, reinterpreted, and disconnected across tools, teams, and files.</p></div>
        </div>
      </section>

      <section className="principle-section" id="principle">
        <div className="section-meta"><span>02 / THE ARTIFEX PRINCIPLE</span><span>ONE EVOLVING PRODUCT STATE</span></div>
        <div className="principle-header"><p className="eyebrow"><span className="eyebrow-line" /> The garment is the unit of work</p><h2>One garment.<br /><em>One evolving</em><br />product state.</h2></div>
        <div className="principle-visual"><div className="principle-ring ring-outer" /><div className="principle-ring ring-inner" /><div className="principle-core"><Garment mode="mini" material="ink" /><span className="core-label">ARTIFEX<br /><small>PRODUCT STATE</small></span></div><div className="node node-fit"><span>FIT</span><small>body + ease</small></div><div className="node node-material"><span>MATERIAL</span><small>surface + drape</small></div><div className="node node-pattern"><span>PATTERN</span><small>geometry</small></div><div className="node node-docs"><span>DOCUMENTATION</span><small>living output</small></div></div>
        <div className="principle-foot"><p>Every view stays connected to the same evolving product — not a new translation.</p><button className="button button-outline" onClick={onJourney}>Enter the journey <ArrowRight size={16} /></button></div>
      </section>

      <section className="demo-preview-section dark-section">
        <div className="section-meta"><span>03 / A DESIGNER'S JOURNEY</span><span>CONCEPTUAL WORKFLOW</span></div>
        <div className="preview-head"><div><p className="eyebrow muted"><span className="eyebrow-line" /> Start with creative intent</p><h2>See the idea<br /><em>hold form.</em></h2></div><p className="preview-intro">From the first direction to a connected technical view, Artifex is imagined as one continuous creative-engineering workflow.</p></div>
        <div className="preview-stage"><div className="preview-annotation left-annotation"><span>01</span><b>creative direction</b><small>volume / surface / asymmetry</small></div><Garment mode="studio" material="green" /><div className="preview-annotation right-annotation"><span>02</span><b>3D garment state</b><small>rotate / zoom / explore</small></div><button className="play-orbit" onClick={onJourney}><Orbit size={17} /> Open interactive journey <ArrowUpRight size={16} /></button></div>
      </section>

      <section className="capability-section">
        <div className="section-meta"><span>04 / CONNECTED BY DESIGN</span><span>VISUAL CONCEPT</span></div>
        <div className="capability-grid">
          {[{icon: <ScanLine size={22} />, title: "Fit", body: "Define the intended body and silhouette."}, {icon: <Sparkles size={22} />, title: "Materials", body: "Explore how fabric direction influences the piece."}, {icon: <Layers3 size={22} />, title: "Pattern", body: "See geometry as a living part of the same product."}].map((item) => <div className="capability-card" key={item.title}><span className="capability-icon">{item.icon}</span><h3>{item.title}</h3><p>{item.body}</p><ArrowUpRight className="card-arrow" size={18} /></div>)}
        </div>
      </section>

      <section className="position-section dark-section" id="position">
        <div className="section-meta"><span>05 / THE POSITION</span><span>CONTINUITY ACROSS THE JOURNEY</span></div>
        <div className="position-header"><p className="eyebrow muted"><span className="eyebrow-line" /> Not another isolated tool</p><h2>Where creative<br /><em>intent</em> meets<br />product logic.</h2></div>
        <div className="position-rail"><div className="rail-card"><span>GENERATIVE DESIGN</span><p>creates possibilities</p><i>creative</i></div><div className="rail-card"><span>3D / CAD</span><p>models form</p><i>spatial</i></div><div className="rail-card"><span>PLM / DOCUMENTS</span><p>stores outputs</p><i>operational</i></div><div className="rail-card active"><span>ARTIFEX</span><p>connects the product journey</p><i>creative ↔ engineering</i></div></div>
        <p className="position-note">A conceptual product position: continuity across fashion development, with the designer still at the consequential boundary.</p>
      </section>

      <section className="waitlist-section" id="join">
        <div className="waitlist-kicker"><span>ARTIFEX / 2026</span><span>EARLY ACCESS</span></div>
        <h2>See what fashion<br /><em>development</em> could become.</h2>
        <p>Join the early-access list for designers, technical designers, pattern makers, and people shaping the future of fashion development.</p>
        <Waitlist />
        <small className="concept-note">This experience illustrates the Artifex product vision. Shown capabilities are conceptual and intended to communicate the future workflow.</small>
      </section>
      <footer className="site-footer"><span className="brand-lockup"><span className="brand-mark">A</span> ARTIFEX</span><span>Creative engineering for fashion</span><span>Concept prototype / 001</span></footer>
    </main>
  );
}

function Journey({ onBack, onJoin }: { onBack: () => void; onJoin: () => void }) {
  const [step, setStep] = useState<DemoStep>("intent");
  const [material, setMaterial] = useState("silver");
  const [rotation, setRotation] = useState(0);
  const [approved, setApproved] = useState(false);
  const current = stepMeta[step];
  const index = steps.indexOf(step);
  const materialLabel = useMemo(() => ({ silver: "reflective silver", matte: "powder matte", acid: "acid textile" }[material] ?? material), [material]);

  return (
    <main className="journey-page">
      <div className="journey-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to overview</button><span className="journey-label">ARTIFEX / DESIGNER JOURNEY</span><button className="journey-join" onClick={onJoin}>Join early access <ArrowUpRight size={15} /></button></div>
      <div className="journey-progress"><span>{current.number} / 06</span><Progress step={step} /><span className="progress-name">{current.kicker}</span></div>
      <section className="journey-hero">
        <div className="journey-copy"><p className="eyebrow"><span className="eyebrow-line" /> {current.kicker}</p><h1>{current.title}</h1><p>{current.body}</p><div className="journey-stepper"><button onClick={() => setStep(steps[Math.max(0, index - 1)])} disabled={index === 0}><ChevronLeft size={17} /></button><span>{current.number} / 06</span><button onClick={() => setStep(steps[Math.min(steps.length - 1, index + 1)])} disabled={index === steps.length - 1}><ChevronRight size={17} /></button></div></div>
        <div className={`journey-stage stage-${step}`} style={{ transform: `rotateY(${rotation}deg)` }}>
          <div className="stage-grid" />
          <Garment mode="studio" material={material} pattern={step === "pattern"} />
          <div className="stage-index">{current.number}</div>
          {step === "impact" && <div className="impact-lines"><span /><span /><span /><span /></div>}
          {step === "pattern" && <div className="pattern-tag"><Layers3 size={15} /> connected pattern view</div>}
          {step === "approve" && <div className={`approval-card ${approved ? "approved" : ""}`}><span>{approved ? <Check size={14} /> : <MousePointer2 size={14} />}</span>{approved ? "Concept accepted" : "Proposed change"}</div>}
        </div>
        <div className="journey-controls">
          {step === "material" && <div className="control-block"><span>Material direction</span><div className="choice-row"><button className={material === "silver" ? "selected" : ""} onClick={() => setMaterial("silver")}><i className="swatch silver" /> Reflective</button><button className={material === "matte" ? "selected" : ""} onClick={() => setMaterial("matte")}><i className="swatch matte" /> Matte</button><button className={material === "acid" ? "selected" : ""} onClick={() => setMaterial("acid")}><i className="swatch acid" /> Acid</button></div><small>Selected concept: {materialLabel}</small></div>}
          {step === "form" && <div className="control-block"><span>Explore the garment</span><button className="rotate-control" onClick={() => setRotation((value) => value + 45)}><Move3d size={15} /> Rotate 45°</button><small>Drag or tap to rotate the concept.</small></div>}
          {step === "impact" && <div className="control-block"><span>Select a decision</span><div className="choice-row"><button className="selected"><i className="signal-dot green" /> Material</button><button><i className="signal-dot blue" /> Fit</button><button><i className="signal-dot pink" /> Silhouette</button></div><small>Conceptual impact view across the product state.</small></div>}
          {step === "approve" && <div className="control-block"><span>Review the proposed direction</span><div className="choice-row"><button className={approved ? "selected" : ""} onClick={() => setApproved(true)}><Check size={14} /> Accept concept</button><button onClick={() => setApproved(false)}>Keep original</button></div><small>{approved ? "Your decision becomes part of the evolving product state." : "The original direction remains the source of truth."}</small></div>}
          {!(["material", "form", "impact", "approve"] as DemoStep[]).includes(step) && <div className="control-block"><span>Continue the visual story</span><small>Scroll the chapters with the arrows below.</small></div>}
          <button className="next-control" onClick={() => index === steps.length - 1 ? onJoin() : setStep(steps[index + 1])}>{index === steps.length - 1 ? "Join early access" : "Continue"} <ArrowUpRight size={16} /></button>
        </div>
      </section>
      <section className="journey-chapters"><div className="chapter-list">{steps.map((item) => <button key={item} className={item === step ? "chapter active" : "chapter"} onClick={() => setStep(item)}><span>{stepMeta[item].number}</span><b>{stepMeta[item].kicker}</b><small>{stepMeta[item].title}</small></button>)}</div><div className="journey-footnote"><Sparkles size={16} /><span>All displayed capabilities are conceptual visual demonstrations.</span></div></section>
      <section className="journey-cta"><p className="eyebrow"><span className="eyebrow-line" /> The continuous product state</p><h2>From idea to<br /><em>evolving product.</em></h2><Waitlist compact /></section>
    </main>
  );
}

export default function Home() {
  const [view, setView] = useState<View>("landing");
  const [menuOpen, setMenuOpen] = useState(false);
  const joinRef = useRef<HTMLDivElement>(null);
  useEffect(() => { document.title = "Artifex — Creative Engineering for Fashion"; }, []);
  const goJoin = () => { setView("landing"); window.setTimeout(() => document.getElementById("join")?.scrollIntoView({ behavior: "smooth" }), 50); };
  return <div className="app-shell"><Nav view={view} onView={setView} onJoin={goJoin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />{view === "landing" ? <Landing onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : <Journey onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} />}</div>;
}

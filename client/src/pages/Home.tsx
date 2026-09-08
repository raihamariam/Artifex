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

type View = "landing" | "journey" | "wireframes";
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

const storyboardScreens = [
  ["01", "Investor hero", "From creative intent to production reality", "Hero garment resolves from wireframe to material."],
  ["02", "Design layer", "Begin with the feeling", "Moodboard signals orbit the avatar and set direction."],
  ["03", "Garment understanding", "Make the idea legible", "Semantic pins identify volume, surface, and zones."],
  ["04", "3D garment", "Let the idea hold form", "Avatar rotates through a 360° product view."],
  ["05", "X-ray mode", "Open the construction", "Surface fades to reveal seams, panels, and supports."],
  ["06", "Pattern alternatives", "Two ways to engineer one idea", "Pattern pieces unfold into A/B garment states."],
  ["07", "Fit + grading", "Give the garment a body", "Two avatars show the same garment across size contexts."],
  ["08", "Material intelligence", "Same design, different behaviour", "Material swap changes surface, drape, and volume."],
  ["09", "Product graph", "Propagate a decision", "A luminous ripple travels through downstream objects."],
  ["10", "Impact lens", "See what a decision touches", "Affected objects pulse around the garment."],
  ["11", "Versioning", "Compare and merge", "Two versions crossfade on the same avatar."],
  ["12", "Production", "Make the intent manufacturable", "Panels arrange into a production view."],
  ["13", "Costing", "Connect product and commercial state", "Commercial layers orbit the garment."],
  ["14", "Sourcing", "Match requirements to materials", "Swatches travel from supply rail to garment."],
  ["15", "Sampling", "Close the physical loop", "Digital garment dissolves into sample evidence."],
  ["16", "Documentation", "Keep the product legible", "Tech pack and BOM orbit the current state."],
  ["17", "Mission control", "Scale from style to collection", "One garment pulls back into a style constellation."],
  ["18", "Copilot", "Ask about this product", "Response highlights only grounded product objects."],
  ["19", "Human approval", "The designer decides", "Proposed and original states merge or return."],
  ["20", "Waitlist", "Join Artifex", "The completed journey converts into a qualified form."],
] as const;

function WireframeMap({ onBack, onJourney, onJoin }: { onBack: () => void; onJourney: () => void; onJoin: () => void }) {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<"guided" | "explore">("guided");
  const screen = storyboardScreens[selected];
  return (
    <main className="wireframe-page">
      <div className="wireframe-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to landing</button><span className="journey-label">ARTIFEX / VISUAL WIREFRAME MAP</span><button className="journey-join" onClick={onJoin}>Join waitlist <ArrowUpRight size={15} /></button></div>
      <section className="wireframe-intro"><p className="eyebrow"><span className="eyebrow-line" /> Make the journey visible</p><h1>One garment.<br /><em>Twenty states.</em></h1><p>Use this map to understand how the landing page and designer simulation fit together. Select a screen to inspect the layout, the animation, and the visitor action.</p><div className="wireframe-actions"><button className="button button-dark" onClick={onJourney}>Play the cinematic journey <ArrowUpRight size={16} /></button><button className="button button-outline" onClick={onJoin}>Join Artifex Waitlist <ArrowUpRight size={16} /></button></div><div className="experience-balance"><div className="balance-copy"><span>EXPERIENCE MODEL</span><b>70% guided story / 30% explore</b><small>Investors see a controlled narrative. Designers can step inside the simulated product.</small></div><div className="mode-switch"><button className={mode === "guided" ? "active" : ""} onClick={() => setMode("guided")}>Guided</button><button className={mode === "explore" ? "active" : ""} onClick={() => setMode("explore")}>Explore</button></div></div><div className="garment-continuity-note"><span className="continuity-dot" /><span><b>Same garment throughout.</b> Every screen changes the state of one evolving digital garment.</span></div></section>
      <section className="wireframe-workspace">
        <aside className="wireframe-index"><div className="wireframe-index-title"><span>SCREEN MAP</span><small>{String(selected + 1).padStart(2, "0")} / 20 selected</small></div>{storyboardScreens.map((item, index) => <button key={item[0]} className={index === selected ? "map-item active" : "map-item"} onClick={() => setSelected(index)}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></button>)}</aside>
        <div className={`wireframe-detail mode-${mode}`}><div className="wireframe-detail-head"><div><span className="chapter-kicker">{screen[0]} / {screen[1]}</span><h2>{screen[2]}</h2></div><div className="wireframe-arrow"><button onClick={() => setSelected(Math.max(0, selected - 1))} disabled={!selected}><ChevronLeft size={17} /></button><button onClick={() => setSelected(Math.min(storyboardScreens.length - 1, selected + 1))} disabled={selected === storyboardScreens.length - 1}><ChevronRight size={17} /></button></div></div><div className={`wireframe-canvas canvas-${selected + 1}`}><div className="canvas-top"><span>ARTIFEX / {screen[0]}</span><span>{screen[1].toUpperCase()}</span></div><div className="canvas-grid" />{selected === 0 && <><div className="canvas-headline">FROM CREATIVE<br /><em>INTENT</em> TO<br />PRODUCTION REALITY.</div><div className="canvas-garment"><Garment mode="mini" /></div><div className="canvas-annotation annotation-a">SILHOUETTE <i>01</i></div><div className="canvas-annotation annotation-b">SURFACE <i>02</i></div></>}{selected > 0 && selected < 19 && <><div className="canvas-wire-object"><div className="wire-avatar" /><div className="wire-garment" /><div className="wire-layers"><span /><span /><span /><span /></div></div><div className="canvas-ui"><span className="ui-line long" /><span className="ui-line" /><span className="ui-line medium" /><span className="ui-pill" /><span className="ui-pill" /><span className="ui-card" /><span className="ui-card short" /></div><div className="canvas-title">{screen[1]}<small>{screen[3]}</small></div></>}{selected === 19 && <div className="canvas-form"><span className="ui-line long" /><span className="form-line" /><span className="form-line" /><span className="form-line" /><span className="form-button">JOIN ARTIFEX WAITLIST <ArrowUpRight size={14} /></span></div>}<div className="canvas-bottom"><span>{mode === "guided" ? "GUIDED / CONCEPTUAL VISUAL SIMULATION" : "EXPLORE / CURATED SIMULATION"}</span><span>{screen[3]}</span></div></div><div className="wireframe-explain"><div><span>WHAT HAPPENS</span><p>{screen[3]}</p></div><div><span>VISITOR ACTION</span><p>{selected === 19 ? "Complete name, email, company, role, and optional reason for interest." : selected === 0 ? "Scroll into the guided story or enter the designer simulation." : mode === "guided" ? "Scroll to continue, or select this screen to inspect its state." : "Click around the curated controls, then return to the story."}</p></div><div><span>STATE</span><p>{selected < 19 ? "Pre-simulated visual state" : "Conversion state"}</p></div></div></div>
      </section>
    </main>
  );
}

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
        <button className={view === "wireframes" ? "nav-link active" : "nav-link"} onClick={() => { onView("wireframes"); setMenuOpen(false); }}>Wireframe map <ArrowUpRight size={14} /></button>
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

const cinematicChapters = [
  { key: "intent", number: "01", kicker: "CREATIVE INTENT", title: "Begin with the feeling.", body: "A sketch, a surface, a silhouette — the creative signal stays visible as the garment starts to take form.", tag: "sketch → direction" },
  { key: "fit", number: "02", kicker: "FIT + BODY", title: "Give the idea a body.", body: "Fit is not a late-stage correction. It is context around the creative decision, from close to voluminous.", tag: "silhouette → fit" },
  { key: "material", number: "03", kicker: "MATERIAL INTELLIGENCE", title: "Let surface change the story.", body: "Reflective, matte, fluid, structured — explore material direction while the product state stays connected.", tag: "fabric → drape" },
  { key: "form", number: "04", kicker: "3D GARMENT", title: "Watch the idea hold form.", body: "Move around the garment. Zoom into the surface. See the piece as an object before it becomes a file.", tag: "form → exploration" },
  { key: "pattern", number: "05", kicker: "PATTERN INTELLIGENCE", title: "Open the construction.", body: "The pattern pieces unfold from the silhouette — another view of the same evolving product.", tag: "garment → geometry" },
  { key: "dependencies", number: "06", kicker: "CONNECTED DEPENDENCIES", title: "See what a decision touches.", body: "A material choice can affect drape, construction, documentation, and the way the garment is understood downstream.", tag: "decision → impact" },
  { key: "documentation", number: "07", kicker: "LIVING DOCUMENTATION", title: "Keep the product legible.", body: "Technical views, decisions, and context stay close to the garment instead of disappearing into disconnected outputs.", tag: "state → clarity" },
  { key: "approval", number: "08", kicker: "HUMAN APPROVAL", title: "The designer decides.", body: "Artifex can propose a direction. Human expertise remains the control system at consequential boundaries.", tag: "propose → decide" },
];

function CinematicScroll({ onJourney }: { onJourney: () => void }) {
  const [active, setActive] = useState(0);
  const [material, setMaterial] = useState("silver");
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.index);
          setActive(index);
        }
      });
    }, { threshold: .55, rootMargin: "-12% 0px -22% 0px" });
    chapterRefs.current.forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);
  const chapter = cinematicChapters[active];
  const stageMaterial = active === 2 ? material : active === 0 ? "ink" : active === 3 || active === 4 ? "silver" : active === 5 ? "acid" : "silver";
  return (
    <section className="cinematic-section dark-section" id="designer-story">
      <div className="section-meta cinematic-meta"><span>03 / THE DESIGNER JOURNEY</span><span>SCROLL TO UNFOLD THE PRODUCT</span></div>
      <div className="cinematic-layout">
        <div className="cinematic-copy">
          <div className="cinematic-intro"><p className="eyebrow muted"><span className="eyebrow-line" /> One continuous workflow</p><h2>Every decision<br /><em>stays connected.</em></h2><p>Scroll through the conceptual Artifex journey. Each chapter reveals another layer of the same garment.</p></div>
          <div className="chapter-stack">
            {cinematicChapters.map((item, index) => <div ref={(node) => { chapterRefs.current[index] = node; }} data-index={index} className={`cinematic-chapter ${index === active ? "is-active" : ""}`} key={item.key}><div className="chapter-number">{item.number}</div><div><span className="chapter-kicker">{item.kicker}</span><h3>{item.title}</h3><p>{item.body}</p><span className="chapter-tag">{item.tag}</span></div></div>)}
          </div>
          <button className="button button-acid cinematic-cta" onClick={onJourney}>Open the interactive journey <ArrowUpRight size={17} /></button>
        </div>
        <div className="cinematic-sticky">
          <div className="cinematic-stage-label"><span>{chapter.number} / 08</span><span>{chapter.kicker}</span></div>
          <div className="cinematic-stage"><div className="stage-grid" /><div className={`stage-scan scan-${active}`} /><Garment mode="studio" material={stageMaterial} pattern={active === 4} /><div className="stage-caption"><span>{chapter.tag}</span><span>ARTIFEX / CONCEPTUAL VIEW</span></div><div className="stage-corner corner-tl" /><div className="stage-corner corner-br" />{active === 5 && <div className="dependency-pulse"><span>FIT</span><span>MATERIAL</span><span>PATTERN</span><span>DOCS</span></div>}{active === 6 && <div className="doc-stack"><span>TECHNICAL VIEW</span><span>CONSTRUCTION NOTE</span><span>PRODUCT STATE / 001</span></div>}{active === 7 && <div className="approval-stamp"><Check size={16} /> HUMAN CONTROL</div>}</div>
          {active === 2 && <div className="stage-controls"><span>Material direction</span><button className={material === "silver" ? "selected" : ""} onClick={() => setMaterial("silver")}><i className="swatch silver" /> Reflective</button><button className={material === "matte" ? "selected" : ""} onClick={() => setMaterial("matte")}><i className="swatch matte" /> Matte</button><button className={material === "acid" ? "selected" : ""} onClick={() => setMaterial("acid")}><i className="swatch acid" /> Acid</button></div>}
          <div className="cinematic-progress"><div className="progress-track">{cinematicChapters.map((item, index) => <span key={item.key} className={index <= active ? "active" : ""} />)}</div><span>scroll / {chapter.number}</span></div>
        </div>
      </div>
    </section>
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

      <CinematicScroll onJourney={onJourney} />

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
  return <div className="app-shell"><Nav view={view} onView={setView} onJoin={goJoin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />{view === "landing" ? <Landing onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : view === "journey" ? <Journey onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : <WireframeMap onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} />}</div>;
}

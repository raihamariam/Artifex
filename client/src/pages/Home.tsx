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
  ImagePlus,
  Menu,
  Mic,
  Minimize2,
  Move3d,
  MousePointer2,
  Orbit,
  ScanLine,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { ExperienceArtifex } from "../experience/ExperienceArtifex";
import { StyleTest } from "../experience/StyleTest";

type View = "landing" | "journey" | "wireframes" | "styletest";
const storyboardScreens = [
  ["L1", "Cinematic hero", "An idea is only the beginning", "Sketch gains volume, seams, texture, and dimensionality before pattern pieces briefly detach."],
  ["L2", "Garment system", "A garment is not a file", "Geometry, fit, material, construction, cost, supply, production, evidence, and history light up on one garment."],
  ["L3", "Fragmentation", "Every decision lives somewhere else", "Files and conversations fragment around the garment, then collapse back into one object."],
  ["L4", "Product graph", "What if the garment became the system?", "Connected nodes emerge and reveal downstream relationships on hover."],
  ["01", "Design layer", "Interpret creative intent", "Moodboard, sketch, swatches, and notes transform into a ghost garment on an avatar."],
  ["02", "Garment understanding", "Make the garment legible", "Callouts identify structured bodice, drape, waist tension, volume, panels, and closure."],
  ["04", "Fit + grading", "One garment across five bodies", "A size scrubber moves through 06–14 while fit-map regions expose tension and excess."],
  ["05", "Engineering", "Diagnose before generating", "Creative and engineering constraints appear around the detected fit issue."],
  ["P", "Pattern alternatives", "Same idea. Three engineered realities.", "Pattern pieces unfold and reconstruct as alternatives A, B, and C."],
  ["I", "Impact Lens", "There is no single best garment", "Optimise for intent, fit, cost, waste, or production to change the recommendation."],
  ["06", "Construction", "Reveal how the garment is assembled", "Outer fabric becomes translucent while assembly steps highlight in sequence."],
  ["07", "Materials + trims", "Give every component intelligence", "A material tray connects shell, lining, interfacing, zipper, thread, and trims to the garment."],
  ["08", "Textile twin", "Same garment. Different fabric behaviour.", "Silk-viscose and wool-crepe avatars move together while drape visibly diverges."],
  ["08B", "Propagation", "Let the change travel", "Selecting wool sends a pulse through drape, fit, pattern, consumption, cost, construction, and documentation."],
  ["09", "Surface + colour", "Move from engineering back to expression", "The garment enters a runway stage and changes colourway and finish."],
  ["10", "X-ray", "Fashion to engineering", "A draggable slider peels through surface, shell, interfacing, structure, lining, seams, pattern, and body."],
  ["11", "Production", "Optimise the physical reality", "Pattern pieces rotate, slide, and nest across a virtual fabric roll."],
  ["12", "Live BOM", "Documentation builds from product truth", "Clicking garment regions lights BOM rows while technical pages assemble behind the avatar."],
  ["13", "Sampling + quality", "Let physical evidence return", "The sample timeline traces a fit observation back to garment, pattern, and correction."],
  ["14", "Sourcing", "Change supply, see consequences", "Supplier choice changes cost, lead time, MOQ, and risk around the garment."],
  ["15", "True costing", "See the garment commercially", "The garment explodes into priced components and scales across production volume."],
  ["16", "Approval + release", "Production readiness has a boundary", "A role switch unlocks Release to Production and stamps the garment ready."],
  ["17", "Mission control", "One garment becomes a collection", "The camera pulls back from one avatar to an AW27 collection heat map."],
  ["18", "Knowledge system", "Every garment builds knowledge", "Selecting a seam reveals connected construction, material, fit, history, and QC knowledge."],
  ["19", "Conversation reveal", "One conversation. Every layer of the garment.", "The interface reveals that the same contextual Copilot has translated intent into design, geometry, fit, material, production, cost, and documentation throughout."],
  ["20", "Autonomy", "Observe. Suggest. Execute.", "A low-risk fit correction runs through policy, pattern, simulation, documentation, and history."],
  ["21", "Evidence", "Why did Artifex change this?", "An evidence drawer explains issue, rule, action, impact, and confidence."],
  ["E", "Ending", "One garment. One evolving system.", "Every layer collapses elegantly into the exact garment that began as a sketch."],
  ["W", "Waitlist", "Join Artifex", "A premium overlay captures name, email, company, role, and optional reason for interest."],
] as const;


function WireframeMap({ onBack, onJourney, onJoin }: { onBack: () => void; onJourney: () => void; onJoin: () => void }) {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<"guided" | "explore">("guided");
  const screen = storyboardScreens[selected];
  return (
    <main className="wireframe-page">
      <div className="wireframe-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to landing</button><span className="journey-label">ARTIFEX / VISUAL WIREFRAME MAP</span><button className="journey-join" onClick={onJoin}>Join waitlist <ArrowUpRight size={15} /></button></div>
      <section className="wireframe-intro"><p className="eyebrow"><span className="eyebrow-line" /> Make the journey visible</p><h1>One system.<br /><em>One continuous journey.</em></h1><p>The original 26-state Artifex journey follows one garment from creative intent through collaboration, engineering, materials, production, release, community, evidence, and knowledge.</p><div className="wireframe-actions"><button className="button button-dark" onClick={onJourney}>Play the cinematic journey <ArrowUpRight size={16} /></button><button className="button button-outline" onClick={onJoin}>Join Artifex Waitlist <ArrowUpRight size={16} /></button></div><div className="experience-balance"><div className="balance-copy"><span>EXPERIENCE MODEL</span><b>Original 26-state product journey</b><small>One continuous experience. Every capability remains in sequence around the same evolving garment. Collaboration and Community live only in their dedicated Journey layers.</small></div></div><div className="garment-continuity-note"><span className="continuity-dot" /><span><b>Same garment throughout.</b> Every screen changes the state of one evolving digital garment.</span></div><div className="garment-continuity-note copilot-continuity-note"><span className="copilot-mini-orb"><Sparkles size={11} /></span><span><b>One conversation throughout.</b> Ask Artifex remains available across creative, engineering, materials, production, cost, sourcing, documentation, and collection work.</span></div></section>
      <section className="wireframe-workspace">
        <aside className="wireframe-index"><div className="wireframe-index-title"><span>FULL EXPERIENCE MAP</span><small>{String(selected + 1).padStart(2, "0")} / {storyboardScreens.length} selected</small></div>{storyboardScreens.map((item, index) => <button key={`${item[0]}-${item[1]}`} className={index === selected ? "map-item active" : "map-item"} onClick={() => setSelected(index)}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></button>)}</aside>
        <div className={`wireframe-detail mode-${mode}`}><div className="wireframe-detail-head"><div><span className="chapter-kicker">{screen[0]} / {screen[1]}</span><h2>{screen[2]}</h2></div><div className="wireframe-arrow"><button onClick={() => setSelected(Math.max(0, selected - 1))} disabled={!selected}><ChevronLeft size={17} /></button><button onClick={() => setSelected(Math.min(storyboardScreens.length - 1, selected + 1))} disabled={selected === storyboardScreens.length - 1}><ChevronRight size={17} /></button></div></div><div className={`wireframe-canvas canvas-${selected + 1}`}><div className="canvas-top"><span>ARTIFEX / {screen[0]}</span><span>{screen[1].toUpperCase()}</span></div><div className="canvas-grid" />{selected === 0 && <><div className="canvas-headline">CREATIVE ENGINEERING<br /><em>FOR FASHION</em></div><div className="canvas-garment"><Garment mode="mini" /></div><div className="canvas-annotation annotation-a">SKETCH → 3D <i>01</i></div><div className="canvas-annotation annotation-b">PATTERN DETACH <i>02</i></div></>}{selected > 0 && selected < storyboardScreens.length - 1 && <><div className="canvas-wire-object"><div className="wire-avatar" /><div className="wire-garment" /><div className="wire-layers"><span /><span /><span /><span /></div></div><div className="canvas-ui"><span className="ui-line long" /><span className="ui-line" /><span className="ui-line medium" /><span className="ui-pill" /><span className="ui-pill" /><span className="ui-card" /><span className="ui-card short" /></div><div className="canvas-title">{screen[1]}<small>{screen[3]}</small></div></>}{selected === storyboardScreens.length - 1 && <div className="canvas-form"><span className="ui-line long" /><span className="form-line" /><span className="form-line" /><span className="form-line" /><span className="form-button">JOIN ARTIFEX WAITLIST <ArrowUpRight size={14} /></span></div>}<div className="canvas-bottom"><span>{mode === "guided" ? "GUIDED / CONCEPTUAL VISUAL SIMULATION" : "EXPLORE / CURATED SIMULATION"}</span><span>{screen[3]}</span></div></div><div className="wireframe-explain"><div><span>WHAT HAPPENS</span><p>{screen[3]}</p></div><div><span>VISITOR ACTION</span><p>{selected === storyboardScreens.length - 1 ? "Complete name, email, company, role, and optional reason for interest." : selected === 0 ? "Watch the sketch become a dimensional digital garment, then enter the product story." : mode === "guided" ? "Scroll to continue, or select this screen to inspect its state." : "Click around the curated controls, then return to the story."}</p></div><div><span>STATE</span><p>{selected < storyboardScreens.length - 1 ? "Pre-simulated visual state" : "Conversion state"}</p></div></div></div>
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

function ProductGraphScene() {
  const [rotation, setRotation] = useState(0);
  const [hovered, setHovered] = useState("");
  const dragging = useRef(false);
  const lastX = useRef(0);
  const nodes = [
    ["creative", "CREATIVE", "Creative intent"], ["fit", "FIT", "Body + ease"], ["pattern", "PATTERN", "Geometry"], ["material", "MATERIAL", "Drape + supply"], ["production", "PRODUCTION", "Quality + output"],
    ["documentation", "DOCUMENTATION", "Living tech pack"], ["evidence", "EVIDENCE", "Sample feedback"], ["knowledge", "KNOWLEDGE", "Compounding history"], ["community", "COMMUNITY", "Shared lineage"], ["history", "HISTORY", "Version truth"],
  ];
  return <div className="product-graph-scene" aria-label="Animated one-garment product graph" onPointerDown={(event) => { dragging.current = true; lastX.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (!dragging.current) return; setRotation((value) => value + (event.clientX - lastX.current) * .6); lastX.current = event.clientX; }} onPointerUp={() => { dragging.current = false; }} onPointerCancel={() => { dragging.current = false; }}><div className="product-graph-grid" /><div className="product-graph-ambient" /><div className="product-graph-garment" style={{ transform: `translate(-50%,-50%) scale(.92) rotateY(${rotation}deg)` }}><Garment mode="studio" material="silver" /></div><div className="product-graph-badge">ONE<br />GARMENT</div><div className="product-graph-connectors">{nodes.map(([key]) => <span className={`graph-connector connector-${key}`} key={key} />)}</div><div className="product-graph-nodes">{nodes.map(([key, label, sub]) => <button type="button" aria-label={`${label}: ${sub}`} onPointerDown={(event) => event.stopPropagation()} onPointerEnter={() => setHovered(key)} onPointerLeave={() => setHovered("")} className={`product-graph-node graph-node-${key} ${hovered === key ? "is-hovered" : ""}`} key={key}><i />{label}<small>{sub}</small></button>)}</div><div className="product-graph-caption"><span>GARMENT / 001</span><span>DRAG TO ROTATE ↔</span></div></div>;
}


function Nav({ view, onView, onJoin, menuOpen, setMenuOpen }: { view: View; onView: (view: View) => void; onJoin: () => void; menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  const [onDarkSurface, setOnDarkSurface] = useState(false);
  useEffect(() => {
    const updateNavSurface = () => {
      const probe = document.elementFromPoint(window.innerWidth / 2, 82);
      setOnDarkSurface(Boolean(probe?.closest(".dark-section, .investor-value-section")));
    };
    updateNavSurface();
    window.addEventListener("scroll", updateNavSurface, { passive: true });
    window.addEventListener("resize", updateNavSurface);
    return () => { window.removeEventListener("scroll", updateNavSurface); window.removeEventListener("resize", updateNavSurface); };
  }, [view]);
  return (
    <header className={`site-nav ${onDarkSurface ? "on-dark" : ""}`}>
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

type WaitlistPayload = { fullName: string; email: string; role: string; interest?: string };
type WaitlistResult = { success?: boolean; duplicate?: boolean; error?: string; message?: string };

async function submitWaitlist(payload: WaitlistPayload): Promise<WaitlistResult> {
  const response = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const contentType = response.headers.get("content-type") || "";
  const raw = await response.text();
  console.debug("[Artifex waitlist] response", { url: response.url, status: response.status, contentType, raw });
  if (!contentType.toLowerCase().includes("application/json")) {
    console.error("[Artifex waitlist] expected JSON response", { url: response.url, status: response.status, contentType, raw });
    throw new Error("The waitlist service returned a non-JSON response.");
  }
  let result: WaitlistResult;
  try {
    result = JSON.parse(raw) as WaitlistResult;
  } catch {
    console.error("[Artifex waitlist] invalid JSON response", { url: response.url, status: response.status, contentType, raw });
    throw new Error("The waitlist service returned invalid JSON.");
  }
  if (!response.ok || result.success !== true) {
    throw new Error(result.error || result.message || "We couldn’t add you to the waitlist.");
  }
  return result;
}

function Waitlist({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.includes("@") || status === "submitting") return;
    setStatus("submitting");
    try {
      const result = await submitWaitlist({ fullName: "Landing Page Visitor", email, role: "Landing page" });
      setDuplicate(result.duplicate === true);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We couldn’t add you to the waitlist.");
    }
  };
  return (
    <div className={`waitlist ${compact ? "compact" : ""}`}>
      {status === "success" ? (
        <div className="success-state"><span className="success-icon"><Check size={15} /></span><span><strong>{duplicate ? "You’re already on the Artifex early-access list." : "You are on the list."}</strong><small>{duplicate ? "Your existing early-access entry is still active." : "We’ll let you know when the next chapter is ready."}</small></span></div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input value={email} onChange={(event) => { setEmail(event.target.value); if (status === "error") setStatus("idle"); }} type="email" placeholder="Your email address" aria-label="Email address" required />
          <button type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Joining…" : compact ? "Join" : "Join early access"}<ArrowUpRight size={16} /></button>
          {status === "error" && <small className="waitlist-error">{errorMessage}</small>}
        </form>
      )}
    </div>
  );
}

function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [duplicate, setDuplicate] = useState(false);
  if (!open) return null;
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;
    const form = new FormData(event.currentTarget);
    const payload: WaitlistPayload = {
      fullName: String(form.get("fullName") || "").trim(),
      email: String(form.get("email") || "").trim(),
      role: String(form.get("role") || "").trim(),
      interest: String(form.get("interest") || "").trim(),
    };
    setStatus("submitting");
    setErrorMessage("");
    try {
      const result = await submitWaitlist(payload);
      setDuplicate(result.duplicate === true);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "We couldn’t submit your details. Please try again.");
    }
  };
  return <div className="waitlist-modal" role="dialog" aria-modal="true" aria-label="Join Artifex waitlist"><button className="modal-backdrop" onClick={onClose} aria-label="Close waitlist" /><div className="waitlist-dialog"><button className="modal-close" onClick={onClose}><X size={18} /></button>{status === "success" ? <div className="modal-success"><span><Check size={22} /></span><p className="eyebrow">ARTIFEX / EARLY ACCESS</p><h2>{duplicate ? <>You’re already<br /><em>on the list.</em></> : <>You are part of<br /><em>the beginning.</em></>}</h2><p>{duplicate ? "You’re already on the Artifex early-access list." : "Thank you. This prototype demonstrates the Artifex product vision; we will share future developments with you."}</p><button className="button button-dark" onClick={onClose}>Return to Artifex</button></div> : <><p className="eyebrow"><span className="eyebrow-line" /> Early access</p><h2>Join<br /><em>Artifex.</em></h2><p>Be among the first to experience a connected creative-engineering environment for fashion.</p><form onSubmit={handleSubmit}><label>Full Name<input name="fullName" required placeholder="Your full name" /></label><label>Email<input name="email" required type="email" placeholder="you@company.com" /></label><label>Role<select name="role" defaultValue="Fashion Designer"><option>Fashion Designer</option><option>Technical Designer</option><option>Pattern Maker</option><option>Brand / Label</option><option>Manufacturer</option><option>Student</option><option>Investor</option><option>Technology</option><option>Other</option></select></label><label className="full">What brings you to Artifex? <small>Optional</small><textarea name="interest" placeholder="Tell us what you would want Artifex to connect." /></label>{status === "error" && <p className="waitlist-error full" role="alert">{errorMessage}</p>}<button className="action-primary full" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Joining Artifex…" : "Join Artifex Waitlist"} <ArrowUpRight size={15} /></button></form><small className="concept-note">Your details will be added to the Artifex early-access list.</small></>}</div></div>;
}


function Landing({ onJourney, onJoin }: { onJourney: () => void; onJoin: () => void }) {
  return (
    <main className="landing-page">
      <section className="master-hero" id="top">
        <div className="master-hero-stage"><div className="hero-stage-grid" /><Garment mode="hero" pattern /><div className="sketch-echo" /></div>
        <div className="master-hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> Creative engineering for fashion</p><h1>From creative intent<br />to <em>engineered reality.</em></h1><p>An idea is only the beginning.</p><div className="hero-actions"><button className="button button-dark" onClick={onJourney}>Experience Artifex <ArrowUpRight size={17} /></button><button className="button button-outline" onClick={onJoin}>Join waitlist</button></div></div>
        <a className="master-scroll" href="#garment-system">Scroll to enter <ChevronDown size={16} /></a>
      </section>

      <section className="garment-system-section dark-section" id="garment-system">
        <div className="section-meta"><span>02 / THE GARMENT</span><span>MORE THAN AN IMAGE</span></div>
        <div className="garment-system-layout"><div className="system-words"><h2>A garment is<br /><em>not a file.</em></h2>{["Creative intent","Geometry","Fit","Material","Construction","Cost","Supply","Production","Evidence","History"].map((item, i) => <span style={{ animationDelay: `${i*.08}s` }} key={item}>{item}.</span>)}</div><div className="system-garment"><Garment mode="studio" material="silver" pattern /><div className="system-labels"><span>GEOMETRY</span><span>FIT</span><span>MATERIAL</span><span>CONSTRUCTION</span><span>COST</span><span>HISTORY</span></div></div></div>
      </section>

      <section className="friction-section dark-section">
        <div className="section-meta"><span>03 / THE INDUSTRY PROBLEM</span><span>FRAGMENTED TRANSLATION</span></div>
        <div className="friction-layout">
          <div><p className="eyebrow muted"><span className="eyebrow-line" /> Every decision lives somewhere else</p><h2>Fashion development<br /><em>is fragmented.</em></h2></div>
          <div className="fragment-story"><div className="fragment-core"><div className="fragment-glyph">◌</div><span>one garment</span></div><div className="fragment-cloud">{["Sketch.ai","Pattern_v7.dxf","FIT_NOTES_FINAL2.pdf","costing.xlsx","WhatsApp","email","material.xls","BOM_final.pdf","Factory comments","Sample 04"].map((item)=><span key={item}>{item}</span>)}</div><p className="fragment-note">What if the garment itself became the system?</p></div>
        </div>
      </section>

      <section className="principle-section" id="principle">
        <div className="section-meta"><span>04 / THE PRODUCT GRAPH</span><span>THE GARMENT BECOMES THE SYSTEM</span></div>
        <div className="principle-header"><p className="eyebrow"><span className="eyebrow-line" /> Continuity across every decision</p><h2>What if the garment<br /><em>became the system?</em></h2></div>
        <div className="principle-visual graph-expanded supplied-figure-graph"><ProductGraphScene /></div>
        <div className="principle-foot"><p>Hover a node to understand what changes with it. Then step through the garment into Artifex.</p><button className="button button-dark" onClick={onJourney}>Enter Artifex <ArrowRight size={16} /></button></div>
      </section>

      <section className="investor-value-section dark-section" id="value">
        <div className="section-meta"><span>05 / THE VALUE</span><span>ONE CONNECTED PRODUCT TRUTH</span></div>
        <div className="investor-value-header"><p className="eyebrow muted"><span className="eyebrow-line" /> The system-level opportunity</p><h2>Fewer broken<br /><em>decisions.</em></h2><p>Artifex does not replace every specialist tool. It preserves the garment’s meaning as people, systems, and decisions change.</p></div>
        <div className="value-loop">
          <div className="value-loop-core"><span>ONE GARMENT</span><b>PRODUCT<br />TRUTH</b><small>living + traceable</small></div>
          <div className="value-outcome outcome-a"><span>01</span><b>Preserve intent</b><small>Creative decisions survive engineering handoffs.</small></div>
          <div className="value-outcome outcome-b"><span>02</span><b>Reveal consequences</b><small>A material or pattern change exposes downstream impact early.</small></div>
          <div className="value-outcome outcome-c"><span>03</span><b>Keep outputs current</b><small>BOMs, specifications, and approvals reflect the current product state.</small></div>
          <div className="value-outcome outcome-d"><span>04</span><b>Learn from evidence</b><small>Fit, sample, quality, and production knowledge compounds.</small></div>
          <div className="value-orbit orbit-a" /><div className="value-orbit orbit-b" />
        </div>
        <div className="value-proofline"><span>CREATIVE CONTINUITY</span><i /><span>EARLIER TRADE-OFFS</span><i /><span>TRACEABLE RELEASES</span><i /><span>COMPOUNDING KNOWLEDGE</span></div>
      </section>

      <section className="position-section dark-section" id="position">
        <div className="section-meta"><span>06 / THE POSITION</span><span>CONTINUITY ACROSS THE JOURNEY</span></div>
        <div className="position-header"><p className="eyebrow muted"><span className="eyebrow-line" /> Not another isolated tool</p><h2>Where creative<br /><em>intent</em> meets<br />product logic.</h2></div>
        <div className="position-rail"><div className="rail-card"><span>GENERATIVE DESIGN</span><p>creates possibilities</p><i>creative</i></div><div className="rail-card"><span>3D / CAD</span><p>models form</p><i>spatial</i></div><div className="rail-card"><span>PLM / DOCUMENTS</span><p>stores outputs</p><i>operational</i></div><div className="rail-card active"><span>ARTIFEX</span><p>connects the product journey</p><i>creative ↔ engineering</i></div></div>
        <p className="position-note">A conceptual product position: continuity across fashion development, with the designer still at the consequential boundary.</p>
      </section>

      <section className="waitlist-section" id="join">
        <div className="waitlist-kicker"><span>07 / ARTIFEX 2026</span><span>EARLY ACCESS</span></div>
        <h2>See what fashion<br /><em>development</em> could become.</h2>
        <p>Join the early-access list for designers, technical designers, pattern makers, and people shaping the future of fashion development.</p>
        <Waitlist />
        <small className="concept-note">This experience illustrates the Artifex product vision. Shown capabilities are conceptual and intended to communicate the future workflow.</small>
      </section>
      <footer className="site-footer"><span className="brand-lockup"><span className="brand-mark">A</span> ARTIFEX</span><span>Creative engineering for fashion</span><span>Concept prototype / 001</span></footer>
    </main>
  );
}



export default function Home() {
  const [view, setView] = useState<View>(() => {
    const requested = new URLSearchParams(window.location.search).get("view");
    if (import.meta.env.DEV && requested === "styletest") return "styletest";
    return requested === "journey" || requested === "wireframes" ? requested : "landing";
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  useEffect(() => { document.title = "Artifex — Creative Engineering for Fashion"; }, []);
  const goJoin = () => setWaitlistOpen(true);
  return <div className="app-shell">{view !== "journey" && view !== "styletest" && <Nav view={view} onView={setView} onJoin={goJoin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />}{view === "landing" ? <Landing onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : view === "journey" ? <ExperienceArtifex onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : view === "styletest" ? <StyleTest /> : <WireframeMap onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} />}<WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} /></div>;
}

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

type View = "landing" | "journey" | "wireframes";
const storyboardScreens = [
  ["L1", "Cinematic hero", "An idea is only the beginning", "Sketch gains volume, seams, texture, and dimensionality before pattern pieces briefly detach."],
  ["L2", "Garment system", "A garment is not a file", "Geometry, fit, material, construction, cost, supply, production, evidence, and history light up on one garment."],
  ["L3", "Fragmentation", "Every decision lives somewhere else", "Files and conversations fragment around the garment, then collapse back into one object."],
  ["L4", "Product graph", "What if the garment became the system?", "Connected nodes emerge and reveal downstream relationships on hover."],
  ["01", "Design layer", "Interpret creative intent", "Moodboard, sketch, swatches, and notes transform into a ghost garment on an avatar."],
  ["02", "Garment understanding", "Make the garment legible", "Callouts identify structured bodice, drape, waist tension, volume, panels, and closure."],
  ["03", "Collaboration", "Branch without losing the garment", "Three versions fan sideways; compare overlays semantic differences."],
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
  ["22", "Community", "Create a new lineage", "Discover, fork, remix, collaborate, or hire without destructive copying."],
  ["E", "Ending", "One garment. One evolving system.", "Every layer collapses elegantly into the exact garment that began as a sketch."],
  ["W", "Waitlist", "Join Artifex", "A premium overlay captures name, email, company, role, and optional reason for interest."],
] as const;

const journeyChapters = [
  { key: "creative", phase: "Creative", title: "Interpret creative intent", body: "An editorial development board becomes a structured garment project.", environment: "editorial board" },
  { key: "understanding", phase: "Creative", title: "Understand the garment", body: "Artifex identifies the garment's silhouette, drape, structure, and construction zones.", environment: "garment reading" },
  { key: "versions", phase: "Creative", title: "Branch without losing truth", body: "Creative, fit, and production-safe versions remain connected to one product lineage.", environment: "repository" },
  { key: "fit", phase: "Engineering", title: "Find the fit problem", body: "One garment moves across sizes 06–14 until a back-waist inconsistency appears.", environment: "fit laboratory" },
  { key: "engineering", phase: "Engineering", title: "Diagnose before generating", body: "Creative constraints and engineering constraints frame the problem before alternatives are proposed.", environment: "engineering core" },
  { key: "pattern", phase: "Engineering", title: "Engineer three realities", body: "The garment unfolds into pattern alternatives that preserve the same creative idea differently.", environment: "pattern workstation" },
  { key: "impact", phase: "Engineering", title: "Choose what matters", body: "Impact Lens changes the recommended alternative according to intent, fit, cost, waste, or production.", environment: "decision space" },
  { key: "construction", phase: "Engineering", title: "Reveal the assembly", body: "The selected pattern rejoins the avatar and the garment opens into construction sequence.", environment: "assembly view" },
  { key: "materials", phase: "Materials", title: "Connect every component", body: "Shell, lining, interfacing, zipper, thread, and trims become intelligent product objects.", environment: "material laboratory" },
  { key: "textile", phase: "Materials", title: "Compare textile twins", body: "The same garment moves in silk-viscose and wool-crepe, revealing different drape and structure.", environment: "textile twin" },
  { key: "propagation", phase: "Materials", title: "Let the change travel", body: "Selecting wool propagates through drape, fit, pattern, consumption, cost, construction, and documentation.", environment: "product graph" },
  { key: "surface", phase: "Materials", title: "Return to expression", body: "Colourways and finishing update instantly on a clean runway stage.", environment: "runway colour lab" },
  { key: "xray", phase: "Engineering", title: "Move from fashion to engineering", body: "A vertical slider peels through surface, shell, structure, lining, seams, pattern, and body.", environment: "x-ray anatomy" },
  { key: "production", phase: "Production", title: "Optimise the physical reality", body: "Pattern pieces leave the avatar, nest across a fabric roll, and improve material utilisation.", environment: "optimisation environment" },
  { key: "bom", phase: "Production", title: "Build living documentation", body: "Garment regions illuminate the BOM while production pages assemble around the avatar.", environment: "live documents" },
  { key: "sampling", phase: "Production", title: "Bring evidence back", body: "A waist drag-line observation returns from the sample to the digital garment and pattern correction.", environment: "sample timeline" },
  { key: "sourcing", phase: "Production", title: "Change supply, see consequences", body: "Supplier choice immediately changes cost, lead time, minimum order, and risk.", environment: "supply intelligence" },
  { key: "costing", phase: "Production", title: "See the garment commercially", body: "Components carry prices and production volume reveals the commercial effect of earlier decisions.", environment: "commercial intelligence" },
  { key: "release", phase: "Release", title: "Cross the approval boundary", body: "A production approver unlocks release and the garment becomes production ready.", environment: "release gate" },
  { key: "mission", phase: "Release", title: "Scale from style to collection", body: "The camera moves from one garment to an AW27 collection command centre.", environment: "mission control" },
  { key: "knowledge", phase: "Release", title: "Turn garments into knowledge", body: "A selected seam reveals related construction, material, fit, history, and quality knowledge.", environment: "knowledge graph" },
  { key: "autonomy", phase: "Release", title: "Observe. Suggest. Execute.", body: "The copilot controls a bounded workflow, then evidence explains every autonomous action.", environment: "autonomy + evidence" },
] as const;

type JourneyKey = typeof journeyChapters[number]["key"];

const copilotContexts: Record<JourneyKey, { prompt: string; context: string; stages: string[]; outcome: string }> = {
  creative: { prompt: "I want a sculptural evening look—fitted through the waist, asymmetric through the shoulder, but fluid when she moves.", context: "Moodboard + design sketch", stages: ["Reading creative references", "Identifying visual language", "Mapping garment regions", "Creating three directions"], outcome: "Creative intent mapped onto the garment" },
  understanding: { prompt: "What is happening in this draped panel?", context: "Front draped panel / P-04", stages: ["Reading selected region", "Tracing creative purpose", "Checking pattern dependency", "Checking material behaviour"], outcome: "Drape connects to waist suppression and moderate fabric movement" },
  versions: { prompt: "Keep the neckline from the original and the body from version B.", context: "MAIN / fit-experiment / neckline", stages: ["Comparing semantic changes", "Preserving original neckline", "Merging selected body", "Recording lineage"], outcome: "A new non-destructive branch is ready" },
  fit: { prompt: "Why is size 14 pulling here?", context: "Size 14 / back waist", stages: ["Reading fit map", "Checking grading distribution", "Inspecting panel geometry", "Testing material stretch"], outcome: "Excess tension and insufficient back ease detected" },
  engineering: { prompt: "Keep the silhouette. Fix the fit.", context: "Back-waist excess / creative constraints", stages: ["Locking creative constraints", "Testing ease redistribution", "Checking seam alignment", "Generating production-safe options"], outcome: "Three engineering strategies generated" },
  pattern: { prompt: "Show me the lowest-risk production option.", context: "Alternatives A / B / C", stages: ["Comparing pattern strategies", "Checking construction tolerance", "Testing fit preservation", "Re-ranking alternatives"], outcome: "Alternative A ranked lowest production risk" },
  impact: { prompt: "Keep the artistic intent at all costs.", context: "Impact Lens / current alternatives", stages: ["Translating intent to objectives", "Increasing creative weighting", "Checking fit floor", "Updating recommendation"], outcome: "Impact Lens prioritises Creative Intent" },
  construction: { prompt: "Can this be made with fewer sewing operations?", context: "Assembly / 18 major operations", stages: ["Analysing seam sequence", "Combining facing construction", "Simplifying inner panel join", "Validating outer silhouette"], outcome: "15 operations with the visible silhouette retained" },
  materials: { prompt: "What happens if I use wool crepe instead?", context: "Silk-viscose shell / current garment", stages: ["Creating textile twin", "Simulating drape", "Checking pattern validity", "Comparing cost and structure"], outcome: "Wool adds structure and requires pattern correction" },
  textile: { prompt: "Preserve the silk version's movement in wool.", context: "Silk movement / wool-crepe alternative", stages: ["Measuring movement signature", "Adjusting panel geometry", "Testing wool behaviour", "Re-simulating twin"], outcome: "Wool strategy updated to recover more fluid movement" },
  propagation: { prompt: "Show everything this material change affects.", context: "Wool-crepe substitution", stages: ["Tracing Product Graph", "Updating fit and pattern", "Recalculating consumption", "Refreshing documents"], outcome: "Downstream product state updated" },
  surface: { prompt: "Show this in deep burgundy with antique-gold hardware.", context: "Surface / colour / trim", stages: ["Sampling collection palette", "Applying deep burgundy", "Updating hardware finish", "Checking collection coherence"], outcome: "Oxblood colourway and antique-gold trim applied" },
  xray: { prompt: "Why is this panel shaped like this?", context: "Front draped panel / Pattern P-04", stages: ["Opening garment anatomy", "Tracing seam relationships", "Locating structural support", "Connecting body and pattern"], outcome: "Panel geometry creates diagonal movement while controlling the waist" },
  production: { prompt: "Reduce fabric waste without changing the visible design.", context: "Marker / grain / pattern orientation", stages: ["Evaluating marker layouts", "Checking pattern orientation", "Checking grain constraints", "Nesting pattern pieces"], outcome: "Utilisation improves from 72.8% to 88.4%" },
  bom: { prompt: "Prepare this for factory review.", context: "Garment / approved product state", stages: ["Generating tech pack", "Building live BOM", "Packaging patterns and measurements", "Adding QC and change history"], outcome: "Factory review package assembled" },
  sampling: { prompt: "Apply the fit sample correction and show what changed.", context: "Fit sample / waist drag lines", stages: ["Reading physical observation", "Tracing digital cause", "Correcting pattern", "Recording sample evidence"], outcome: "Physical evidence closes the digital loop" },
  sourcing: { prompt: "Find a lower-risk supplier without adding more than five days.", context: "Shell fabric / supplier landscape", stages: ["Filtering compliance", "Checking lead-time constraint", "Comparing supply risk", "Updating supplier node"], outcome: "Supplier C recommended within the lead-time constraint" },
  costing: { prompt: "Get the landed cost below $115 without changing the shell fabric.", context: "Landed cost $120.28 / shell locked", stages: ["Locking shell material", "Testing construction path", "Testing supplier substitution", "Combining trim and marker savings"], outcome: "Path 03 reaches $113.90" },
  release: { prompt: "Prepare it for production.", context: "94% production ready", stages: ["Checking release package", "Validating approvals", "Confirming production role", "Preparing immutable release"], outcome: "Factory approval remains the final human boundary" },
  mission: { prompt: "Which garments are most likely to delay this collection?", context: "AW27 / 42 products", stages: ["Scanning supplier risk", "Checking fit approvals", "Comparing material lead times", "Moving at-risk looks forward"], outcome: "Looks 07, 12, and 19 require attention" },
  knowledge: { prompt: "What have we learned from similar draped panels?", context: "Selected seam / institutional history", stages: ["Searching past projects", "Connecting construction knowledge", "Comparing fit outcomes", "Surfacing QC implications"], outcome: "Relevant institutional knowledge attached to this seam" },
  autonomy: { prompt: "Explain what you changed and why.", context: "Autonomous fit correction / evidence log", stages: ["Separating request from autonomous action", "Opening evidence", "Reading policy and rule", "Showing impact and confidence"], outcome: "Copilot explains; autonomy detects and acts within policy" },
};

function WireframeMap({ onBack, onJourney, onJoin }: { onBack: () => void; onJourney: () => void; onJoin: () => void }) {
  const [selected, setSelected] = useState(0);
  const [mode, setMode] = useState<"guided" | "explore">("guided");
  const screen = storyboardScreens[selected];
  return (
    <main className="wireframe-page">
      <div className="wireframe-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Back to landing</button><span className="journey-label">ARTIFEX / VISUAL WIREFRAME MAP</span><button className="journey-join" onClick={onJoin}>Join waitlist <ArrowUpRight size={15} /></button></div>
      <section className="wireframe-intro"><p className="eyebrow"><span className="eyebrow-line" /> Make the journey visible</p><h1>One garment.<br /><em>Twenty-eight states.</em></h1><p>Use this map to understand how the four-part investor opening leads into the 22-chapter designer simulation, the ending, and the waitlist conversion.</p><div className="wireframe-actions"><button className="button button-dark" onClick={onJourney}>Play the cinematic journey <ArrowUpRight size={16} /></button><button className="button button-outline" onClick={onJoin}>Join Artifex Waitlist <ArrowUpRight size={16} /></button></div><div className="experience-balance"><div className="balance-copy"><span>EXPERIENCE MODEL</span><b>70% guided story / 30% explore</b><small>Investors see a controlled narrative. Designers can step inside the simulated product.</small></div><div className="mode-switch"><button className={mode === "guided" ? "active" : ""} onClick={() => setMode("guided")}>Guided</button><button className={mode === "explore" ? "active" : ""} onClick={() => setMode("explore")}>Explore</button></div></div><div className="garment-continuity-note"><span className="continuity-dot" /><span><b>Same garment throughout.</b> Every screen changes the state of one evolving digital garment.</span></div><div className="garment-continuity-note copilot-continuity-note"><span className="copilot-mini-orb"><Sparkles size={11} /></span><span><b>One conversation throughout.</b> Ask Artifex remains available across creative, engineering, materials, production, cost, sourcing, documentation, and collection work.</span></div></section>
      <section className="wireframe-workspace">
        <aside className="wireframe-index"><div className="wireframe-index-title"><span>SCREEN MAP</span><small>{String(selected + 1).padStart(2, "0")} / {storyboardScreens.length} selected</small></div>{storyboardScreens.map((item, index) => <button key={`${item[0]}-${item[1]}`} className={index === selected ? "map-item active" : "map-item"} onClick={() => setSelected(index)}><span>{item[0]}</span><b>{item[1]}</b><small>{item[2]}</small></button>)}</aside>
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

function TimelineProgress({ active }: { active: number }) {
  return <div className="progress-track">{journeyChapters.map((item, index) => <span key={item.key} className={index <= active ? "active" : ""} />)}</div>;
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

function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  if (!open) return null;
  return <div className="waitlist-modal" role="dialog" aria-modal="true" aria-label="Join Artifex waitlist"><button className="modal-backdrop" onClick={onClose} aria-label="Close waitlist" /><div className="waitlist-dialog"><button className="modal-close" onClick={onClose}><X size={18} /></button>{submitted ? <div className="modal-success"><span><Check size={22} /></span><p className="eyebrow">ARTIFEX / EARLY ACCESS</p><h2>You are part of<br /><em>the beginning.</em></h2><p>Thank you. This prototype demonstrates the Artifex product vision; we will share future developments with you.</p><button className="button button-dark" onClick={onClose}>Return to Artifex</button></div> : <><p className="eyebrow"><span className="eyebrow-line" /> Early access</p><h2>Join<br /><em>Artifex.</em></h2><p>Be among the first to experience a connected creative-engineering environment for fashion.</p><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Name<input required placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@company.com" /></label><label>Company<input placeholder="Company or label" /></label><label>Role<select defaultValue="Fashion Designer"><option>Fashion Designer</option><option>Technical Designer</option><option>Pattern Maker</option><option>Brand / Label</option><option>Manufacturer</option><option>Student</option><option>Investor</option><option>Technology</option><option>Other</option></select></label><label className="full">What brings you to Artifex? <small>Optional</small><textarea placeholder="Tell us what you would want Artifex to connect." /></label><button className="action-primary full" type="submit">Join Artifex Waitlist <ArrowUpRight size={15} /></button></form><small className="concept-note">Conceptual visual prototype. Your information will be used for Artifex early-access communication.</small></>}</div></div>;
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
        <div className="principle-visual graph-expanded"><div className="principle-ring ring-outer" /><div className="principle-ring ring-inner" /><div className="principle-core"><Garment mode="mini" material="ink" /><span className="core-label">GARMENT<br /><small>PRODUCT GRAPH</small></span></div><div className="node node-intent"><span>CREATIVE INTENT</span><small>origin</small></div><div className="node node-fit"><span>FIT / SIZING</span><small>body + ease</small></div><div className="node node-material"><span>MATERIAL / SUPPLY</span><small>drape + sourcing</small></div><div className="node node-pattern"><span>GEOMETRY</span><small>pattern + construction</small></div><div className="node node-docs"><span>PRODUCTION</span><small>quality + documentation</small></div></div>
        <div className="principle-foot"><p>Hover a node to understand what changes with it. Then step through the garment into Artifex.</p><button className="button button-dark" onClick={onJourney}>Enter Artifex <ArrowRight size={16} /></button></div>
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

type CopilotHistoryItem = { chapter: JourneyKey; prompt: string; outcome: string };

function PersistentCopilot({ chapterKey, role, selectedContext, onRole, onExecute }: { chapterKey: JourneyKey; role: string; selectedContext?: string; onRole: (role: string) => void; onExecute: (prompt: string) => void }) {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState(copilotContexts[chapterKey].prompt);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(-1);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState<CopilotHistoryItem[]>([]);
  const context = copilotContexts[chapterKey];
  const rolePrompts: Record<string, string> = { Designer: context.prompt, "Pattern Engineer": "Redistribute 12mm without affecting the side seam or visible silhouette.", "Production Lead": "Reduce operations while preserving the approved creative direction.", Executive: "What is threatening AW27 margin and delivery?" };
  useEffect(() => { setInput(context.prompt); setStage(-1); setResult(""); }, [chapterKey, context.prompt]);
  const run = () => {
    if (!input.trim() || running) return;
    setRunning(true); setStage(0); setResult("");
    context.stages.forEach((_, index) => window.setTimeout(() => setStage(index), index * 380));
    window.setTimeout(() => {
      onExecute(input);
      setResult(context.outcome);
      setHistory((items) => [...items, { chapter: chapterKey, prompt: input, outcome: context.outcome }].slice(-4));
      setRunning(false);
    }, context.stages.length * 380 + 120);
  };
  if (!open) return <button className="copilot-orb" onClick={() => setOpen(true)} aria-label="Open Ask Artifex"><Sparkles size={18} /><span>Ask Artifex</span></button>;
  return <section className="persistent-copilot" onPointerDown={(event) => event.stopPropagation()}>
    <header><div><span className="copilot-mark"><Sparkles size={14} /></span><b>ARTIFEX</b><small>COPILOT / {role.toUpperCase()}</small></div><button onClick={() => setOpen(false)} aria-label="Collapse Ask Artifex"><Minimize2 size={15} /></button></header>
    {history.length > 0 && <div className="conversation-thread"><span>ONE CONTINUOUS CONVERSATION</span><p>“{history[history.length - 1].prompt}”</p><small>{history[history.length - 1].outcome}</small></div>}
    <div className="copilot-context"><span>WHAT ARTIFEX CAN SEE</span><b>AW27 / LOOK 07</b><small>{selectedContext || context.context}</small></div>
    <label><span>What would you like to create or change?</span><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if ((event.metaKey || event.ctrlKey) && event.key === "Enter") run(); }} /></label>
    <div className="copilot-tools"><button><ImagePlus size={13} /> Sketch</button><button><ImagePlus size={13} /> Photo</button><button><Layers3 size={13} /> Material</button><button><ImagePlus size={13} /> Document</button><button><Mic size={13} /> Voice</button></div>
    {running && <div className="copilot-processing">{context.stages.map((item, index) => <span className={index <= stage ? "active" : ""} key={item}>{index < stage ? <Check size={11} /> : <i />}{item}</span>)}</div>}
    {result && !running && <div className="copilot-result"><span>VISIBLE RESULT</span><b>{result}</b><small>The answer is shown in the product state—not returned as a long chat response.</small></div>}
    <footer><select value={role} onChange={(event) => { const nextRole = event.target.value; onRole(nextRole); setInput(rolePrompts[nextRole]); }}><option>Designer</option><option>Pattern Engineer</option><option>Production Lead</option><option>Executive</option></select><button className="copilot-send" onClick={run} disabled={running}>{running ? "Working" : "Show on garment"}<Send size={14} /></button></footer>
  </section>;
}

function Journey({ onBack, onJoin }: { onBack: () => void; onJoin: () => void }) {
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<"guided" | "explore">("guided");
  const [material, setMaterial] = useState("silver");
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState(10);
  const [pattern, setPattern] = useState("B");
  const [optimise, setOptimise] = useState("Fit");
  const [xray, setXray] = useState(58);
  const [colour, setColour] = useState("obsidian");
  const [productionOptimised, setProductionOptimised] = useState(false);
  const [role, setRole] = useState("Technical Designer");
  const [released, setReleased] = useState(false);
  const [autonomy, setAutonomy] = useState("Suggest");
  const [copilotRole, setCopilotRole] = useState("Designer");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [copilotPulse, setCopilotPulse] = useState(false);
  const [copilotAction, setCopilotAction] = useState<JourneyKey | "">("");
  const [supplier, setSupplier] = useState("B");
  const [costPath, setCostPath] = useState("");
  const [documentsReady, setDocumentsReady] = useState(false);
  const [missionFiltered, setMissionFiltered] = useState(false);
  const [evidenceOpen, setEvidenceOpen] = useState(false);
  const dragging = useRef(false);
  const chapter = journeyChapters[active];
  const key = chapter.key as JourneyKey;
  const materialForStage = key === "textile" || key === "propagation" ? material : key === "surface" ? colour : key === "creative" ? "ink" : "silver";
  const recommendation = optimise === "Fit" ? "B" : optimise === "Creative intent" ? "C" : "A";
  const go = (next: number) => {
    const target = Math.max(0, Math.min(journeyChapters.length - 1, next));
    setActive(target);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (target / (journeyChapters.length - 1)) * maxScroll, behavior: "smooth" });
  };
  useEffect(() => {
    const updateFromScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const next = Math.round((window.scrollY / maxScroll) * (journeyChapters.length - 1));
      setActive(Math.max(0, Math.min(journeyChapters.length - 1, next)));
    };
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateFromScroll);
  }, []);
  const executeCopilot = (prompt: string) => {
    setCopilotPulse(true); setCopilotAction(key);
    window.setTimeout(() => setCopilotPulse(false), 1800);
    if (key === "creative") setPattern("B");
    if (key === "understanding") setSelectedRegion("Front draped panel / Pattern P-04 / Silk-viscose shell");
    if (key === "fit") setSize(14);
    if (key === "engineering") go(5);
    if (key === "pattern") { setPattern("A"); setOptimise("Production"); }
    if (key === "impact") setOptimise(prompt.toLowerCase().includes("cost") ? "Cost" : prompt.toLowerCase().includes("fit") ? "Fit" : "Creative intent");
    if (key === "materials") { setMaterial("matte"); go(9); }
    if (key === "textile") setMaterial("matte");
    if (key === "surface") setColour("oxblood");
    if (key === "xray") setXray(82);
    if (key === "production") setProductionOptimised(true);
    if (key === "bom") setDocumentsReady(true);
    if (key === "sourcing") setSupplier("C");
    if (key === "costing") setCostPath("03");
    if (key === "mission") setMissionFiltered(true);
    if (key === "autonomy") setEvidenceOpen(true);
  };
  return (
    <main className={`journey-page immersive-journey env-${key}`}>
      <div className="immersive-sticky-shell">
      <div className="journey-topbar immersive-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Leave Artifex</button><span className="journey-label">ARTIFEX &nbsp; AW27 / LOOK 07</span><div className="autonomous-status"><span /> Autonomy / {autonomy}</div><button className="journey-join" onClick={onJoin}>Join waitlist <ArrowUpRight size={15} /></button></div>
      <div className="product-tabs"><span className={chapter.phase === "Creative" ? "active" : ""}>Creative</span><span className={chapter.phase === "Engineering" ? "active" : ""}>Engineering</span><span className={chapter.phase === "Materials" ? "active" : ""}>Materials</span><span className={chapter.phase === "Production" ? "active" : ""}>Production</span><span className={chapter.phase === "Release" ? "active" : ""}>Release</span><div className="journey-mode"><button className={mode === "guided" ? "active" : ""} onClick={() => setMode("guided")}>● Journey</button><button className={mode === "explore" ? "active" : ""} onClick={() => setMode("explore")}>○ Explore</button></div></div>
      <div className="immersive-progress"><span>{String(active + 1).padStart(2, "0")} / 22</span><TimelineProgress active={active} /><span>{chapter.environment}</span></div>
      <section className="immersive-layout">
        <aside className="story-panel"><p className="eyebrow"><span className="eyebrow-line" /> {chapter.phase} / {chapter.environment}</p><h1>{chapter.title}</h1><p>{chapter.body}</p><div className="causal-line"><span>PRODUCT STATE</span><b>Garment / 001</b><small>{active === 0 ? "creative intent created" : `${journeyChapters[active - 1].key} → ${chapter.key}`}</small></div><div className="journey-stepper"><button onClick={() => go(active - 1)} disabled={!active}><ChevronLeft size={17} /></button><span>{String(active + 1).padStart(2, "0")} / 22</span><button onClick={() => go(active + 1)} disabled={active === journeyChapters.length - 1}><ChevronRight size={17} /></button></div></aside>

        <div className={`persistent-stage ${copilotPulse ? "copilot-changing" : ""}`} onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (dragging.current) setRotation((r) => r + e.movementX * .45); }} onPointerUp={() => { dragging.current = false; }}>
          <div className="stage-grid" /><div className="runway-floor" /><div className="garment-rotator" style={{ transform: `translate(-50%, -50%) rotateY(${rotation}deg) scale(${key === "fit" ? .82 + (size - 6) * .012 : 1})` }}><Garment mode="studio" material={materialForStage} pattern={key === "pattern" || key === "production"} /></div><div className="stage-identity"><span>GARMENT / 001</span><span>drag to rotate ↔</span></div>
          {key === "creative" && <div className="creative-board"><span className="board-card mood">MOODBOARD<small>volume / tension</small></span><span className="board-card sketch">DESIGN SKETCH<small>asymmetric drape</small></span><span className="board-card intent">CREATIVE INTENT<small>sculptural · soft structure</small></span></div>}
          {key === "understanding" && <div className="garment-callouts"><button onClick={() => setSelectedRegion("Structured bodice / Front body")}>Structured bodice</button><button onClick={() => setSelectedRegion("Front draped panel / Pattern P-04 / Silk-viscose shell")}>Asymmetric drape</button><button onClick={() => setSelectedRegion("High-tension waist / Back ease")}>High-tension waist</button><button onClick={() => setSelectedRegion("Soft volume / Lower skirt")}>Soft volume</button><button onClick={() => setSelectedRegion("Hidden closure / Centre back")}>Hidden closure</button></div>}
          {key === "versions" && <div className="version-fan"><span>creative-direction</span><span>fit-experiment</span><span>production-safe</span></div>}
          {key === "fit" && <><div className="avatar-sizes"><span>06</span><span>08</span><span className="active">{size}</span><span>12</span><span>14</span></div><div className="fit-alert">FIT INCONSISTENCY / SIZES 12–14</div></>}
          {key === "engineering" && <div className="constraint-hud"><span>FIT ISSUE<b>Back waist excess</b></span><span>CREATIVE CONSTRAINTS<b>Preserve silhouette / drape / waist</b></span><span>ENGINEERING CONSTRAINTS<b>Ease / stretch / tolerance</b></span></div>}
          {key === "pattern" && <div className="pattern-alternatives">{["A","B","C"].map((item) => <button key={item} className={pattern === item ? "active" : ""} onClick={() => setPattern(item)}><span>{item}</span><i>Alternative {item}</i><small>{item === "A" ? "side seam redistribution" : item === "B" ? "panel redistribution" : "suppression rebalance"}</small></button>)}</div>}
          {key === "impact" && <div className="recommendation"><span>RECOMMENDED FOR {optimise.toUpperCase()}</span><b>ALTERNATIVE {recommendation}</b><small>Same creative concept. Different engineered reality.</small></div>}
          {key === "construction" && <div className="assembly-sequence">{["Bodice shell","Structural reinforcement","Side assembly","Waist join","Draped panel","Closure","Lining","Finish"].map((item, i) => <span className={i === 4 ? "active" : ""} key={item}>{String(i + 1).padStart(2,"0")} {item}</span>)}</div>}
          {key === "materials" && <div className="material-orbit"><span>SHELL<small>Silk-viscose</small></span><span>LINING<small>Cupro</small></span><span>INTERFACING<small>Light fusible</small></span><span>TRIM<small>Metal hardware</small></span></div>}
          {key === "textile" && <div className="textile-twin"><div><Garment mode="mini" material="silver" /><span>SILK VISCOSE<small>soft drape / 2.8m</small></span></div><div><Garment mode="mini" material="matte" /><span>WOOL CREPE<small>more structure / 3.0m</small></span></div></div>}
          {key === "propagation" && <div className="propagation-chain">{["MATERIAL","DRAPE","FIT","PATTERN","CONSUMPTION","COST","CONSTRUCTION","DOCUMENTATION"].map((item, i) => <span style={{ animationDelay: `${i * .12}s` }} key={item}>{item}</span>)}</div>}
          {key === "surface" && <div className="runway-title">COLOURWAY / {colour.toUpperCase()}</div>}
          {key === "xray" && <><div className="xray-cut" style={{ width: `${xray}%` }} /><div className="xray-label">FASHION ← {xray}% → ENGINEERING</div></>}
          {key === "production" && <div className={`marker-layout ${productionOptimised ? "optimised" : ""}`}><span /><span /><span /><span /><span /><b>{productionOptimised ? "88.4%" : "72.8%"}<small>UTILISATION</small></b></div>}
          {key === "bom" && <div className={`document-cloud ${documentsReady ? "package-ready" : ""}`}><span>TECHNICAL FLATS</span><span>MEASUREMENTS</span><span>GRADING</span><span>LIVE BOM</span><span>CONSTRUCTION</span><span>QC</span>{documentsReady && <b><Check size={14} /> FACTORY REVIEW PACKAGE READY</b>}</div>}
          {key === "sampling" && <div className="sample-timeline"><span>PROTO</span><span className="active">FIT<small>waist drag lines</small></span><span>REVISED</span><span>SIZE SET</span><span>PRE-PRODUCTION</span></div>}
          {key === "sourcing" && <div className="supplier-cards"><span className={supplier === "A" ? "active" : ""}>A<small>$18.40/m · 18 days · low risk</small></span><span className={supplier === "B" ? "active" : ""}>B<small>$16.70/m · 37 days · medium risk</small></span><span className={supplier === "C" ? "active" : ""}>C<small>$20.10/m · 11 days · low risk</small></span></div>}
          {key === "costing" && <>{costPath ? <div className="cost-paths"><span>CURRENT<b>$120.28</b></span><span>PATH 01<small>Simplify construction</small><b>$116.40</b></span><span>PATH 02<small>Supplier substitution</small><b>$114.82</b></span><span className="active">PATH 03<small>Trim + marker optimisation</small><b>$113.90</b></span></div> : <div className="cost-cloud"><span>Fabric <b>$52.88</b></span><span>Lining <b>$7.60</b></span><span>Trim <b>$8.20</b></span><span>Labour <b>$34.00</b></span><strong>LANDED COST<br />$120.28</strong></div>}</>}
          {key === "release" && <div className={`release-stamp ${released ? "released" : ""}`}><b>{released ? "PRODUCTION READY" : "94% PRODUCTION READY"}</b><span>{released ? "Released by Production Approver" : "Factory approval required"}</span></div>}
          {key === "mission" && <div className={`collection-grid ${missionFiltered ? "risk-filtered" : ""}`}>{Array.from({ length: 24 }).map((_, i) => <span className={i === 6 || i === 11 || i === 18 ? "risk" : i === 7 ? "active" : ""} key={i}>{String(i + 1).padStart(2,"0")}</span>)}</div>}
          {key === "knowledge" && <div className="knowledge-web"><span>SEAM</span><span>CONSTRUCTION</span><span>MATERIAL</span><span>FIT</span><span>HISTORY</span><span>QC</span></div>}
          {key === "autonomy" && <><div className="autonomy-log"><b>{autonomy.toUpperCase()} MODE</b>{["Fit issue detected","Alternatives generated","Policy checked","Pattern updated","Simulation rerun","Documentation updated","Evidence recorded"].map((item, i) => <span style={{ animationDelay: `${i * .13}s` }} key={item}><Check size={11} /> {item}</span>)}</div>{evidenceOpen && <div className="evidence-drawer"><span>WHY DID ARTIFEX CHANGE THIS?</span><b>Excess back-waist ease</b><small>Evidence / Fit simulation #2841<br />Rule / Ease tolerance exceeded<br />Action / 14mm redistribution<br />Creative impact / 0.7%<br />Fit improvement / +8.3%<br />Confidence / HIGH</small></div>}</>}
          {copilotAction === "creative" && key === "creative" && <div className="copilot-alt-fan"><span>A</span><span className="active">B</span><span>C</span></div>}
          {copilotAction === "construction" && key === "construction" && <div className="operation-result"><span>CURRENT<b>18</b></span><i>→</i><span>ALTERNATIVE<b>15</b></span><small>outer silhouette retained</small></div>}
        </div>

        <aside className="action-panel">
          <span className="panel-label">DATA / ACTION</span>
          {key === "creative" && <><h3>Creative intent</h3><p>Sculptural<br />Asymmetrical<br />Controlled drape<br />Soft structure</p><button className="action-primary" onClick={() => go(1)}>Interpret design <ArrowRight size={14} /></button></>}
          {key === "understanding" && <><h3>Garment reading</h3><p>Click a callout to see how intent connects to geometry and material behaviour.</p><button className="action-primary" onClick={() => go(2)}>Continue <ArrowRight size={14} /></button></>}
          {key === "versions" && <><h3>Repository</h3><p>MAIN / creative-direction / fit-experiment / production-safe</p><button className="action-primary">Compare versions</button></>}
          {key === "fit" && <><h3>Size scrubber</h3><input className="range-control" type="range" min="6" max="14" step="2" value={size} onChange={(e) => setSize(Number(e.target.value))} /><p>Selected size: {size}<br />Fit map: tension / excess / distance</p><button className="action-primary" onClick={() => go(4)}>Engineer solution</button></>}
          {key === "engineering" && <><h3>Generate alternatives</h3><p>Preserve creative intent while resolving back-waist excess.</p><button className="action-primary" onClick={() => go(5)}>Generate 3 options</button></>}
          {key === "pattern" && <><h3>Pattern engineering</h3><p>Selected: Alternative {pattern}</p><div className="metric-mini"><span>Fit {pattern === "B" ? "98" : pattern === "A" ? "96" : "94"}</span><span>Intent {pattern === "C" ? "100" : pattern === "A" ? "99" : "95"}</span><span>Risk {pattern === "B" ? "Medium" : "Low"}</span></div><button className="action-primary" onClick={() => go(6)}>Open Impact Lens</button></>}
          {key === "impact" && <><h3>Impact Lens</h3><div className="impact-bars">{["Creative intent","Fit","Cost","Waste","Production"].map((item) => { const width = optimise === item ? 100 : item === "Fit" ? 76 : item === "Production" ? 58 : item === "Waste" ? 42 : 28; return <button onClick={() => setOptimise(item)} key={item}><span>{item}</span><i><b style={{ width: `${width}%` }} /></i></button>; })}</div><p>Natural language is translated into engineering objectives. Recommended: Alternative {recommendation}</p></>}
          {key === "construction" && <><h3>Assembly</h3><p>Step 05 / Draped panel highlighted. Surface is translucent to reveal construction relationships.</p><button className="action-primary" onClick={() => go(8)}>Assign materials</button></>}
          {key === "materials" && <><h3>Components</h3><p>Shell / lining / interfacing / zipper / thread / trim</p><button className="action-primary" onClick={() => go(9)}>Open textile twin</button></>}
          {key === "textile" && <><h3>Simulate materials</h3><div className="choice-row"><button className={material === "silver" ? "selected" : ""} onClick={() => setMaterial("silver")}>Silk</button><button className={material === "matte" ? "selected" : ""} onClick={() => setMaterial("matte")}>Wool</button></div><p>Pattern correction: {material === "matte" ? "Required" : "—"}</p><button className="action-primary" onClick={() => { setMaterial("matte"); go(10); }}>Choose wool</button></>}
          {key === "propagation" && <><h3>Downstream impact</h3><p>Material → drape → fit → pattern → consumption → cost → construction → documents</p><button className="action-primary" onClick={() => go(11)}>Continue with change</button></>}
          {key === "surface" && <><h3>Colourways</h3><div className="colour-options">{["obsidian","ivory","oxblood","midnight"].map((item) => <button aria-label={item} className={`${item} ${colour === item ? "active" : ""}`} onClick={() => setColour(item)} key={item} />)}</div><p>Finish / embroidery / placement artwork / embellishment</p></>}
          {key === "xray" && <><h3>X-ray</h3><input className="range-control" type="range" min="0" max="100" value={xray} onChange={(e) => setXray(Number(e.target.value))} /><p>Surface / shell / interfacing / structure / lining / seams / pattern / body</p></>}
          {key === "production" && <><h3>Marker efficiency</h3><p>{productionOptimised ? "Fabric −0.31m / Waste −15.6% / Cost −$4.82" : "Current utilisation 72.8%"}</p><button className="action-primary" onClick={() => setProductionOptimised(true)}>{productionOptimised ? "Optimised / 88.4%" : "Optimise"}</button></>}
          {key === "bom" && <><h3>Live BOM</h3><p>Shell 2.41m<br />Lining 1.33m<br />Interfacing 0.44m<br />Invisible zipper 1</p><button className="action-primary">Generate documentation</button></>}
          {key === "sampling" && <><h3>Physical evidence</h3><p>Waist drag lines detected → observation → digital garment → pattern → correction.</p><button className="action-primary" onClick={() => go(16)}>Apply correction</button></>}
          {key === "sourcing" && <><h3>Supplier {supplier} selected</h3><p>{supplier === "C" ? "Lower risk / +4 days / MOQ 250m" : "Cost ↓ / Lead time ↑ / MOQ ↑ / Risk ↑"}</p><button className="action-primary">Maintain change?</button></>}
          {key === "costing" && <><h3>{costPath ? "Target achieved / $113.90" : "Production volume"}</h3><div className="choice-row"><button>1K</button><button>5K</button><button className="selected">10K</button><button>50K</button></div><p>{costPath ? "Path 03 combines trim and marker optimisation while keeping the shell fabric." : "Pattern optimisation saved $4.82 per garment in this illustrative state."}</p></>}
          {key === "release" && <><h3>Approval + release</h3><select value={role} onChange={(e) => setRole(e.target.value)}><option>Technical Designer</option><option>Production Approver</option></select><button className="action-primary" disabled={role !== "Production Approver"} onClick={() => setReleased(true)}>Release to production</button></>}
          {key === "mission" && <><h3>AW27 collection</h3><p>42 products<br />31 production ready<br />6 engineering<br />3 review<br />2 at risk</p><button className="action-primary">Return to garment 08</button></>}
          {key === "knowledge" && <><h3>Institutional knowledge</h3><p>Construction / material requirements / manufacturing constraints / historic decisions / fit / QC</p><button className="action-primary" onClick={() => go(21)}>Ask Artifex</button></>}
          {key === "autonomy" && <><h3>Copilot ≠ Autonomy</h3><div className="intelligence-distinction"><span><b>COPILOT</b><small>Human asks → Artifex acts</small></span><span><b>AUTONOMY</b><small>Artifex detects → policy → acts</small></span></div><div className="choice-row">{["Observe","Suggest","Execute"].map((item) => <button className={autonomy === item ? "selected" : ""} onClick={() => setAutonomy(item)} key={item}>{item}</button>)}</div><p>Every proposed or executed change is tied to evidence, rules, impact, and confidence.</p><button className="action-primary" onClick={() => setEvidenceOpen(true)}>View evidence</button></>}
          <button className="next-control" onClick={() => active === journeyChapters.length - 1 ? onJoin() : go(active + 1)}>{active === journeyChapters.length - 1 ? "Finish journey" : "Continue"}<ArrowUpRight size={16} /></button>
        </aside>
      </section>
      <PersistentCopilot chapterKey={key} role={copilotRole} selectedContext={selectedRegion} onRole={setCopilotRole} onExecute={executeCopilot} />
      <section className="immersive-timeline"><div className="timeline-scroller">{journeyChapters.map((item, index) => <button key={item.key} className={index === active ? "active" : ""} onClick={() => go(index)}><span>{String(index + 1).padStart(2,"0")}</span><b>{item.key}</b></button>)}</div><div className="journey-footnote"><Sparkles size={16} /><span>Curated concept simulation. The same garment persists across every state.</span></div></section>
      </div>
    </main>
  );
}

export default function Home() {
  const [view, setView] = useState<View>(() => { const requested = new URLSearchParams(window.location.search).get("view"); return requested === "journey" || requested === "wireframes" ? requested : "landing"; });
  const [menuOpen, setMenuOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  useEffect(() => { document.title = "Artifex — Creative Engineering for Fashion"; }, []);
  const goJoin = () => setWaitlistOpen(true);
  return <div className="app-shell"><Nav view={view} onView={setView} onJoin={goJoin} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />{view === "landing" ? <Landing onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : view === "journey" ? <Journey onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} /> : <WireframeMap onBack={() => { setView("landing"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJourney={() => { setView("journey"); window.scrollTo({ top: 0, behavior: "smooth" }); }} onJoin={goJoin} />}<WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} /></div>;
}

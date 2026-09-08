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
  ShieldCheck,
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

const journeyChapters = [
  { key: "creative", phase: "Creative", title: "Interpret creative intent", body: "An editorial development board becomes a structured garment project.", environment: "editorial board" },
  { key: "versions", phase: "Collaboration", title: "Branch the garment", body: "Versions, branches, review, and approvals stay attached to the product instead of becoming separate files.", environment: "collaboration repository" },
  { key: "understanding", phase: "Creative", title: "Understand the garment", body: "Artifex identifies the garment's silhouette, drape, structure, and construction zones.", environment: "garment reading" },
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
  { key: "conversation", phase: "Release", title: "One conversation. Every layer.", body: "The same contextual Copilot carries intent across design, geometry, fit, material, production, cost, and documentation.", environment: "conversation reveal" },
  { key: "autonomy", phase: "Release", title: "Observe. Suggest. Execute.", body: "Autonomy detects a bounded low-risk problem, acts within policy, and leaves the designer in control of consequential boundaries.", environment: "autonomy controls" },
  { key: "evidence", phase: "Release", title: "Why did Artifex change this?", body: "Every suggestion or bounded action can be traced to evidence, rule, impact, confidence, and the product state it changed.", environment: "evidence drawer" },
  { key: "release-ready", phase: "Release", title: "Production-ready product truth", body: "Release closes the development loop: the approved garment, documentation, evidence, and knowledge are ready to move into the world.", environment: "production-ready summary" },
  { key: "ending", phase: "Release", title: "One garment. One evolving system.", body: "Creative intent, engineering, material, production, evidence, and knowledge return to the exact garment that began the project.", environment: "integrated product truth" },
  { key: "community", phase: "Community", title: "Share structured fashion work", body: "Discover projects, fork garments, collaborate with specialists, and grow from one evolving product model while creator credit and editable engineering knowledge remain intact.", environment: "community ecosystem" },
] as const;

const investorJourneyChapters = [
  { key: "investor-idea", phase: "Journey", title: "An idea becomes a garment project.", body: "Artifex begins with creative intent and preserves it as the garment takes form, absorbs decisions, and moves toward production.", environment: "creative intent" },
  { key: "investor-graph", phase: "Journey", title: "The connected garment.", body: "Most tools work on parts of fashion development. Artifex models the relationships between them.", environment: "product graph" },
  { key: "investor-creative", phase: "Creative", title: "Interpret intent in 3D.", body: "Mood, sketch, silhouette, drape, and construction cues become a technically legible digital garment—not just an image.", environment: "creative interpretation" },
  { key: "investor-engineering", phase: "Engineering", title: "Solve fit. Explore possibilities.", body: "Fit signals, garment anatomy, and creative constraints lead to real pattern alternatives and an explicit decision trade-off.", environment: "fit + pattern engineering" },
  { key: "investor-materials", phase: "Materials", title: "Same design. Different reality.", body: "A material is not a texture. It changes drape, fit, pattern, construction, cost, and the documentation that follows.", environment: "textile behaviour" },
  { key: "investor-production", phase: "Production", title: "From design to production.", body: "Construction, material efficiency, cost, supply, and living documentation stay attached to the same garment state.", environment: "production intelligence" },
  { key: "investor-collection", phase: "Collection", title: "Your collection. Connected.", body: "One garment can become a collection-level operating view, while the contextual Copilot keeps the creative and commercial picture connected.", environment: "mission control + copilot" },
  { key: "investor-recap", phase: "Artifex", title: "One garment. One evolving system.", body: "Creative intent, engineering, material, production, evidence, and knowledge resolve into one evolving product truth—ready for the next decision.", environment: "final recap" },
] as const;

type ExploreJourneyKey = typeof journeyChapters[number]["key"];
type InvestorJourneyKey = typeof investorJourneyChapters[number]["key"];
type JourneyKey = ExploreJourneyKey | InvestorJourneyKey;

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
  conversation: { prompt: "Show me everything this garment knows.", context: "AW27 / LOOK 07 / full product graph", stages: ["Reading creative intent", "Tracing engineering decisions", "Connecting material and production", "Summarising product lineage"], outcome: "One conversation now spans the garment’s entire product state" },
  autonomy: { prompt: "Explain what you changed and why.", context: "Autonomous fit correction / evidence log", stages: ["Separating request from autonomous action", "Opening evidence", "Reading policy and rule", "Showing impact and confidence"], outcome: "Copilot explains; autonomy detects and acts within policy" },
  evidence: { prompt: "Show the evidence behind this correction.", context: "Fit correction / evidence record #2841", stages: ["Opening issue record", "Checking governing rule", "Measuring product impact", "Summarising confidence"], outcome: "The decision is explainable, attributable, and reversible" },
  "release-ready": { prompt: "Show what is ready for production.", context: "GARMENT / 001 / release package", stages: ["Checking approval boundary", "Collecting current documentation", "Confirming evidence", "Preparing release state"], outcome: "The approved garment and its product truth are ready to move forward" },
  community: { prompt: "Fork this drape into a new exploration without losing its history.", context: "Drape lineage / approved garment state", stages: ["Preserving source lineage", "Creating a non-destructive branch", "Attaching attribution", "Opening a collaborative exploration"], outcome: "A new lineage is created without breaking the original product truth" },
  ending: { prompt: "Summarise this garment’s journey.", context: "GARMENT / 001 / integrated product truth", stages: ["Collecting creative decisions", "Collecting engineering evidence", "Collecting production state", "Resolving the connected garment"], outcome: "One garment. One evolving system." },
  "investor-idea": { prompt: "Turn this intent into a connected garment project.", context: "Moodboard + sketch + creative direction", stages: ["Reading creative references", "Identifying silhouette", "Mapping early constraints", "Creating connected garment state"], outcome: "Creative intent is now a living garment project" },
  "investor-graph": { prompt: "Show everything a material change would affect.", context: "GARMENT / 001 / connected product graph", stages: ["Tracing material dependency", "Reading drape and fit", "Checking pattern consequences", "Refreshing commercial outputs"], outcome: "Material effects are connected across the product graph" },
  "investor-creative": { prompt: "Make this look technically legible in 3D.", context: "Creative intent / asymmetric drape / soft structure", stages: ["Reading silhouette cues", "Mapping garment regions", "Resolving 3D form", "Linking construction context"], outcome: "Creative intent is visible on the digital garment" },
  "investor-engineering": { prompt: "Keep the silhouette. Fix the fit.", context: "Size 14 / back-waist tension / pattern options", stages: ["Reading fit signal", "Opening garment anatomy", "Comparing pattern alternatives", "Ranking trade-offs"], outcome: "Three viable alternatives with explicit impact trade-offs" },
  "investor-materials": { prompt: "What changes if I use wool crepe instead?", context: "Silk-viscose shell / textile twin", stages: ["Creating textile twin", "Comparing movement", "Tracing product dependencies", "Updating affected outputs"], outcome: "The material change propagates through the garment" },
  "investor-production": { prompt: "Reduce waste without changing the visible design.", context: "Construction + marker + supplier + live BOM", stages: ["Checking construction", "Optimising marker", "Comparing supply options", "Refreshing live documentation"], outcome: "A production-safe route with refreshed product outputs" },
  "investor-collection": { prompt: "Which looks could delay this collection?", context: "AW27 / collection status / shared product graph", stages: ["Scanning collection risk", "Reading linked garment states", "Prioritising attention", "Explaining recommendation"], outcome: "Collection risk is visible without losing garment-level context" },
  "investor-recap": { prompt: "Summarise what Artifex keeps connected.", context: "GARMENT / 001 / final product truth", stages: ["Collecting connected decisions", "Resolving downstream evidence", "Summarising current state", "Preparing next action"], outcome: "One garment. One evolving system." },
};

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

function TimelineProgress({ active, total = journeyChapters.length }: { active: number; total?: number }) {
  return <div className="progress-track">{Array.from({ length: total }).map((_, index) => <span key={index} className={index <= active ? "active" : ""} />)}</div>;
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

      <section className="wedge-section" id="wedge">
        <div className="section-meta"><span>06 / THE FIRST WEDGE</span><span>FOCUS WITHOUT A DEAD END</span></div>
        <div className="wedge-header"><p className="eyebrow"><span className="eyebrow-line" /> Credible sequencing</p><h2>Start narrow.<br /><em>Build for the system.</em></h2><p>The architecture is broad by design. The first product should prove one connected workflow that customers value—not imitate an entire industry stack at launch.</p></div>
        <div className="wedge-contrast">
          <article className="wedge-card candidate"><span>CANDIDATE FIRST WEDGE</span><h3>Women’s dress development</h3><p>A constrained garment family where creative intent, body and fit context, AI-assisted pattern engineering, basic material behaviour, consumption, documentation, and version history stay connected.</p><div className="wedge-path">{["Design intent","Fit context","Pattern options","Material behaviour","Consumption","Living tech pack"].map((item, index) => <span key={item}><i>{String(index + 1).padStart(2,"0")}</i>{item}</span>)}</div></article>
          <article className="wedge-card north-star"><span>LONG-TERM NORTH STAR</span><h3>Fashion development operating environment</h3><p>The same product graph can later activate sourcing, factories, costing, quality, collections, community, and enterprise governance—only when the user and product need them.</p><div className="north-star-map"><b>SHARED GARMENT GRAPH</b>{["SOURCE","COST","QUALITY","COLLECTION","KNOWLEDGE","GOVERNANCE"].map((item) => <span key={item}>{item}</span>)}</div></article>
        </div>
        <div className="entry-point-row"><span>VALID ENTRY POINTS</span>{["Creative intent","Existing pattern","Material","Cost constraint"].map((item) => <b key={item}>{item}</b>)}<small>One illustrative route is shown in the demo. Artifex does not force one workflow.</small></div>
        <div className="wedge-boundary"><ShieldCheck size={17} /><span><b>Founder credibility:</b> the exact first wedge remains subject to customer discovery, pain frequency, economic impact, data availability, trust, and buying ownership.</span></div>
      </section>

      <section className="position-section dark-section" id="position">
        <div className="section-meta"><span>07 / THE POSITION</span><span>CONTINUITY ACROSS THE JOURNEY</span></div>
        <div className="position-header"><p className="eyebrow muted"><span className="eyebrow-line" /> Not another isolated tool</p><h2>Where creative<br /><em>intent</em> meets<br />product logic.</h2></div>
        <div className="position-rail"><div className="rail-card"><span>GENERATIVE DESIGN</span><p>creates possibilities</p><i>creative</i></div><div className="rail-card"><span>3D / CAD</span><p>models form</p><i>spatial</i></div><div className="rail-card"><span>PLM / DOCUMENTS</span><p>stores outputs</p><i>operational</i></div><div className="rail-card active"><span>ARTIFEX</span><p>connects the product journey</p><i>creative ↔ engineering</i></div></div>
        <p className="position-note">A conceptual product position: continuity across fashion development, with the designer still at the consequential boundary.</p>
      </section>

      <section className="waitlist-section" id="join">
        <div className="waitlist-kicker"><span>08 / ARTIFEX 2026</span><span>EARLY ACCESS</span></div>
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

function InvestorStage({ chapterKey, graphMode, onGraphMode, material, onMaterial, pattern, onPattern, optimise, onOptimise, engineeringView, onEngineeringView, productionOptimised, onOptimiseProduction, missionFiltered, onMissionFilter, xray }: {
  chapterKey: InvestorJourneyKey; graphMode: "today" | "artifex"; onGraphMode: (mode: "today" | "artifex") => void; material: string; onMaterial: (material: string) => void; pattern: string; onPattern: (pattern: string) => void; optimise: string; onOptimise: (metric: string) => void; engineeringView: "fit" | "xray" | "alternatives"; onEngineeringView: (view: "fit" | "xray" | "alternatives") => void; productionOptimised: boolean; onOptimiseProduction: () => void; missionFiltered: boolean; onMissionFilter: () => void; xray: number;
}) {
  if (chapterKey === "investor-idea") return <><div className="creative-board investor-creative-board"><span className="board-card mood">MOODBOARD<small>volume / tension</small></span><span className="board-card sketch">DESIGN SKETCH<small>asymmetric drape</small></span><span className="board-card intent">CREATIVE INTENT<small>sculptural · soft structure</small></span></div><div className="investor-signal-trail"><span>MOOD</span><i /> <span>SILHOUETTE</span><i /> <span>DRAPE</span><i /> <span>CONNECTED PROJECT</span></div><div className="investor-side-context"><span>VERSIONING / non-destructive</span><span>COLLABORATION / shared intent</span></div></>;
  if (chapterKey === "investor-graph") return <div className={`graph-contrast graph-${graphMode}`}><div className="graph-mode-switch"><button className={graphMode === "today" ? "active" : ""} onClick={() => onGraphMode("today")}>Today</button><span>↔</span><button className={graphMode === "artifex" ? "active" : ""} onClick={() => onGraphMode("artifex")}>Artifex</button></div><div className="graph-contrast-stage">{graphMode === "today" ? <><div className="fragmented-file-cloud">{["Sketch.ai","Pattern_v7.dxf","Fit_notes.pdf","costing.xlsx","TechPack_FINAL.pdf","Supplier chat","BOM_final.pdf","Sample 04"].map((item, index) => <span style={{ "--file-index": index } as React.CSSProperties} key={item}>{item}</span>)}</div><div className="fragmented-caption">Disconnected files, decisions, and conversations</div></> : <><div className="connected-garment-core"><Garment mode="mini" material="silver" /><b>ONE<br />GARMENT</b></div><div className="connected-graph-nodes">{["CREATIVE","FIT","PATTERN","MATERIAL","CONSTRUCTION","COST","DOCUMENTATION","SUPPLY"].map((item, index) => <button style={{ "--node-index": index } as React.CSSProperties} key={item}>{item}</button>)}</div><div className="dependency-example"><span>MATERIAL</span><i>→</i><span>DRAPE</span><i>→</i><span>FIT</span><i>→</i><span>PATTERN</span><i>→</i><span>CONSTRUCTION</span><i>→</i><span>COST</span><i>→</i><span>DOCUMENTATION</span></div></>}</div><p>{graphMode === "today" ? "A garment gets scattered across isolated representations." : "Change one thing. See everything it affects."}</p></div>;
  if (chapterKey === "investor-creative") return <><div className="creative-editorial"><div className="editorial-reference"><span>REFERENCE</span><b>SCULPTURAL<br />EVENING</b><i>asymmetry / tension / soft volume</i></div><div className="editorial-sketch"><span>INTENT SKETCH</span><div className="sketch-lines" /></div></div><div className="garment-callouts investor-callouts"><span>ASYMMETRIC SHOULDER</span><span>STRUCTURED BODICE</span><span>FITTED WAIST</span><span>CONTROLLED DRAPE</span><span>SOFT LOWER VOLUME</span></div></>;
  if (chapterKey === "investor-engineering") return <div className={`investor-engineering-stage view-${engineeringView}`}><div className="engineering-view-switch"><button className={engineeringView === "fit" ? "active" : ""} onClick={() => onEngineeringView("fit")}>Fit signal</button><button className={engineeringView === "xray" ? "active" : ""} onClick={() => onEngineeringView("xray")}>X-ray</button><button className={engineeringView === "alternatives" ? "active" : ""} onClick={() => onEngineeringView("alternatives")}>Alternatives</button></div>{engineeringView === "fit" && <><div className="fit-alert">FIT SIGNAL / BACK-WAIST TENSION / SIZE 14</div><div className="fit-heatmap"><i /><i /><i /></div></>}{engineeringView === "xray" && <><div className="xray-cut investor-xray" style={{ width: `${xray}%` }} /><div className="xray-label">FASHION ← {xray}% → ENGINEERING</div><div className="xray-stack">{["Surface","Shell","Interfacing","Structure","Lining","Seams","Pattern","Body"].map((item) => <span key={item}>{item}</span>)}</div></>}{engineeringView === "alternatives" && <><div className="pattern-alternatives investor-pattern-alternatives">{["A", "B", "C"].map((item) => <button key={item} className={pattern === item ? "active" : ""} onClick={() => onPattern(item)}><span>{item}</span><i>Option {item}</i><small>{item === "A" ? "production safe" : item === "B" ? "fit priority" : "creative priority"}</small></button>)}</div><div className="investor-impact-lens">{["Creative", "Fit", "Cost", "Waste", "Production"].map((item) => <button className={optimise === item || (item === "Creative" && optimise === "Creative intent") ? "active" : ""} onClick={() => onOptimise(item === "Creative" ? "Creative intent" : item)} key={item}><span>{item}</span><i><b /></i></button>)}</div></>}</div>;
  if (chapterKey === "investor-materials") return <><div className="textile-twin investor-textile-twin"><button className={material === "silver" ? "active" : ""} onClick={() => onMaterial("silver")}><Garment mode="mini" material="silver" /><span>SILK VISCOSE<small>fluid / high drape / $148/m</small></span></button><button className={material === "matte" ? "active" : ""} onClick={() => onMaterial("matte")}><Garment mode="mini" material="matte" /><span>WOOL CREPE<small>structured / medium drape / $165/m</small></span></button></div><div className="investor-propagation"><span>MATERIAL CHANGED</span>{["Drape updated", "Fit rechecked", "Pattern affected", "Construction checked", "Cost updated", "Documentation refreshed"].map((item, index) => <b style={{ animationDelay: `${index * .1}s` }} key={item}><Check size={10} />{item}</b>)}</div></>;
  if (chapterKey === "investor-production") return <div className="investor-production-stage"><div className="construction-map"><span>01. Construction</span><div className="construction-figure"><i /><i /><i /><i /></div><small>Outer shell / lining / interfacing / seams / closure</small></div><div className={`marker-layout investor-marker ${productionOptimised ? "optimised" : ""}`}><span /><span /><span /><span /><span /><b>{productionOptimised ? "88.4%" : "72.8%"}<small>UTILISATION</small></b><button onClick={onOptimiseProduction}>{productionOptimised ? "Marker optimised" : "Optimise marker"}</button></div><div className="production-output-stack"><span>SUPPLIER OPTIONS<small>risk · lead time · MOQ</small></span><span>TRUE COST<small>$120.28 → $113.90</small></span><span>LIVE BOM<small>shell · lining · trims · zipper</small></span><span>SAMPLE + QC<small>physical evidence returns</small></span><span>DOCUMENTATION<small>tech pack refreshed</small></span></div></div>;
  if (chapterKey === "investor-collection") return <><div className={`collection-grid investor-collection-grid ${missionFiltered ? "risk-filtered" : ""}`}>{Array.from({ length: 24 }).map((_, i) => <button className={i === 6 || i === 11 || i === 18 ? "risk" : i === 7 ? "active" : ""} key={i} onClick={onMissionFilter}>{String(i + 1).padStart(2, "0")}</button>)}</div><div className="collection-status-strip"><span><b>42</b> garments</span><span><b>31</b> ready</span><span><b>6</b> engineering</span><span><b>3</b> review</span><span><b>2</b> at risk</span></div><div className="investor-copilot-summary"><Sparkles size={16} /><span>Ask Artifex</span><b>Which looks are most likely to delay this collection?</b><small>Looks 07, 12, and 19 require attention.</small></div><div className="collection-context-pills"><span>KNOWLEDGE / learn across garments</span><span>EVIDENCE / why each signal matters</span><span>LINEAGE / collaborate without loss</span></div></>;
  return <div className="investor-recap-stage"><div className="recap-product-core"><Garment mode="mini" material="silver" /><b>ONE<br />GARMENT</b></div>{["CREATIVE", "FIT", "PATTERN", "MATERIAL", "CONSTRUCTION", "COST", "SUPPLY", "PRODUCTION", "DOCUMENTATION", "EVIDENCE", "KNOWLEDGE", "COMMUNITY", "HISTORY"].map((item, index) => <span style={{ "--recap-index": index } as React.CSSProperties} key={item}>{item}</span>)}<p>Creative engineering for fashion.</p></div>;
}

function Journey({ onBack, onJoin }: { onBack: () => void; onJoin: () => void }) {
  const [active, setActive] = useState(0);
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
  const [graphMode, setGraphMode] = useState<"today" | "artifex">("today");
  const [engineeringView, setEngineeringView] = useState<"fit" | "xray" | "alternatives">("fit");
  const dragging = useRef(false);
  const activeChapters = journeyChapters;
  const chapter = activeChapters[active];
  const key = chapter.key as JourneyKey;
  const layerTargets: Record<string, number> = { creative: 0, collaboration: 1, engineering: 4, materials: 8, production: 13, release: 18, community: 26 };
  const materialForStage = key === "textile" || key === "propagation" || key === "investor-materials" ? material : key === "surface" ? colour : key === "creative" ? "ink" : "silver";
  const recommendation = optimise === "Fit" ? "B" : optimise === "Creative intent" ? "C" : "A";
  const go = (next: number) => {
    const target = Math.max(0, Math.min(activeChapters.length - 1, next));
    setActive(target);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: (target / Math.max(1, activeChapters.length - 1)) * maxScroll, behavior: "smooth" });
  };
  const jumpToLayer = (layer: string) => go(layerTargets[layer] ?? 0);
  useEffect(() => {
    const updateFromScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      const next = Math.round((window.scrollY / maxScroll) * (activeChapters.length - 1));
      setActive(Math.max(0, Math.min(activeChapters.length - 1, next)));
    };
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateFromScroll);
  }, [activeChapters.length]);
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
    if (key === "conversation") setSelectedRegion("Creative intent / fit / pattern / material / production / cost / documentation");
    if (key === "autonomy") setEvidenceOpen(true);
    if (key === "evidence") setEvidenceOpen(true);
    if (key === "community") setSelectedRegion("Drape lineage / GARMENT 001 / non-destructive branch");
    if (key === "ending") setReleased(true);
    if (key === "investor-idea") setSelectedRegion("Creative intent / connected garment project");
    if (key === "investor-graph") setGraphMode("artifex");
    if (key === "investor-creative") setSelectedRegion("Asymmetric shoulder / structured bodice / controlled drape");
    if (key === "investor-engineering") { setEngineeringView("alternatives"); setPattern("B"); }
    if (key === "investor-materials") setMaterial("matte");
    if (key === "investor-production") { setProductionOptimised(true); setDocumentsReady(true); setCostPath("03"); }
    if (key === "investor-collection") setMissionFiltered(true);
    if (key === "investor-recap") setReleased(true);
  };
  return (
    <main className={`journey-page immersive-journey mode-explore env-${key}`}>
      <div className="immersive-sticky-shell">
      <div className="journey-topbar immersive-topbar"><button className="back-link" onClick={onBack}><ArrowLeft size={16} /> Leave Artifex</button><span className="journey-label">ARTIFEX &nbsp; CREATIVE ENGINEERING / LOOK 07</span><div className="autonomous-status"><span /> Autonomy / {autonomy}</div><button className="journey-join" onClick={onJoin}>Join waitlist <ArrowUpRight size={15} /></button></div>
      <div className="product-tabs"><button type="button" className={chapter.phase === "Creative" && key !== "versions" ? "active" : ""} onClick={() => jumpToLayer("creative")}>Creative</button><button type="button" className={key === "versions" ? "active" : ""} onClick={() => jumpToLayer("collaboration")}>Collaboration</button><button type="button" className={chapter.phase === "Engineering" ? "active" : ""} onClick={() => jumpToLayer("engineering")}>Engineering</button><button type="button" className={chapter.phase === "Materials" ? "active" : ""} onClick={() => jumpToLayer("materials")}>Materials</button><button type="button" className={chapter.phase === "Production" ? "active" : ""} onClick={() => jumpToLayer("production")}>Production</button><button type="button" className={chapter.phase === "Release" && key !== "community" ? "active" : ""} onClick={() => jumpToLayer("release")}>Release</button><button type="button" className={key === "community" ? "active" : ""} onClick={() => jumpToLayer("community")}>Community</button></div>
      <div className="immersive-progress"><span>{String(active + 1).padStart(2, "0")} / {activeChapters.length}</span><TimelineProgress active={active} total={activeChapters.length} /><span>{chapter.environment} · full product exploration</span></div>
      <section className="immersive-layout">
        <aside className="story-panel"><p className="eyebrow"><span className="eyebrow-line" /> {chapter.phase} / {chapter.environment}</p><h1>{chapter.title}</h1><p>{chapter.body}</p><div className="causal-line"><span>PRODUCT STATE</span><b>Garment / 001</b><small>{active === 0 ? "creative intent created" : `${activeChapters[active - 1].key} → ${chapter.key}`}</small></div><div className="journey-stepper"><button onClick={() => go(active - 1)} disabled={!active}><ChevronLeft size={17} /></button><span>{String(active + 1).padStart(2, "0")} / {activeChapters.length}</span><button onClick={() => go(active + 1)} disabled={active === activeChapters.length - 1}><ChevronRight size={17} /></button></div></aside>

        <div className={`persistent-stage stage-${key} ${copilotPulse ? "copilot-changing" : ""}`} onPointerDown={(e) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); }} onPointerMove={(e) => { if (dragging.current) setRotation((r) => r + e.movementX * .45); }} onPointerUp={() => { dragging.current = false; }}>
          <div className="stage-grid" /><div className="runway-floor" /><div className="garment-rotator" style={{ transform: `translate(-50%, -50%) rotateY(${rotation}deg) scale(${key === "fit" ? .82 + (size - 6) * .012 : 1})` }}><Garment mode="studio" material={materialForStage} pattern={key === "pattern" || key === "production" || key === "investor-production"} /></div><div className="stage-identity"><span>GARMENT / 001</span><span>drag to rotate ↔</span></div>
          {key === "creative" && <div className="creative-board"><span className="board-card mood">MOODBOARD<small>volume / tension</small></span><span className="board-card sketch">DESIGN SKETCH<small>asymmetric drape</small></span><span className="board-card intent">CREATIVE INTENT<small>sculptural · soft structure</small></span></div>}
          {key === "understanding" && <div className="garment-callouts"><button onClick={() => setSelectedRegion("Structured bodice / Front body")}>Structured bodice</button><button onClick={() => setSelectedRegion("Front draped panel / Pattern P-04 / Silk-viscose shell")}>Asymmetric drape</button><button onClick={() => setSelectedRegion("High-tension waist / Back ease")}>High-tension waist</button><button onClick={() => setSelectedRegion("Soft volume / Lower skirt")}>Soft volume</button><button onClick={() => setSelectedRegion("Hidden closure / Centre back")}>Hidden closure</button></div>}
          {key === "versions" && <div className="collaboration-scene"><div className="collab-header"><span>COLLABORATION / REPOSITORY</span><b>One garment. Many decisions.</b></div><div className="collab-repository"><div className="collab-branch mainline"><b>MAINLINE</b><small>v1.4.0 · current · 2 open comments</small></div><div className="collab-branch creative-branch"><b>CREATIVE BRANCH</b><small>v1.5.0 · 3 changes · 2 open comments</small></div><div className="collab-branch production-branch"><b>PRODUCTION BRANCH</b><small>v1.3.1 · 1 requested change</small></div><div className="collab-version-card creative-card"><Garment mode="mini" material="matte" /><span>EXPERIMENTAL</span><small>sculptural silhouette</small></div><div className="collab-garment"><Garment mode="studio" material="silver" /></div><div className="collab-version-card production-card"><Garment mode="mini" material="silver" /><span>TECHNICAL</span><small>production ready</small></div><div className="collab-region-note shoulder-note"><i />Preserve shoulder volume.</div><div className="collab-region-note seam-note"><i />Check seam ease.</div><div className="collab-review">REVIEW / APPROVAL <b>Merge candidate A</b><small>All checks passed · material locked</small></div><div className="collab-merge-card"><Garment mode="mini" material="silver" /><b>MERGE CANDIDATE A</b><small>Approved for sampling · merged from 2 branches</small></div><div className="collab-merge-arrow">↓</div></div><div className="collab-versions"><span>CREATE</span><span className="active">COMPARE VERSIONS</span><span>COMMENT</span><span>REVIEW</span><span>APPROVE</span><span>MERGE</span><span>ROLLBACK</span></div></div>}
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
          {key === "conversation" && <div className="conversation-atlas"><div className="atlas-core"><Sparkles size={19} /><b>ASK<br />ARTIFEX</b></div>{["INTENT","FIT","PATTERN","MATERIAL","COST","PRODUCTION","DOCS","EVIDENCE"].map((item, i) => <span style={{ "--atlas-index": i } as React.CSSProperties} key={item}>{item}</span>)}</div>}
          {key === "autonomy" && <><div className="autonomy-log"><b>{autonomy.toUpperCase()} MODE</b>{["Fit issue detected","Alternatives generated","Policy checked","Pattern updated","Simulation rerun","Documentation updated","Evidence recorded"].map((item, i) => <span style={{ animationDelay: `${i * .13}s` }} key={item}><Check size={11} /> {item}</span>)}</div>{evidenceOpen && <div className="evidence-drawer"><span>WHY DID ARTIFEX CHANGE THIS?</span><b>Excess back-waist ease</b><small>Evidence / Fit simulation #2841<br />Rule / Ease tolerance exceeded<br />Action / 14mm redistribution<br />Creative impact / 0.7%<br />Fit improvement / +8.3%<br />Confidence / HIGH</small></div>}</>}
          {key === "evidence" && <div className="evidence-ledger"><span>ISSUE<br /><b>Back-waist ease</b></span><span>RULE<br /><b>Ease tolerance</b></span><span>ACTION<br /><b>14mm redistribution</b></span><span>IMPACT<br /><b>Fit +8.3%</b></span><span>CONFIDENCE<br /><b>HIGH</b></span><i>TRACEABLE / ATTRIBUTABLE / REVERSIBLE</i></div>}
          {key === "community" && <div className="community-scene"><div className="community-label"><span>COMMUNITY / ECOSYSTEM</span><b>Share structured fashion work.</b><small>Discover projects, fork garments, collaborate with specialists, and grow from one evolving product model.</small></div><div className="community-ecosystem"><div className="community-project-card project-vest"><i />DRAPED VEST<small>by Mara Bell</small></div><div className="community-project-card project-top"><i />SCULPTED TOP<small>by Priya N.</small></div><div className="community-project-card project-pant"><i />UTILITY PANT<small>by Studio KRN</small></div><div className="community-project-card project-coat"><i />ASYMMETRIC COAT<small>by Rene CAD</small></div><div className="community-creator creator-discover">◉<b>DISCOVER</b><small>New projects<br />& creators</small></div><div className="featured-project"><span>FEATURED PROJECT</span><Garment mode="mini" material="matte" /><b>MODULAR SHELL JACKET</b><small>by Alex Chen · technical modular · recyclable</small></div><div className="community-creator creator-share">◇<b>SHARE</b><small>Publish your<br />structured work</small></div><div className="community-creator creator-fork">⌘<b>FORK</b><small>Build new<br />variations</small></div><div className="community-creator creator-remix">△<b>REMIX</b><small>Explore<br />new ideas</small></div><div className="community-creator creator-collaborate">◉<b>COLLABORATE</b><small>Work with<br />specialists</small></div><div className="community-creator creator-hire">♧<b>HIRE</b><small>Find makers<br />& factories</small></div><div className="creator-lineage">CREATOR ATTRIBUTION <b>Alex Chen · original project</b><small>Forks preserve credit, history, and editable garment intelligence.</small></div></div></div>}
          {key === "ending" && <div className="ending-convergence"><span>CREATIVE</span><span>GEOMETRY</span><span>FIT</span><span>MATERIAL</span><span>PRODUCTION</span><span>EVIDENCE</span><span>KNOWLEDGE</span><b>ONE<br />GARMENT</b></div>}
          {copilotAction === "creative" && key === "creative" && <div className="copilot-alt-fan"><span>A</span><span className="active">B</span><span>C</span></div>}
          {copilotAction === "construction" && key === "construction" && <div className="operation-result"><span>CURRENT<b>18</b></span><i>→</i><span>ALTERNATIVE<b>15</b></span><small>outer silhouette retained</small></div>}
        </div>

        <aside className="action-panel">
          <span className="panel-label">DATA / ACTION</span>
          {key === "investor-idea" && <><h3>Creative intent</h3><p>Sketch / mood / silhouette / drape become the starting state of one connected garment project.</p><div className="investor-panel-tags"><span>Sketch</span><span>Reference</span><span>Direction</span></div><button className="action-primary" onClick={() => go(1)}>See the connected garment <ArrowRight size={14} /></button></>}
          {key === "investor-graph" && <><h3>Today ↔ Artifex</h3><p>{graphMode === "today" ? "Today, the product is scattered across files, tools, and conversations." : "Artifex connects these decisions around one garment/product model."}</p><div className="choice-row"><button className={graphMode === "today" ? "selected" : ""} onClick={() => setGraphMode("today")}>Today</button><button className={graphMode === "artifex" ? "selected" : ""} onClick={() => setGraphMode("artifex")}>Artifex</button></div><button className="action-primary" onClick={() => setGraphMode("artifex")}>Trace material dependency <ArrowRight size={14} /></button></>}
          {key === "investor-creative" && <><h3>Creative interpretation</h3><p>Fashion cues are retained while they gain form, garment regions, and technical meaning.</p><div className="investor-panel-tags"><span>Asymmetry</span><span>Waist</span><span>Drape</span></div><button className="action-primary" onClick={() => go(3)}>Solve fit + pattern <ArrowRight size={14} /></button></>}
          {key === "investor-engineering" && <><h3>Engineering, made visible</h3><p>Fit detection, X-ray garment anatomy, and pattern alternatives show the trade-off before a decision is made.</p><div className="choice-row"><button className={engineeringView === "fit" ? "selected" : ""} onClick={() => setEngineeringView("fit")}>Fit</button><button className={engineeringView === "xray" ? "selected" : ""} onClick={() => setEngineeringView("xray")}>X-ray</button><button className={engineeringView === "alternatives" ? "selected" : ""} onClick={() => setEngineeringView("alternatives")}>Options</button></div><button className="action-primary" onClick={() => setEngineeringView("alternatives")}>Explore three outcomes <ArrowRight size={14} /></button></>}
          {key === "investor-materials" && <><h3>Textile behaviour</h3><p>{material === "matte" ? "Wool crepe adds structure, changing the product state downstream." : "Silk-viscose holds a softer drape and different pattern assumptions."}</p><button className="action-primary" onClick={() => setMaterial(material === "silver" ? "matte" : "silver")}>Compare fabric reality <ArrowRight size={14} /></button></>}
          {key === "investor-production" && <><h3>Production intelligence</h3><p>Construction, optimisation, supply, costing, BOM, and documentation are outputs of the same product state.</p><div className="investor-panel-tags"><span>{productionOptimised ? "88.4% utilisation" : "72.8% utilisation"}</span><span>{costPath ? "$113.90 route" : "$120.28 landed"}</span></div><button className="action-primary" onClick={() => { setProductionOptimised(true); setDocumentsReady(true); setCostPath("03"); }}>Optimise + refresh outputs <ArrowRight size={14} /></button></>}
          {key === "investor-collection" && <><h3>Collection Mission Control</h3><p>Scale from garment-level product truth to collection risk, readiness, and commercial attention.</p><button className="action-primary" onClick={() => setMissionFiltered(true)}>{missionFiltered ? "Risk filter applied" : "Reveal at-risk looks"} <ArrowRight size={14} /></button></>}
          {key === "investor-recap" && <><h3>Artifex value</h3><p>One product model carries the creative intention through the decisions needed to make and improve it.</p><button className="action-primary" onClick={onJoin}>Join Artifex <ArrowUpRight size={14} /></button></>}
          {key === "creative" && <><h3>Creative intent</h3><p>Sculptural<br />Asymmetrical<br />Controlled drape<br />Soft structure</p><button className="action-primary" onClick={() => go(1)}>Interpret design <ArrowRight size={14} /></button></>}
          {key === "understanding" && <><h3>Garment reading</h3><p>Click a callout to see how intent connects to geometry and material behaviour.</p><button className="action-primary" onClick={() => go(2)}>Continue <ArrowRight size={14} /></button></>}
          {key === "versions" && <><h3>Repository status</h3><p>MAINLINE <b>v1.4.0</b><br />Creative branch <b>v1.5.0</b><br />Production branch <b>v1.3.1</b></p><div className="repo-status"><span>● 2 open comments</span><span>○ approval gate</span><span>● merge candidate ready</span></div><button className="action-primary">Review merge candidate <ArrowRight size={14} /></button><div className="recent-comments"><span className="recent-comments-label">RECENT COMMENTS</span><article><b>Jordan Lee <small>Creative Director · 2h ago</small></b><p>“Preserve shoulder volume.”<br /><em>Creative branch / shoulder region</em></p></article><article><b>Maya Kim <small>Technical Designer · 5h ago</small></b><p>“Check seam ease at underarm.”<br /><em>Production branch / seam region</em></p></article><article><b>Devon Tran <small>Production Lead · 1d ago</small></b><p>“Approved for sampling. Material locked.”<br /><em>Mainline / release gate</em></p></article></div></>}
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
          {key === "knowledge" && <><h3>Institutional knowledge</h3><p>Construction / material requirements / manufacturing constraints / historic decisions / fit / QC</p><button className="action-primary" onClick={() => go(21)}>Reveal conversation</button></>}
          {key === "conversation" && <><h3>One contextual Copilot</h3><p>Ask in the language of creative intent. Artifex reasons across the connected product state.</p><button className="action-primary" onClick={() => go(22)}>See bounded autonomy</button></>}
          {key === "autonomy" && <><h3>Copilot ≠ Autonomy</h3><div className="intelligence-distinction"><span><b>COPILOT</b><small>Human asks → Artifex acts</small></span><span><b>AUTONOMY</b><small>Artifex detects → policy → acts</small></span></div><div className="choice-row">{["Observe","Suggest","Execute"].map((item) => <button className={autonomy === item ? "selected" : ""} onClick={() => setAutonomy(item)} key={item}>{item}</button>)}</div><p>Every proposed or executed change is tied to evidence, rules, impact, and confidence.</p><button className="action-primary" onClick={() => setEvidenceOpen(true)}>View evidence</button></>}
          {key === "evidence" && <><h3>Decision receipt</h3><p>Issue, rule, action, impact, confidence, actor, and version are linked to the exact product state.</p><button className="action-primary" onClick={() => go(24)}>Explore lineage</button></>}
          {key === "community" && <><span className="panel-label">PROJECT / COMMUNITY</span><h3>Community scene</h3><p>A shared future for structured fashion.</p><div className="community-project-preview"><div className="preview-garment"><Garment mode="mini" material="matte" /></div><div><b>Modular Shell Jacket</b><small>by Alex Chen <i>●</i></small></div></div><div className="community-meta"><span>Garment type <b>Outerwear</b></span><span>Materials <b>Recycled nylon, bio ripstop</b></span><span>Status <b><i>●</i> Open source</b></span><span>Availability <b>Fork, Collaborate, Hire</b></span></div><div className="community-actions"><button>Fork garment <ArrowRight size={13} /></button><button>Request collaboration <ArrowRight size={13} /></button><button>Hire maker / factory <ArrowRight size={13} /></button><button>Save to collection <ArrowRight size={13} /></button></div><div className="community-metrics"><b>12<small>forks</small></b><b>4<small>collaborators</small></b><b>3<small>material matches</small></b><b>2<small>factories interested</small></b></div><button className="action-primary" onClick={() => go(25)}>Continue to ending <ArrowRight size={14} /></button></>}
          {key === "ending" && <><h3>Integrated product truth</h3><p>One evolving garment project—from creative intent to the outcome the user chooses.</p><button className="action-primary" onClick={onJoin}>Join Artifex</button></>}
          <button className="next-control" onClick={() => active === activeChapters.length - 1 ? onJoin() : go(active + 1)}>{active === activeChapters.length - 1 ? "Finish journey" : "Continue"}<ArrowUpRight size={16} /></button>
        </aside>
      </section>
      <PersistentCopilot chapterKey={key} role={copilotRole} selectedContext={selectedRegion} onRole={setCopilotRole} onExecute={executeCopilot} />
      <section className="immersive-timeline"><div className="timeline-scroller">{activeChapters.map((item, index) => <button key={item.key} className={index === active ? "active" : ""} onClick={() => go(index)}><span>{String(index + 1).padStart(2,"0")}</span><b>{item.key}</b></button>)}</div><div className="journey-footnote"><Sparkles size={16} /><span>Full 26-state product simulation. Scroll or select a chapter to move through the connected garment.</span></div></section>
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

import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Shared Artifex UI primitives (Phase 2). Each component maps to a visual
 * pattern that recurs across the 27 reference screens — see
 * /references/screens and REFERENCE_MAP.md. These own only the shared
 * *frame* (borders, spacing, type, lime accent rules); screen-specific
 * content and behaviour is wired up by the phases that build each screen.
 */

// ---------------------------------------------------------------- Panel

export function ArtifexPanel({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`art-panel ${className}`.trim()}>
      {label && <div className="art-meta art-panel-label">{label}</div>}
      {children}
    </div>
  );
}

// ---------------------------------------------------------------- Section

export function ArtifexSection({
  eyebrow,
  title,
  body,
  tagline,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  tagline?: string;
  children?: ReactNode;
}) {
  return (
    <div className="art-section">
      {eyebrow && <span className="art-meta">{eyebrow}</span>}
      <h2 className="art-display">{title}</h2>
      {body && <div className="art-body">{body}</div>}
      {children}
      {tagline && <p className="art-tagline">{tagline}</p>}
    </div>
  );
}

// ---------------------------------------------------------------- Button

type ButtonVariant = "primary" | "secondary" | "ghost" | "technical";

export function ArtifexButton({
  variant = "secondary",
  className = "",
  children,
  ...rest
}: {
  variant?: ButtonVariant;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`art-button art-button--${variant} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------- Icon button

export function ArtifexIconButton({
  icon,
  plain = false,
  className = "",
  ...rest
}: {
  icon: ReactNode;
  plain?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`art-icon-button ${plain ? "art-icon-button--plain" : ""} ${className}`.trim()}
      {...rest}
    >
      {icon}
    </button>
  );
}

// ---------------------------------------------------------------- Label / meta

export function ArtifexLabel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`art-label ${className}`.trim()}>{children}</span>;
}

export function ArtifexMeta({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`art-meta ${className}`.trim()}>{children}</span>;
}

// ---------------------------------------------------------------- Badge

export function ArtifexBadge({
  children,
  active = false,
  dot = true,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span className={`art-badge ${active ? "art-badge--lime" : ""} ${className}`.trim()}>
      {dot && <i className="art-badge-dot" />}
      {children}
    </span>
  );
}

// ---------------------------------------------------------------- Status

export function ArtifexStatus({
  children,
  tone = "positive",
  className = "",
}: {
  children: ReactNode;
  tone?: "positive" | "neutral";
  className?: string;
}) {
  return <span className={`art-status art-status--${tone} ${className}`.trim()}>{children}</span>;
}

// ---------------------------------------------------------------- Divider

export function ArtifexDivider({ vertical = false }: { vertical?: boolean }) {
  return vertical ? <span className="art-divider--vertical" /> : <hr className="art-divider" />;
}

// ---------------------------------------------------------------- Tab (segmented list)

export interface ArtifexTabItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
}

export function ArtifexTab({
  icon,
  active = false,
  className = "",
  children,
  ...rest
}: {
  icon?: ReactNode;
  active?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`art-tab ${active ? "is-active" : ""} ${className}`.trim()}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}

export function ArtifexTabGroup({ children }: { children: ReactNode }) {
  return <div className="art-tab-group">{children}</div>;
}

// ---------------------------------------------------------------- Image frame / thumbnail

export function ArtifexImageFrame({
  children,
  active = false,
  className = "",
}: {
  children: ReactNode;
  active?: boolean;
  className?: string;
}) {
  return <div className={`art-image-frame ${active ? "is-active" : ""} ${className}`.trim()}>{children}</div>;
}

export function ArtifexThumbnail({
  caption,
  active = false,
  children,
}: {
  caption: string;
  active?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="art-thumbnail">
      <ArtifexImageFrame active={active} className="art-thumbnail-frame">
        {children}
      </ArtifexImageFrame>
      <span className="art-label art-thumbnail-caption">{caption}</span>
    </div>
  );
}

// ---------------------------------------------------------------- Control group

export function ArtifexControlGroup({ children }: { children: ReactNode }) {
  return <div className="art-control-group">{children}</div>;
}

// ---------------------------------------------------------------- Metric (meter bar)

export function ArtifexMetric({
  label,
  value,
  percent,
  lowLabel,
  highLabel,
}: {
  label: string;
  value: ReactNode;
  percent: number;
  lowLabel?: string;
  highLabel?: string;
}) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="art-metric">
      <div className="art-metric-row">
        <span className="art-label">{label}</span>
        <span className="art-metric-value">{value}</span>
      </div>
      {(lowLabel || highLabel) && (
        <div className="art-metric-ends">
          <span className="art-meta">{lowLabel}</span>
          <span className="art-meta">{highLabel}</span>
        </div>
      )}
      <div className="art-metric-track">
        <div className="art-metric-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- Annotation (numbered callout)

export function ArtifexAnnotation({
  index,
  title,
  subtitle,
}: {
  index: string | number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="art-annotation">
      <span className="art-section-title">
        <span className="art-annotation-index">{index}</span> {title}
      </span>
      {subtitle && <span className="art-meta">{subtitle}</span>}
    </div>
  );
}

// ---------------------------------------------------------------- Callout (compact dot marker)

export function ArtifexCallout({ children }: { children: ReactNode }) {
  return (
    <span className="art-callout">
      <i className="art-callout-dot" />
      <span className="art-label">{children}</span>
    </span>
  );
}

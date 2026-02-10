export default function EmptyState({
  title = "No results",
  description = "Try adjusting your search or filters.",
  ctaLabel,
  onCta,
}) {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>{description}</p>
      {ctaLabel && onCta && (
        <button className="btn btn--primary" onClick={onCta}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

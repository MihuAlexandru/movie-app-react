export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="error-state" role="alert">
      <h2>Error</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn--primary" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

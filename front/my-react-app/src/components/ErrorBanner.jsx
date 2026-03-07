function ErrorBanner({ error, onClear }) {
  if (!error) return null;
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <span className="error-text">{error}</span>
      <button className="btn btn-ghost" onClick={onClear}>
        Dismiss
      </button>
    </div>
  );
}

export default ErrorBanner;

function ErrorBanner({ error, onClear }) {
  if (!error) return null;
  return (
    <div className="error-banner">
      Error: {error}
      <button className="btn btn-ghost" onClick={onClear} style={{ marginLeft: 10 }}>Clear</button>
    </div>
  );
}

export default ErrorBanner;

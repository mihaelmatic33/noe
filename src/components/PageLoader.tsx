export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Učitavanje stranice">
      <div className="page-loader__candle">
        <span className="page-loader__wick" />
        <span className="page-loader__flame" />
      </div>
      <span className="page-loader__label">NOÉ / trenutak strpljenja</span>
    </div>
  )
}
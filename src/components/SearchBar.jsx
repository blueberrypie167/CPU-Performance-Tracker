export function SearchBar({ query, onChange }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="text"
        value={query}
        onChange={e => onChange(e.target.value)}
        placeholder="Search CPU... (e.g. 5600X, i5-14600)"
        style={{
          width: '100%',
          padding: '10px 14px',
          background: '#1e2130',
          border: '1px solid #2d3148',
          borderRadius: 6,
          color: '#e2e8f0',
          fontSize: 15,
          outline: 'none',
        }}
        autoFocus
      />
    </div>
  )
}
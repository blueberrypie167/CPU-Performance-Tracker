import { useState } from 'react'

export function ResultCard({ cpu, onAdd }) {
  const [price, setPrice] = useState('')
  const [added, setAdded] = useState(false)

  function handleAdd() {
    const p = parseFloat(price)
    if (!p || p <= 0) return
    onAdd(cpu, price)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500) // reset "Added!" after 1.5s
  }

  return (
    <div style={{
      background: '#1e2130',
      border: '1px solid #2d3148',
      borderRadius: 6,
      padding: '10px 14px',
      marginBottom: 8,
    }}>
      {/* CPU name */}
      <div style={{ fontWeight: 600, marginBottom: 6, color: '#a5b4fc' }}>
        {cpu.name}
      </div>

      {/* Score row */}
      <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8', marginBottom: 8 }}>
        <span>Single: <strong style={{ color: '#e2e8f0' }}>{cpu.singleCore}</strong></span>
        <span>Multi: <strong style={{ color: '#e2e8f0' }}>{cpu.multiCore ?? '—'}</strong></span>
        <span>{cpu.cores}c / {cpu.ghz} GHz</span>
      </div>

      {/* Add to compare row */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
  <input
    type="number"
    value={price}
    onChange={e => setPrice(e.target.value)}
    placeholder="Price"
    style={{
      flex: 1,
      minWidth: 80,   // ← prevents input from collapsing to nothing
      padding: '6px 10px',
      background: '#0f1117',
      border: '1px solid #2d3148',
      borderRadius: 4,
      color: '#e2e8f0',
      fontSize: 13,
    }}
  />
  <button
    onClick={handleAdd}
    style={{
      padding: '6px 14px',
      background: added ? '#22543d' : '#3730a3',
      border: 'none',
      borderRadius: 4,
      color: '#e2e8f0',
      cursor: 'pointer',
      fontSize: 13,
      transition: 'background 0.2s',
    }}
  >
    {added ? 'Added ✓' : 'Add'}
  </button>
</div>
    </div>
  )
}
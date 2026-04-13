export function CompareList({ list, onRemove, onClear }) {
  if (list.length === 0) return null  // render nothing if list is empty

  // Sort by single-core score per unit of price — best value first
  const sorted = [...list].sort((a, b) => {
    const aRatio = a.singleCore 
    const bRatio = b.singleCore 
    return bRatio - aRatio  // descending
  })

  const best = sorted[0]  // highest ratio = best value

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
      }}>
        <span style={{ fontWeight: 600, color: '#94a3b8', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
          Comparing {list.length} CPU{list.length > 1 ? 's' : ''}
        </span>
        <button
          onClick={onClear}
          style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: 12 }}
        >
          Clear all
        </button>
      </div>

      {sorted.map(cpu => {
        const ratio = cpu.singleCore
        const isBest = cpu.name === best.name

        return (
          <div
            key={cpu.name}
            style={{
              background: isBest ? '#1a2e1a' : '#1e2130',
              border: `1px solid ${isBest ? '#2d6a2d' : '#2d3148'}`,
              borderRadius: 6,
              padding: '10px 14px',
              marginBottom: 8,
              position: 'relative',
            }}
          >
            {isBest && list.length > 1 && (
              <div style={{
                position: 'absolute', top: 8, right: 10,
                fontSize: 10, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase'
              }}>
                Best Performance
              </div>
            )}

            <div style={{ fontWeight: 600, color: '#a5b4fc', marginBottom: 4, paddingRight: 70 }}>
              {cpu.name}
            </div>

            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#94a3b8' }}>
              <span>Single: <strong style={{ color: '#e2e8f0' }}>{cpu.singleCore}</strong></span>
              <span>Multi: <strong style={{ color: '#e2e8f0' }}>{cpu.multiCore ?? '—'}</strong></span>
              <span>Cores: <strong style={{ color: '#fbbf24' }}>{cpu.cores}</strong></span>
              <span>Price: <strong style={{ color: '#e2e8f0' }}>{cpu.price}</strong></span>
            </div>

            <button
              onClick={() => onRemove(cpu.name)}
              style={{
                position: 'absolute', bottom: 8, right: 10,
                background: 'none', border: 'none', color: '#475569',
                cursor: 'pointer', fontSize: 11
              }}
            >
              remove
            </button>
          </div>
        )
      })}
    </div>
  )
}
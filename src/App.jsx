import { useState, useEffect } from 'react'
import { useCpuSearch } from './hooks/useCpuSearch'
import { useCompareList } from './hooks/useCompareList'
import { SearchBar } from './components/SearchBar'
import { ResultCard } from './components/ResultCard'
import { CompareList } from './components/CompareList'

// Simple hook that tells you if the screen is narrow
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return isMobile
}

export default function App() {
  const { query, setQuery, results } = useCpuSearch()
  const { list, addCpu, removeCpu, clearList } = useCompareList()
  const isMobile = useIsMobile()
  const [showCompare, setShowCompare] = useState(false)

  return (
    <div style={{ padding: '16px 20px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: '#6366f1', letterSpacing: 0.5 }}>
          CPU TRACKER
        </h1>

        {/* Compare button — only shown on mobile */}
        {isMobile && (
          <button
            onClick={() => setShowCompare(prev => !prev)}
            style={{
              background: list.length > 0 ? '#3730a3' : '#1e2130',
              border: '1px solid #2d3148',
              borderRadius: 6,
              color: '#e2e8f0',
              padding: '6px 12px',
              fontSize: 13,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Compare
            {list.length > 0 && (
              <span style={{
                background: '#6366f1',
                borderRadius: 10,
                padding: '1px 7px',
                fontSize: 11,
                fontWeight: 700,
              }}>
                {list.length}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Mobile: compare panel slides in above search when open */}
      {isMobile && showCompare && (
        <div style={{ marginBottom: 16 }}>
          <CompareList list={list} onRemove={removeCpu} onClear={clearList} />
        </div>
      )}

      {/* Main layout */}
      <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
      }}>

        {/* LEFT — search + results, always visible */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <SearchBar query={query} onChange={setQuery} />

          {query.length >= 2 && results.length === 0 && (
            <div style={{ color: '#475569', fontSize: 13, padding: '12px 0' }}>
              No CPUs found for "{query}"
            </div>
          )}

          {results.map(cpu => (
            <ResultCard key={cpu.name} cpu={cpu} onAdd={addCpu} />
          ))}
        </div>

        {/* RIGHT — compare list, desktop only */}
        {!isMobile && (
          <div style={{
            width: 320,
            flexShrink: 0,
            position: 'sticky',
            top: 16,
            alignSelf: 'flex-start',
          }}>
            <CompareList list={list} onRemove={removeCpu} onClear={clearList} />
          </div>
        )}

      </div>
    </div>
  )
}
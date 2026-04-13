import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cpu-compare-list'

// Load from localStorage on startup, fall back to empty array
function loadList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function useCompareList() {
  const [list, setList] = useState(loadList)

  // Persist list changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }, [list])

  function addCpu(cpu, price) {
    const newPrice = parseFloat(price)

    setList(prev => {
      const existing = prev.find(item => item.name === cpu.name)

      if (existing) {
        // Replace only if cheaper
        if (newPrice < existing.price) {
          return prev.map(item =>
            item.name === cpu.name
              ? { ...item, ...cpu, price: newPrice }
              : item
          )
        }
        // Otherwise leave unchanged
        return prev
      }

      // Add new entry if not found
      const newItem = {
        name: cpu.name,
        singleCore: cpu.singleCore,
        multiCore: cpu.multiCore,
        cores: cpu.cores,
        ghz: cpu.ghz,
        price: newPrice,
      }
      return [...prev, newItem]
    })
  }

  function removeCpu(name) {
    setList(prev => prev.filter(item => item.name !== name))
  }

  function clearList() {
    setList([])
  }

  return { list, addCpu, removeCpu, clearList }
}

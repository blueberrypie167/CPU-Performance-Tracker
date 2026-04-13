import { useMemo, useState } from 'react'
import cpuData from '../data/cpus.json'

export function useCpuSearch() {
    const [query, setQuery] = useState('')

    const results = useMemo(() => {
        const searchTerm = query.trim()
        if (searchTerm.length < 2) return []

        // Split query into words and remove empty spaces
        const searchWords = searchTerm.split(' ').filter(Boolean)

        // Step 1: Strict Word Boundary Filtering
        let filteredResults = cpuData.filter(cpu => {
            return searchWords.every(word => {
                // \b is a "word boundary" in Regex.
                // It ensures that searching "5" matches "Ryzen 5", 
                // but strictly ignores the "5" inside "5900X" or "7500F"
                const regex = new RegExp(`\\b${word}`, 'i')
                return regex.test(cpu.name)
            })
        })

        // Custom Sort Logic
        return filteredResults.sort((a, b) => {
            const nameA = a.name.toLowerCase()
            const nameB = b.name.toLowerCase()
            const term = searchWords[0].toLowerCase()

            // Priority 1: If the CPU name starts EXACTLY with the search term
            const aStarts = nameA.startsWith(term)
            const bStarts = nameB.startsWith(term)
            if (aStarts && !bStarts) return -1
            if (!aStarts && bStarts) return 1

            // Priority 2: Shorter names first (exact model matches)
            return a.name.length - b.name.length
        }).slice(0, 20)
        
    }, [query])

    return { query, setQuery, results }
}



    
    
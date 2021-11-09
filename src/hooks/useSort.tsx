import { useState } from 'react'

const useSort = (defaultColumn: string, defaultDirection?: string) => {
  const [sort, setSort] = useState({
    column: defaultColumn,
    direction: defaultDirection || 'desc',
  })

  const handleSortChange = (column: string) => {
    const newSort = { ...sort }

    if (column === sort.column) {
      newSort.direction = newSort.direction === 'asc' ? 'desc' : 'asc'
    } else {
      newSort.column = column
      newSort.direction = 'asc'
    }

    setSort(newSort)
  }

  return { sort, handleSortChange }
}

export default useSort

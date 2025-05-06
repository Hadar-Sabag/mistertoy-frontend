import { useState, useEffect, useRef } from "react"
import { utilService } from "../services/util.service.js"

export function ToySort({ filterBy, onSetFilter }) {
    const [sortByToEdit, setSortByToEdit] = useState({
        sortBy: filterBy.sortBy || '',
        sortDir: filterBy.sortDir || 1
    })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedOnSetFilter.current({ ...filterBy, ...sortByToEdit })
    }, [sortByToEdit])

    function handleSortChange({ target }) {
        const { name, value } = target
        setSortByToEdit(prev => ({ ...prev, [name]: value }))
    }

    function toggleSortDir() {
        setSortByToEdit(prev => ({ ...prev, sortDir: +prev.sortDir * -1 }))
    }

    return (
        <section className="toy-sort">
            <h2>Sort Toys</h2>

            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" name="sortBy" value={sortByToEdit.sortBy} onChange={handleSortChange}>
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created At</option>
            </select>

            <button type="button" onClick={toggleSortDir}>
                {sortByToEdit.sortDir === 1 ? '⬆ Ascending' : '⬇ Descending'}
            </button>
        </section>
    )
}

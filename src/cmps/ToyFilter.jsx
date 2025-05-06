
import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const debouncedOnSetFilter = useRef(utilService.debounce(onSetFilter, 300))

    useEffect(() => {
        debouncedOnSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'number') value = +value
        if (field === 'inStock') {
            if (value === 'all') value = undefined
            else value = value === 'true'
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function handleLabelsChange(ev) {
        const options = ev.target.options
        const selectedLabels = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) selectedLabels.push(options[i].value)
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, labels: selectedLabels }))
    }


    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form>

                <label htmlFor="txt">Search by name:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search..."
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <select id="inStock" name="inStock" value={filterByToEdit.inStock ?? 'all'} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                </select>

                <label>Labels:</label>
                <div className="labels-checkboxes">
                    {labels.map(label => (
                        <label key={label}>
                            <input
                                type="checkbox"
                                value={label}
                                checked={filterByToEdit.labels.includes(label)}
                                onChange={({ target }) => {
                                    const updatedLabels = target.checked
                                        ? [...filterByToEdit.labels, target.value]
                                        : filterByToEdit.labels.filter(l => l !== target.value)

                                    setFilterByToEdit(prevFilter => ({
                                        ...prevFilter,
                                        labels: updatedLabels
                                    }))
                                }}
                            />
                            {label}
                        </label>
                    ))}
                </div>


            </form>

        </section>
    )
}
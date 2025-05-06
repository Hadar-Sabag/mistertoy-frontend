import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadToys, removeToy, saveToy, setFilterBy } from '../store/actions/toy.actions.js'


import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate } from 'react-router-dom'


export function ToyIndex() {

    const navigate = useNavigate()

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)


    useEffect(() => {
        loadToys()
            .catch(err => {
                console.log("err: ", err)
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log("err: ", err)
            showErrorMsg('Cannot remove toy')
        }
    }


    function onEditToy(toy) {
        navigate(`/toy/edit/${toy._id}`)
    }

    if (!toys && !toys.length) return <div>loading</div>
    return (
        <div>
            <h3>Toys App</h3>
            <main>
                <Link to="/toy/edit">Add Toy</Link>
                <section className='filter-sort-container'>
                    <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <ToySort filterBy={filterBy} onSetFilter={onSetFilter} />
                </section>
                {!!toys.length
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                    />
                    : <div>Loading...</div>
                }
                <hr />
            </main>
        </div>
    )
}


import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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
    const totalPages = useSelector(storeState => storeState.toyModule.totalPages)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)


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
    function onNextPage() {
        const newPageIdx = filterBy.pageIdx + 1
        if (newPageIdx >= totalPages) return
        setFilterBy({ ...filterBy, pageIdx: newPageIdx })
    }

    function onPrevPage() {
        const newPageIdx = filterBy.pageIdx - 1
        if (newPageIdx < 0) return
        setFilterBy({ ...filterBy, pageIdx: newPageIdx })
    }


    if (!toys && !toys.length) return <div>loading</div>
    return (
        <div>
            <h3>Toys App</h3>
            <main>
                {loggedInUser?.isAdmin && <Link to="/toy/edit">Add Toy</Link>}

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

                <section className="pagination">
                    <button onClick={onPrevPage} disabled={filterBy.pageIdx === 0}>Prev</button>
                    <span>Page {filterBy.pageIdx + 1} of {totalPages}</span>
                    <button onClick={onNextPage} disabled={filterBy.pageIdx + 1 >= totalPages}>Next</button>
                </section>


            </main>
        </div>
    )
}


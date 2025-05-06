
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

_createToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY).then(toys => {
        let filteredToys = [...toys]

        if (filterBy.txt) {
            const regex = new RegExp(filterBy.txt, 'i')
            filteredToys = filteredToys.filter(toy => regex.test(toy.name))
        }
        if (filterBy.inStock !== undefined) {
            filteredToys = filteredToys.filter(toy => toy.inStock === filterBy.inStock)
        }
        if (filterBy.labels?.length) {
            filteredToys = filteredToys.filter(toy =>
                filterBy.labels.every(label => toy.labels.includes(label))
            )
        }
        if (filterBy.sortBy) {
            const { sortBy, sortDir = 1 } = filterBy
            filteredToys.sort((a, b) => {
                if (typeof a[sortBy] === 'string') {
                    return a[sortBy].localeCompare(b[sortBy]) * sortDir
                } else {
                    return (a[sortBy] - b[sortBy]) * sortDir
                }
            })
        }
        return filteredToys
    })
}


function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy._id = utilService.makeId()
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
        imgUrl: '',
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        inStock: undefined,
        labels: [],
        sortBy: '',
        sortDir: 1
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            {
                _id: utilService.makeId(),
                name: 'Talking Doll',
                price: 99,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: Date.now(),
                inStock: true,
                imgUrl: 'https://i.imgur.com/ZjG0S47.png'
            },
            {
                _id: utilService.makeId(),
                name: 'Puzzle Box',
                price: 59,
                labels: ['Puzzle', 'Box game'],
                createdAt: Date.now(),
                inStock: false,
                imgUrl: 'https://i.imgur.com/omgaZkL.png'
            },
            {
                _id: utilService.makeId(),
                name: 'Outdoor Truck',
                price: 149,
                labels: ['On wheels', 'Outdoor'],
                createdAt: Date.now(),
                inStock: true,
                imgUrl: 'https://i.imgur.com/jZZl08e.png'
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}



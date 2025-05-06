import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    getEmptyCredentials
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })
        console.log('user FETCH:', user)
        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid login')
    } catch (err) {
        console.log('userService -> login failed:', err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const userToSend = { username, password, fullname, score: 10000 }
    try {
        const user = await httpService.post(BASE_URL + 'signup', userToSend)
        if (user) return _setLoggedinUser(user)
        else throw new Error('Invalid signup')
    } catch (err) {
        console.log('userService -> signup failed:', err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log('userService -> logout failed:', err)
        throw err
    }
}


// function updateScore(diff) {
//     if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
//     return httpService.put('user/', { diff })
//         .then(user => {
//             console.log('updateScore user:', user)
//             _setLoggedinUser(user)
//             return user.score
//         })
// }



function getById(userId) {
    return httpService.get('user/' + userId)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})




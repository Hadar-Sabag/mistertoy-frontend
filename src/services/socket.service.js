import { io } from 'socket.io-client'

export const socketService = {
    setup,
    on,
    off,
    emit
}

var socket

function setup() {
    socket = io('http://localhost:3031')

    socket.on('connect', () => {
        console.log('Connected to socket server')
    })
}

function on(eventName, cb) {
    socket.on(eventName, cb)
}

function off(eventName, cb = null) {
    if (!socket) return
    if (!cb) socket.removeAllListeners(eventName)
    else socket.off(eventName, cb)
}

function emit(eventName, data) {
    socket.emit(eventName, data)
}

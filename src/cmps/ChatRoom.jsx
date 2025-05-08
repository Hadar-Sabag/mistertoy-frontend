import { useState, useEffect } from 'react'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service'

export function ChatRoom({ toyId }) {
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])
    const [typingUser, setTypingUser] = useState(null)

    const user = userService.getLoggedinUser()

    useEffect(() => {
        socketService.setup()

        socketService.emit('chat-join', toyId)

        socketService.on('chat-msg', addMsg)
        socketService.on('user-typing', handleTyping)

        return () => {
            socketService.emit('chat-leave', toyId)
            socketService.off('chat-msg', addMsg)
            socketService.off('user-typing', handleTyping)
        }
    }, [toyId])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function handleTyping(username) {
        setTypingUser(username)
        setTimeout(() => setTypingUser(null), 2000)
    }

    function sendMsg(ev) {
        ev.preventDefault()
        if (!msg) return
        const chatMsg = {
            txt: msg,
            from: user.fullname || 'Guest',
            toyId
        }
        socketService.emit('chat-msg', chatMsg)
        setMsg('')
    }

    function onTyping() {
        socketService.emit('user-typing', { toyId, username: user.fullname })
    }

    return (
        <section className="chat-room">
            <ul>
                {msgs.map((m, idx) =>
                    <li key={idx} className={`msg ${m.from === user.fullname ? 'you' : 'bot'}`}>
                        <b>{m.from}:</b> {m.txt}
                    </li>
                )}
            </ul>
            {typingUser && <p>{typingUser} is typing...</p>}
            <form onSubmit={sendMsg}>
                <input
                    value={msg}
                    onChange={(ev) => setMsg(ev.target.value)}
                    onKeyDown={onTyping}
                    placeholder="Type your message"
                />
                <button>Send</button>
            </form>
        </section>
    )
}

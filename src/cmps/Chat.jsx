import { useState } from "react"

export function Chat() {
    const [msg, setMsg] = useState('')
    const [msgs, setMsgs] = useState([])

    function handleChange({ target }) {
        setMsg(target.value)
    }

    function onSend(ev) {
        ev.preventDefault()
        if (!msg.trim()) return

        const newMsg = { from: 'You', txt: msg }
        setMsgs(prev => [...prev, newMsg])
        setMsg('')

        setTimeout(() => {
            const botMsg = { from: 'Bot', txt: 'I heard you 👂' }
            setMsgs(prev => [...prev, botMsg])
        }, 1000)
    }

    return (
        <section className="chat">
            <div className="msg-list">
                {msgs.map((m, idx) => (
                    <div key={idx} className={`msg ${m.from === 'You' ? 'you' : 'bot'}`}>
                        <strong>{m.from}:</strong> {m.txt}
                    </div>
                ))}
            </div>

            <form onSubmit={onSend} className="chat-form">
                <input
                    type="text"
                    value={msg}
                    onChange={handleChange}
                    placeholder="Say something..."
                />
                <button>Send</button>
            </form>
        </section>
    )
}

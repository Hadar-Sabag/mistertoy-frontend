import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { toyService } from "../services/toy.service.js"
import { NicePopup } from "../cmps/NicePopup.jsx"
import { ChatRoom } from "../cmps/ChatRoom.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.log('Error loading toy:', err)
                navigate('/toy')
            })
    }, [toyId])

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h2>{toy.name}</h2>
            <img src={toy.imgUrl || ''} alt={toy.name} style={{ maxWidth: '200px' }} />
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? 'In stock ✅' : 'Out of stock ❌'}</p>

            <button onClick={() => navigate('/toy')}>← Back</button>

            <button onClick={() => setIsChatOpen(true)}>💬 Chat</button>

            {isChatOpen && (
                <NicePopup
                    heading="Customer Chat"
                    footing={<button onClick={() => setIsChatOpen(false)}>Close</button>}
                    onClose={() => setIsChatOpen(false)}
                >
                    <ChatRoom toyId={toy._id} />

                </NicePopup>
            )}
        </section>
    )
}

import { ToyPreview } from "./ToyPreview.jsx"
import { useNavigate } from "react-router-dom"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const navigate = useNavigate()
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="actions">
                        <button onClick={() => onRemoveToy(toy._id)}> Remove</button>
                        <button onClick={() => onEditToy(toy)}> Edit</button>
                        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
import { ToyPreview } from "./ToyPreview.jsx"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy, onEditToy }) {
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    return (
        <ul className="toy-list">
            {toys.map(toy => (
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <section className="actions">
                        {loggedInUser?.isAdmin && (
                            <>
                                <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                                <button onClick={() => onEditToy(toy)}>Edit</button>
                            </>
                        )}
                        <button onClick={() => navigate(`/toy/${toy._id}`)}>Details</button>
                    </section>
                </li>
            ))}
        </ul>
    )
}
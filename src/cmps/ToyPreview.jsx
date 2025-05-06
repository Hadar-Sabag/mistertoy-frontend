import { Link } from "react-router-dom";

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.name}</h4>
            {toy.imgUrl
                ? <img src={toy.imgUrl} alt={toy.name} style={{ width: '100px' }} />
                : <div style={{ width: '100px', height: '100px', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    No Image
                </div>
            }
            <p>Price: ${toy.price}</p>
            <p>Labels: {toy.labels.join(', ')}</p>
            <p>{toy.inStock ? 'In stock ✅' : 'Out of stock ❌'}</p>
        </article>
    )
}
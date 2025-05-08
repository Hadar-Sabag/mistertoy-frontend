import { useEffect } from "react"

export function NicePopup({ onClose, heading, footing, children }) {

    useEffect(() => {
        function onEscKey(ev) {
            if (ev.key === 'Escape') onClose()
        }
        document.body.addEventListener('keydown', onEscKey)

        return () => document.body.removeEventListener('keydown', onEscKey)
    }, [onClose])

    return (
        <section className="nice-popup">
            <div className="popup-content">
                <header>
                    <h2>{heading}</h2>
                    <button className="close-btn" onClick={onClose}>✖</button>
                </header>
                <main>{children}</main>
                {/* <footer>{footing}</footer> */}
            </div>
        </section>
    )
}

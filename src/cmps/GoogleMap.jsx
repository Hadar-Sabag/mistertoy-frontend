import { AdvancedMarker, APIProvider, InfoWindow, Map, Marker, Pin, useAdvancedMarkerRef, useMap } from "@vis.gl/react-google-maps"
import { useRef, useState } from "react"

const API_KEY = ''

export function GoogleMap() {
    const [coords, setCoords] = useState({
        lat: 32.0853,
        lng: 34.7818
    })
    const locations = [
        { lat: 31.9710, lng: 34.7894, name: 'ראשון לציון' },
        { lat: 31.9971, lng: 34.9519, name: 'שוהם' },
        { lat: 32.0853, lng: 34.7818, name: 'תל אביב' }
    ]
    
    const zoom = 11
    const [markerRef, marker] = useAdvancedMarkerRef();

    const map = useMap()

    function onMapClick(ev) {
        const newCoords = ev.detail.latLng
        setCoords(newCoords)
        ev.map.panTo(newCoords)
    }

    function onTelAviv(ev) {
        const startCoords = {
            lat: 32.0853,
            lng: 34.7818
        }
        map.panTo(startCoords)
        setCoords(startCoords)
    }
    function onShoham(ev) {
        const startCoords = {
            lat: 31.9971,
            lng: 34.9519
        }
        map.panTo(startCoords)
        setCoords(startCoords)
    }
    function onRishonLeZion(ev) {
        const startCoords = {
            lat: 31.9710,
            lng: 34.7894
        }
        map.panTo(startCoords)
        setCoords(startCoords)
    }

    const style = { width: '70%', height: '50vh', margin: 'auto' }
    return (
        <section style={style} className="google-map">
            {/* <APIProvider apiKey={API_KEY}> */}
            <Map
                defaultZoom={zoom}
                mapId='main-map'
                defaultCenter={coords}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                onClick={onMapClick}
            >
                {/* <Marker position={coords} /> */}
                {/* <InfoWindow anchor={marker}>
                        The content of the info window is here❗️
                    </InfoWindow> */}

                {/* <AdvancedMarker ref={markerRef} position={coords}>
                        <Pin background={'dodgerblue'} glyphColor={'blue'} borderColor={'black'} />
                    </AdvancedMarker> */}

                {locations.map((loc, idx) => (
                    <AdvancedMarker
                        key={idx}
                        position={{ lat: loc.lat, lng: loc.lng }}
                    >
                        <Pin background={'dodgerblue'} glyphColor={'blue'} borderColor={'black'} />
                    </AdvancedMarker>
                ))}

            </Map>
            {/* </APIProvider> */}


            <button onClick={onTelAviv}>Tel Aviv</button>
            <button onClick={onShoham}>Shoham</button>
            <button onClick={onRishonLeZion}>Rishon LeZion</button>
        </section>
    )


}

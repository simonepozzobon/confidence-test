import "./App.css";
import { useRef, useState, useEffect, useCallback } from "react";
import ErrorMessage from "./components/ErrorMessage";
import LoadingMessage from "./components/LoadingMessage";
import ScrollDownMessage from "./components/ScrollDownMessage";
import LocationCard from "./components/LocationCard";
import useFetchLocations from "./hooks/useFetchLocations";

function App() {
    const loader = useRef(null);
    const [limit, setLimit] = useState(3);
    const [start, setStart] = useState(0);
    const { loading, error, locations, hasMore } = useFetchLocations(
        start,
        limit
    );

    const handleObserver = useCallback((entries) => {
        if (entries[0].isIntersecting) {
            console.log("observer visibile", locations.length, start);
            if (hasMore) {
                setStart((prev) => {
                    console.log("prev", prev);
                    return locations.length + limit;
                });
            }
        }
    });

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-light-blue to-dark-blue">
                <header className="text-center pt-16">
                    <h1 className="text-4xl font-extrabold tracking-wider text-white/90 uppercase">
                        Locations
                    </h1>
                </header>
                <div className="max-w-3xl mx-auto py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 lg:px-0 lg:py-16">
                    <ul className="space-y-4">
                        {locations.map((location, i) => (
                            <LocationCard key={i} location={location} />
                        ))}
                    </ul>
                </div>

                {loading ? <LoadingMessage /> : <ScrollDownMessage />}
                {error && <ErrorMessage />}
            </div>
            <div ref={loader} className="h-1 bg-red-500" />
        </>
    );
}

export default App;

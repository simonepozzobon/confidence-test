import "./App.css";
import { useRef, useState, useCallback } from "react";
import ErrorMessage from "./components/ErrorMessage";
import LoadingMessage from "./components/LoadingMessage";
import ScrollDownMessage from "./components/ScrollDownMessage";
import LocationCard from "./components/LocationCard";
import useFetchLocations from "./hooks/useFetchLocations";

function App() {
    const [start, setStart] = useState(0);
    const [limit] = useState(3);
    const { loading, error, locations, hasMore } = useFetchLocations(
        start,
        limit
    );

    const observer = useRef();
    const lastLocationRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setStart((prev) => prev + limit);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, limit, hasMore]
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-light-blue to-dark-blue">
            <header className="text-center pt-16">
                <h1 className="text-4xl font-extrabold tracking-wider text-white/90 uppercase">
                    Locations
                </h1>
            </header>
            <div className="max-w-3xl mx-auto py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 lg:px-0 lg:py-16">
                <ul className="space-y-4">
                    {locations.map((location, i) => {
                        if (locations.length === i + 1) {
                            return (
                                <li ref={lastLocationRef} key={i}>
                                    <LocationCard location={location} />
                                </li>
                            );
                        } else {
                            return (
                                <li key={i}>
                                    <LocationCard location={location} />
                                </li>
                            );
                        }
                    })}
                </ul>
            </div>
            <div className="status-messages">
                {hasMore &&
                    (loading && !error ? (
                        <LoadingMessage />
                    ) : (
                        <ScrollDownMessage />
                    ))}
                {error && <ErrorMessage />}
            </div>
        </div>
    );
}

export default App;

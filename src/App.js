import "./App.css";
import response from "./Response";
// import { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
    BellIcon,
    DesktopComputerIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/outline";

// function useFetch(query, page) {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(false);
//     const [list, setList] = useState([]);

//     const sendQuery = useCallback(async () => {
//         try {
//             await setLoading(true);
//             await setError(false);
//             const res = await axios.get(
//                 "https://dev-api.confidence.org/v2/confidence/locations",
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Access-Control-Allow-Origin": "http://localhost:3000",
//                     },
//                     auth: {
//                         username: "amitphatak$r5labs.com",
//                     },
//                     // body: {
//                     //     start: 0,
//                     //     limit: 10,
//                     // },
//                 }
//             );
//             await setList((prev) => [...prev, ...res.data]);
//             setLoading(false);
//         } catch (err) {
//             setError(err);
//         }
//     }, [query, page]);

//     useEffect(() => {
//         sendQuery(query);
//     }, [query, sendQuery, page]);

//     return { loading, error, list };
// }

function LocationCard(props) {
    const { location } = props;

    let badge = (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-red-600 bg-red-50 text-red-600">
            Inactive
        </span>
    );

    if (location.active) {
        badge = (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-green-600/30 bg-green-50 text-green-600">
                Active
            </span>
        );
    }

    let subscriptionBadge;
    if (location.subscriptionActive) {
        subscriptionBadge = (
            <div className="flex px-4 py-4 shadow-inner rounded-bl-md bg-green-50 items-center justify-center">
                <BellIcon className="w-5 text-green-600" />
            </div>
        );
    }

    return (
        <li className="bg-white shadow-md overflow-hidden rounded-md border border-light-blue flex gap-4 lg:gap-6">
            <div className="flex flex-col items-center bg-white shadow-inner w-16 overflow-hidden">
                <div className="lg:hidden w-full">{subscriptionBadge}</div>
                <div class="flex-grow flex items-center gap-2 px-4 py-2 bg-orange-100 shadow-inner">
                    <UserIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofMyTasks}
                    </span>
                </div>
                <div class="flex-grow flex items-center gap-2 px-4 py-2 bg-blue-100 shadow-inner">
                    <UsersIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofTasks}
                    </span>
                </div>
                <div class="flex-grow flex items-center gap-2 px-4 py-2 bg-purple-100 shadow-inner">
                    <DesktopComputerIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofDevices}
                    </span>
                </div>
            </div>
            <div className="flex-grow py-4">
                <div className="block lg:hidden">{badge}</div>
                <div className="text-base">
                    <span className="text-gray-500 font-light">
                        {location.locationType}&nbsp;
                    </span>
                    {location.locationDetails && (
                        <span>/ {location.locationDetails}</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <h2 className="font-extrabold text-2xl text-gray-900 leading-8">
                        {location.locationName}
                    </h2>
                    <div className="hidden lg:block">{badge}</div>
                </div>
                <div className="text-gray-500 mt-1">
                    <span className="block lg:inline-block">
                        {location.address.addressLine1},&nbsp;
                    </span>
                    <span className="block lg:inline">
                        {location.address.city},&nbsp;
                    </span>
                    <span className="block lg:inline">
                        {location.address.zip}, {location.address.state}
                    </span>
                </div>
            </div>
            <div className="hidden lg:block">{subscriptionBadge}</div>
        </li>
    );
}

function App() {
    const { locations } = response;
    console.log(locations);
    // const [query, setQuery] = useState("");
    // const [page, setPage] = useState(1);
    // const { loading, error, list } = useFetch(query, page);
    // const loader = useRef(null);

    // const handleChange = (e) => {
    //     setQuery(e.target.value);
    // };

    // const handleObserver = useCallback((entries) => {
    //     const target = entries[0];
    //     if (target.isIntersecting) {
    //         setPage((prev) => prev + 1);
    //     }
    // }, []);

    // useEffect(() => {
    //     const option = {
    //         root: null,
    //         rootMargin: "20px",
    //         threshold: 0,
    //     };
    //     const observer = new IntersectionObserver(handleObserver, option);
    //     if (loader.current) observer.observe(loader.current);
    // }, [handleObserver]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-light-blue to-dark-blue">
            <header className="text-center py-16">
                <h1 className="text-4xl font-extrabold tracking-wider text-gray-900/90">
                    LOCATIONS
                </h1>
            </header>
            {/* <input type="text" value={query} onChange={handleChange} /> */}
            <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-0 pb-24">
                <ul className="space-y-4">
                    {locations.map((location) => (
                        <LocationCard
                            key={location.locationId}
                            location={location}
                        />
                    ))}
                </ul>
            </div>
            {/* {loading && <p>Loading...</p>}
            {error && <p>Error!</p>}
            <div ref={loader} /> */}
        </div>
    );
}

export default App;

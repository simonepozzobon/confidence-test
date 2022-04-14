import "./App.css";
import { useRef, useState, useEffect, useCallback } from "react";
import response from "./Response";
import axios from "axios";
import {
    ArrowDownIcon,
    BellIcon,
    DesktopComputerIcon,
    ExclamationIcon,
    LocationMarkerIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/outline";

function useFetch(query, page) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState([]);
    const [max, setMax] = useState(0);
    const limit = 3;
    const sendQuery = useCallback(async () => {
        try {
            console.log((page - 1) * limit);
            await setLoading(true);
            await setError(false);

            const data = JSON.stringify({ start: (page - 1) * limit, limit });
            const config = {
                method: "post",
                url: "/v2/confidence/locations",
                headers: {
                    Username: "amitphatak$r5labs.com",
                    "Content-Type": "application/json",
                },
                data: data,
            };
            const res = await axios(config);
            console.log("res.data=>", res.data);

            setMax(res.data.numberOfLocations);
            if (max >= list.length) {
                await setList((prev) => [...prev, ...res.data.locations]);
            }

            setLoading(false);
        } catch (err) {
            setError(err);
        }
    }, [query, page]);

    useEffect(() => {
        sendQuery(query);
    }, [query, sendQuery, page]);

    return { loading, error, list };
}

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
            <div className="flex px-4 py-4 shadow-inner rounded-bl-md bg-green-100 items-center justify-center">
                <BellIcon className="w-5 text-green-600" />
            </div>
        );
    }

    return (
        <li className="bg-white shadow-md overflow-hidden rounded-md border border-light-blue flex">
            <div className="flex flex-col items-center bg-white shadow-inner w-16 overflow-hidden">
                <div className="lg:hidden w-full">{subscriptionBadge}</div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-orange-100 shadow-inner">
                    <UserIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofMyTasks
                            ? location.numberofMyTasks
                            : 0}
                    </span>
                </div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-blue-100 shadow-inner">
                    <UsersIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofTasks ? location.numberofTasks : 0}
                    </span>
                </div>
                <div className="flex-grow flex items-center gap-2 px-4 py-2 bg-purple-100 shadow-inner">
                    <DesktopComputerIcon className="w-4 text-gray-600" />
                    <span className="text-gray-600">
                        {location.numberofDevices
                            ? location.numberofDevices
                            : 0}
                    </span>
                </div>
            </div>
            <div className="flex-grow py-4 border-l border-gray-100 px-4">
                <div className="block lg:hidden">{badge}</div>
                <div className="text-gray-500 font-light text-xs mt-1 lg:mt-0">
                    {location.locationUserRole}
                </div>
                <div className="text-base mt-1">
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
                    <LocationMarkerIcon className="w-4 text-gray-400 hidden lg:inline-block mr-1" />
                    <span className="block lg:inline-block">
                        {location.address.addressLine1},&nbsp;
                    </span>
                    <span className="block lg:inline-block">
                        {location.address.addressLine2},&nbsp;
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
    const loading = false;
    const error = false;
    const loader = null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-light-blue to-dark-blue">
            <header className="text-center pt-16">
                <h1 className="text-4xl font-extrabold tracking-wider text-white/90">
                    LOCATIONS
                </h1>
            </header>
            {/* <input type="text" value={query} onChange={handleChange} /> */}
            <div className="max-w-3xl mx-auto py-4 px-4 sm:py-6 sm:px-6 md:py-8 md:px-8 lg:px-0 lg:py-16">
                <ul className="space-y-4">
                    {locations.map((location, i) => (
                        <LocationCard key={i} location={location} />
                    ))}
                </ul>
            </div>

            {loading ? (
                <div className="text-white flex justify-center items-center pb-24">
                    <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="text-sm">Loading</span>
                </div>
            ) : (
                <div className="flex justify-center items-center pb-24">
                    <ArrowDownIcon className="w-4 text-white animate-bounce" />
                </div>
            )}

            {error && (
                <div className="flex justify-center items-center pb-24 relative">
                    <div className="inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-red-500 text-white shadow-xl">
                        <ExclamationIcon className="w-4 text-white" />
                        <span className="ml-2">Error Loading !</span>
                    </div>
                </div>
            )}

            <div ref={loader} />
        </div>
    );
}

export default App;

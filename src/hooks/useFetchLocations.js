import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchLocations(start, limit) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [locations, setLocations] = useState([]);
    const [numberOfLocations, setNumberOfLocations] = useState(100);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (numberOfLocations === locations.length) {
            setHasMore(false);
        }
    }, [numberOfLocations, locations]);

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: "POST",
            url: "/v2/confidence/locations",
            headers: {
                Username: "amitphatak$r5labs.com",
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                start: start,
                limit: limit,
            }),
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setNumberOfLocations(res.data.numberOfLocations);
                setLocations((prevLocations) => {
                    return [
                        ...new Set([...prevLocations, ...res.data.locations]),
                    ];
                });
                setLoading(false);
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                setError(true);
            });
        return () => cancel();
    }, [start, limit]);

    return { error, hasMore, loading, locations };
}

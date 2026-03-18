import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook for data-fetching with loading / error / data states.
 * @param {Function} apiCall  – function that returns a promise (e.g. () => getSemesters())
 * @param {Array}    deps     – dependency array to re-fetch on change
 */
export default function useApi(apiCall, deps = []) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await apiCall();
            setData(response.data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}

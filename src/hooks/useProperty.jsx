import React, { useEffect, useState } from 'react';

const useProperty = () => {
    const [property, setProperty] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/property')
        .then(res => res.json())
        .then(data => {
            setProperty(data)
            setLoading(false)
        })
    }, [])

    return [property, loading]
};

export default useProperty;
import { useState, useEffect } from 'react';

export const useWindowSize = () => {
    const isMobile = typeof window === 'object';

    const getSize = () => {
        return {
            width: isMobile ? window.innerWidth : null
        };
    };

    const [ windowSize, setWindowSize ] = useState(getSize);

    useEffect(() => {
        if(!isMobile) {
            return false;
        };

        const handleResize = () => {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
};
import { useState, useEffect } from 'react';

const useDarkMode = (): boolean => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }, []);

    return isDarkMode;
};

export default useDarkMode;

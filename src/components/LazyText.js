import { useEffect, useState, useRef } from "react";

const LazyText = ({ text, setDisableInput, focusInput, color }) => {
    const [loadedText, setLoadedText] = useState('');
    const savedText = useRef();

    useEffect(() => {
        savedText.current = loadedText;
    }, [loadedText]);

    useEffect(() => {
        setDisableInput(true);
        let interval = setInterval(() => {
            setLoadedText(text.slice(0, savedText.current.length + 1))
            if (text.length <= savedText.current.length) {
                console.log('true');
                setDisableInput(false);
                clearInterval(interval);
                focusInput();
            }
        }, 20)

        return () => clearInterval(interval);
    }, [])

    return (
        <p className="lazyText" style={{ color }}>
            {loadedText}
        </p>
    );
}

export default LazyText;
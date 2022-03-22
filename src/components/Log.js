import LazyText from "./LazyText";

const Log = ({ log, setDisableInput, focusInput }) => {
    return (
        log.lazy ?
            <LazyText
                text={log.text}
                setDisableInput={setDisableInput}
                focusInput={focusInput}
                color={log.color}
            /> :
            <p style={{ color: log.color }}>
                {
                    log.command ? log.text.split('').map((l, key) => <span key={key}>{l}</span>) : log.text
                }
            </p>

    );
}

export default Log;
import { useState, useRef, useEffect } from 'react';
import Line from './Line';
import Input from './Input';
import Log from './Log';
import LazyText from './LazyText';
import intro from '../data/intro';
import { parser } from '../helpers/utils';
//styles
import '../styles/Terminal.css';

const Terminal = () => {
    const [logs, setLogs] = useState([intro]);
    const [commands, setCommands] = useState([]);
    const [disableInput, setDisableInput] = useState(false);
    const inputRef = useRef(null);
    const terminalRef = useRef();

    // Scroll down to bottom
    useEffect(() => {
        terminalRef.current.scrollIntoView();
    }, [logs])

    const focusInput = () => !disableInput && inputRef.current.focus();


    const addLog = (input) => {
        setLogs((prev) => [...prev, { text: input, command: true, lazy: false }]);
        setCommands((prev) => [input, ...prev])
        parser(input, setLogs);
    }


    return (
        // <div className="terminal" >
        <div className="terminal" onClick={focusInput} >
            {
                logs.map((log, key) => (
                    <Line key={key} command={log.command}>
                        <Log log={log} setDisableInput={setDisableInput} focusInput={focusInput} />
                    </Line>
                ))
            }

            {
                disableInput ? null :
                    <Line command>
                        <Input
                            ref={inputRef}
                            focusInput={focusInput}
                            commands={commands}
                            addLog={addLog}
                            disableInput={disableInput}
                        />

                    </Line>
            }

            <div ref={terminalRef}></div>

        </div>
    );
}

export default Terminal;
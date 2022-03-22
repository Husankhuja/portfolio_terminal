import React, { useState, useEffect } from "react";
import { commandList } from "../helpers/utils";

const Input = React.forwardRef(({ focusInput, commands, addLog, disableInput }, ref) => {
    const [input, setInput] = useState('');
    const [caret, setCaret] = useState(0);
    const [mode, setMode] = useState({ type: 'default', meta: {} })

    const handleChange = ({ target }) => {
        setInput(target.value);
    }
    const handleSelect = ({ target }) => {
        setCaret(target.selectionStart);
    }
    const handleClick = ({ target }) => {
        console.log(target);
        setCaret(target.getAttribute('idkey'))
    }
    const handleEnter = () => {
        addLog(input);
        setInput('');
        focusInput();
        setMode({ type: 'default', meta: {} });
    }
    const handleTab = () => {
        let index = 0;
        if (mode.type !== 'Tab') {
            setMode({ type: 'Tab', meta: { index, input } })
            const filteredCommands = commandList.filter(command => command.startsWith(input.toLowerCase()));
            (filteredCommands.length > 0) && setInput(filteredCommands[index]);
        } else {
            const filteredCommands = commandList.filter(command => command.startsWith(mode.meta.input.toLowerCase()));
            index = (mode.meta.index + 1) % filteredCommands.length;
            setMode(prev => ({ type: 'Tab', meta: { ...prev.meta, index } }))
            setInput(filteredCommands[index]);
        }
        focusInput();
    }
    const handleArrowUp = () => {
        let index = mode.type.index || undefined;
        if (mode.type !== 'Arrow') {
            index = 0;
            setMode({ type: 'Arrow', meta: { index, input } });
            commands.length > 0 && setInput(commands[index]);
        } else if (mode.meta.index + 1 < commands.length) {
            index = mode.meta.index + 1;
            setMode(prev => ({ ...prev, meta: { ...prev.meta, index } }));
            commands.length > 0 && setInput(commands[index]);
        }
    }
    const handleArrowDown = () => {
        if (mode.type === 'Arrow' && mode.meta.index) {
            let index = mode.meta.index - 1;
            setMode(prev => ({ ...prev, meta: { ...prev.meta, index } }));
            setInput(commands[index]);
        } else if (mode.type === 'Arrow' && mode.meta.index === 0) {
            setInput(mode.meta.input);
            setMode({ type: 'default', meta: {} });
        }
        focusInput();
    }
    const handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                handleEnter();
                break;
            case 'Tab':
                e.preventDefault();
                handleTab();
                break;
            case 'ArrowUp':
                e.preventDefault();
                handleArrowUp();
                break;
            case 'ArrowDown':
                handleArrowDown();
                break;
            default:
                setMode({ type: 'default', meta: {} });
                break;
        }
    }
    useEffect(() => {
        if (!disableInput) {
            ref.current.focus();
            ref.current.setSelectionRange(caret, caret)
        }
    }, [caret])
    return (
        <div className="input">
            <p>
                {
                    [...input, ' '].map((l, key) => (
                        <span
                            key={key}
                            idkey={key}
                            onClick={handleClick}
                            className={key === caret ? 'caret' : ''}
                        >{l}</span>))
                }
            </p>
            <input
                ref={ref}
                onChange={handleChange}
                value={input}
                onSelect={handleSelect}
                onKeyDown={handleKeyDown}
            />
        </div>
    );
});

export default Input;
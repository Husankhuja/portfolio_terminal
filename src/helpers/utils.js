import about from "../data/about";
import education from "../data/education";
import employment from "../data/employment";
import skillset from "../data/skillset";
import projects from "../data/projects";

const parser = (text, setLogs) => {
    const strippedText = text.trim().toLowerCase();
    switch (strippedText) {
        case 'clear':
            setLogs([]);
            break;
        case 'help':
            commandList.forEach(command => {
                setLogs((prev) => [...prev, { 'text': command, 'command': false, 'lazy': false }]);
            })
            break;
        case 'about':
            setLogs((prev) => [...prev, about]);
            break;
        case 'education':
            setLogs((prev) => [...prev, education]);
            break;
        case 'employment':
            setLogs((prev) => [...prev, employment]);
            break;
        case 'skillset':
            setLogs((prev) => [...prev, skillset]);
            break;
        case 'projects':
            setLogs((prev) => [...prev, projects]);
            break;
        case 'resume':
            console.log('triggerd');
            let a = document.createElement('a');
            a.setAttribute('href', '/resume.pdf');
            a.setAttribute('download', 'resume');
            a.click();
            a.remove();
            break;
        default:
            setLogs((prev) => [...prev, { 'text': 'command not recognized. Type help for commands.', 'command': false, 'lazy': false, 'color': 'red' }])
            break;
    }
}

const commandList = ['about', 'education', 'employment', 'skillset', 'projects', 'clear', 'help'];

export { parser, commandList };
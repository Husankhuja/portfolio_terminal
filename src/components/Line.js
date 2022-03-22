const Line = ({ children, command = false }) => {
    return (
        <div className="line">
            {command ? <p><span>&gt;</span><span className="w-20"></span></p> : ''}
            {children}
        </div>
    );
}

export default Line;
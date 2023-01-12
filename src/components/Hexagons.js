const Hexagons = () => {
    const rowsContent = [];
    for (let i = 0; i < 20; i++) {
        rowsContent.push(<div className="hexagon" key={i} />);
    }
    const rows = [];
    for (let i = 0; i < 50; i++) {
        rows.push(<div className="row" key={i}>{rowsContent}</div>)
    }
    return <div className="container">
        {rows}
    </div>;
}

export default Hexagons;
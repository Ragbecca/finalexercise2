const ClickWebsiteSingle = (props) => {
    return <div className="website-clicks-value">
        <img src={"/img/website/" + props.img} width="32px" height="32px" alt={props.name}></img>
        <div className="website-clicks-value-2">{props.clicks}</div>
    </div>
}

export default ClickWebsiteSingle;
import { ReactComponent as ThreeDotsIcon } from '../../img/dots.svg';

const FinishedTask = (props) => {
    return <div className="finished-task">
        <div className='finished-task-line-1'>
            <div>{props.category}</div>
            <div className="task-three-dots"><ThreeDotsIcon /></div>
        </div>
        <div className='finished-task-line-2'>
            <h1>{props.name}</h1>
            <label className='finished-task-checkbox'>
                <input type="checkbox" checked disabled />
                <span className='checkmark'></span>
            </label>
        </div>
    </div>
}

export default FinishedTask;
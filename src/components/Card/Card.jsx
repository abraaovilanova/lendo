import Progressbar from '../Progressbar'
import './Card.css'

function Card({ key, handleOnClick, title, level, progress }) {
    return (
        <li className="card" key={key} onClick={handleOnClick} style={{border: progress === 1 ? '3px solid #5cf1c2': 'none'}}>
            <p>{title}</p>
            <div>
                {Math.round(progress * 100)} % Complete
            </div>
            <Progressbar value={progress}/>
        </li>
    )
}

export default Card
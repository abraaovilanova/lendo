import Progressbar from '../Progressbar'
import './Card.css'

function Card({ key, handleOnClick, title, level, progress }) {
    return (
        <li className="card" key={key} onClick={handleOnClick}>
            <p>{title}</p>
            <div>
                {Math.round(progress * 100)} % Complete
            </div>
            <Progressbar value={progress}/>
        </li>
    )
}

export default Card
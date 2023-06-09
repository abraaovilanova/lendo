import { useNavigate } from "react-router-dom";

import './Result.css'


function Result() {
    const navigate = useNavigate();

    return (
        <div>
            <p>Parabês! Você leu o texto todo</p>
            <button className="continue-btn" onClick={() => navigate('/')}>Continuar</button>
        </div>
    )
}

export default Result 
import { useParams, useNavigate, useLocation } from "react-router-dom";

import './Result.css'


function Result() {
    const navigate = useNavigate();
    const { state } = useLocation();
    return (
        <div>
            <p>Parabês! Você leu o texto todo</p>
            <button className="continue-btn" onClick={() => navigate('/')}>Continuar</button>
        </div>
    )
}

export default Result 
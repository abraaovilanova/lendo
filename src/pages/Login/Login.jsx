import { useState } from "react"

import { useUsers } from '../../providers/UserProvider'

import './Login.css'

function Login() {

    const [name, setName] = useState("")
    const { user, setUserName } = useUsers()

    function handleOnChange(e) {
        setName(e.target.value)
    }

    return (
        <div className="login">
            <label>Qual é o seu nome?</label>
            <input 
                className="name-input"
                value={name} 
                onChange={handleOnChange} 
                type="text" />
            <button className="continue-btn" onClick={() => setUserName(name)}>Continuar</button>
        </div>
    )
}

export default Login
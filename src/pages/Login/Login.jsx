import { useState } from "react"

import { useUsers } from '../../providers/UserProvider'

import './Login.css'

function Login() {

    const [name, setName] = useState("")
    const { setUserName, setUserLocalStorage  } = useUsers()

    function handleOnChange(e) {
        setName(e.target.value)
        setUserLocalStorage(e.target.value)
    }

    return (
        <div className="login">
            <label>Qual é o seu nome?</label>
            <input 
                className="name-input"
                value={name} 
                onChange={handleOnChange} 
                type="text" />
            <button disabled={!name} className="continue-btn" onClick={() => setUserName(name)}>Continuar</button>
        </div>
    )
}

export default Login
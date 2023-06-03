import { useState } from "react"
import { db } from '../../firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

function Login(){
    const [user, setUser ] = useState("admin")
    const [password, setPassword] = useState("admin")

    async function hadleLogin(event){
        console.log(user, password)

        //const querySnapshot =  await getDocs(textCollectionRef)
        const citiesRef = collection(db, "users");

        // Create a query against the collection.
        const q = query(citiesRef, where("user", "==", "admin"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          });
    }

    return (
        <div>
            <div>
                <label>user</label>
                <input value={user} onChange={(e) => setUser(e.target.value)} type="text" />
            </div>
            <div>
                <label>password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
            </div>
            <button onClick={(event) => hadleLogin(event)}>Login</button>
        </div>
    )
}

export default Login
import { useState } from "react";
import { addPlayer } from "../API";

const NewPlayerForm = ({setFetchToggle}) => {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    // console.log(name);    

    async function handleSubmit(e) {
        e.preventDefault();

        const result = await addPlayer(name,breed);
        
        if (result && result.success) {
            setName("");
            setBreed("");
            setFetchToggle((prev)=>!prev);
        } else {
            console.error("Failed to add player!");
        }
    }

    return ( 
    <form onSubmit={handleSubmit}>
        <label>
            Name: {" "}
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
        </label>
        <label>
            Breed: {" "}
            <input type="text" value={breed} onChange={(e)=>setBreed(e.target.value)}/>
        </label>
        <button type="submit">Submit</button>
    </form>
    );
}
 
export default NewPlayerForm;
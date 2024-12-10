import {useParams, useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import { fetchSinglePlayer } from "../API";
import { removePlayer } from "../API";

const SinglePlayer = () => {
    const [selectedPlayer, setSelectedPlayer] = useState("");
    const [error, setError] = useState(null);
    // console.log(selectedPlayer);
    // console.log(error);

    const navigate = useNavigate();

    const {id} = useParams();


    useEffect(() => {
        async function getSinglePlayer(){
            const APIResponse = await fetchSinglePlayer(id);
            // console.log(APIResponse);
            
            if (APIResponse.success) {
                setSelectedPlayer(APIResponse.data.player);
            } else {
                setError(APIResponse.error.message);
            }
        }
        getSinglePlayer()
    }, []);

    async function handleDelete() {
        const result = await removePlayer(id);

        navigate("/");
    }


    return ( 
        <>
        {selectedPlayer && (
        <div className="selected-card">
            <img src={`${selectedPlayer.imageUrl}`} alt="puppy image"/>
            <p>Name: {selectedPlayer.name}</p>
            <p>Breed: {selectedPlayer.breed}</p>
            <button className="deleteBtn" onClick={()=>handleDelete()}>Delete Player</button>
        </div>)}

        {error && <p className="error">{error}</p>}
        </>
    );
}
 
export default SinglePlayer;
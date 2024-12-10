import { fetchAllPlayers, removePlayer } from "../API";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewPlayerForm from "./NewPlayerForm";

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [fetchToggle, setFetchToggle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllPlayers() {
      const APIResponse = await fetchAllPlayers();
      // console.log(APIResponse.data.players);
      if (APIResponse.success) {
        setPlayers(APIResponse.data.players);
      } else {
        setError(APIResponse.error.message);
      }
    }
    getAllPlayers();
  }, [fetchToggle]);

  const playersToDisplay = searchParam
    ? players.filter((player) =>
        player.name.toLocaleLowerCase().includes(searchParam)
      )
    : players;

  async function handleDelete(id) {
    const result = await removePlayer(id);

    if (result && result.success){
        setFetchToggle((prev) => !prev);
    }else {
        setError(result.error.message);
    }
  }
  
  return (
    <>
      <div className="form-container">
        <NewPlayerForm setFetchToggle={setFetchToggle} />

        <div className="search-box">
          <label>
            Search:{" "}
            <input
              type="text"
              onChange={(e) =>
                setSearchParam(e.target.value.toLocaleLowerCase())
              }
            />
          </label>
        </div>
      </div>

      <div className="cards-container">
        {playersToDisplay.map((player) => {
          return (
            <div key={player.id} className="players-card">
              <h3>{player.name}</h3>
              <img src={player.imageUrl} alt="" />
              <button
                className="detailBtn"
                onClick={() => navigate(`/players/${player.id}`)}
              >
                See Details
              </button>
              <button
                className="deleteBtn"
                onClick={() => handleDelete(player.id)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllPlayers;

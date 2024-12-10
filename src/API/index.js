const COHORT = "2410-FTB-ET-WEB-FT";
const API = `https://fsa-puppy-bowl.herokuapp.com/api/${COHORT}/players`;

export async function fetchAllPlayers() {
    try {
        const response = await fetch (API);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function fetchSinglePlayer(id) {
    try {
        const response = await fetch (`${API}/${id}`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function addPlayer(name,breed) {
    try {
        const response = await fetch (API, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({name,breed})
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}

export async function removePlayer(id) {
    try {
        const response = await fetch (`${API}/${id}`, {
            method: "DELETE",
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);        
    }
}
import {Routes,Route} from "react-router-dom"
import AllPlayers from "./AllPlayers";
import SinglePlayer from "./SinglePlayer";

const RouterComponent = () => {
    return ( 
        <Routes>
            <Route path='/' element={<AllPlayers/>} />
            <Route path='/players/:id' element={<SinglePlayer/>}/>
        </Routes>
     );
}
 
export default RouterComponent;
import { Routes,Route } from "react-router-dom";

import BaseLayout from "./components/Base";
import SearchQuery from "./components/SearchQuery";
import PassengerSelector from "./components/flightform/PassengerClass";
import MultiCityQueryCard from "./components/flightform/MultiCity";

export default function App() {
  return(
    <>
   
    <Routes>
      <Route element={<BaseLayout/>}>
        <Route index element={
          <> <SearchQuery/> </>}/>
      </Route>
    

    </Routes>
     
    </>

  )
}

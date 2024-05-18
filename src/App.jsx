import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./pages/Product/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import Login from "./pages/Login/Login";
import Homepage from "./pages/Homepage/Homepage";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
//import City from "./components/City/City";

function App() {
  const [cities,setCities]=useState([])
  const [isLoading,setIsLoading]=useState(false)
  useEffect(function () {
    async function getCities() {
       try {
        setIsLoading(true)
        let response =await fetch("http://localhost:9001/cities")
        let data = await response.json()
        setCities(data)
        console.log(data);
       } catch {
        console.log("error");
       }
       finally{
        setIsLoading(false)
       }
    }
    getCities()
}
,[])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities"/>}/>
          
          <Route path="cities/:id" element={<City/>}/> {/*step1*/}

          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>} />
          <Route path="form" element={<Form/>} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

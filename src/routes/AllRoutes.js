import { Routes, Route } from "react-router-dom";
import { Hero } from "../Components/Hero";
import { LoginPage } from "../Components/LoginPage";

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  )
}

import { Routes, Route } from "react-router-dom";
import { AddExpense, EditExpense, Hero, LoginPage } from "../Pages";

export const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Hero/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/addExpense" element={<AddExpense/>}/>
        <Route path="/edit" element={<EditExpense/>}/>
    </Routes>
  )
}

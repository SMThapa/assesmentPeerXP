import { Routes, Route } from "react-router-dom";
import { Hero, LoginPage, AddExpense, EditExpense} from "../Components";

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

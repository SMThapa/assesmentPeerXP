import { useTitle } from "../hook/useTitle"
import { NavLink } from "react-router-dom"
import { useStates} from "../context/StateContext"
import { useEffect } from "react"

export const Hero = () => {

  useTitle('View Expenses')

  const {peopleList} = useStates();

  useEffect(()=>{
    localStorage.setItem('taskList', JSON.stringify(peopleList))
  },[peopleList]);

  return (
    <div className="w-full mt-20 flex justify-center">
      <div className="w-3/4">
        <div className="flex w-full h-12 justify-between">
            <h1>MY EXPENSE MANAGER</h1>
            <div className="flex">
                <NavLink to="/addExpense">
                  <h1>+ New Expense</h1>
                </NavLink>
            </div>
        </div>   
        <div className="border-2 border-gray-500">
          <table >
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr className="flex flex-wrap">
                <th>Name</th>
                <th>Category</th>
                <th>Date of Expense</th>
                <th>Amout</th>
                <th>Update At</th>
                <th>Created By</th>
                <th></th>
              </tr>
              <tbody>
                {
                  peopleList && peopleList.map((elm, index) => (
                    <tr key={index}>
                      <td>{elm.username}</td>
                      <td>{elm.category}</td>
                      <td>{elm.date}</td>
                      <td>{elm.amount}</td>
                      <td>{Date.now}</td>
                      <td>{elm.createdBy}</td>
                      <td><NavLink to='/edit'><i className="bi bi-pencil-square"></i></NavLink></td>
                      <td><i onClick={()=>console.log('delete')} className="bi bi-trash-fill"></i></td>
                    </tr>
                  ))
                }
              </tbody>
            </thead>
          </table>
        </div>
      </div>     
    </div>
  )
}

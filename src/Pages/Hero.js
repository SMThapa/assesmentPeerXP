import { useTitle } from "../hook/useTitle"
import { NavLink} from "react-router-dom"
import { useStates} from "../context/StateContext"
import { useEffect, useRef, useState} from "react"
import { TableComponent } from "../Components/TableComponent"

export const Hero = () => {

  //changes title 
  useTitle('View Expenses')

  //states from useContext
  const {usersList, dummyList, setDummyList} = useStates();

  const [dates, setDates] = useState([])

  //this stores the data in localstorage on every change in usersList(which holds all the users info.)
  useEffect(()=>{
    localStorage.setItem('userList', JSON.stringify(usersList))
    setDummyList(usersList)
    
    //this removes the duplicate date
    const arr = []
    usersList.map(usr => (
      arr.push(usr.date)
    ))
    const arr2 = arr.filter((date, index)=> arr.indexOf(date) === index)
    setDates(arr2.sort())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[usersList]);


  const filterValue = useRef();
  const handleFilterDate = () =>{
    const date = filterValue.current.value
    date ==='null'? setDummyList(usersList) : setDummyList(usersList.filter(user => user.date === date))
  }
 
  const search = useRef()

  const handleSearch = (e)=>{
    e.preventDefault();
    const query = search.current.value;
    const newList = usersList.filter(usr => usr.username.toLowerCase().includes(query.toLowerCase()))
    setDummyList(newList) 
  }

  return (
    <div className="w-full my-20 flex justify-center px-5">
      <div className="lg:w-4/5 w-full">
        <div className="flex w-full h-12 justify-between items-center mb-4">
          <h1>MY EXPENSE MANAGER {dummyList.length !==0 && `(${dummyList.length})`}</h1>
          <div className="flex">
            <select ref={filterValue} onChange={handleFilterDate} className="p-2 border border-gray-400 rounded-lg cursor-pointer mr-2 w-56" placeholder="Filter by date of Expense">
              <option value="null">-Filter by date of Expense-</option>
              {
                dates.map((date, index)=>(
                  <option value={date} key={index}>{date}</option>
                ))
              }
            </select>
            
            <div className="p-2 border border-blue-700 rounded-lg cursor-pointer text-blue-600 mr-2">
              <form onChange={handleSearch} onSubmit={(e)=>e.preventDefault()}>
                <input ref={search} className="text-gray-700 focus:outline-none" type="text" name="search" placeholder="Search by Name" autoComplete="off" autoCapitalize="true"/>
                <i className="bi bi-search cursro-pointer"></i>
              </form>
            </div>
            <NavLink to="/addExpense">
              <h1 className="p-2 border border-green-700 rounded-lg cursor-pointer text-green-600">+ New Expense</h1>
            </NavLink>

          </div>
        </div>   
        <div className="overflow-auto">
          <table className="w-full border border-gray-400 w-full ">
            <thead className="bg-gray50 border-b border-gray-500">
              <tr className="">
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Category</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Date of Expense</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Amout</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Update At</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Created By</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center"></th>
              </tr>
            </thead>
            <tbody>
              {
                dummyList.length===0 && 
                <tr>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center"> -- </td>
                </tr>
              
              }
              {
                dummyList && dummyList.map((elm, index) => (
                  <TableComponent key={index} data={elm}/>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>     
    </div>
  )
}

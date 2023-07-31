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
    filterValue.current.value = 'null';
  }

  return (
    <div className="w-full sm:my-20 flex justify-center px-5">
      <div className="lg:w-4/5 w-full">
        <div className="lg:flex h-12 w-full lg:justify-between items-center mb-4 max-md:my-24 max-lg:my-8">
          <h1 className="max-lg:my-2">MY EXPENSE MANAGER {dummyList.length !==0 && `(${dummyList.length})`}</h1>
          <div className="flex max-lg:justify-between">
            <div className="flex max-sm:flex-col">
              <select ref={filterValue} onChange={handleFilterDate} className="p-2 border border-gray-400 rounded-lg cursor-pointer mr-2 max-sm:text-sm max-sm:my-1" defaultValue={'null'}>
                <option className="max-sm:text-sm w-full" value="null">-Filter by date-</option>
                {
                  dates.map((date, index)=>(
                    <option className="max-sm:text-sm" value={date} key={index}>{date}</option>
                  ))
                }
              </select>
              
              <div className="p-2 border border-blue-700 rounded-lg cursor-pointer text-blue-600 mr-2 max-sm:my-1">
                <form className="flex" onChange={handleSearch} onSubmit={(e)=>e.preventDefault()}>
                  <input ref={search} className="text-gray-700 focus:outline-none max-sm:text-xs" type="text" name="search" placeholder="Search by Name" autoComplete="off" autoCapitalize="true"/>
                  <i className="bi bi-search cursro-pointer"></i>
                </form>
              </div>
            </div>
            <NavLink to="/addExpense">
              <h1 className="p-2 border border-green-700 rounded-lg cursor-pointer text-green-600 max-sm:text-sm">+ New Expense</h1>
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

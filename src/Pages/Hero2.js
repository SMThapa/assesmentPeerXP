import { useTitle } from "../hook/useTitle"
import { NavLink,useNavigate} from "react-router-dom"
import { useStates} from "../context/StateContext"
import { useEffect, useRef, useState} from "react"
import Swal from "sweetalert2"

export const Hero2 = () => {

  //changes title 
  useTitle('My Expense Manager ')

  const navigate = useNavigate()

  //states from useContext
  const {usersList, setUser, setList, dummyList, setDummyList} = useStates();

  //this holds the data temporarily, change here dosen't affect the original data.
  // const [dummyList, setDummyList] = useState([])

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
    
  const handleEdit = (id) => {
    setUser(usersList.filter(elm => id === elm.id))
    navigate('/edit')
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedList = usersList.filter(elm => id !== elm.id)
        setList(updatedList)
      }
    })
  }

  return (
    <div className="w-full my-20 flex justify-center px-5">
      <div className="lg:w-4/5 w-full">
        <div className="flex w-full h-12 justify-between items-center mb-4">
          <h1>MY EXPENSE MANAGER {dummyList.length !==0 && `(${dummyList.length})`}</h1>
          <div className="flex">
            <select ref={filterValue} onChange={handleFilterDate} className="p-2 border border-gray-400 rounded-lg cursor-pointer mr-2 w-56" placeholder="Filter by date of Expense">
              <option value="null">-Filter by date of Expense-</option>
              {/* <option value="null">--Show All--</option> */}
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
                <tr key={index} className="border-b border-gray-400">
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">{elm.username}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">{elm.category}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">{elm.date.split().reverse().join()}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">Rs.{elm.amount}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">{elm.updated}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center">{elm.createdBy}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center"><i onClick={()=>handleEdit(elm.id)} className="bi bi-pencil-square cursor-pointer fa-2x" style={{fontSize:'25px', color:"#83c5be"}}></i></td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center"><i onClick={()=>handleDelete(elm.id)} className="bi bi-trash-fill cursor-pointer" style={{fontSize:'25px', color:"#e56b6f"}}></i></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>     
    </div>
  )
}

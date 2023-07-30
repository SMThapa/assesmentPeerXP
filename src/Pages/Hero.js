import { useTitle } from "../hook/useTitle"
import { NavLink,useNavigate } from "react-router-dom"
import { useStates} from "../context/StateContext"
import { useEffect } from "react"
import Swal from "sweetalert2"

export const Hero = () => {

  useTitle('View Expenses')

  const navigate = useNavigate()

  const {usersList, setUser, user, setList} = useStates();

  useEffect(()=>{
    localStorage.setItem('taskList', JSON.stringify(usersList))
  },[usersList]);

  const handleSearch = (e)=>{
    e.preventDefault();
    console.log(e.target.search.value)
  }

  const handleEdit = (id) => {
    setUser(usersList.filter(elm => id === elm.id))
    console.log(user)
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
    <div className="w-screen mt-20 flex justify-center px-5">
      <div className="lg:w-4/5 w-full">
        <div className="flex w-full h-12 justify-between items-center mb-4">
          <h1>MY EXPENSE MANAGER {usersList.length !==0 && `(${usersList.length})`}</h1>
          <div className="flex">
            <h1 className="p-2 border border-gray-400 rounded-lg cursor-pointer mr-2">Filter by date of Expense</h1>
            <div className="p-2 border border-blue-700 rounded-lg cursor-pointer text-blue-600 mr-2">
              <form onSubmit={handleSearch}>
                <input className="text-gray-700 focus:outline-none" type="text" name="search" placeholder="Search by Name"/>
                <button><i className="bi bi-search cursro-pointer"></i></button>
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
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Category</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Date of Expense</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Amout</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Update At</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap">Created By</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center whitespace-nowwrap"></th>
              </tr>
            </thead>
            <tbody>
              {
                usersList.length===0 && 
                <tr>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                  <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"> -- </td>
                </tr>
              
              }
              {
                usersList && usersList.map((elm, index) => (
                <tr key={index} className="border-b border-gray-400">
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">{elm.username}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">{elm.category}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">{elm.date}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">Rs.{elm.amount}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">{elm.updated}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap">{elm.createdBy}</td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"><i onClick={()=>handleEdit(elm.id)} className="bi bi-pencil-square cursor-pointer fa-2x" style={{fontSize:'25px'}}></i></td>
                    <td className="p-3 py-6 text-sm text-gray-700 text-center whitespace-nowwrap"><i onClick={()=>handleDelete(elm.id)} className="bi bi-trash-fill cursor-pointer" style={{fontSize:'25px'}}></i></td>
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

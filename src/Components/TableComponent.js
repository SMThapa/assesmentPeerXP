import { useStates } from "../context/StateContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"

export const TableComponent = ({data}) => {
    const navigate = useNavigate();
    const {usersList, setUser, setList} = useStates();

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

    //configure date
    const date = new Date(data.date)
    var day = date.getDate();
    var fullDay = ("0" + day).slice(-2);
    const dt = `${fullDay}, ${date.toLocaleString("en-us", { month: "short" })} ${date.getFullYear()}`

  return (
    <tr className="border-b border-gray-400">
      <td className="p-3 py-6 text-sm text-gray-700 text-center">{data.username}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center">{data.category}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center">{dt}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center">Rs.{data.amount}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center">{data.updated}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center">{data.createdBy}</td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center"><i onClick={()=>handleEdit(data.id)} className="bi bi-pencil-square cursor-pointer fa-2x" style={{fontSize:'25px', color:"#83c5be"}}></i></td>
      <td className="p-3 py-6 text-sm text-gray-700 text-center"><i onClick={()=>handleDelete(data.id)} className="bi bi-trash-fill cursor-pointer" style={{fontSize:'25px', color:"#e56b6f"}}></i></td>
    </tr>
  )
}

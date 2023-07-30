import { useNavigate } from "react-router-dom"
import { useStates } from "../context/StateContext"
import Swal from "sweetalert2"

export const EditExpense = () => {

  const {user, usersList, setList} = useStates()

  const navigate = useNavigate()

  const date = new Date();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleSubmit = (e) =>{
    e.preventDefault()
    const updatedList = usersList.map(usr => (
      user[0].id === usr.id ? {
        id: user[0].id,
        username: e.target.name.value,
        category: e.target.category.value,
        date: e.target.date.value,
        amount: e.target.amount.value,
        description: e.target.description.value,
        updated: date.toLocaleDateString(),
        createdBy: currentUser ? currentUser.username : "PeerXP"
      } : usr
    ))
    setList(updatedList)
    navigate('/')

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your changes has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <>
      {
      !user ? ()=>navigate('/'):
        <div className="flex flex-col h-96 w-full justify-center mt-28 items-center">
          <h1 className="text-2xl mb-2">Edit Expense</h1>
          <form onSubmit={handleSubmit} className="xl:w-1/4 sm:w-2/5 w-5/6">
            <p className="flex flex-col my-4">
              <label htmlFor="name">Name:</label>
              <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="text" id="name" name="name" placeholder="Name" defaultValue={user[0].username} maxLength="150" required/>
            </p>
            <p className="flex flex-col my-4">
                <label htmlFor="category">Category</label>
                <select className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm" name="category" id="category" required>
                    <option value="">-Select-</option>
                    <option value="Health" selected={user[0].category === 'Health'? true: false}>Health</option>
                    <option value="Electronics" selected={user[0].category === 'Electronics'? true: false}>Electronics</option>
                    <option value="Travel" selected={user[0].category === 'Travel'? true: false}>Travel</option>
                    <option value="Education" selected={user[0].category === 'Education'? true: false}>Education</option>
                    <option value="Books" selected={user[0].category === 'Books'? true: false}>Books</option>
                    <option value="Others" selected={user[0].category === 'Others'? true: false}>Others</option>
                </select>
            </p>

            <div className="flex my-2">
                <p className="flex flex-col my-4 w-1/2 mr-1">
                    <label htmlFor="date">Pick a Date of Expense:</label>
                    <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm"  type="date" id="date" name="date" defaultValue={user[0].date} required/>
                </p>
                <p className="my-4 w-1/2 ml-1">
                    <label htmlFor="amout">Enter Amount:</label>
                    <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="number" id="amout" name="amount" defaultValue={user[0].amount} min="0" placeholder="Amout" required/>
                </p>
            </div>

            <p className="flex flex-col my-4">
              <label htmlFor="description">Description:</label>
              <textarea className="h-28 bg-gray-50 border border-gray-700 shadow-sm text-gray-500 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="text-area" id="description" name="description" defaultValue={user[0].description} placeholder="Description" required/>
            </p>

            <button className="mb-6 w-full text-white bg-blue-600 focus:outline-none font-medium text-sm px-5 py-2.5 text-center rounded">UPdATE</button>
          </form>
        </div>

    }    
    </>
  )
}

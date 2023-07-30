import { useNavigate } from "react-router-dom"
import { useStates } from "../context/StateContext"
import { useTitle } from "../hook/useTitle"

export const EditExpense = () => {

  useTitle('Edit')

  const {user, usersList, setList} = useStates()

  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const handleSubmit = (e) =>{
    e.preventDefault()

    const date = new Date()

    const updatedList = usersList.map(usr => (
      user[0].id === usr.id ? {
        id: user[0].id,
        username: e.target.name.value,
        category: e.target.category.value,
        date: e.target.date.value,
        amount: e.target.amount.value,
        description: e.target.description.value,
        updated: date.toLocaleTimeString(),
        createdBy: currentUser ? currentUser.username : "PeerXP"
      } : usr
    ))
    setList(updatedList)
    navigate('/')
  }

  const category = user[0].category
  
  return (
    <div className="flex flex-col h-96 w-full justify-center mt-28 items-center">
      <h1 className="text-2xl mb-2">Edit Expense</h1>
      <form onSubmit={handleSubmit} className="xl:w-2/6 sm:w-3/5 w-5/6">
        <p className="flex flex-col my-4">
          <label htmlFor="name">Name:</label>
          <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="text" id="name" name="name" placeholder="Name" defaultValue={user[0].username} maxLength="150" required/>
        </p>
        <p className="flex flex-col my-4">
            <label htmlFor="category">Category</label>
            <select className="bg-gray-50 border border-gray-500 shadow-sm text-gray-700 text-sm block w-full p-2.5 focus:outline-none rounded-sm" name="category" id="category" defaultValue={category} required>
                <option value="">-Select-</option>
                <option value="Health">Health</option>
                <option value="Electronics">Electronics</option>
                <option value="Travel">Travel</option>
                <option value="Education">Education</option>
                <option value="Books">Books</option>
                <option value="Others">Others</option>
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
  )
}

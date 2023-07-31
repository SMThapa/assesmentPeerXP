import { useNavigate } from "react-router-dom"
import { useTitle } from "../hook/useTitle"

export const LoginPage = () => {

  useTitle('Login Page')

  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault()

    const userInfo = {
      username: e.target.name.value,
      email: e.target.email.value
    }

    localStorage.setItem('currentUser', JSON.stringify(userInfo))

    navigate('/')
  }

  return (
    <div className="flex flex-col h-96 w-full justify-center mt-20 items-center">
      <h1 className="text-2xl">User Login</h1>
      <form onSubmit={handleSubmit} className="xl:w-1/4 sm:w-1/3 w-5/6">
        <p className="flex flex-col my-6">
          <label htmlFor="userName">Name:</label>
          <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-500 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="text" id="userName" name="name" placeholder="Username" autoComplete="off" required/>
        </p>
        <p className="flex flex-col my-6">
          <label htmlFor="email">Email:</label>
          <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-500 text-sm block w-full p-2.5 focus:outline-none rounded-sm"  type="email" id="email" name="email" placeholder="Email address" autoComplete="off" required/>
        </p>
        <p className="flex flex-col my-6">
          <label htmlFor="password">Enter Password:</label>
          <input className="bg-gray-50 border border-gray-500 shadow-sm text-gray-500 text-sm block w-full p-2.5 focus:outline-none rounded-sm" type="password" id="password" name="password" placeholder="Password" required/>
        </p>
        <button className="mb-6 w-full text-white bg-blue-600 focus:outline-none font-medium text-sm px-5 py-2.5 text-center rounded">LOGiN</button>
      </form>
    </div>
  )
}

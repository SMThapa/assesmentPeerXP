import { useTitle } from "../hook/useTitle"

export const Hero = () => {

  useTitle('View Expenses')

  return (
    <div className="w-full mt-20 flex justify-center">
      <div className="flex xl:w-5/6 h-96 w-full justify-between">
          <h1>MY EXPENSE MANAGER</h1>
          <div className="flex">
              {/* <h1>Filter by Date of Expense</h1>
              <h1>Search Expnces by Name</h1> */}
              <h1>New Expense</h1>
          </div>
      </div>
        
    </div>
  )
}

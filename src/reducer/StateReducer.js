export const StateReducer = (state, action) => {
  const {type, payload} = action;

  switch(type){

    case "FILTER" :
        return {...state, date: payload.date}
    
    
    default:
        return
  }
}

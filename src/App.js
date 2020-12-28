import React from 'react'
import ToDo from './Components/ToDo'
import Loginpage from './Pages/Login/Loginpage'
import {Route} from 'react-router-dom'

function App() {
  return (
    <div>
     <Route path="/" exact component={Loginpage}></Route>
     <Route path="/ToDo" exact component={ToDo}></Route>
    </div>
  )
}
export default App;
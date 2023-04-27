import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"

const generalroutes=[

{
    path:'/',
    element:<Home/>
},
{path:"/login"
,element:<Login/>
},
{
    path:'/signup',
    element:<Signup/>
}

]
export default generalroutes
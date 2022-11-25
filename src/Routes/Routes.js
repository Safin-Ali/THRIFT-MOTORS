import Login from "../components/Form/Login";
import Signup from "../components/Form/Signup";
import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import PostData from "../Pages/PostPage/PostData";
import PrivatePage from "../Pages/Private/PrivatePage";


const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:`/` , element:<Main></Main>, children:[

            {path: '/', element:<Home></Home>},

            {path: '/category/:id', loader: async ({params}) => fetch(`http://localhost:5000/category/${params.id}`), element: <PrivatePage><PostData></PostData></PrivatePage>}
        ]
    },

    {
        path: '/signup', element: <Signup></Signup>
    },

    {
        path: '/login', element: <Login></Login>
    },
    
])
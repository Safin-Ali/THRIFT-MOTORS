import AddProduct from "../components/Form/AddProduct";
import Login from "../components/Form/Login";
import Signup from "../components/Form/Signup";
import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import PostData from "../Pages/PostPage/PostData";
import DashboardPage from "../Pages/Private/DashboardPage";
import PrivatePage from "../Pages/Private/PrivatePage";


const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:`/` , element:<Main></Main>, children:[

            // get all home page section
            {path: '/', element:<Home></Home>},

            // get posted data by category id/name wise
            {path: '/category/:id', loader: async ({params}) => fetch(`http://localhost:5000/category/${params.id}`), element: <PrivatePage><PostData></PostData></PrivatePage>},

            // get dashboard page
            {path: '/dashboard', element: <DashboardPage></DashboardPage>},

            // get add product page
            {path: '/add-pruduct', element: <AddProduct></AddProduct>},
        ]
    },

    {
        path: '/signup', element: <Signup></Signup>
    },

    {
        path: '/login', element: <Login></Login>
    },
    
])
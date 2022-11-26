import DashTable from "../components/Dashboard/DashTable";
import AddProduct from "../components/Form/AddProduct";
import Login from "../components/Form/Login";
import Signup from "../components/Form/Signup";
import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";
import MyProductPage from "../Pages/My-Product/MyProductPage";
import PostData from "../Pages/PostPage/PostData";
import AdminPage from "../Pages/Private/AdminPage";
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

            // get add product page
            {path: '/add-product', element: <DashboardPage><AddProduct></AddProduct></DashboardPage>},

            // get my product page
            {path: '/my-product/:id', element: <DashboardPage><MyProductPage></MyProductPage></DashboardPage>},

            // get all sellers (admin)
            {path: '/all-sellers', element: <DashboardPage><DashTable></DashTable></DashboardPage>},
        ]
    },

    {
        path: '/signup', element: <Signup></Signup>
    },

    {
        path: '/login', element: <Login></Login>
    },
    
])
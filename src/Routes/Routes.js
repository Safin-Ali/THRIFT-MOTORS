import NotFoundPage from "../components/404-Not-Found/NotFoundPage";
import AllUser from "../components/Dashboard/AllUser";
import AddProduct from "../components/Form/AddProduct";
import Login from "../components/Form/Login";
import Signup from "../components/Form/Signup";
import BlogPage from "../Pages/Blog/BlogPage";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/LoginPage";
import Main from "../Pages/Main/Main";
import MyProductPage from "../Pages/My-Product/MyProductPage";
import PostData from "../Pages/PostPage/PostData";
import DashboardPage from "../Pages/Private/DashboardPage";
import PrivatePage from "../Pages/Private/PrivatePage";


const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:`/` , element:<Main></Main>, children:[

            // 404 not found page
            {path: '/*',element:<NotFoundPage></NotFoundPage>},

            // get all home page section
            {path: '/', element:<Home></Home>},

            // get posted data by category id/name wise
            {path: '/category/:id', loader: async ({params}) => fetch(`http://localhost:5000/category/${params.id}`), element: <PrivatePage><PostData></PostData></PrivatePage>},

            // get add product page
            {path: '/add-product', element: <DashboardPage><AddProduct></AddProduct></DashboardPage>},

            // get my product page
            {path: '/my-product/:id', element: <DashboardPage><MyProductPage></MyProductPage></DashboardPage>},

            // get all sellers (admin)
            {path: '/all-sellers', element: <DashboardPage><AllUser></AllUser></DashboardPage>},

            // get blogs page
            {path: '/blogs', element: <BlogPage></BlogPage>},
        ]
    },

    {
        path: '/signup', element: <Signup></Signup>
    },

    {
        path: '/login', element: <LoginPage><Login></Login></LoginPage>
    },
    
])
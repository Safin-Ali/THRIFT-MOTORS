import NotFoundPage from "../components/404-Not-Found/NotFoundPage";
import UnAuthorized from "../components/404-Not-Found/UnAuthorized";
import AllBuyers from "../components/Dashboard/AllBuyers";
import AllReportedPost from "../components/Dashboard/AllReportedPost";
import AllSeller from "../components/Dashboard/AllSeller";
import AddProduct from "../components/Form/AddProduct";
import Login from "../components/Form/Login";
import Signup from "../components/Form/Signup";
import StripeElement from "../components/stripe-payment-page/StripeElement";
import MyOrders from "../components/User-Page-Card/MyOrders";
import BlogPage from "../Pages/Blog/BlogPage";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Login/LoginPage";
import Main from "../Pages/Main/Main";
import MyProductPage from "../Pages/My-Product/MyProductPage";
import PostData from "../Pages/PostPage/PostData";
import AdminPage from "../Pages/Private/AdminPage";
import PrivatePage from "../Pages/Private/PrivatePage";
import SellerPage from "../Pages/Private/SellerPage";
import UserPage from "../Pages/Private/UserPage";


const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:`/` , element:<Main></Main>, children:[

            // 404 not found page
            {path: '/*',element:<NotFoundPage></NotFoundPage>},

            // get all home page section
            {path: '/', element:<Home></Home>},

            // signup page
            {
                path: '/signup', element: <Signup></Signup>
            },
            
            // login page
            {
                path: '/login', element: <LoginPage><Login></Login></LoginPage>
            },

            // get posted data by category id/name wise
            {path: '/category/:id', loader: async ({params}) => fetch(`https://thrift-motors-server.vercel.app/category/${params.id}`), element: <PrivatePage><PostData></PostData></PrivatePage>},

            // get add product page
            {path: '/dashboard', element: <SellerPage></SellerPage>, children:[
                {path: '/dashboard/my-product/:id', element: <MyProductPage></MyProductPage>},
                // get my product page
                {path: '/dashboard/add-product', element: <AddProduct></AddProduct>},
            ]},

            // unathorized page
            {path:'/error401',element:<UnAuthorized></UnAuthorized>},


            // get all sellers (admin)
            {path: '/dashboard', element: <AdminPage></AdminPage>,children:[
                {path: '/dashboard/all-sellers', element: <AllSeller></AllSeller>},
                {path: '/dashboard/all-buyers', element: <AllBuyers></AllBuyers>},
                {path: '/dashboard/all-reported-post', element: <AllReportedPost></AllReportedPost>},
            ]},

            // get buyer / user 
            {path: '/dashboard', element: <UserPage></UserPage>,children:[
                {path: '/dashboard/my-orders', element: <MyOrders></MyOrders>},
            ]},
            
            // get payment box
            {path: '/payment', element: <StripeElement></StripeElement>},

            // get blogs page
            {path: '/blogs', element: <BlogPage></BlogPage>},

            // get payment page
            {path: '/payment/stripe', element: <StripeElement></StripeElement>},
        ]
    },    
])
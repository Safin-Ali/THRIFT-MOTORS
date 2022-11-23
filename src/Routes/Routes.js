import Home from "../Pages/Home/Home";
import Main from "../Pages/Main/Main";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
    {
        path:`/` , element:<Main></Main>, children:[

            {path: '/', element:<Home></Home>}
        ]
    }
])
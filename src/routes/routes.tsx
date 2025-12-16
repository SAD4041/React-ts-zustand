import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import ProductList from "@/pages/ProductListing"; // کاما اضافه شد
//import Temp from "@/pages/Temp";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
// فرض می‌کنیم کامپوننت‌های کامنت شده نیز وجود دارند و آن‌ها را وارد می‌کنیم.
// import PrivateLayout from "@/layouts/PrivateLayout/PrivateLayout";
// import AnotherLayout from "@/layouts/AnotherLayout/AnotherLayout";
// import EditProfile from "@/pages/EditProfile";
// import DashBoard from "@/pages/DashBoard";
// import Login from "@/pages/Login";
// import AboutUs from "@/pages/AboutUs";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicLayout />,
        errorElement: (
            <Error404 />
        ),
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "/temp",
//                element: <Temp />,
            },
            {
                path: "/productList",
                element: <ProductList/>
            },
            // شیء مسیریابی زیر برای /error500 اصلاح شد و در داخل آرایه children قرار گرفت
            {
                path: "/error500",
                element: <Error500 />
            },
            // {
            //  path: "/AboutUs",
            //  element: <AboutUs />,
            // },
        ],
    },
    // {
    //  element: <PrivateLayout />,
    //  children: [
    //      {
    //          path: "/EditProfile",
    //          element: <EditProfile />,
    //      },
    //      {
    //          path: "/DashBoard",
    //          element: <DashBoard />,
    //      },
    //  ],
    // },
    // {
    //  element: <AnotherLayout />,
    //  children: [
    //      {
    //          path: "/login",
    //          element: <Login />,
    //      },
    //      {
    //          path: "/temp",
    //          element: <Temp />,
    //      },
    //  ],
    // },
]);

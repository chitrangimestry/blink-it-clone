import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage.jsx';
import RegisterUser from '../pages/RegisterUser.jsx';
import Login from '../pages/Login.jsx';
import ForgotPassword from '../pages/ForgotPassword.jsx';
import VerifyOTP from '../pages/VerifyOTP.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path:"",
                element: <Home/>
            },
            {
                path:"search",
                element: <SearchPage/>
            },
            {
                path:"login",
                element: <Login/>
            },
            {
                path:"register",
                element: <RegisterUser/>
            },
            {
                path:"forgotPassword",
                element: <ForgotPassword/>
            },
            {
                path: "verifyOTP",
                element:<VerifyOTP/>
            }
        ]
    }
]);

export default router;
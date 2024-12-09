import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layout/Layout.jsx';
import AllBlogs from '../pages/all blogs/AllBlogs.jsx';
import Login from '../pages/login/Login.jsx';
import Sign_up from '../pages/signup/Sign_up.jsx';
import CreateBlogs from '../pages/create blog/createBlogs.jsx';
import MyBlogs from '../pages/my blogs/MyBlogs.jsx';
import Watchlist from '../pages/watchlist/Watchlist.jsx';
import Protected_routes from '../components/Protected_routes.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google'


const REACT_CLIENT_ID = import.meta.env.VITE_CLIENT_ID
console.log(REACT_CLIENT_ID)
const Routes = createBrowserRouter([
    {
        path: '/',
        element: <Layout />, // Use Layout as the parent
        children: [
            { path: '/', element: <Protected_routes isProtected={true}><AllBlogs /></Protected_routes> },
            { path: '/create', element: <Protected_routes isProtected={true}><CreateBlogs /></Protected_routes> },
            { path: '/my-blogs', element: <Protected_routes isProtected={true}><MyBlogs /></Protected_routes> },
            { path: '/watchlist', element: <Protected_routes isProtected={true}><Watchlist /></Protected_routes> }
        ],
    },
    { path: '/login', element: <GoogleOAuthProvider clientId={REACT_CLIENT_ID}><Protected_routes isProtected={false}><Login /></Protected_routes></GoogleOAuthProvider> },
    { path: '/sign-up', element: <GoogleOAuthProvider clientId={REACT_CLIENT_ID}><Protected_routes isProtected={false}><Sign_up /></Protected_routes></GoogleOAuthProvider> },
]);

export default Routes;

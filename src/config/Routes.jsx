import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Home from '../pages/home/Home';
import Catelogs from '../pages/Catelogs';

const publicRoute = [
    {path: '/', component: Home},
    {path: '/register', component: Register},
    {path:'/login', component: Login},
    {path: '/:category/:page', component: Catelogs},
    {path: '/:category/search/:keyword', component: Catelogs}
]

export default publicRoute;
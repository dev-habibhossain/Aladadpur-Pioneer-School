import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import Home from '../pages/Home/Home';
import About from '../pages/Public/About';
import Academics from '../pages/Public/Academics';
import Notices from '../pages/Public/Notices';
import Admission from '../pages/Public/Admission';
import Teachers from '../pages/Public/Teachers';
import Contact from '../pages/Public/Contact';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/about',
        Component: About,
      },
      {
        path: '/academics',
        Component: Academics,
      },
      {
        path: '/notices',
        Component: Notices,
      },
      {
        path: '/admission',
        Component: Admission,
      },
      {
        path: '/teachers',
        Component: Teachers,
      },
      {
        path: '/contact',
        Component: Contact,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/register',
        Component: Register,
      },
    ],
  },
]);

export default router;

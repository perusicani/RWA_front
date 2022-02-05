
import Dashboard from '../components/admin/Dashboard';
import Profile from '../components/admin/Profile';
import Users from '../components/admin/Users';

const routes = [

    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', element: <Dashboard /> },
    { path: '/admin/profile', exact: true, name: 'Profile', element: <Profile /> },
    { path: '/admin/users', exact: true, name: 'Users', element: <Users /> },

    // <Route exact path='/admin/dashboard' element={<Dashboard />}></Route>
    // <Route exact path='/admin/profile' element={<Profile />}></Route>
];

export default routes;
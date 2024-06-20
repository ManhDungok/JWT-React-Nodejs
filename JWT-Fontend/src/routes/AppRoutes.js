import { Route, Switch } from 'react-router-dom';
import Login from '../components/Login/Login';
import Users from '../components/ManageUsers/Users';
import Register from '../components/Register/Register';
import PrivateRoutes from './PrivateRoutes';
import Role from '../components/Roles/Role';
import GroupRole from '../components/groupRole/groupRole';

const AppRoutes = (props) => {
	const Project = () => {
		return <>projects</>;
	};
	return (
		<>
			<Switch>
				<PrivateRoutes path='/users' component={Users} />
				<PrivateRoutes path='/projects' component={Project} />
				<PrivateRoutes path='/roles' component={Role} />
				<PrivateRoutes path='/group-role' component={GroupRole} />

				<Route path='/login'>
					<Login />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>

				<Route path='/' exact>
					Home
				</Route>
				<Route path='*'>404 not found</Route>
			</Switch>
		</>
	);
};

export default AppRoutes;

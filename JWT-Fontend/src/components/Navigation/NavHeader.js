import React, { useEffect, useState, useContext } from 'react';
import './Nav.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo.png';
import { logoutUser } from '../../services/userService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';

const NavHeader = (props) => {
	const { user, logoutContext } = useContext(UserContext);
	const location = useLocation();
	const history = useHistory();

	const handleLogout = async () => {
		let data = await logoutUser(); //clear cookie
		localStorage.removeItem('jwt'); //clear local Storage
		logoutContext(); //clear user in context

		if (data && +data.EC === 0) {
			toast.success('Logout success...');
			history.push('/login');
		} else {
			toast.error(data.EM);
		}
	};

	if ((user && user.isAuthenticated === true) || location.pathname === '/') {
		return (
			<>
				{/* <div className='topnav'>
					<NavLink to='/' exact>
						Home
					</NavLink>
					<NavLink to='/users'>USers</NavLink>
					<NavLink to='/project'>Project</NavLink>
					<NavLink to='/about'>About</NavLink>
				</div> */}
				<div className='nav-header'>
					<Navbar expand='lg' className='bg-header'>
						<Container>
							<Navbar.Brand href='#home'>
								<img
									src={logo}
									width='30'
									height='30'
									className='d-inline-block align-top'
								/>
								<span className='brand-name'></span>Instagram
							</Navbar.Brand>
							<Navbar.Toggle aria-controls='basic-navbar-nav' />
							<Navbar.Collapse id='basic-navbar-nav'>
								<Nav className='me-auto'>
									<NavLink to='/' exact className='nav-link'>
										Home
									</NavLink>
									<NavLink to='/users' className='nav-link'>
										Users
									</NavLink>
									<NavLink to='/roles' className='nav-link'>
										Roles
									</NavLink>
									<NavLink to='/group-role' className='nav-link'>
										Group-Role
									</NavLink>
									<NavLink to='/project' className='nav-link'>
										Project
									</NavLink>
									<NavLink to='/about' className='nav-link'>
										About
									</NavLink>
								</Nav>
								<Nav>
									{/* Login roi thi moi hien welcome */}
									{user && user.isAuthenticated === true ? (
										<>
											<Nav.Item className='nav-link'>
												Welcome {user.account.username} !
											</Nav.Item>

											<NavDropdown title='Settings' id='basic-nav-dropdown'>
												<NavDropdown.Item>Change Password</NavDropdown.Item>
												<NavDropdown.Divider />
												<NavDropdown.Item>
													<span onClick={() => handleLogout()}>Log out</span>
												</NavDropdown.Item>
											</NavDropdown>
										</>
									) : (
										<Link className='nav-link' to='/login'>
											Login
										</Link>
									)}
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
			</>
		);
	} else {
		return <></>;
	}
};

export default NavHeader;

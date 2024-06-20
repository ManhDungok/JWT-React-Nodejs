import { useEffect, useState, useContext } from 'react';
import './App.scss';
import NavHeader from './components/Navigation/NavHeader';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './routes/AppRoutes';
import { Rings } from 'react-loader-spinner';
import { UserContext } from './context/UserContext';

function App() {
	const { user } = useContext(UserContext);

	return (
		<>
			<Router>
				{user && user.isLoading ? (
					<div className='loading-container'>
						<Rings
							height='80'
							width='80'
							radius='9'
							color='#1877f2'
							ariaLabel='three-dots-loading'
							wrapperStyle
							wrapperClass
						/>
						<div>Loading data...</div>
					</div>
				) : (
					<>
						<div className='app-header'></div>
						<NavHeader />
						{/* check xem đã có biến account và nó ko rỗng và có isAuthenticated =
					true thì mới hiện Nav */}
						{/* {account && !_.isEmpty(account) && account.isAuthenticated && } */}
						<div className='app-container'>
							<AppRoutes />
						</div>
					</>
				)}
			</Router>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

//test

export default App;

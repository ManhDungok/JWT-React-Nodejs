import { useEffect, useState, useContext } from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/userService';
import { UserContext } from '../../context/UserContext';

const Login = (props) => {
	const { loginContext } = useContext(UserContext);

	let history = useHistory();

	const [valueLogin, setValueLogin] = useState('');
	const [password, setPassword] = useState('');
	const defaultObjValidInput = {
		isValidValueLogin: true,
		isValidPassword: true
	};
	const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

	const handleCreateNewAccount = () => {
		history.push('/register');
	};

	const handleLogin = async () => {
		setObjValidInput(defaultObjValidInput);

		if (!valueLogin) {
			setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
			toast.error('Please enter your email or phone number !');
			return;
		}
		if (!password) {
			setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
			toast.error('Please enter your password !');
			return;
		}

		let res = await loginUser(valueLogin, password);

		if (res && +res.EC === 0) {
			let groupWithRoles = res.DT.groupWithRoles;
			let email = res.DT.email;
			let username = res.DT.username;
			let token = res.DT.access_token;

			let data = {
				isAuthenticated: true,
				token,
				account: { groupWithRoles, email, username }
			};
			localStorage.setItem('jwt', token);
			loginContext(data);
			history.push('/users');
			//window.location.reload();
		}
		if (res && +res.EC !== 0) {
			toast.error(res.EM);
		}
	};

	const hendlePressEnter = (event) => {
		if (event.charCode === 13 && event.code === 'Enter') {
			handleLogin();
		}
	};

	return (
		<div className='login-container '>
			<div className='container'>
				<div className='row' px-3 px-sm-0>
					<div className='content-left col-12 d-none col-sm-7 d-sm-block'>
						<div className='brand '>Instagram</div>
						<div className='detail'>Login</div>
					</div>
					<div className='content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
						<div className='brand d-sm-none'>Dung</div>
						<input
							type='text'
							className={
								objValidInput.isValidValueLogin
									? 'form-control'
									: 'is-invalid form-control'
							}
							placeholder='Email adress or phone number'
							value={valueLogin}
							onChange={(event) => {
								setValueLogin(event.target.value);
							}}
						/>
						<input
							type='password'
							className={
								objValidInput.isValidPassword
									? 'form-control'
									: 'is-invalid form-control'
							}
							placeholder='Password'
							onChange={(event) => {
								setPassword(event.target.value);
							}}
							onKeyPress={(event) => hendlePressEnter(event)}
						/>
						<button className='btn btn-primary' onClick={() => handleLogin()}>
							Login
						</button>
						<span className='text-center'>
							<a className='forgot-password' href='/#'>
								Fotgot your password?
							</a>
						</span>
						<hr />
						<div className='text-center'>
							<button
								className='btn btn-success'
								onClick={() => handleCreateNewAccount()}
							>
								Create new account
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Login;

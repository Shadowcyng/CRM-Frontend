import '../../node_modules/jquery/dist/jquery';
import '../../node_modules/bootstrap/js/src/collapse';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Action/UserActions';

const Navbar = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const { loading, userInfo, error } = user;

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<>
			<div style={{ position: 'sticky', top: 0, zIndex: 100 }}>
				<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
					<a className='navbar-brand' href='#'>
						CRM
					</a>
					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#navbarColor02'
						aria-controls='navbarColor02'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<span className='navbar-toggler-icon'></span>
					</button>

					<div className='collapse navbar-collapse' id='navbarColor02'>
						<ul className='navbar-nav mr-auto'>
							<li className='nav-item active'>
								<a className='nav-link' href='#'>
									Home
									<span className='sr-only'>(current)</span>
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='/addContact'>
									ADD CONTACT
								</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link' href='/profile'>
									PROFILE
								</a>
							</li>
						</ul>
						<ul className='navbar-nav ml-auto'>
							{userInfo === null ? (
								<>
									<li className='nav-item'>
										<a className='nav-link' href='login'>
											Login
											{/* <span className="sr-only">(current)</span> */}
										</a>
									</li>
									<li className='nav-item'>
										<a className='nav-link' href='/signup'>
											Sigup
										</a>
									</li>
								</>
							) : (
								<button
									type='button'
									className='btn btn-link nav-link'
									onClick={handleLogout}
								>
									Logout
								</button>
							)}
						</ul>
					</div>
				</nav>
			</div>
		</>
	);
};

export default Navbar;

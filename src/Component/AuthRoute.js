import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
const AuthRoute = ({ component: Component, ...rest }) => {
	const user = useSelector((state) => state.user);
	const { userInfo } = user;
	return (
		<Route
			{...rest}
			render={(props) =>
				userInfo ? <Component {...props} /> : <Redirect to='/login' />
			}
		/>
	);
};

export default AuthRoute;

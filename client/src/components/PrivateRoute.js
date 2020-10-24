import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { token } = useContext(GlobalContext);
	console.log(token);
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? <Component {...props} /> : <Redirect to="/login" />
			}
		/>
	);
};

export default PrivateRoute;

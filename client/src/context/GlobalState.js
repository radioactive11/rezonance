import React, { createContext, useEffect, useReducer } from 'react';
import AppReducer from './AppReducer';
import { Actions } from './Actions';

const initialState = {
	token: null,
	setToken: (token) => {},
	user: null,
	setUser: (user) => {},
};

export const GlobalContext = createContext(initialState);

const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	useEffect(() => {
		const fetchToken = () => {
			const token = localStorage.getItem('token');
			dispatch({
				type: Actions.UPDATE_TOKEN,
				payload: token,
			});
		};

		fetchToken();
	}, []);

	const updateToken = (token) => {
		dispatch({
			type: Actions.UPDATE_TOKEN,
			payload: token,
		});
	};

	const updateUser = (user) => {
		dispatch({
			type: Actions.UPDATE_USER,
			payload: user,
		});
		console.log(user);
	};

	// updateToken();
	// updateUser();

	return (
		<GlobalContext.Provider
			value={{
				user: state.user,
				token: state.token,
				updateToken,
				updateUser,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;

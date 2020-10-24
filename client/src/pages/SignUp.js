import React, { useState, useContext, useEffect } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router';
import { GlobalContext } from '../context/GlobalState';

const SignUp = () => {
	const [name, setName] = useState('');
	const [gender, setGender] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const history = useHistory();

	const { token } = useContext(GlobalContext);

	if (token) {
		history.push('/profile');
	}

	const submitData = (e) => {
		e.preventDefault();
		console.log(name, gender, email, password);
		Axios.post(`${process.env.REACT_APP_API_URL}/register`, {
			name,
			gender,
			email,
			password,
		})
			.then((res) => {
				console.log(res.data);
				history.push('/signin');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<input
				type="text"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<input
				type="text"
				name="gender"
				value={gender}
				onChange={(e) => setGender(e.target.value)}
			/>

			<input
				type="text"
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>

			<input
				type="text"
				name="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>

			<button type="submit" onClick={(e) => submitData(e)}>
				Signup
			</button>
		</div>
	);
};

export default SignUp;

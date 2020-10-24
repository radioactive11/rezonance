import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Profile = () => {
	const { user } = useContext(GlobalContext);

	return <p> {JSON.stringify(user)} </p>;
};

export default Profile;

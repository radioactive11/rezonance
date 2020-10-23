import { Actions } from './Actions';

export default (state, action) => {
	switch (action.type) {
		case Actions.UPDATE_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case Actions.UPDATE_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};

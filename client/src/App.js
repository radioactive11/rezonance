import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Pages
import Search from './pages/Search';
import Recommend from './pages/Recommend';
import Landing from './pages/Landing';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import Profile from './pages/Profile';

//Components
import PrivateRoute from './components/PrivateRoute';
import GlobalProvider from './context/GlobalState';

const App = () => {
	return (
		<GlobalProvider>
			<Router>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/recommend" component={Recommend} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/login" component={Login} />
					<PrivateRoute exact path="/profile" component={Profile} />
				</Switch>
			</Router>
		</GlobalProvider>
	);
};

export default App;

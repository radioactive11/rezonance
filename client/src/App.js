import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

//Components
import Search from "./Search.js"
import Recommend from "./Recommend.js"

const App = () => {
	return (
		
		<Router>
			<Switch>
				<Route exact path ="/search" component = {Search} />
				<Route exact path ="/recommend" component = {Recommend} />
			</Switch>
		</Router>
	)
}

export default App;

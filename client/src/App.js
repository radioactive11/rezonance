import React,{useState} from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"

//Components
import Search from "./pages/Search"
import Recommend from "./pages/Recommend"
import Landing from "./pages/Landing"

const App = () => {
	return (	
		<Router>
			<Switch>
				<Route exact path ="/" component = {Landing} />
				<Route exact path ="/search" component = {Search} />
				<Route exact path ="/recommend" component = {Recommend} />
			</Switch>
		</Router>
	)
}

export default App;

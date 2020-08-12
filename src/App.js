import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AuthentificationRoute from "./utilities/AuthentificationRoute";
import "./App.css";
import home from "./appPages/home";
import signup from "./appPages/signup";
import login from "./appPages/login";
import utilisateur from "./appPages/utilisateur";
import decode from "jwt-decode";
import TheNavbar from "./components/TheNavbar";
import { ThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createMuiTheme";
import lightBlue from "@material-ui/core/colors/lightBlue";
import Store from "./redux/store";
import { Provider } from "react-redux";
import { SET_AUTH } from "./redux/types";
import { getUserData, disconnectUser } from "./redux/actions/userAction";
import axios from "axios";

const theme = createTheme({
	palette: {
		primary: {
			main: lightBlue[500],
			light: "#73e8ff",
			dark: "#0086c3",
			contrastText: "#000",
		},
		secondary: {
			main: "#00838f",
			light: "#4fb3bf",
			dark: "#005662",
			contrastText: "#fff",
		},
	},
});

//for token
const ourToken = localStorage.TokenFromFirebase;

//deja authentifier
//let auth;

//décoder le token et mettre une date d'expiration
if (ourToken) {
	const ourTokenDecoded = decode(ourToken);
	if (ourTokenDecoded.exp * 1000 < Date.now()) {
		Store.dispatch(disconnectUser());
		window.location.href = "/";
		//auth = false;
	} else {
		Store.dispatch({ type: SET_AUTH });
		//auth = true;
		axios.defaults.headers.common["Authorization"] = ourToken;
		Store.dispatch(getUserData());
	}
}

class App extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<Provider store={Store}>
					<div className="App">
						<Router>
							<TheNavbar />
							<div className="container">
								<Switch>
									<Route exact path="/" component={home} />
									<AuthentificationRoute
										exact
										path="/signup"
										component={signup}
									/>
									<AuthentificationRoute
										exact
										path="/login"
										component={login}
									/>
									<Route exact path="/users/:handle" component={utilisateur} />
								</Switch>
							</div>
						</Router>
					</div>
				</Provider>
			</ThemeProvider>
		);
	}
}

export default App;

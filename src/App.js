import React, { useState, useEffect } from "react";
import {
	// withAuthenticator,
	AmplifyGreetings,
	AmplifyAuthenticator,
} from "@aws-amplify/ui-react";

import { Authenticator, Greetings } from "aws-amplify-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import { Router, Route } from "react-router-dom";
import "./App.css";
import ProductListPage from "./pages/ProductListPage";
import MarketListPage from "./pages/MarketListPage";
import ProfilePage from "./pages/ProfilePage";
import MarketPage from "./pages/MarketPage";
import Navbar from "./components/Navbar";
import { API, Auth, graphqlOperation, Hub } from "aws-amplify";
/* try: worked. CSS for components in "aws-amplify-react" */
import "@aws-amplify/ui/dist/style.css";
import { registerUser } from "./graphql/mutations";
import { getUser } from "./graphql/queries";
import { createBrowserHistory } from "history";
import LandingPage from "./pages/LandingPage";

export const UserContext = React.createContext();

export const browserHistory = createBrowserHistory();

const myTheme = {
	container: {
		backgroundColor: "black",
	},
	signInButton: {
		backgroundColor: "blue",
	},
};

function App() {
	const [authState, setAuthState] = useState();
	const [user, setUser] = useState();
	const [isLandingPage, setIsLandingPage] = useState(true);
	const [currentAuthUser, setCurrentAuthUser] = useState();

	useEffect(() => {
		/* get currentAuthUser to determine if we should show the landing page or straight into the app */
		Auth.currentAuthenticatedUser()
			.then((data) => {
				console.log(data);
				setCurrentAuthUser(data.username);
			})
			.catch((err) => {
				console.log("unauthed");
				setCurrentAuthUser(undefined);
			});

		onAuthUIStateChange((nextAuthState, authData) => {
			setAuthState(nextAuthState);
			setUser(authData);
		});

		/* Auth event listener (https://docs.amplify.aws/lib/auth/auth-events/q/platform/js)
			feat: when the user signs in, check if the user email has registered for 'User' table. If not: register. 
		*/
		Hub.listen("auth", (data) => {
			console.log(data);
			switch (data.payload.event) {
				case "signIn":
					registerNewUser(
						data.payload.data.attributes.sub,
						data.payload.data.attributes.email,
						data.payload.data.username
					);
					break;
				default:
					break;
			}
		});
	}, []);

	async function registerNewUser(userId, email, username) {
		try {
			// debugge r;
			const getUserData = await API.graphql(
				graphqlOperation(getUser, {
					id: userId,
				})
			);

			console.log(getUserData);

			if (!getUserData.data.getUser) {
				const result = await API.graphql(
					graphqlOperation(registerUser, {
						input: {
							id: userId,
							email,
							username,
						},
					})
				);

				// console.log(result.data);
			} else console.log(`${username} has already registered.`);
		} catch (err) {
			console.log(err);
		}
	}

	async function handleSignOut() {
		try {
			await Auth.signOut();
		} catch (err) {
			console.error(err);
		}
	}

	console.log(authState === AuthState.SignedIn && user);
	return authState === AuthState.SignedIn && user ? (
		<div className="app-wrapper">
			<div className="bg" />
			<UserContext.Provider value={{ user }}>
				<Router history={browserHistory}>
					<Navbar user={user} handleSignOut={handleSignOut} />
					<div className="app-container">
						<Route exact path="/markets" component={MarketListPage} />
						<Route exact path="/" component={ProductListPage} />
						<Route path="/profile">
							<ProfilePage cognitoUser={user} />
						</Route>

						<Route
							path="/markets/:marketId"
							component={({ match }) => (
								<MarketPage marketId={match.params.marketId} user={user} />
							)}
						/>
					</div>
				</Router>
			</UserContext.Provider>
		</div>
	) : isLandingPage ? (
		<LandingPage setIsLandingPage={setIsLandingPage} />
	) : (
		<div className="auth-wrapper">
			<div className="bg" />
			<AmplifyAuthenticator />
		</div>
	);
	// <AmplifyAuthenticator />
	// <div className="auth-wrapper">
	// 	<div className="bg" />
	// 	<AmplifyAuthenticator />
	// </div>
}

// export default withAuthenticator(App);
export default App;

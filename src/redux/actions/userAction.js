import { SET_USER, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTH } from "../types";
import axios from "axios";

/**
 * Fonction qui charge les données de l'utilisateur lors du login
 * depuis firebase grâce à axios et le dispatche
 *
 * @param {*} userData Les données que l'utilisateur saisi lors du login
 * @param {*} history  Permet d'envoyer les états dans l'url
 */

export const loginDataUser = (userData, history) => (dispatch) => {
	axios
		.post("/login", userData)
		.then((result) => {
			//Envoi l'identification vers l'acceuil du site si c'est bon
			console.log(result.data);
			localStorage.setItem("TokenFromFirebase", `Bearer ${result.data.token}`);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${result.data.token}`;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			//push state in url (history)
			history.push("/");
		})
		.catch((err) => {
			/*console.log(err.response.data);
			this.setState({
				erreurs: err.response.data,
            });*/
			dispatch({
				type: SET_ERRORS,
				chargeUtil: err.response.data,
			});
		});
};

/**
 * Fonction qui charge les données de l'utilisateur lors de la souscription
 * depuis firebase grâce à axios et le dispatche
 *
 * @param {*} newUserData Les données que l'utilisateur saisi lors de la souscription
 * @param {*} history     Permet d'envoyer les états dans l'url
 */
export const signupDataUser = (newUserData, history) => (dispatch) => {
	axios
		.post("/signup", newUserData)
		.then((result) => {
			//Envoi l'identification vers l'acceuil du site si c'est bon
			console.log(result.data);
			localStorage.setItem("TokenFromFirebase", `Bearer ${result.data.token}`);
			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${result.data.token}`;
			dispatch(getUserData());
			dispatch({ type: CLEAR_ERRORS });
			//push state in url (history)
			history.push("/");
		})
		.catch((err) => {
			/*console.log(err.response.data);
			this.setState({
				erreurs: err.response.data,
            });*/
			dispatch({
				type: SET_ERRORS,
				chargeUtil: err.response.data,
			});
		});
};

/**
 * Fonction de permet la déconnexion de l'utilisateur
 * en supprimant le token généré et désactive l'en-tête Authorization
 * et le dispatche
 */
export const disconnectUser = () => (dispatch) => {
	//supprimer le token
	localStorage.removeItem("TokenFromFirebase");
	//supprimer ou desactiver le 'Authorization' dans l'entête
	delete axios.defaults.headers.common["Authorization"];
	dispatch({ type: SET_UNAUTH });
};

/**
 * Fonction qui charge la photo de profil de l'utilisateur depuis firebase
 * et le dispatche dans tout l'application
 *
 * @param {*} image L'image à charger dans site
 */

export const chargerImage = (image) => (dispatch) => {
	axios
		.post("/user/image", image)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};

/**
 * Fonction qui modifie les informations l'utilisateur depuis firebase
 * et le dispatche dans tout l'application
 *
 * @param {*} infos Les informations de l'utilisateur à modifier
 */
export const modifInfo = (infos) => (dispatch) => {
	axios
		.post("/user", infos)
		.then(() => {
			dispatch(getUserData());
		})
		.catch((err) => console.log(err));
};

/**
 * Fonction qui dispatch les données
 */
export const getUserData = () => (dispatch) => {
	axios
		.get("/user")
		.then((result) => {
			dispatch({
				type: SET_USER,
				chargeUtil: result.data,
			});
		})
		.catch((err) => console.log(err));
};

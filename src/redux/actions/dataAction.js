import {
	SET_BLABLAS,
	LIKE,
	DISLIKE,
	FAIRE_BLABLA,
	DELETE_BLABLA,
	SET_ERRORS,
	CLEAR_ERRORS,
	SET_A_BLABLA,
	FAIRE_UN_COMMENTAIRE,
} from "../types";
import axios from "axios";

/**
 * Fonction qui dispatche tous les blablas depuis Firebase  et le dispatche
 */
export const getBlablas = () => (dispatch) => {
	axios
		.get("/blablas")
		.then((result) => {
			dispatch({
				type: SET_BLABLAS,
				chargeUtil: result.data,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_BLABLAS,
				chargeUtil: [],
			});
		});
};

/**
 * Fonction qui permet de liker un cuite dans la base de données et le dispatche
 *
 * @param {*} blablaId L'identifiant du Cuite(Blabla) à aimer
 */
export const likeBlabla = (blablaId) => (dispatch) => {
	axios
		.get(`/blabla/${blablaId}/like`)
		.then((result) => {
			dispatch({
				type: LIKE,
				chargeUtil: result.data,
			});
		})
		.catch((err) => console.log(err));
};

/**
 * Fonction qui permet de disliker un cuite dans la base de données et le dispatche
 *
 * @param {*} blablaId L'identifiant du Cuite(Blabla) à ne plus aimer
 */
export const dislikeBlabla = (blablaId) => (dispatch) => {
	axios
		.get(`/blabla/${blablaId}/unlike`)
		.then((result) => {
			dispatch({
				type: DISLIKE,
				chargeUtil: result.data,
			});
		})
		.catch((err) => console.log(err));
};

/**
 * Fonction qui permet de supprimer un cuite dans la base de données et le dispatche
 *
 * @param {*} blablaId L'identifiant du Cuite(Blabla) à supprimer
 */
export const supprimerBlabla = (blablaId) => (dispatch) => {
	axios
		.delete(`/blabla/${blablaId}`)
		.then(() => {
			dispatch({
				type: DELETE_BLABLA,
				chargeUtil: blablaId,
			});
		})
		.catch((err) => console.log(err));
};

/**
 * Fonction qui permet de faire un cuite, le met dans la base de données et le dispatche
 *
 * @param {*} newBlabla Le nouveau Cuite(Blabla) à poster
 */
export const faireUnBlabla = (newBlabla) => (dispatch) => {
	axios
		.post("/blabla", newBlabla)
		.then((result) => {
			dispatch({
				type: FAIRE_BLABLA,
				chargeUtil: result.data,
			});
			dispatch({
				type: CLEAR_ERRORS,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				chargeUtil: err.response.data,
			});
		});
};

/**
 * Fonction qui permet d'obtenir le Cuite(Blabla) depuis la base de données et le dispatche
 *
 * @param {*} blablaId Le Cuite(Blabla) à afficher
 */
export const infosBlabla = (blablaId) => (dispatch) => {
	axios
		.get(`/blabla/${blablaId}`)
		.then((result) => {
			dispatch({
				type: SET_A_BLABLA,
				chargeUtil: result.data,
			});
		})
		.catch((err) => console.log(err));
};

/**
 *
 * @param {*} blablaId       Le Cuite(Blabla) à afficher
 * @param {*} leCommentaire  Le commentaire à faire
 */
export const faireUnCommentaire = (blablaId, leCommentaire) => (dispatch) => {
	axios
		.post(`/blabla/${blablaId}/commenteUnBlabla`, leCommentaire)
		.then((result) => {
			dispatch({
				type: FAIRE_UN_COMMENTAIRE,
				chargeUtil: result.data,
			});
			dispatch({
				type: CLEAR_ERRORS,
			});
		})
		.catch((err) => {
			dispatch({
				type: SET_ERRORS,
				chargeUtil: err.response.data,
			});
		});
};

/**
 * Cette fonction permet d'obtenir les infos d'un utilisateur depuis Firebase
 * et le dispatche
 *
 * @param {*} userHandle  L'utilisateur à consulter
 */
export const getUserInfos = (userHandle) => (dispatch) => {
	axios
		.get(`/user/${userHandle}`)
		.then((result) => {
			dispatch({
				type: SET_BLABLAS,
				chargeUtil: result.data.blablas,
			});
		})
		.catch(() => {
			dispatch({
				type: SET_BLABLAS,
				chargeUtil: null,
			});
		});
};

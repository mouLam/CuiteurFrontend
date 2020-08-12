import {
	SET_USER,
	SET_AUTH,
	SET_UNAUTH,
	LIKE,
	DISLIKE,
	SET_ERRORS,
	CLEAR_ERRORS,
} from "../types";

const etatInitial = {
	auth: false,
	credentials: {},
	likes: [],
	notifications: [],
	erreurs: null,
};

export default function (etat = etatInitial, action) {
	switch (action.type) {
		case SET_AUTH:
			return {
				...etat,
				auth: true,
			};

		case SET_UNAUTH:
			return etatInitial;
		case SET_USER:
			return {
				auth: true,
				...action.chargeUtil,
			};
		case LIKE:
			return {
				...etat,
				likes: [
					...etat.likes,
					{
						userHandle: etat.credentials.handle,
						blablaId: action.chargeUtil.blablaId,
					},
				],
			};
		case DISLIKE:
			return {
				...etat,
				likes: etat.likes.filter(
					(like) => like.blablaId !== action.chargeUtil.blablaId
				),
			};
		case SET_ERRORS:
			return {
				...etat,
				erreurs: action.chargeUtil,
			};
		case CLEAR_ERRORS:
			return {
				...etat,
				erreurs: null,
			};
		default:
			return etat;
	}
}

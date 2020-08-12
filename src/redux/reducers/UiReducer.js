import { SET_ERRORS, CLEAR_ERRORS } from "../types";

const etatInitial = {
	erreurs: null,
};

export default function (etat = etatInitial, action) {
	switch (action.type) {
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

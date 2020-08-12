import {
	SET_BLABLAS,
	LIKE,
	DISLIKE,
	FAIRE_BLABLA,
	FAIRE_UN_COMMENTAIRE,
	DELETE_BLABLA,
	SET_A_BLABLA,
} from "../types";

const etatInitial = {
	blabla: {},
	blablas: [],
};

export default function (etat = etatInitial, action) {
	switch (action.type) {
		case SET_BLABLAS:
			return {
				...etat,
				blablas: action.chargeUtil,
			};
		case LIKE:
			// recherche dans les blablas, le blabla correspondant
			// et modifer son nombre de 'J'AIME'
			let indice1 = etat.blablas.findIndex(
				(blabla) => blabla.blablaId === action.chargeUtil.blablaId
			);
			etat.blablas[indice1] = action.chargeUtil;
			return {
				...etat,
			};
		case DISLIKE:
			let indice2 = etat.blablas.findIndex(
				(blabla) => blabla.blablaId === action.chargeUtil.blablaId
			);
			etat.blablas[indice2] = action.chargeUtil;
			return {
				...etat,
			};
		case FAIRE_BLABLA:
			return {
				...etat,
				blablas: [action.chargeUtil, ...etat.blablas],
			};
		case FAIRE_UN_COMMENTAIRE:
			return {
				...etat,
				blablas: {
					...etat.blabla,
					commentaires: [action.chargeUtil, ...etat.blabla.commentaires],
				},
			};

		case DELETE_BLABLA:
			let indice3 = etat.blablas.findIndex(
				(blabla) => blabla.blablaId === action.chargeUtil
			);
			//supprimer le blabla en question
			etat.blablas.slice(indice3, 1);
			return {
				...etat,
			};
		case SET_A_BLABLA:
			return {
				...etat,
				blabla: action.chargeUtil,
			};
		default:
			return etat;
	}
}

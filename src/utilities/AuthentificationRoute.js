import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Tant que la date d'expriration du token n'est pas atteint
// on peut pas retourner tant qu'on ne se deconnecte pas
const AuthentificationRoute = ({ component: Component, auth, ...variable }) => (
	<Route
		{...variable}
		render={(props) =>
			auth === true ? <Redirect to="/" /> : <Component {...props} />
		}
	/>
);

AuthentificationRoute.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (etat) => ({
	auth: etat.user.auth,
});

export default connect(mapStateToProps)(AuthentificationRoute);

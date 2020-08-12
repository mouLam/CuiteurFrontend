import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CuiteurIcon from "../images/panCuiteur.png";
import SignUpIllustrator from "../images/undraw_social_update_puv0.svg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputAdornment } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import LockIcon from "@material-ui/icons/Lock";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signupDataUser } from "../redux/actions/userAction";
import PropTypes from "prop-types";

/**
 * Le style de la page d'inscription
 */
const styles = {
	formStyle: {
		textAlign: "center",
	},
	titleStyle: {
		margin: "15px auto 15px auto",
	},
	iconStyle: {
		width: 100,
		height: 100,
		margin: "15px auto 15px auto",
	},
	TextFieldStyle: {
		margin: "15px auto 15px auto",
	},
	SubmmitStyle: {
		marginTop: 15,
	},
	GeneralErrorStyle: {
		marginTop: 10,
		color: "red",
		fontSize: 11,
	},
	IllustratorStyle: {
		width: 550,
		height: 600,
	},
};

export class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			handle: "",
			erreurs: {},
		};
	}

	/**
	 * Fonction d'envoi du formulaire
	 *
	 * Envoi l'inscription vers l'acceuil du site si c'est bon
	 */
	handleSubmit = (event) => {
		event.preventDefault();

		const donneesSignUp = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		};

		console.log(donneesSignUp);
		this.props.signupDataUser(donneesSignUp, this.props.history);
	};

	/**
	 * handleChangeWrite
	 *
	 * [] en fonction du type attribuer au champs de chaque input du formulaire
	 */
	handleChangeWrite = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value, //
		});
	};

	/**
	 *  Affiche les erreurs localement depuis UiReducer
	 */
	componentWillReceiveProps(nouveauProps) {
		if (nouveauProps.Ui.erreurs) {
			this.setState({ erreurs: nouveauProps.Ui.erreurs });
		}
	}

	/**
	 * Le rendu de la page d'inscription
	 */
	render() {
		const { classes } = this.props;
		const { erreurs } = this.state;

		return (
			<Grid container spacing={3} className={classes.formStyle}>
				<Grid item xs={7} sm={6}>
					<img
						src={SignUpIllustrator}
						alt="Illustrator"
						className={classes.IllustratorStyle}
					/>
				</Grid>
				<Grid item xs={7} sm={6}>
					<img
						src={CuiteurIcon}
						alt="The cuiteur icon"
						className={classes.iconStyle}
					/>
					<Typography
						className={classes.titleStyle}
						variant="h4"
						color="secondary"
					>
						S'inscrire à Cuiteur
					</Typography>

					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email-type-with-icon-circle-account"
							name="email"
							type="email"
							label="Votre Email"
							className={classes.TextFieldStyle}
							value={this.state.email}
							onChange={this.handleChangeWrite}
							fullWidth
							helperText={erreurs.email}
							error={erreurs.email ? true : false}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<AlternateEmailIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id="password-type-with-icon-circle-password"
							name="password"
							type="password"
							label="Votre mot de passe"
							className={classes.TextFieldStyle}
							value={this.state.password}
							onChange={this.handleChangeWrite}
							fullWidth
							helperText={erreurs.password}
							error={erreurs.password ? true : false}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LockIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id="confirm-password-type-with-icon-circle-password"
							name="confirmPassword"
							type="password"
							label="Confirmer le mot de passe"
							className={classes.TextFieldStyle}
							value={this.state.confirmPassword}
							onChange={this.handleChangeWrite}
							fullWidth
							helperText={erreurs.confirmPassword}
							error={erreurs.confirmPassword ? true : false}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<ConfirmationNumberIcon />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id="handle-with-icon-face"
							name="handle"
							type="text"
							label="Votre nom"
							className={classes.TextFieldStyle}
							value={this.state.handle}
							onChange={this.handleChangeWrite}
							fullWidth
							helperText={erreurs.handle}
							error={erreurs.handle ? true : false}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<FaceIcon />
									</InputAdornment>
								),
							}}
						/>
						{erreurs.general && (
							<Typography variant="body2" className={classes.GeneralErrorStyle}>
								{erreurs.general}
							</Typography>
						)}
						<Button
							type="submit"
							color="secondary"
							variant="contained"
							className={classes.SubmmitStyle}
						>
							S'inscrire
						</Button>
						<br /> <br />
						<p>
							{" "}
							Vous êtes déjà inscrit ? <Link to="/login">
								Connectez-vous !
							</Link>{" "}
						</p>
					</form>
				</Grid>
			</Grid>
		);
	}
}

// Définit le type des props
signup.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	signupDataUser: PropTypes.func.isRequired,
	Ui: PropTypes.object.isRequired,
};

const mapStateToProps = (etat) => ({
	user: etat.user,
	Ui: etat.Ui,
});

const mapActionToProps = {
	signupDataUser,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(signup));

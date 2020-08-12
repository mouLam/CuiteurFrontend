import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import CuiteurIcon from "../images/panCuiteur.png";
import loginIllustrator from "../images/undraw_access_account_99n5.svg";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputAdornment } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginDataUser } from "../redux/actions/userAction";

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

export class login extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			erreurs: {},
		};
	}

	/**
	 * handleSubmit
	 */
	handleSubmit = (event) => {
		event.preventDefault();

		const donneesLogin = {
			email: this.state.email,
			password: this.state.password,
		};
		//console.log(donneesLogin);
		//calling login in actionUser REDUX
		this.props.loginDataUser(donneesLogin, this.props.history);
	};

	/**
	 * handleChangeWrite
	 *
	 * [] en fonction du type attribuer au champs de chaque input du formulaire
	 */
	handleChangeWrite = (event) => {
		this.setState({
			[event.currentTarget.type]: event.currentTarget.value,
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
	 * Le rendu de la page Login
	 */
	render() {
		const { classes } = this.props;
		const { erreurs } = this.state;

		return (
			<Grid container spacing={3} className={classes.formStyle}>
				<Grid item xs={7} sm={6}>
					<img
						src={loginIllustrator}
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
						Se connecter à Cuiteur
					</Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email-type-with-icon-circle-account"
							name="email-with-icon"
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
										<AccountCircle />
									</InputAdornment>
								),
							}}
						/>
						<TextField
							id="password-type-with-icon-circle-password"
							name="password-with-icon"
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
							Se connecter
						</Button>
						<br /> <br />
						<p>
							{" "}
							Vous n'êtes pas encore inscrit ?{" "}
							<Link to="/signup">Inscrivez-vous !</Link>{" "}
						</p>
					</form>
				</Grid>
			</Grid>
		);
	}
}

// Définit le type des props
login.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	loginDataUser: PropTypes.func.isRequired,
	Ui: PropTypes.object.isRequired,
};

const mapStateToProps = (etat) => ({
	user: etat.user,
	Ui: etat.Ui,
});

const mapActionToProps = {
	loginDataUser,
};

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(login));

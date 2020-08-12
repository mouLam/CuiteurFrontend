import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { faireUnCommentaire } from "../redux/actions/dataAction";
import SendIcon from "@material-ui/icons/Send";

require("dayjs/locale/fr");

const styles = {
	separateurStyle: {
		marginBottom: 15,
		border: "1px solid rgb(0,0,0,0.1)",
		width: "90%",
	},
	imageComStyle: {
		maxwidth: "100%",
		height: 100,
		borderRadius: "60%",
	},
	donneesComStyle: {
		marginLeft: 20,
	},
	formCommentStyle: {
		textAlign: "center",
		marginBottom: "10px",
	},
};

export class Commentaire extends Component {
	state = {
		body: "",
		erreurs: {},
	};

	/**
	 * Fonction d'envoi du formulaire
	 */
	handleEnvoyerCommentaire = (event) => {
		event.preventDefault();
		this.props.faireUnCommentaire(this.props.commentaires.blablaId, {
			body: this.state.body,
		});
	};

	/**
	 * handleChange
	 *
	 * [] en fonction du type attribuer au champs de chaque input du formulaire
	 */
	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
	};

	/**
	 *  Affiche les erreurs localement depuis UiReducer
	 */
	componentWillReceiveProps(nouveauProps) {
		if (nouveauProps.Ui.erreurs) {
			this.setState({ erreurs: nouveauProps.Ui.erreurs });
		}
		if (!nouveauProps.Ui.erreurs) {
			this.setState({
				body: "",
			});
		}
	}

	render() {
		const {
			classes,
			user: { auth },
			commentaires,
		} = this.props;
		const { erreurs } = this.state;

		// use plugin dayjs RelativeTime
		dayjs.extend(relativeTime);
		dayjs.locale("fr");

		const commentaireFormulaire = auth ? (
			<Grid item sm={9} className={classes.formCommentStyle}>
				<form onSubmit={this.handleEnvoyerCommentaire}>
					<TextField
						name="body"
						type="text"
						label="Faire un commentaire"
						className={classes.TextFieldStyle}
						value={this.state.body}
						onChange={this.handleChange}
						fullWidth
						helperText={erreurs.body}
						error={erreurs.email ? true : false}
					/>
					<br />
					<br />
					<Button
						type="submit"
						color="secondary"
						variant="contained"
						className={classes.SubmmitStyle}
						startIcon={<SendIcon />}
					>
						Je commente
					</Button>
				</form>
				<br className={classes.separateurStyle} />
			</Grid>
		) : null;

		console.log(commentaires);

		return (
			<Grid container>
				{commentaireFormulaire}
				{commentaires.map((unCommentaire) => {
					const { userImage, userHandle, body, createdAt } = unCommentaire;
					return (
						<Fragment key={createdAt}>
							<Grid item sm={11}>
								<Grid container>
									<Grid item sm={2}>
										<img
											src={userImage}
											alt="profil"
											className={classes.imageComStyle}
										/>
									</Grid>
									<Grid item sm={9}>
										<div className={classes.donneesComStyle}>
											<Typography
												variant="h5"
												color="primary"
												component={Link}
												to={`/users/${userHandle}`}
											>
												{userHandle}
											</Typography>
											<Typography variant="body1">{body}</Typography>
											<Typography variant="body2" color="textSecondary">
												{dayjs(createdAt).fromNow()}
											</Typography>
										</div>
									</Grid>
								</Grid>
							</Grid>
							<br className={classes.separateurStyle} />
						</Fragment>
					);
				})}
			</Grid>
		);
	}
}

Commentaire.propTypes = {
	classes: PropTypes.object.isRequired,
	commentaires: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
	Ui: PropTypes.object.isRequired,
	faireUnCommentaire: PropTypes.func.isRequired,
};

const mapStateToProps = (etat) => ({
	user: etat.user,
	Ui: etat.Ui,
});

const mapActionsToProps = {
	faireUnCommentaire,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Commentaire));

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import LinkFromMaterialUI from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import PlaceIcon from "@material-ui/icons/Place";
import HttpIcon from "@material-ui/icons/Http";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import dayjs from "dayjs";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Tooltip from "@material-ui/core/Tooltip";
import { disconnectUser, chargerImage } from "../redux/actions/userAction";
import EditInfoUser from "./EditInfoUser";

const styles = (theme) => ({
	paperStyle: {
		padding: 20,
		marginTop: 10,
		background: "linear-gradient(45deg, #bbdefb 10%, #b3e5fc 90%)",
		boxShadow: "0 2px 4px 1px #bdbdbd",
	},
	profileStyle: {
		"& .div-imageProfil": {
			position: "relative",
			textAlign: "center",
			"& buttons": {
				position: "absolute",
				left: "70%",
				top: "80%",
			},
		},
		"& .photoProfilStyle": {
			heigh: 200,
			width: 200,
			objectFit: "cover",
			maxWidth: "100%",
			borderRadius: "100px",
		},
		"& .details-profil": {
			textAlign: "center",
			"& span, svg": {
				verticalAlign: "middle",
			},
			"& a": {
				color: theme.palette.primary.main,
			},
		},
		"& br": {
			margin: "0 0 10px 0",
			border: "none",
		},
		"& svg.button": {
			"&:hover": {
				cursor: "pointer",
			},
		},
	},
	buttonsStyle: {
		textAlign: "center",
		"& a": {
			margin: "20px 10px",
		},
	},
});

export class ProfilUser extends Component {
	/**
	 * Handle pour la déconnexion de l'utilisateur
	 */
	handleDisconnect = () => {
		this.props.disconnectUser();
	};

	/**
	 * Handle pour changer le photo de profil
	 * @param {*} event
	 */
	handleChangeImage = (event) => {
		const imageTochange = event.currentTarget.files[0];
		// envoi au server
		const donnee = new FormData();
		donnee.append("image", imageTochange, imageTochange.name);
		this.props.chargerImage(donnee);
	};

	/**
	 * Handle pour spécifier l'image qu'on veut changer
	 */
	handleEditPicture = () => {
		const imageToEdit = document.getElementById("inputImage");
		imageToEdit.click();
	};

	render() {
		const {
			classes,
			user: {
				credentials: { handle, bio, website, imageUrl, location, createdAt },
				auth,
			},
		} = this.props;

		let profile = auth ? (
			<Paper className={classes.paperStyle}>
				<div className={classes.profileStyle}>
					<Tooltip placement="right" title="Se déconnecter">
						<IconButton onClick={this.handleDisconnect}>
							<ExitToAppIcon color="secondary" />
						</IconButton>
					</Tooltip>
					<div className="div-imageProfil">
						<img src={imageUrl} alt="profil" className="photoProfilStyle" />
						<input
							type="file"
							id="inputImage"
							onChange={this.handleChangeImage}
							hidden="hidden"
						/>
						<Tooltip placement="right-end" title="Changer de photo">
							<IconButton className="buttons" onClick={this.handleEditPicture}>
								<AddAPhotoIcon color="primary" />
							</IconButton>
						</Tooltip>
					</div>
					<br />
					<div className="details-profil">
						<LinkFromMaterialUI
							variant="h5"
							component={Link}
							to={`/users/${handle}`}
							color="primary"
						>
							@{handle}
						</LinkFromMaterialUI>
					</div>
					<br />
					{bio && <Typography variant="body2">{bio}</Typography>}
					<br />
					{website && (
						<Fragment>
							<HttpIcon color="primary" />
							<a href={website} target="_blank" rel="noopener noreferrer">
								{" "}
								{website}
							</a>
							<br />
						</Fragment>
					)}
					<br />
					{location && (
						<Fragment>
							<PlaceIcon color="primary" />
							<span>{location}</span>
							<br />
						</Fragment>
					)}
					<br />
					<EventAvailableIcon color="primary" />{" "}
					<span>Inscrit depuis {dayjs(createdAt).format("MMM YYYY")}</span>
					<EditInfoUser />
				</div>
			</Paper>
		) : (
			<Paper className={classes.paperStyle}>
				<Typography variant="body2" align="center">
					{" "}
					Pas de profil trouvé. Veuillez-vous connecter ou vous inscrire
				</Typography>
				<div className={classes.buttonsStyle}>
					<Button
						component={Link}
						to="/login"
						variant="contained"
						color="primary"
						startIcon={<PermContactCalendarIcon />}
					>
						Se connecter
					</Button>
					<p> OU </p>
					<Button
						component={Link}
						to="/signup"
						variant="contained"
						color="secondary"
						startIcon={<RecentActorsIcon />}
					>
						S'inscrire
					</Button>
				</div>
			</Paper>
		);

		return profile;
	}
}

// Définit le type des props
ProfilUser.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	chargerImage: PropTypes.func.isRequired,
	disconnectUser: PropTypes.func.isRequired,
};

const mapStateToProps = (etat) => ({
	user: etat.user,
});

const mapActionsToProps = {
	chargerImage,
	disconnectUser,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(ProfilUser));

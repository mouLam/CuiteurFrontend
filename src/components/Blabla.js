import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
	likeBlabla,
	dislikeBlabla,
	supprimerBlabla,
	infosBlabla,
} from "../redux/actions/dataAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Commentaire from "./Commentaire";
require("dayjs/locale/fr");

const styles = {
	cardStyle: {
		position: "relative",
		marginTop: 10,
		marginBottom: 10,
		display: "flex",
		background: "linear-gradient(45deg, #bbdefb 10%, #b3e5fc 90%)",
		borderRadius: 4,
		boxShadow: "0 2px 4px 1px #bdbdbd",
	},
	contenuStyle: {
		padding: 20,
	},
	imageStyle: {
		minWidth: 110,
		margin: 5,
		borderRadius: "25% 10%", //100px
	},
	imageCommentaireStyle: {
		width: 150,
		borderRadius: "100px",
	},
	buttonSupprimerStyle: {
		position: "absolute",
		top: "3%",
		left: "88%",
	},
};

class Blabla extends Component {
	state = {
		openForDelete: false,
		openSeeComments: false,
		commentaires: [],
	};

	blablaAimer = () => {
		if (
			this.props.user.likes &&
			this.props.user.likes.find(
				(like) => like.blablaId === this.props.blablaProp.blablaId
			)
		) {
			return true;
		} else {
			return false;
		}
	};

	aimeBlabla = () => {
		this.props.likeBlabla(this.props.blablaProp.blablaId);
	};

	nonAimeBlabla = () => {
		this.props.dislikeBlabla(this.props.blablaProp.blablaId);
	};

	handleOpenDialog = () => {
		this.setState({
			openForDelete: true,
		});
	};

	handleCloseDialog = () => {
		this.setState({
			openForDelete: false,
		});
	};

	handleSupprimer = () => {
		this.props.supprimerBlabla(this.props.blablaProp.blablaId);
		this.setState({
			openForDelete: false,
		});
	};

	handleOpenComments = () => {
		this.setState({
			openSeeComments: true,
		});
		this.props.infosBlabla(this.props.blablaProp.blablaId);
	};

	handleCloseComments = () => {
		this.setState({
			openSeeComments: false,
		});
	};

	render() {
		const {
			classes,
			blablaProp: {
				userHandle,
				body,
				userImage,
				likeCount,
				commentCount,
				createdAt,
			},
			user: {
				auth,
				credentials: { handle },
			},
		} = this.props;

		// use plugin dayjs RelativeTime
		dayjs.extend(relativeTime);
		dayjs.locale("fr");

		// Condition d'aimer un blabla
		const buttonAimer = !auth ? (
			<Tooltip placement="bottom" title="J'aime">
				<Link to="/login">
					<IconButton>
						<FavoriteBorderIcon color="secondary" />
					</IconButton>
				</Link>
			</Tooltip>
		) : this.blablaAimer() ? (
			<Tooltip placement="bottom" title="Je n'aime plus">
				<IconButton onClick={this.nonAimeBlabla}>
					<FavoriteIcon color="secondary" />
				</IconButton>
			</Tooltip>
		) : (
			<Tooltip placement="bottom" title="J'aime">
				<IconButton onClick={this.aimeBlabla}>
					<FavoriteBorderIcon color="secondary" />
				</IconButton>
			</Tooltip>
		);

		//Condition supprimer un blabla
		const buttonSupprimer =
			auth && userHandle === handle ? (
				<Fragment>
					<Tooltip placement="bottom" title="Supprimer le blabla">
						<IconButton
							className={classes.buttonSupprimerStyle}
							onClick={this.handleOpenDialog}
						>
							<DeleteOutlineIcon color="secondary" />
						</IconButton>
					</Tooltip>
					<Dialog
						open={this.state.openForDelete}
						onClose={this.handleCloseDialog}
						maxWidth="sm"
						fullWidth
						aria-labelledby="delete-dialog-title"
					>
						<DialogTitle id="delete-dialog-title">
							Etes vous sûr de supprimer ce blabla ?
						</DialogTitle>
						<DialogActions>
							<Button
								onClick={this.handleCloseDialog}
								color="primary"
								variant="outlined"
								startIcon={<CancelIcon />}
							>
								Annuler
							</Button>
							<Button
								onClick={this.handleSupprimer}
								color="primary"
								variant="contained"
								startIcon={<DeleteSweepIcon />}
							>
								Supprimer
							</Button>
						</DialogActions>
					</Dialog>
				</Fragment>
			) : null;

		//Grille commentaire
		const GrilleCommentaire = (
			<Grid container spacing={14}>
				<Grid item sm={4}>
					<img
						src={userImage}
						alt="Profil"
						className={classes.imageCommentaireStyle}
					/>
				</Grid>
				<Grid item sm={8}>
					<Typography
						variant="h5"
						color="primary"
						component={Link}
						to={`/users/${userHandle}`}
					>
						@{userHandle}
					</Typography>

					{buttonSupprimer}
					<br />
					<Typography variant="body1">{body}</Typography>
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					{buttonAimer}

					<span> {likeCount} J'aime </span>
					<Tooltip placement="bottom" title="Commentaires">
						<IconButton>
							<CommentIcon color="secondary" />
						</IconButton>
					</Tooltip>
					<span> {commentCount} Commentaires </span>
				</Grid>

				{<Commentaire commentaires={this.state.commentaires} />}
			</Grid>
		);

		//Le Commentaire
		const listeCommentaires = (
			<Fragment>
				<Tooltip placement="bottom" title="Voir les commentaires">
					<IconButton onClick={this.handleOpenComments}>
						<UnfoldMoreIcon color="secondary" />
					</IconButton>
				</Tooltip>
				<Dialog
					open={this.state.openSeeComments}
					onClose={this.handleCloseComments}
					maxWidth="sm"
					fullWidth
					className={classes.contenuStyle}
					aria-labelledby="comments-dialog-title"
				>
					<DialogTitle id="comments-dialog-title">Les commentaires</DialogTitle>

					<DialogContent>{GrilleCommentaire}</DialogContent>

					<DialogActions>
						<Button
							onClick={this.handleCloseComments}
							color="secondary"
							variant="contained"
							startIcon={<CloseIcon />}
						>
							Fermer
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
		return (
			<Card className={classes.cardStyle}>
				<CardMedia
					className={classes.imageStyle}
					image={userImage}
					title="Photo profil"
				/>
				<CardContent className={classes.contenuStyle}>
					<Typography
						variant="h5"
						color="primary"
						component={Link}
						to={`/users/${userHandle}`}
					>
						{userHandle}
					</Typography>

					{buttonSupprimer}

					<Typography variant="body1">{body}</Typography>
					<Typography variant="body2" color="textSecondary">
						{dayjs(createdAt).fromNow()}
					</Typography>

					{buttonAimer}
					<span> {likeCount} J'aime </span>

					<Tooltip placement="bottom" title="Commentaires">
						<IconButton>
							<CommentIcon color="secondary" />
						</IconButton>
					</Tooltip>
					<span> {commentCount} Commentaires </span>

					{listeCommentaires}
				</CardContent>
			</Card>
		);
	}
}

Blabla.propTypes = {
	classes: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	likeBlabla: PropTypes.func.isRequired,
	dislikeBlabla: PropTypes.func.isRequired,
	supprimerBlabla: PropTypes.func.isRequired,
	blablaProp: PropTypes.object.isRequired,
	infosBlabla: PropTypes.func.isRequired,
};

const mapStateToProps = (etat) => ({
	user: etat.user,
	data: etat.data.blabla,
});

const mapActionsToProps = {
	likeBlabla,
	dislikeBlabla,
	supprimerBlabla,
	infosBlabla,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(Blabla));

import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { modifInfo } from "../redux/actions/userAction";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import FilterListIcon from "@material-ui/icons/FilterList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import { TextField } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const styles = {
	textFieldStyle: {
		marginBottom: "10px",
	},
	iconButtonStyle: {
		float: "right",
	},
};

export class EditInfoUser extends Component {
	state = {
		bio: "",
		location: "",
		website: "",
		openForEdit: false,
	};

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value, // [] en fonction du type attribuer au champs
		});
	};

	// handle déclenche lorsque l'utilisateur veut modifer ses infos
	handleOpenEdit = () => {
		this.setState({
			openForEdit: true,
			bio: this.props.credentials.bio ? this.props.credentials.bio : "",
			location: this.props.credentials.location
				? this.props.credentials.location
				: "",
			website: this.props.credentials.website
				? this.props.credentials.website
				: "",
		});
	};

	// handle déclenche lorsque l'utilisateur veut enregister ses infos modifiés
	handleSaveEdit = () => {
		const donneeModif = {
			bio: this.state.bio,
			location: this.state.location,
			website: this.state.website,
		};
		this.props.modifInfo(donneeModif);
		this.handleCloseEdit();
	};

	// handle déclenche lorsque l'utilisateur ferme les modifications
	handleCloseEdit = () => {
		this.setState({
			openForEdit: false,
		});
	};

	// recupérer les infos  déjà saisi de l'utilisateur
	componentDidMount() {
		const { credentials } = this.props;
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			location: credentials.location ? credentials.location : "",
			website: credentials.website ? credentials.website : "",
		});
	}

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Tooltip placement="left" title="Modifer vos infos">
					<IconButton
						className={classes.iconButtonStyle}
						onClick={this.handleOpenEdit}
					>
						<FilterListIcon color="secondary" />
					</IconButton>
				</Tooltip>
				<Dialog
					open={this.state.openForEdit}
					onClose={this.handleCloseEdit}
					maxWidth="sm"
					fullWidth
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">
						Modifier vos informations
					</DialogTitle>
					<DialogContent>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Votre biographie"
								rows="3"
								multiline
								fullWidth
								value={this.state.bio}
								onChange={this.handleChange}
								className={classes.textFieldStyle}
							/>
							<TextField
								name="location"
								type="text"
								label="Votre localisation"
								multiline
								fullWidth
								value={this.state.location}
								onChange={this.handleChange}
								className={classes.textFieldStyle}
							/>
							<TextField
								name="website"
								type="text"
								label="Votre siteweb"
								multiline
								fullWidth
								value={this.state.website}
								onChange={this.handleChange}
								className={classes.textFieldStyle}
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.handleCloseEdit}
							color="primary"
							variant="outlined"
							startIcon={<CancelIcon />}
						>
							Annuler
						</Button>
						<Button
							onClick={this.handleSaveEdit}
							color="primary"
							variant="contained"
							startIcon={<CheckCircleIcon />}
						>
							Enregistrer
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

// Définit le type des props
EditInfoUser.propTypes = {
	classes: PropTypes.object.isRequired,
	modifInfo: PropTypes.func.isRequired,
};
const mapStateToProps = (etat) => ({
	credentials: etat.user.credentials,
});

const mapActionsToProps = {
	modifInfo,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(EditInfoUser));

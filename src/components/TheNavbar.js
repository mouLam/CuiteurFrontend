import React, { Component, Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MicIcon from "@material-ui/icons/Mic";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { faireUnBlabla } from "../redux/actions/dataAction";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CuiteurIcon from "../images/panCuiteur.png";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
	textFieldStyle: {
		marginBottom: "10px",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		fontFamily: "Ubuntu",
		color: "#b2ebf2",
		fontSize: "40px",
	},
	IllustratorStyle: {
		width: 50,
		height: 50,
	},
});

class TheNavbar extends Component {
	state = {
		body: "",
		openForCuite: false,
		openNotif: false,
		erreurs: {},
	};

	handleOpenCuite = () => {
		this.setState({
			openForCuite: true,
		});
	};

	handleCloseCuite = () => {
		this.setState({
			openForCuite: false,
			erreurs: {},
		});
	};

	handleOpenNotif = () => {
		this.setState({
			openNotif: true,
		});
	};

	handleCloseNotif = () => {
		this.setState({
			openNotif: false,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		this.props.faireUnBlabla({
			body: this.state.body,
		});
	};

	handleChange = (event) => {
		this.setState({
			[event.currentTarget.name]: event.currentTarget.value,
		});
	};

	handleSupprimer = () => {
		this.props.supprimerBlabla(this.props.blablaProp.blablaId);
		this.setState({
			openForDelete: false,
		});
	};

	//afficher les erreurs localement depuis UiReducer
	componentWillReceiveProps(nouveauProps) {
		if (nouveauProps.Ui.erreurs) {
			this.setState({ erreurs: nouveauProps.Ui.erreurs });
		}
		if (!nouveauProps.Ui.erreurs) {
			this.setState({
				body: "",
			});
			this.handleCloseCuite();
		}
	}

	render() {
		const { classes, auth } = this.props;
		const { erreurs } = this.state;
		return (
			<AppBar>
				<Toolbar className="nav-container">
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="cuiteurLogo"
					>
						<Link to="/">
							<img
								src={CuiteurIcon}
								alt="logo"
								className={classes.IllustratorStyle}
							/>
						</Link>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Cuiteur
					</Typography>

					{auth ? (
						<Fragment>
							<Link to="/">
								<Tooltip placement="bottom" title="Home">
									<IconButton className="buttons">
										<HomeIcon color="primary" />
									</IconButton>
								</Tooltip>
							</Link>

							<Fragment>
								<Tooltip placement="bottom" title="Notifications">
									<IconButton
										className="buttons"
										onClick={this.handleOpenNotif}
									>
										<NotificationsIcon color="primary" />
									</IconButton>
								</Tooltip>
								<Dialog
									open={this.state.openNotif}
									onClose={this.handleCloseNotif}
									maxWidth="sm"
									fullWidth
									aria-labelledby="notif-dialog-title"
								>
									<DialogTitle id="notif-dialog-title">
										Vos notifications
									</DialogTitle>
									<DialogContent>
										Les notifications ne sont pas encore implémentées !
									</DialogContent>
									<DialogActions>
										<Button
											onClick={this.handleCloseNotif}
											color="primary"
											variant="outlined"
											startIcon={<CancelIcon />}
										>
											Fermer
										</Button>
									</DialogActions>
								</Dialog>
							</Fragment>

							<Fragment>
								<Tooltip placement="bottom" title="Faire un Cuite">
									<IconButton
										className="buttons"
										onClick={this.handleOpenCuite}
									>
										<MicIcon color="primary" />
									</IconButton>
								</Tooltip>
								<Dialog
									open={this.state.openForCuite}
									onClose={this.handleCloseCuite}
									maxWidth="sm"
									fullWidth
									aria-labelledby="cuite-dialog-title"
								>
									<DialogTitle id="cuite-dialog-title">
										Faites un Cuite(Blabla)
									</DialogTitle>
									<DialogContent>
										<form>
											<TextField
												name="body"
												type="text"
												label="Postez un Cuite dans le réseau social"
												rows="3"
												placeholder="Mon Cuite, ici !"
												multiline
												fullWidth
												value={this.state.body}
												onChange={this.handleChange}
												className={classes.textFieldStyle}
												error={erreurs.body ? true : false}
												helperText={erreurs.body}
											/>
										</form>
									</DialogContent>
									<DialogActions>
										<Button
											onClick={this.handleCloseCuite}
											color="primary"
											variant="outlined"
											startIcon={<CancelIcon />}
										>
											Annuler
										</Button>
										<Button
											onClick={this.handleSubmit}
											color="primary"
											variant="contained"
											startIcon={<CheckCircleIcon />}
										>
											Je cuite
										</Button>
									</DialogActions>
								</Dialog>
							</Fragment>
						</Fragment>
					) : (
						<Fragment>
							<Button
								color="inherit"
								size="large"
								component={Link}
								to="/"
								startIcon={<HomeIcon />}
							>
								Home
							</Button>
							<Button color="inherit" size="large" component={Link} to="/login">
								Se connecter
							</Button>
							<Button
								color="inherit"
								size="large"
								component={Link}
								to="/signup"
							>
								S'inscrire
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		);
	}
}

// Définit le type des props
TheNavbar.propTypes = {
	classes: PropTypes.object.isRequired,
	auth: PropTypes.bool.isRequired,
	Ui: PropTypes.object.isRequired,
};

const mapStateToProps = (etat) => ({
	auth: etat.user.auth,
	Ui: etat.Ui,
});

const mapActionsToProps = {
	faireUnBlabla,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(TheNavbar));

import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Blabla from "../components/Blabla";
import SeeUserProfile from "../components/SeeUserProfile";
import { getUserInfos } from "../redux/actions/dataAction";
import axios from "axios";
import UserIllustrator1 from "../images/undraw_followers_4i0p.svg";
import UserIllustrator2 from "../images/undraw_personal_email_t7nw.svg";

const styles = {
	IllustratorStyle: {
		width: 200,
		height: 300,
	},
};

export class utilisateur extends Component {
	state = {
		profil: [],
	};

	componentDidMount() {
		const handle = this.props.match.params.handle;
		this.props.getUserInfos(handle);
		axios
			.get(`/user/${handle}`)
			.then((result) => {
				this.setState({
					profil: result.data.user,
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { blablas } = this.props.data;
		const { classes } = this.props;

		const lesInfos =
			blablas === null ? (
				<p> Cet utilisateur n'a pas fait de Cuite (Blabla)</p>
			) : (
				blablas.map((blabla) => (
					<Blabla key={blabla.blablaId} blablaProp={blabla} />
				))
			);

		return (
			<Grid container spacing={2}>
				<Grid item xs={6} sm={3}>
					<img
						src={UserIllustrator1}
						alt="Illustrator"
						className={classes.IllustratorStyle}
					/>
					<img
						src={UserIllustrator2}
						alt="Illustrator"
						className={classes.IllustratorStyle}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{lesInfos}
				</Grid>
				<Grid item xs={6} sm={3}>
					{this.state.profil === null ? (
						<p>Chargement du profil ...</p>
					) : (
						<SeeUserProfile profil={this.state.profil} />
					)}
				</Grid>
			</Grid>
		);
	}
}

utilisateur.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	getUserInfos: PropTypes.func.isRequired,
};

const mapStateToProps = (etat) => ({
	data: etat.data,
});

const mapActionsToProps = {
	getUserInfos,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(utilisateur));

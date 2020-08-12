import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Blabla from "../components/Blabla";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfilUser from "../components/ProfilUser";
import withStyles from "@material-ui/core/styles/withStyles";
import { getBlablas } from "../redux/actions/dataAction";
import HomeIllustrator1 from "../images/undraw_share_online_r87b.svg";
import HomeIllustrator2 from "../images/humaaans.png";

const styles = {
	IllustratorStyle: {
		width: 200,
		height: 300,
	},
};

class home extends Component {
	componentDidMount() {
		this.props.getBlablas();
	}

	render() {
		const { classes } = this.props;
		const { blablas } = this.props.data;

		let afficheBlabla = blablas ? (
			blablas.map((blabla) => (
				<Blabla key={blabla.blablaId} blablaProp={blabla} />
			))
		) : (
			<p>Chargement des blablas en cours ...</p>
		);
		return (
			<Grid container spacing={2}>
				<Grid item xs={6} sm={3}>
					<img
						src={HomeIllustrator1}
						alt="Illustrator"
						className={classes.IllustratorStyle}
					/>
					<img
						src={HomeIllustrator2}
						alt="Illustrator"
						className={classes.IllustratorStyle}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					{afficheBlabla}
				</Grid>
				<Grid item xs={6} sm={3}>
					<ProfilUser />
				</Grid>
			</Grid>
		);
	}
}

// Définit le type des props
home.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.object.isRequired,
	getBlablas: PropTypes.func.isRequired,
};

const mapStateToProps = (etat) => ({
	data: etat.data,
});

const mapActionsToProps = {
	getBlablas,
};

export default connect(
	mapStateToProps,
	mapActionsToProps
)(withStyles(styles)(home));

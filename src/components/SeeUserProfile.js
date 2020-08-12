import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LinkFromMaterialUI from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import relativeTime from "dayjs/plugin/relativeTime";
import Typography from "@material-ui/core/Typography";
import PlaceIcon from "@material-ui/icons/Place";
import HttpIcon from "@material-ui/icons/Http";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";

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
	},
});

const SeeUserProfile = (props) => {
	const {
		classes,
		profil: { imageUrl, handle, bio, location, website, createdAt },
	} = props;

	// use plugin dayjs RelativeTime
	dayjs.extend(relativeTime);
	dayjs.locale("fr");

	return (
		<Paper className={classes.paperStyle}>
			<div className={classes.profileStyle}>
				<div className="div-imageProfil">
					<img src={imageUrl} alt="profil" className="photoProfilStyle" />
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
			</div>
		</Paper>
	);
};

SeeUserProfile.propTypes = {
	classes: PropTypes.object.isRequired,
	profil: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeeUserProfile);

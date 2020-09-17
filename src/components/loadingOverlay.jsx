import React from 'react';
import styled from "styled-components";
import theme from "../assets/theme";
import { fade } from '@material-ui/core/styles/colorManipulator';
import { CircularProgress, Fade } from "@material-ui/core";
import { connect } from "react-redux";

const Overlay = styled.div`
	position: fixed;
	top: 0;
	height: 100vh;
	width: 100vw;
	background-color: ${fade(theme.palette.common.black, .5)};
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1400;
`

const LoadingOverlay = ({ loading }) => {
	return (
		<Fade in={loading} timeout={400}>
			<Overlay>
				<CircularProgress color="secondary" />
			</Overlay>
		</Fade>
	);
};

const mapStateToProps = ({ activities, auth, app }) => ({
	loading: app.loading || activities.loading || auth.loading
})

export default connect(mapStateToProps)(LoadingOverlay);

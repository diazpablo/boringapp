import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { setDialogActivity } from "../store/activities";
import { likeActivity } from "../store/auth";
import ActivityCard from "./activityCard";
import Like from "./common/like";
import { Dialog, IconButton } from '@material-ui/core';
import CloseIcon from "@material-ui/icons/Close";

const BoxStyled = styled.div`
	width: 380px;
`
const CloseBtn = styled(IconButton)`
	position: fixed;
	right: 50px;
	top: 30px;
	color: white;
	&:hover {
		background-color: rgba(255,255,255,.2);
	}
`;

const ActivityDialog = ({ activity, setDialogActivity, likeActivity, user }) => {
	const handleClose = () => setDialogActivity(null);

	const cardActions = [
		{
			name: 'unlike',
			content: activity => user ?
				<Like liked={user.likedActivities && user.likedActivities.indexOf(activity.id) > -1} onClick={() => likeActivity(activity)} /> : null
		}
	];

	return (
		<Dialog open={!!activity} onClose={handleClose}>
			<CloseBtn onClick={handleClose} color="inherit">
				<CloseIcon />
			</CloseBtn>
			<BoxStyled>
				{activity && <ActivityCard activity={activity} actions={cardActions} />}
			</BoxStyled>
		</Dialog>
	);
};

const mapStateToProps = ({ activities, auth }) => ({
	activity: activities.dialogActivity,
	user: auth.user
});

const mapDispatchToProps = {
	setDialogActivity, likeActivity
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityDialog);

import React from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { likeActivity, setLoginDialog } from "../store/auth";
import { setDrawerElement } from "../store/app";
import { getLikedActivities } from "../store/activities";
import CreateActivity from "./createActivity";
import Card from "./activityCard";
import Like from "./common/like";
import { Box, Container, Drawer, IconButton, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const FavoritesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	> * {
		margin: 20px;
		width: calc(33% - 40px)
	}
`;
const DrawerStyled = styled(Drawer)`
	position: relative;
`;
const CloseBtn = styled(IconButton)`
	position: absolute;
	right: 50px;
	top: 30px
`;

const SideBar = ({ drawerElement, likedActivities, setDrawerElement, likeActivity }) => {

	const drawerOpen = Boolean(drawerElement);

	const getDrawerContent = () => {
		switch (drawerElement) {
			case "create-activity":
				return (
					<>
						<Typography variant="h4">Create Activity</Typography>
						<CreateActivity />
					</>
				);
			default:
			case "favorites":
				return (
					<>
						<Typography variant="h4">Favorite Activities</Typography>
						<FavoritesWrapper>{showLikedActivities()}</FavoritesWrapper>
					</>
				);
		}
	}

	const cardActions = [
		{
			name: 'unlike',
			content: activity => (
				<Like
					key={`unlike-${activity.id}`}
					liked={true}
					onClick={() => likeActivity(activity)}
				/>
			)
		}
	];

	const showLikedActivities = () => {
		if (likedActivities.length === 0) {
			return <Typography>No activities added</Typography>
		}
		return likedActivities.map(activity => (
			<Card
				key={activity.id}
				activity={activity}
				actions={cardActions}
			/>
		))
	}

	const closeDrawer = () => {
		setDrawerElement(null);
	}

	return (
		<DrawerStyled
			anchor={'right'}
			open={drawerOpen}
			onClose={closeDrawer}
		>
			<CloseBtn onClick={closeDrawer}>
				<CloseIcon />
			</CloseBtn>
			<Box py={5} width="70vw">
				<Container>
					{getDrawerContent()}
				</Container>
			</Box>
		</DrawerStyled>
	);
};
const mapStateToProps = (state) => ({
	likedActivities: getLikedActivities(state),
	drawerElement: state.app.drawerElement,
});

const mapDispatchToProps = {
	setLoginDialog,
	likeActivity,
	setDrawerElement
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

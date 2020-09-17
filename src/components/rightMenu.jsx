import React, { useRef, useState } from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import { setDrawerElement } from "../store/app";
import { getLikedActivities } from "../store/activities";
import { logoutUser, setLoginDialog, likeActivity } from "../store/auth";
import Card from "./activityCard";
import CreateActivity from "./createActivity";
import { Box, Container, Drawer, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CloseIcon from '@material-ui/icons/Close';

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

const RightMenu = (props) => {
	const {
		likedActivities, likeActivity,
		setLoginDialog, drawerElement, setDrawerElement,
		user, logoutUser
	} = props;

	const [ menuOpen, setMenuOpen ] = useState(false);
	const menuRef = useRef();

	const drawerOpen = Boolean(drawerElement);

	const handleClick = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const cardActions = [
		{
			name: 'unlike',
			content: activity => (
				<IconButton key={`unlike-${activity.id}`} onClick={() => likeActivity(activity, false)}>
					<FavoriteIcon />
				</IconButton>
			)
		}
	];

	const handleOpenDrawer = content => {
		closeMenu();
		setDrawerElement(content);
	}
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

	const closeDrawer = () => {
		setDrawerElement(null);
	}

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
	return (
		<>
			<IconButton
				color="inherit"
				onClick={handleClick}
			>
				<MoreVertIcon ref={menuRef} />
			</IconButton>
			<Menu
				anchorEl={menuRef.current}
				open={menuOpen}
				onClose={closeMenu}
			>
				{
					user &&
					<MenuItem onClick={() => handleOpenDrawer('favorites')}>Show Favorites</MenuItem>}
				{
					user && user.isAdmin &&
					<MenuItem onClick={() => handleOpenDrawer('create-activity')}>Create Activity</MenuItem>}

				{!user ? <MenuItem onClick={() => {
						closeMenu();
						setLoginDialog(true);
					}}>Login</MenuItem> :
					<MenuItem onClick={() => {
						closeMenu();
						logoutUser();
					}}>Logout</MenuItem>}

			</Menu>
			<DrawerStyled
				anchor={'right'}
				open={drawerOpen}
				onClose={closeDrawer}>
				<CloseBtn onClick={closeDrawer}>
					<CloseIcon />
				</CloseBtn>
				<Box py={5} width="70vw">
					<Container>
						{getDrawerContent()}
					</Container>
				</Box>
			</DrawerStyled>
		</>
	);
};

const mapStateToProps = (state) => ({
	likedActivities: getLikedActivities(state),
	user: state.auth.user,
	drawerElement: state.app.drawerElement,
});

const mapDispatchToProps = {
	logoutUser,
	setLoginDialog,
	likeActivity,
	setDrawerElement
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);

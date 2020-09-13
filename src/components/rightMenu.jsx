import React, { useState } from 'react';
import styled from "styled-components";
import Card from "./activityCard";
import { Box, Container, Drawer, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";

const FavoritesWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	> * {
		margin: 20px;
		width: calc(33% - 40px)
	}
`;

const RightMenu = ({ likedActivities, onUnlike }) => {
	const [ menuEl, setMenuEl ] = useState(null);
	const [ drawerOpen, setDrawerOpen ] = useState(false);
	const [ drawerContent, setDrawerContent ] = useState(null);
	const menuOpen = Boolean(menuEl);

	const handleClick = (event) => {
		setMenuEl(event.currentTarget);
	};

	const handleClose = () => {
		setMenuEl(null);
	};

	const cardActions = [
		{
			name: 'unlike',
			content: activity => (
				<IconButton key={`unlike-${activity.id}`} onClick={() => onUnlike(activity)}>
					<FavoriteIcon />
				</IconButton>
			)
		}
	];

	const handleOpenDrawer = content => {
		handleClose();
		setDrawerContent(content);
		setDrawerOpen(true);
	}
	const getDrawerContent = () => {
		switch (drawerContent) {
			case "create-activity":
				return (
					<>
						<Typography variant="h4">Create Activity</Typography>
						<form />
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
				<MoreVertIcon />
			</IconButton>
			<Menu
				anchorEl={menuEl}
				open={menuOpen}
				onClose={handleClose}
			>
				<MenuItem onClick={() => handleOpenDrawer('favorites')}>Show Favorites</MenuItem>
				<MenuItem onClick={() => handleOpenDrawer('create-activity')}>Create Activity</MenuItem>
			</Menu>
			<Drawer
				anchor={'right'}
				open={drawerOpen}
				onClose={() => {
					setDrawerOpen(false);
				}}>
				<Box py={5} width="70vw">
					<Container>
						{getDrawerContent()}
					</Container>
				</Box>
			</Drawer>
		</>
	);
};

export default RightMenu;

import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import styled from "styled-components";

const ToolBarStyled = styled(Toolbar)`
	justify-content: space-between;
`

const Header = () => {
	const [ anchorEl, setAnchorEl ] = useState(null);
	const menuOpen = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<ToolBarStyled variant='dense'>
				<Typography>
					Boring App
				</Typography>
				<IconButton
					color="inherit"
					onClick={handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={menuOpen}
					onClose={handleClose}
				>
					<MenuItem onClick={handleClose}>Favourites</MenuItem>
					<MenuItem onClick={handleClose}>Create Activity</MenuItem>
				</Menu>
			</ToolBarStyled>
		</AppBar>
	);
};

export default Header;

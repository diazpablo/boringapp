import React, { useRef, useState } from 'react';
import { connect } from "react-redux";
import { setDrawerElement } from "../store/app";
import { logoutUser, setLoginDialog } from "../store/auth";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SideBar from "./sideBar";

const RightMenu = (props) => {
	const {
		setLoginDialog, setDrawerElement,
		user, logoutUser
	} = props;

	const [ menuOpen, setMenuOpen ] = useState(false);
	const menuRef = useRef();


	const handleClick = () => {
		setMenuOpen(!menuOpen);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const handleOpenDrawer = content => {
		closeMenu();
		setDrawerElement(content);
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
			<SideBar />
		</>
	);
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	drawerElement: state.app.drawerElement,
});

const mapDispatchToProps = {
	logoutUser,
	setLoginDialog,
	setDrawerElement
}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu);

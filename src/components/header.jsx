import React from 'react';
import styled from "styled-components";
import theme from "../assets/theme";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import RightMenu from "./rightMenu";

const ToolBarStyled = styled(Toolbar)`
	justify-content: space-between;
`;
const LogoButton = styled(Button)`
	color: ${theme.palette.common.white};
`;

const Header = ({ likedActivities, onUnlike }) => {
	return (
		<AppBar position="static">
			<ToolBarStyled variant='dense'>
				<LogoButton size="large">
					Boring App
				</LogoButton>
				<RightMenu
					likedActivities={likedActivities}
					onUnlike={onUnlike}
				/>
			</ToolBarStyled>
		</AppBar>
	);
};

export default Header;

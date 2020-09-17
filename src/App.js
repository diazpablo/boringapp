import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { ThemeProvider } from '@material-ui/styles';
import theme from "./assets/theme";
import styled, { css } from "styled-components";

import { getUser } from "./store/auth";
import { getActivities, getRandomActivity } from "./store/activities";

import Header from "./components/header";
import Search from "./components/search";
import ActivitiesTable from "./components/activitiesTable";
import LoadingOverlay from "./components/loadingOverlay";
import LoginDialog from "./components/loginDialog";

import { Container, Box, Typography, Button, Tooltip } from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import PagesIcon from '@material-ui/icons/Pages';
import ActivityDialog from "./components/activityDialog";

// Styled Components
const rowStyles = css`
	display: flex;
	align-items: center;
	margin: 40px 0;
`;
const HeadingRow = styled.div`
	${rowStyles};
	justify-content: space-between;
`;
const ButtonRow = styled.div`
	${rowStyles};
	justify-content: space-between;
`;

const ButtonStyled = styled(Button)`
	margin-right: 10px;
`

function App(props) {
	const { getUser, getActivities, getRandomActivity, pageSize, moreBtnActive } = props;

	useEffect(() => {
		getUser();
		getActivities(pageSize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Click Handlers
	const handleGetNewActivities = () => {
		const onlyNewActivities = true;
		getActivities(pageSize, onlyNewActivities);
	}
	const handleGetRandomActivities = () => getActivities(pageSize);
	const handleGetRandomActivity = () => getRandomActivity();

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Container maxWidth="lg">
				<HeadingRow>
					<Typography variant="h3" component="h1">
						Welcome to Our Main App
					</Typography>
					<Search />
				</HeadingRow>
				<Box mb={3}>
					<ActivitiesTable />
				</Box>
				<ButtonRow>
					<Tooltip title={"This is a fast way to pick an activity to do"}>
						<Button
							onClick={handleGetRandomActivity}
							variant="contained"
							color="primary"
							startIcon={<PagesIcon />}
						>
							GET AN ACTIVITY
						</Button>
					</Tooltip>
					<Tooltip title={moreBtnActive ? '' : 'There are no more activities to get.'}>
						<Box>
							<Tooltip title={moreBtnActive ? "Fetch new data, it brings no repeated date but is slower" : ""}>
								<ButtonStyled
									disabled={!moreBtnActive}
									onClick={handleGetNewActivities}
									variant="contained"
									color="primary"
									startIcon={<AddBoxIcon />}
								>
									Add New Page (Slow)
								</ButtonStyled>
							</Tooltip>
							<Tooltip title={moreBtnActive ? "Fetch random data, it is faster but it may fetch repeated activities" : ""}>
								<Button
									disabled={!moreBtnActive}
									onClick={handleGetRandomActivities}
									variant="contained"
									color="primary"
									startIcon={<AddBoxIcon />}
								>
									Add Random Page (Fast)
								</Button>
							</Tooltip>
						</Box>
					</Tooltip>
				</ButtonRow>
			</Container>
			<ActivityDialog />
			<LoginDialog />
			<LoadingOverlay />
		</ThemeProvider>
	);
}

const mapStateToProps = ({ activities }) => ({
	pageSize: activities.pageSize,
	moreBtnActive: activities.list.length < activities.countedActivities
});

const mapDispatchToProps = {
	getActivities,
	getUser,
	getRandomActivity
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

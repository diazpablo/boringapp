import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import theme from "./assets/theme";
import styled, { css } from "styled-components";
import activitiesService from "./services/activitiesService";
import Header from "./components/header";
import Search from "./components/search";
import ActivitiesTable from "./components/activitiesTable";
import LoadingOverlay from "./components/loadingOverlay";
import { Container, Box, Typography, Button, Tooltip } from "@material-ui/core";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { order, paginate, search } from "./utils/helpers";

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
	justify-content: flex-end;
	> * {
		margin-left: 10px;
	}
`;

// SearchBy Options
const searchOptions = [
	{ key: 'activity', label: "Name" },
];

function App() {
	// Search State
	const [ searchValue, setSearchValue ] = useState('');
	// For future searchin by functionality
	const [ searchBy ] = useState(searchOptions[0]);

	// Sort State
	const [ sortColumn, setSortColumn ] = useState({ key: 'activity', order: 'asc' });

	// Entities State
	const [ activities, setActivities ] = useState([]);

	// Pagination State
	const [ pageSize, setPageSize ] = useState(10);
	const [ pageNumber, setPageNumber ] = useState(0);

	// Loading State
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		fetchData(true);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchData = async (random) => {
		setLoading(true);
		let newActivities;

		if (random) newActivities = await activitiesService.getRandomActivities(pageSize);
		else newActivities = await activitiesService.getNewActivites(pageSize, activities);

		setActivities(() => [ ...activities, ...newActivities ]);
		setLoading(false);
	}

	// Click Handlers
	const handleClick = () => fetchData(false);
	const handleRandomClick = () => fetchData(true);

	const handleSearch = value => {
		setPageNumber(0);
		setSearchValue(value);
	}

	const handleLike = async activity => {
		const originalActivities = [ ...activities ];
		const newActivities = [ ...activities ];

		const index = newActivities.indexOf(activity);
		const newActivity = { ...newActivities[index], liked: !activities[index].liked };
		newActivities[index] = newActivity;
		setActivities(newActivities);

		try {
			await activitiesService.setLikedActivity(newActivity);
		} catch (err) {
			// Catching errors on persisting liking or future server update
			console.error(err);
			alert("It was a problem, please try later.")
			setActivities(originalActivities);
		}
	}

	const sorted = order(activities, sortColumn.key, sortColumn.order);
	const searched = search(sorted, searchBy.key, searchValue);
	const paginated = paginate(searched, pageNumber, pageSize);

	return (
		<ThemeProvider theme={theme}>
			<Header likedActivities={activities.filter(a => a.liked)} onUnlike={handleLike} />
			<Container maxWidth="lg">
				<HeadingRow>
					<Typography variant="h3" component="h1">
						Welcome to Our Main App
					</Typography>
					<Search
						searchValue={searchValue}
						handleSearch={handleSearch}
					/>
				</HeadingRow>
				<Box mb={3}>
					<ActivitiesTable
						activities={paginated}
						sortColumn={sortColumn}
						onSort={sort => setSortColumn(sort)}
						onLike={handleLike}
						totalCount={searched.length}
						pageSize={pageSize}
						setPageSize={setPageSize}
						pageNumber={pageNumber}
						setPageNumber={setPageNumber}
					/>
				</Box>
				<ButtonRow>
					<Tooltip title="Fetch new data, it brings no repeated date but is slower">
						<Button
							onClick={handleClick}
							variant="contained"
							color="primary"
							startIcon={<AddBoxIcon />}
						>
							Add New Page (Slow)
						</Button>
					</Tooltip>
					<Tooltip title="Fetch random data, it is faster but it may fetch repeated activities">
						<Button
							onClick={handleRandomClick}
							variant="contained"
							color="primary"
							startIcon={<AddBoxIcon />}
						>
							Add Random Page (Fast)
						</Button>
					</Tooltip>
				</ButtonRow>
			</Container>
			<LoadingOverlay loading={loading} />
		</ThemeProvider>
	);
}

export default App;

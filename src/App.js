import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Container, Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import theme from "./assets/theme";
import Header from "./components/header";
import Search from "./components/search";
import ActivitiesTable from "./components/activitiesTable";

const Row = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const activities = [
	{
		"activity": "Take a hike at a local park",
		"accessibility": 0.1,
		"type": "recreational",
		"participants": 1,
		"price": 0,
		"id": "8724324",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Make a couch fort",
		"accessibility": 0.08,
		"type": "recreational",
		"participants": 1,
		"price": 0,
		"id": "2352669",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Start a collection",
		"accessibility": 0.5,
		"type": "recreational",
		"participants": 1,
		"price": 0,
		"id": "1718657",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Wash your car",
		"accessibility": 0.15,
		"type": "busywork",
		"participants": 1,
		"price": 0.05,
		"id": "1017771",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Visit a nearby museum",
		"accessibility": 0.7,
		"type": "recreational",
		"participants": 1,
		"price": 0.2,
		"id": "5490351",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Start a daily journal",
		"accessibility": 0,
		"type": "relaxation",
		"participants": 1,
		"price": 0,
		"id": "8779876",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Have a paper airplane contest with some friends",
		"accessibility": 0.05,
		"type": "social",
		"participants": 4,
		"price": 0.02,
		"id": "8557562",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Volunteer and help out at a senior center",
		"accessibility": 0.1,
		"type": "charity",
		"participants": 1,
		"price": 0,
		"id": "3920096",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Learn a new recipe",
		"accessibility": 0.05,
		"type": "cooking",
		"participants": 1,
		"price": 0,
		"id": "6553978",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	},
	{
		"activity": "Go to the gym",
		"accessibility": 0.1,
		"type": "recreational",
		"participants": 1,
		"price": 0.2,
		"id": "4387026",
		"imageUrl": "https://source.unsplash.com/random/896x504"
	}
];

function App() {
	const [ searchValue, setSearchValue ] = useState('');
	const [ sortColumn, setSortColumn ] = useState({ key: 'activity', order: 'asc' });

	const handleSearch = value => {
		setSearchValue(value);
	}

	const sortFn = {
		'asc': (a, b) => {
			if (a[sortColumn.key] < b[sortColumn.key]) return -1;
			if (a[sortColumn.key] > b[sortColumn.key]) return 1;
			return 0;
		},
		'desc': (a, b) => {
			if (a[sortColumn.key] < b[sortColumn.key]) return 1;
			if (a[sortColumn.key] > b[sortColumn.key]) return -1;
			return 0;
		},
	}

	const sorted = activities.sort(sortFn[sortColumn.order]);
	const filtered = sorted.filter(row => row.activity.toLowerCase().indexOf(searchValue.trim().toLowerCase()) > -1)

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Container maxWidth="lg">
				<Box my={5}>
					<Row>
						<Typography variant="h3" component="h1">
							Welcome to Our Main App
						</Typography>
						<Search searchValue={searchValue} handleSearch={handleSearch} />
					</Row>
				</Box>
				<Box mb={5}>
					<ActivitiesTable
						activities={filtered}
						sortColumn={sortColumn}
						onSort={sort => setSortColumn(sort)}
					/>
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;

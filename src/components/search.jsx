import React from 'react';
import { connect } from "react-redux";
import { setSearchValue, setPageNumber } from "../store/activities";
import { InputAdornment, TextField } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

const Search = ({ searchValue, setSearchValue, setPageNumber }) => {
	const handleSearch = e => {
		setSearchValue(e.target.value);
		setPageNumber(0);
	};

	return (
		<TextField
			label="Search by name" variant="outlined"
			InputProps={{
				startAdornment: (
					<InputAdornment position="start">
						<SearchRounded />
					</InputAdornment>
				),
			}}
			value={searchValue}
			onChange={handleSearch}
		/>
	);
};

const mapStateToProps = ({ activities }) => ({
	searchValue: activities.searchValue
});

const mapDispatchToProps = {
	setSearchValue,
	setPageNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

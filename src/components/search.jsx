import React from 'react';
import { InputAdornment, TextField } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";

/**
 * Controlled Search Component
 */

const Search = ({ searchValue, handleSearch }) => {

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
			onChange={e => handleSearch(e.target.value)}
		/>
	);
};

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Like = ({ liked = false, onClick }) => {
	return (
		<IconButton
			onClick={onClick}
		>
			{liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
		</IconButton>
	);
};

Like.propTypes = {
	liked: PropTypes.bool,
	onClick: PropTypes.func
}

export default Like;

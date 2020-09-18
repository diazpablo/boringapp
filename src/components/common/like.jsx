import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const Like = ({ liked = false, ...rest }) => {
	return (
		<IconButton
			{...rest}
		>
			{liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
		</IconButton>
	);
};

Like.propTypes = {
	liked: PropTypes.bool
}

export default Like;

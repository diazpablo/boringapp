import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@material-ui/core";

const CardStyled = styled(Card)`
	display: flex;
	flex-direction: column;
`;
const CardMediaStyled = styled(CardMedia)`
	height: 150px;
`;
const CardActionsStyled = styled(CardActions)`
	margin-top: auto;
`

const ActivityCard = ({ activity, actions }) => {
	return (
		<CardStyled>
			<CardMediaStyled
				image={activity.imageUrl}
				title={activity.activity}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{activity.activity}
				</Typography>
				<Typography color="textSecondary" variant="subtitle1" component="h6">
					{activity.type.name}
				</Typography>
				<Typography variant="body2" color="textSecondary">Price: {activity.price}</Typography>
				<Typography variant="body2" color="textSecondary">Accesibility: {activity.accessibility}</Typography>
				<Typography variant="body2" color="textSecondary">Participants: {activity.participants}</Typography>
			</CardContent>
			{actions.length > 0 && (
				<CardActionsStyled disableSpacing>
					{actions.map(action => action.content(activity))}
				</CardActionsStyled>
			)}
		</CardStyled>
	);
};

ActivityCard.propTypes = {
	activity: PropTypes.object.isRequired,
	actions: PropTypes.array
}

export default ActivityCard;

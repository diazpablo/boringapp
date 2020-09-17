import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Joi from "joi-browser";
import { setDrawerElement } from "../store/app";
import { getTypes, createActivity } from "../store/activities";
import styled from "styled-components";
import { TextField, FormControl, FormHelperText, InputLabel, Select, Button } from "@material-ui/core";
import { DropzoneArea } from 'material-ui-dropzone'
import SaveIcon from "@material-ui/icons/Save";

const Form = styled.form`
	display: flex;
	flex-direction: column;
	max-width: 500px;
`;
const TextFieldStyled = styled(TextField)`
	margin-top: 40px;
`;
const FormControlStyled = styled(FormControl)`
	margin-top: 40px;
`;

const CreateActivity = ({ getTypes, types, createActivity, setDrawerElement }) => {
	const [ name, setName ] = useState('');
	const [ accessibility, setAccessibility ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ participants, setParticipants ] = useState('');
	const [ type, setType ] = useState('');
	const [ image, setImage ] = useState('');
	const [ errors, setErrors ] = useState({});

	useEffect(() => {
		if (types.length === 0)
			getTypes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const schema = {
		activity: Joi.string().trim().min(5).max(255).required().label('Name'),
		accessibility: Joi.number().min(0).max(1).required().label('Accessibility'),
		typeId: Joi.string().required().label('Type'),
		participants: Joi.number().min(0).max(100).required().label('Participants'),
		price: Joi.number().min(0).max(100).required().label('Price'),
		image: Joi.object().required().label('Image')
			.error((errors) => errors.map(error => {
				switch (error.type) {
					case "object.base":
						return { message: "Image must be a valid File." };
					default:
						return error.message;
				}
			})),
	}

	const handleValidateFile = files => {
		setImage(files[0]);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors([]);

		const formData = new FormData();
		formData.append("activity", name);
		formData.append("accessibility", accessibility);
		formData.append("price", price);
		formData.append("participants", participants);
		formData.append("typeId", type);
		formData.append("image", image);

		for (const entry of formData.entries()) {
			const [ key, value ] = entry;
			const { error } = Joi.validate(value, schema[key]);
			if (error) {
				setErrors(errors => ({ ...errors, [key]: error.details[0].message }));
			}
		}
		try {
			await createActivity(formData);
			setDrawerElement(null);
		} catch (e) {
			console.error(e.message);
		}
	}

	const getParticipantsOptions = () => {
		const options = Array.from({ length: 100 })

		return options.map((opt, key) => <option key={key} value={key + 1}>{key + 1}</option>);
	}

	return (
		<div>
			<Form onSubmit={handleSubmit}>
				<TextFieldStyled
					error={!!errors['activity']}
					helperText={errors['activity']}
					label="Name" variant="outlined"
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<TextFieldStyled
					error={!!errors['accessibility']}
					helperText={errors['accessibility']}
					label="Accesibility" variant="outlined"
					type="number"
					inputProps={{
						min: 0,
						max: 1,
						step: 0.1
					}}
					value={accessibility}
					onChange={e => setAccessibility(e.target.value)}
				/>
				<TextFieldStyled
					label="Price" variant="outlined"
					helperText={errors['price']}
					error={!!errors['price']}
					type="number"
					inputProps={{
						min: 0,
						max: 100,
						step: 0.1
					}}
					value={price}
					onChange={e => setPrice(e.target.value)}
				/>
				<FormControlStyled
					error={!!errors['participants']}
					variant="outlined"
				>
					<InputLabel htmlFor="select">Participants</InputLabel>
					<Select
						native
						label="Participants"
						inputProps={{
							name: 'participants',
							id: 'select',
						}}
						value={participants}
						onChange={e => setParticipants(e.target.value)}
					>
						<option aria-label="None" value="" />
						{getParticipantsOptions()}

					</Select>
					<FormHelperText>{errors['participants']}</FormHelperText>
				</FormControlStyled>
				<FormControlStyled
					variant="outlined"
					error={!!errors['typeId']}
				>
					<InputLabel htmlFor="select">Type</InputLabel>
					<Select
						native
						label="Type"
						inputProps={{
							name: 'typeId',
							id: 'type-select',
						}}
						value={type}
						onChange={e => setType(e.target.value)}
					>
						<option aria-label="None" value="" />
						{types.map(type => (
							<option key={type.id} value={type.id}>{type.name}</option>
						))}
					</Select>
					<FormHelperText>{errors['typeId']}</FormHelperText>
				</FormControlStyled>
				<FormControlStyled
					error={!!errors['image']}
				>
					<DropzoneArea
						filesLimit={1}
						maxFileSize={10000000}
						acceptedFiles={[ 'image/*' ]}
						onChange={handleValidateFile}
					/>
					<FormHelperText>{errors['image']}</FormHelperText>
				</FormControlStyled>
				<FormControlStyled>
					<Button
						type="submit"
						size="large"
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</FormControlStyled>
			</Form>

		</div>
	);
};

const mapStateToProps = ({ activities }) => ({
	types: activities.types
});

const mapDispatchToProps = {
	getTypes, createActivity, setDrawerElement
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity);

import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import Joi from "joi-browser";
import styled from "styled-components";
import { setDrawerElement } from "../store/app";
import { getTypes, createActivity } from "../store/activities";
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

	const validateImageSizeRatio = file => {
		setErrors(errors => {
			delete errors.image;
			return errors;
		});
		const fr = new FileReader();
		fr.onload = e => {
			const image = new Image();
			image.src = e.target.result;

			image.onload = function () {
				const imageRatio = this.width / this.height;
				if (imageRatio !== 16 / 9) {
					setErrors(errors => ({ ...errors, image: 'Image\'s aspect ratio must be 16:9.' }));
				} else {
					setImage(file)
				}
			};
		};
		fr.readAsDataURL(file);
	}

	const handleValidateFile = files => {
		if (files.length) {
			const [ file ] = files;

			validateImageSizeRatio(file);
		}
	};

	const handleValidateInput = e => {
		const { name, value } = e.target;

		setErrors(errors => {
			delete errors[name];
			return errors;
		});
		const { error } = Joi.validate(value, schema[name]);

		if (error) {
			setErrors(errors => ({ ...errors, [name]: error.details[0].message }));
			return;
		}
	}

	const handleSubmit = async e => {
		e.preventDefault();
		setErrors({});

		const formData = new FormData();
		formData.append("activity", name);
		formData.append("accessibility", accessibility);
		formData.append("price", price);
		formData.append("participants", participants);
		formData.append("typeId", type);
		formData.append("image", image);

		try {
			await createActivity(formData);
			setDrawerElement(null);
		} catch (e) {
			console.error(e.message);
		}
	}

	const formObject = {
		activity: name, accessibility, typeId: type, price, participants, image
	};

	const { error: validateErrors } = Joi.validate(formObject, schema);
	const formIsValid = !validateErrors && Object.keys(errors).length === 0;

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
					label="Name" variant="outlined" name="activity"
					value={name}
					onChange={e => setName(e.target.value)}
					onBlur={handleValidateInput}
				/>
				<TextFieldStyled
					error={!!errors['accessibility']}
					helperText={errors['accessibility']}
					label="Accesibility" variant="outlined"
					name="accessibility"
					type="number"
					inputProps={{
						min: 0,
						max: 1,
						step: 0.1
					}}
					value={accessibility}
					onChange={e => setAccessibility(e.target.value)}
					onBlur={handleValidateInput}
				/>
				<TextFieldStyled
					label="Price" variant="outlined"
					helperText={errors['price']}
					error={!!errors['price']}
					name="price"
					type="number"
					inputProps={{
						min: 0,
						max: 100,
						step: 0.1
					}}
					value={price}
					onChange={e => setPrice(e.target.value)}
					onBlur={handleValidateInput}
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
						onBlur={handleValidateInput}
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
						onBlur={handleValidateInput}
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
						acceptedFiles={[ 'image/*' ]}
						onChange={handleValidateFile}
					/>
					<FormHelperText>{errors['image']}</FormHelperText>
				</FormControlStyled>
				<FormControlStyled>
					<Button
						disabled={!formIsValid}
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

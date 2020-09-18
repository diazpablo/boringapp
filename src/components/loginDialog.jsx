import React, { useState } from 'react';
import { connect } from "react-redux";
import Joi from 'joi-browser';
import { loginUser, setLoginDialog } from "../store/auth";
import {
	Button, TextField, FormHelperText,
	Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

const LoginDialog = ({ user, loginUser, loginError, loginDialog, setLoginDialog }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ errors, setErrors ] = useState({});

	const schema = {
		email: Joi.string().max(255).required().email().label("Email"),
		password: Joi.string().max(255).required().label("Password")
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

	const formObject = {
		email, password
	};
	const { error: validateErrors } = Joi.validate(formObject, schema);
	const formIsValid = !validateErrors && Object.keys(errors).length === 0;

	const handleClose = () => setLoginDialog(false);
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (formIsValid) {
			loginUser(email, password);
		}
	}

	return (
		<Dialog open={!user && loginDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Login Form</DialogTitle>
			<DialogContent>
				<FormHelperText error>{loginError}</FormHelperText>
				<form onSubmit={handleSubmit}>
					<TextField
						error={!!errors['email']}
						helperText={errors['email']}
						margin="dense"
						id="email" name="email"
						label="Email Address" type="email"
						value={email}
						onChange={e => {
							handleValidateInput(e);
							setEmail(e.target.value)
						}}
						onBlur={handleValidateInput}
						fullWidth
					/>
					<TextField
						error={!!errors['password']}
						helperText={errors['password']}
						margin="dense"
						id="password" label="Password"
						name="password" type="password"
						value={password}
						onChange={e => {
							handleValidateInput(e);
							setPassword(e.target.value)
						}}
						onBlur={handleValidateInput}
						fullWidth
					/>
					<DialogActions>
						<Button onClick={handleClose} color="primary">
							Cancel
						</Button>
						<Button type="submit" color="primary" disabled={!formIsValid}>
							Login
						</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	)
		;
};

const mapStateToProps = ({ auth }) => ({
	user: auth.user,
	loginError: auth.loginError,
	loginDialog: auth.loginDialog
});

const mapDispatchToProps = {
	loginUser,
	setLoginDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

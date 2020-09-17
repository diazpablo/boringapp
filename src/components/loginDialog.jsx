import React, { useState } from 'react';
import { connect } from "react-redux";
import { loginUser, setLoginDialog } from "../store/auth";
import {
	Button, TextField,
	Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';

const LoginDialog = ({ loginUser, loginDialog, setLoginDialog }) => {
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleClose = () => setLoginDialog(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		await loginUser(email, password);
		handleClose();
	}

	return (
		<Dialog open={loginDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Login Form</DialogTitle>
			<form onSubmit={handleSubmit}>
				<DialogContent>
					<TextField
						margin="dense"
						id="email"
						label="Email Address"
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						fullWidth
					/>
					<TextField
						margin="dense"
						id="password"
						label="Password"
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button type="submit" color="primary">
						Login
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

const mapStateToProps = ({ auth }) => ({
	loginDialog: auth.loginDialog
});

const mapDispatchToProps = {
	loginUser,
	setLoginDialog
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog);

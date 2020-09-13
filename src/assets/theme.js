import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
	palette: {
		primary: {
			main: '#134074',
		},
		secondary: {
			main: '#8DA9C4',
		},
	},
	overrides: {
		MuiTooltip: {
			tooltip: {
				fontSize: 14,
				backgroundColor: "#8DA9C4"
			}
		}
	}
});

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

export const primaryColor = blue;
export default createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

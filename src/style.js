import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  buttons: {
      marginTop: '20px'
  },
  cardGrid: {
    padding: "20px 0"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px'
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1,
  },
  searchBar: {
    justifyContent: "center"
  }
}));

export default useStyles;
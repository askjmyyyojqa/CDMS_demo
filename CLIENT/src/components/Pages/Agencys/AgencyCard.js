import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {
  Grid, Grow, Paper,
  Card, CardActionArea, CardActions, CardContent,
  Button,
  Typography,
  Avatar,
  makeStyles,
} from '@material-ui/core/';
// import StyledButton from '../../common/StyledButton';
import { AvatarGroup } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    minHeight: '200px',
    maxHeight: '400px',
    backgroundColor: theme.palette.background.default,
  },
  pr: {
    position: 'relative'
  },
  bold: {
    fontWeight: '400'
  },
  boxTop: {
    height: '170px'
  },
  boxBottom: {
    width: '100%',
    height: '30px'
  },
  avatar: {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  }
}));

function ProjectCard(props) {
  const classes = useStyles();

  const [GrowIn, setGrowIn] = React.useState(false);
  const [agcyColleagueList, setAgcyColleagueList] = React.useState(null);

  React.useEffect(() => {
    setTimeout(() => {
      setGrowIn(true);
    }, 150);
    console.log(props.item);

    const getColleagueList = () => {
      const URL = '/api/agency/getColleague';
      const condition = {
        delete_yn: 'N'
      }
      axios.get(URL,
        { params: condition }
      ).then(res => {
        console.log(res);
      })
    }

    // getColleagueList();

  }, []);

  return (
    <Grid item xs={12} md={6} lg={4} className={classes.pr}>
      <Grow
        in={GrowIn}
        style={{ transformOrigin: '0 0 0' }}
        {...(GrowIn ? { timeout: 400 } : {})}
      >
        <Paper elevation={4}>
          <Card className={classes.root}>
            <CardActionArea>
              <CardContent className={classes.boxTop}>

                <Typography gutterBottom variant="h5" component="h2">
                  {props.item.name}
                </Typography>

                <Typography variant="body2" color="inherit" component="p">
                  {props.item.desc}
                </Typography>
                
              </CardContent>
            </CardActionArea>
            <CardActions>
              <AvatarGroup max={6}>
                <Avatar className={classes.avatar} alt="Remy Sharp">R</Avatar>
              </AvatarGroup>
            </CardActions>
            <CardActions>
              <Button className={classes.boxBottom} variant="outlined" size="small">
                <Typography variant="body2" color="textPrimary">MORE</Typography>
              </Button>
            </CardActions>
          </Card>
        </Paper>
      </Grow>
    </Grid>
  );
}

export default connect(state => ({
  theme: state.UI.theme
}))(ProjectCard)
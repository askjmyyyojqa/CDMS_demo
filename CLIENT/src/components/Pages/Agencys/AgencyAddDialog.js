import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import {
    Container, TextField, FormControl, Select, Button, Dialog, Typography,
    ListItemText, ListItem, List, Divider, AppBar, Toolbar, IconButton, MenuItem,
    Grid
} from '@material-ui/core';

import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    trans: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    flexBox: {
        display: 'flex',
    },
    textFieldStyle: {
        width: '30vw',
        textAlign: 'right'
    },
    stepperTitleStyle: {
        display: 'block',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    buttonStyle: {
        display: 'block',
        margin: '0 auto'
    },
    alignBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    center: {
        width: "15em",
        margin: '0 auto 2em auto'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TextFieldInputProps = {
    min: 0,
    style: {
        textAlign: 'right'
    }
}

const defaultState = {
    name: "",
    desc: "",
    reg_ip : "",
    upd_ip : ""
}

export default function FullScreenDialog() {
    const _tmp = useSelector((store) => store.user.accessInfo);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [infos, setInfos] = React.useState(defaultState);
    const [accessInfos, setAccessInfos] = React.useState(_tmp);

    const { enqueueSnackbar } = useSnackbar();

    
    React.useEffect(() => {
        console.log(accessInfos);
        return () => {
            // TODO
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInfos(defaultState);
    };

    const handleValidateValue = () => {
        console.log(infos);
        for (let idx in infos) {

            switch (idx) {
                case "name":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('이름 없는 기관은 없어요.', { variant: 'warning' });
                        return false;
                    }
                    break;

                case "desc":
                    if (infos[idx] === "" || infos[idx] === undefined) {
                        enqueueSnackbar('설명을 기재해주세요!', { variant: 'warning' });
                        return false;
                    }
                    break;

                default:
                    break;
            }
        }

        handleClickAddAgency();
    }

    const handleChangeAgencyInfos = (e) => {
        let nextValue = { ...infos }
        nextValue[e.target.name] = e.target.value;
        setInfos({ ...nextValue });
    }

    const handleClickAddAgency = () => {
        const URL = 'api/agency/add';
        const config = {
            headers : {
                "content-type" : "application/json"
            }
        }

        axios.post(URL, infos, config);
        console.log("posted");
    }

    return (
        <div>
            <IconButton color="inherit" className={classes.trans} onClick={handleClickOpen}>
                <AddCircleIcon fontSize="large" />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar} position="fixed">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            기관 생성
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleValidateValue}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Container maxWidth="xs">
                        <Typography className={classes.stepperTitleStyle} variant="h4" align="center">
                            <IconButton color="inherit"><NotificationImportantIcon fontSize="large" /></IconButton>
                            기관 생성
                        </Typography>
                    </Container>

                    <Divider />

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={12} lg={12}>
                            <List>
                                <ListItem>
                                    <ListItemText primary="기관명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관명" inputProps={TextFieldInputProps} name="name" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider />
                                <ListItem>
                                    <ListItemText primary="기관 설명" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 설명" inputProps={TextFieldInputProps} name="desc" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider />
                                {/* <ListItem>
                                    <ListItemText primary="기관 담당자" />
                                    <TextField className={classes.textFieldStyle} variant="outlined" placeholder="기관 담당자" inputProps={TextFieldInputProps} name="PROJ_MANAGER" onChange={handleChangeAgencyInfos} />
                                </ListItem>
                                <Divider /> */}
                            </List>
                        </Grid>
                    </Grid>
                </Container>
            </Dialog>
        </div>
    );
}




// const stepNames = [
//     '기관',
//     '기관'
// ];

// const handleClickSteps = (type) => {
//     switch (type) {
//         case "NEXT":
//             setSteps(steps + 1);
//             break;

//         case "PREV":
//             setSteps(steps - 1);
//             break;

//         case "FINISH":
//             console.log("Finish");
//             setSteps(steps + 1);
//             break;

//         default:
//             break;
//     }
// }
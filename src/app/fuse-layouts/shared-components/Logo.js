import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        '& .logo-icon': {
            width: 24,
            height: 24,
            transition: theme.transitions.create(['width', 'height'], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        },
        '& .react-badge, & .logo-text': {
            transition: theme.transitions.create('opacity', {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut
            })
        }
    },
    reactBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        color: '#61DAFB'
    }
}));

function Logo() {
    const classes = useStyles();

    return (
        <div className={clsx(classes.root, "flex items-center w-200")}>

            <Link to="/">
                <img className="" src="assets/images/logos/logo-dashboard.png" alt="Les Achats Industriels LOGO" />
            </Link>

        </div>
    );
}

export default Logo;

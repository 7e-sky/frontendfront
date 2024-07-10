import React from 'react';
import { Icon, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { FuseAnimate, NavLinkAdapter } from '@fuse';
import {useSelector } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        [theme.breakpoints.down('md')]: {
            boxShadow: 'none'
        }
    },
    listItem: {
        color: 'inherit!important',
        textDecoration: 'none!important',
        height: 40,
        width: 'calc(100% - 16px)',
        borderRadius: '0 20px 20px 0',
        paddingLeft: 24,
        paddingRight: 12,
        '&.active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText + '!important',
            pointerEvents: 'none',
            '& .list-item-icon': {
                color: 'inherit'
            }
        },
        '& .list-item-icon': {
            marginRight: 16
        }
    }
}));

function ConditionsSidebarContent(props) {
    const conditions = useSelector(({ conditionsApp }) => conditionsApp.conditions);

    const classes = useStyles(props);

    return (
        <div className="py-24 lg:p-24 lg:pr-4">
            <FuseAnimate animation="transition.slideLeftIn" delay={200}>
                <Paper elevation={1} className={clsx(classes.paper, "rounded-8")}>

                    <List>
                        {
                            conditions.loading ? 'Chargement...' :
                                conditions.data && conditions.data.map((item, index) => (
                                    <ListItem
                                        key={index}
                                        button
                                        component={NavLinkAdapter}
                                        to={'/conditions/'+item.slug}
                                        exact={true}
                                        activeClassName="active"
                                        className={classes.listItem}
                                    >
                                        <Icon className="list-item-icon text-16" color="action">label</Icon>
                                        <ListItemText className="truncate pr-0" primary={item.titre} disableTypography={true} />
                                    </ListItem>
                                ))

                        }

                    </List>
                </Paper>
            </FuseAnimate>
        </div>
    );
}

export default ConditionsSidebarContent;

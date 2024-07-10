import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { makeStyles } from '@material-ui/styles';
import * as Actions from './store/actions';
import CategorieNavigation from './CategorieNavigation';
import Link2 from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import {
    Icon,
    List,
    Typography,
    ListItemText,
    ListItem,
    ListItemAvatar,
    Avatar,

} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
        width: '96%',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginBottom: 10
        },
        border: '1px solid #ccc',
        borderRadius: 10

    },
    mainAvatar: {
        margin: theme.spacing(1.25, 1.25, 1.25, 0),
        color: '#fff',

        backgroundColor: theme.palette.primary.main,
    },


}));
function Navigation(props) {
    const classes = useStyles(props);
    const dispatch = useDispatch();
    const categoriesNav = useSelector(({ navigationCategories }) => navigationCategories.categoriesNav);

    useEffect(() => {
        if (!categoriesNav.secteurs) {
            dispatch(Actions.getSecteurs());
        }
    }, [dispatch, categoriesNav.secteurs]);

    return (
        <div className={classes.demo}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.mainAvatar}>
                        <Icon >format_list_bulleted</Icon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography variant="h2" component="h2" className="text-20 font-bold xs:text-11 mb-1">
                            CATÉGORIES
                        </Typography>
                    }
                />
            </ListItem>
            <List dense={true} disablePadding className="mt-16">
                {
                    categoriesNav.loadingSecteurs ? 'Chargement...' :
                        (
                            categoriesNav.secteurs && categoriesNav.secteurs.map((item, index) => (
                                <CategorieNavigation item={item} key={index} nestedLevel={0} dense={true} />
                            ))
                        )
                }

            </List>
            {
                categoriesNav.secteurs &&
                <div className="px-16 py-20 text-right">
                    <Link2 component={Link} to={`/annuaire-entreprises`} className="">
                        Tous les secteurs d’activités >
                    </Link2>
                </div>
            }
        </div>
    );
}

export default withReducer('navigationCategories', reducer)(Navigation);


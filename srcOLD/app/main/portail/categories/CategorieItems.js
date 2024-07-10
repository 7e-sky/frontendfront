import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Grid, Icon, List, ListItem, ListItemText, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '0px!important'
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    listItemText: {
        fontSize: '11px!important',//Insert your required size,
        color: 'red'
    },
    item: {
        padding: '12px 12px 0 12px!important'
    }
}));

function CategorieItemsLink(props) {
    const classes = useStyles(props);
    const { item } = props;

    return (
        <Grid container spacing={3} >
            {
                item.sousSecteurs && item.sousSecteurs.map((sousSecteur, index) => (
                    <Grid key={index} className={classes.item} item xs={12} sm={6} md={6}>
                        <List
                            component="nav"
                            dense={true}
                            aria-labelledby="nested-list-subheader"
                            className={classes.root}
                        >
                            <ListItem
                                component="a"
                                className=" text-blue hover:underline"
                                href={`/vente-produits/${item.slug}/${sousSecteur.slug}`}
                            >
                                <ListItemText
                                    disableTypography
                                    primary={<Typography type="body2" style={{ color: '#387ca3', fontWeight: 'bold' }}>{sousSecteur.name + ' (' + sousSecteur.count + ')'} </Typography>}
                                    className="uppercase hover:underline" />
                            </ListItem>

                            <List component="div" dense={true} disablePadding>
                                {
                                    sousSecteur.categories && sousSecteur.categories.map((categorie, i) => (
                                        <ListItem key={i} button
                                            component="a"
                                            href={`/vente-produits/${item.slug}/${sousSecteur.slug}/${categorie.slug}`}
                                            className={classes.nested}>
                                            <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                                            <ListItemText
                                                disableTypography
                                                primary={<Typography type="body2" style={{ fontSize: 11 }}>{categorie.name + ' (' + categorie.count + ')'}</Typography>}
                                            />
                                        </ListItem>
                                    ))
                                }
                                {
                                    sousSecteur.categories &&
                                    <ListItem button
                                        component="a"
                                        href={`/annuaire-entreprises/${item.slug}/${sousSecteur.id}-${sousSecteur.slug}`}
                                        className={classes.nested}>
                                        <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                                        <ListItemText
                                            disableTypography
                                            primary={<Typography type="body2" style={{ color: '#387ca3', fontSize: 11 }}>Voir tout</Typography>}
                                        />
                                    </ListItem>
                                }
                            </List>
                        </List>
                    </Grid>
                ))
            }
            {
                item.sousSecteurs &&
                <Grid item xs={12} className="text-right">
                    <Button component={Link} size="small" to={`/annuaire-entreprises/${item.id}-${item.slug}`}
                        color="primary" variant="contained">
                        <span >{item.name}</span>
                        <Icon className="ml-4 arrow-icon">keyboard_arrow_right</Icon>
                    </Button>
                </Grid>
            }
        </Grid>
    );
}

CategorieItemsLink.propTypes = {
    item: PropTypes.shape(
        {
            name: PropTypes.string,
        })
};
CategorieItemsLink.defaultProps = {};
const CategorieItems = withRouter(React.memo(CategorieItemsLink));

export default CategorieItems;
//export default withRouter(React.memo(CategorieItemsLink));

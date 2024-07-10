import React, {  useEffect }from 'react';
import {makeStyles} from '@material-ui/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
    root: {
        padding        : '0 7px',
        fontSize       : 11,
        fontWeight     : 600,
        height         : 20,
        minWidth       : 20,
        borderRadius   : 20,
        display        : 'flex',
        alignItems     : 'center',
        backgroundColor: theme.palette.secondary.main,
        color          : theme.palette.secondary.contrastText
    }
}));

function FuseNavBadge(props)
{
    const dispatch = useDispatch();
    const classes = useStyles(props);
    const {className, badge} = props;
    

    useEffect(() => {
        dispatch(Actions.getCountForBadge(badge.title));
    }, [badge.title,dispatch]);

   
    return (
        badge.count && badge.count !== '0' ?
        <div
            className={clsx(classes.root, className, "item-badge")}
            style={{
                backgroundColor: badge.bg,
                color          : badge.fg
            }}
        >
            {badge.count}
        </div>
        : ''
    )
}

FuseNavBadge.propTypes = {
    badge: PropTypes.shape(
        {
            title: PropTypes.node,
            bg   : PropTypes.string,
            fg   : PropTypes.string
        })
};
FuseNavBadge.defaultProps = {};

export default withReducer('fuseNavBadge', reducer)(React.memo(FuseNavBadge));

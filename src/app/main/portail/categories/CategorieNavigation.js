import React, { useState } from 'react';
import { Grow, Paper, Icon, IconButton, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useDebounce } from '@fuse/hooks';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import * as ReactDOM from 'react-dom';
import CategorieItems from './CategorieItems';

const useStyles = makeStyles(theme => ({
    paper: {
        borderTop: '2px solid ' + theme.palette.secondary.main,
    },
    root: {
        '& .list-item-text': {
            padding: '0 0 0 16px'
        }
    },
    button: {
        color: theme.palette.text.primary,
        '&.open': {
            backgroundColor: 'rgba(0,0,0,.08)'
        },
        '&.dense': {
            padding: '8px 12px 8px 12px',
            minHeight: 40,
            '& .list-item-text': {
                padding: '0 0 0 8px'
            }
        }
    },
    popper: {
        zIndex: 999
    },
    popperClose: {
        pointerEvents: 'none'
    }
}));

function CategorieNavigationCollapse(props) {

    const classes = useStyles(props);
    const [opened, setOpened] = useState(false);
    const { item, nestedLevel } = props;

    const handleToggle = useDebounce((open) => {
        setOpened(open);
    }, 150);


    return (
        <Manager>
            <Reference>
                {({ ref }) => (
                    <ListItem
                        button
                        className={clsx("list-item", classes.button, opened && "open")}
                        onMouseEnter={() => handleToggle(true)}
                        onMouseLeave={() => handleToggle(false)}
                        aria-owns={opened ? 'menu-list-grow' : null}
                        aria-haspopup="true"
                        ref={ref}
                    >
                        {item.icon && (
                            <Icon color="action" className="text-16 flex-shrink-0">{item.icon}</Icon>
                        )}
                        <ListItemText className="list-item-text" primary={item.name} classes={{ primary: 'text-14' }} />
                        <IconButton disableRipple className="w-16 h-16 ml-4 p-0">
                            <Icon className="text-16 arrow-icon">keyboard_arrow_right</Icon>
                        </IconButton>
                    </ListItem>
                )}
            </Reference>
            {ReactDOM.createPortal(
                <Popper
                    placement="right"
                    eventsEnabled={opened}
                    positionFixed
                >
                    {({ ref, style, placement, arrowProps }) => (
                        <div
                            ref={ref}
                            style={{
                                ...style,
                                zIndex: 999 + nestedLevel + 1
                            }}
                            data-placement={placement}
                            className={clsx(classes.popper, { [classes.popperClose]: !opened })}
                        >
                            <Grow in={opened} id="menu-list-grow" style={{ transformOrigin: '0 0 0' }}>
                                <Paper
                                    className={clsx(classes.paper, 'px-16 pb-16 max-w-md')}
                                    onMouseEnter={() => handleToggle(true)}
                                    onMouseLeave={() => handleToggle(false)}
                                >
                                    <CategorieItems item={item} nestedLevel={0} dense={true} />
                                </Paper>
                            </Grow>
                        </div>
                    )}
                </Popper>,
                document.querySelector('#root')
            )}
        </Manager>
    );
}

CategorieNavigationCollapse.propTypes = {
    item: PropTypes.shape(
        {
            name: PropTypes.string,
        })
};

CategorieNavigationCollapse.defaultProps = {};
const CategorieNavigation = withRouter(React.memo(CategorieNavigationCollapse));

export default CategorieNavigation;

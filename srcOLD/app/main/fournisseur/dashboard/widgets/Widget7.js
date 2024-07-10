import React, { useState, useEffect } from 'react';
import { Typography, Select, Paper } from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions'
import ContentLoader from 'react-content-loader'

function Widget7(props) {

    const dispatch = useDispatch();
    const widgets = useSelector(({ dashboardApp }) => dashboardApp.widgets);
    const user = useSelector(({ auth }) => auth.user);

    const [currentRange, setCurrentRange] = useState(
        moment().format('Y')
    );

    useEffect(() => {
        dispatch(Actions.getTopBudgetGagner(currentRange));
    }, [dispatch, currentRange]);

    function handleChangeRange(ev) {
        setCurrentRange(ev.target.value);
    }

    return (

        <>
            {widgets.loadingTopBudget === false

                ?
                <Paper className="w-full rounded-8 shadow-none border-1">
                    <div className="flex items-center justify-between px-16 h-64 border-b-1">
                        <Typography className="text-16 font-bold">Top budget gagné en {currentRange} </Typography>

                        <Select
                            native
                            value={currentRange}
                            onChange={handleChangeRange}
                            inputProps={{
                                name: 'currentRange'
                            }}
                            disableUnderline={true}
                        >
                            {Object.entries({
                                '0': moment().format('Y'),
                                '1': moment().subtract(1, 'year').format('Y'),
                                '2': moment().subtract(2, 'year').format('Y'),
                            }).map(([key, n]) => {
                                return (
                                    <option key={key} value={n}>{n}</option>
                                )
                            })}
                        </Select>
                    </div>
                    <div className="text-center px-24 py-32">

                        <Typography className="text-24 leading-tight" color="textSecondary">
                            {currentRange}
                        </Typography>
                        <Typography className="text-40 break-all leading-tight text-green" >
                            {widgets.topBudget && parseFloat(widgets.topBudget).toLocaleString(
                                undefined, // leave undefined to use the browser's locale,
                                // or use a string like 'en-US' to override it.
                                { minimumFractionDigits: 2 }
                            )}
                            &ensp;{user.data.currency}
                        </Typography>

                    </div>

                </Paper>
                :
                <ContentLoader
                    height={380}
                    width={250}
                    speed={3}
                    primaryColor="#d9d9d9"
                    secondaryColor="#ecebeb"
                >

                    <circle cx="93" cy="53" r="14" />
                    <circle cx="127" cy="53" r="14" />
                    <circle cx="161" cy="53" r="14" />

                </ContentLoader>}

        </>
    );
}

export default React.memo(Widget7);

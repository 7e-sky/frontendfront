import React, { useState, useEffect } from 'react';
import { Typography, Select, Paper } from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions'
import ContentLoader from 'react-content-loader'
import { Doughnut } from 'react-chartjs-2';

function Widget6(props) {
    const dispatch = useDispatch();
    const widgets = useSelector(({ dashboardApp }) => dashboardApp.widgets);
    const [currentRange, setCurrentRange] = useState(
        moment().format('Y')
    );

    useEffect(() => {
        dispatch(Actions.getDoughnut(currentRange));
    }, [dispatch, currentRange]);

    function handleChangeRange(ev) {
        setCurrentRange(ev.target.value);
    }


    return (

        <>
            {widgets.loadingDoughnut === false

                ?
                <Paper className="w-full rounded-8 shadow-none border-1">
                    <div className="flex items-center justify-between px-16 h-64 border-b-1">
                        <Typography className="text-16 font-bold">Demandes consultées </Typography>

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
                    <div className="h-400 w-full p-32">
                        <Doughnut
                            data={{
                                labels: widgets.doughnut.labels,
                                datasets: widgets.doughnut.datasets
                            }}
                            options={{
                                cutoutPercentage: 66,
                                spanGaps: false,
                                legend: {
                                    display: true,
                                    position: 'bottom',
                                    labels: {
                                        padding: 16,
                                        usePointStyle: true
                                    }
                                },
                                maintainAspectRatio: false
                            }}
                        />
                    </div>
                    {/*
            <div className="flex items-center p-8 border-t-1">
                <div className="flex flex-1 flex-col items-center justify-center p-16 border-r-1">
                    <Typography className="text-32 leading-none">
                        {widget.footerLeft.count[currentRange]}
                    </Typography>
                    <Typography className="text-15" color="textSecondary">
                        {widget.footerLeft.title}
                    </Typography>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center p-16">
                    <Typography className="text-32 leading-none">
                        {widget.footerRight.count[currentRange]}
                    </Typography>
                    <Typography className="text-15" color="textSecondary">
                        {widget.footerRight.title}
                    </Typography>
                </div>
            </div>
            */}
                </Paper>
                :
                <ContentLoader
                    height={280}
                    width={500}
                    speed={3}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
                    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
                    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
                    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
                </ContentLoader>}

        </>
    );
}

export default React.memo(Widget6);

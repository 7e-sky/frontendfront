import React, { useState, useEffect } from 'react';
import { Typography, Select, Paper, Divider } from '@material-ui/core';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions'
import ContentLoader from 'react-content-loader'
import { Line } from 'react-chartjs-2';

function Widget8(props) {
    const dispatch = useDispatch();
    const widgets = useSelector(({ dashboardApp }) => dashboardApp.widgets);
    const user = useSelector(({ auth }) => auth.user);

    const options = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    stacked: true,
                    display: true,
                    gridLines: {
                        display: false
                    },
                    categoryPercentage: 1

                }
            ],
            yAxes: [
                {
                    display: false
                }
            ]
        }
    };

    const labels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const [currentRange, setCurrentRange] = useState(
        moment().format('Y')
    );

    useEffect(() => {
        dispatch(Actions.getPotentielBudgets(currentRange));
    }, [dispatch, currentRange]);

    function handleChangeRange(ev) {
        setCurrentRange(ev.target.value);
    }

    return (
        <>
            {
                widgets.loadingPotentiels === false
                && widgets.potentiels['gagner']
                ?
                <Paper className="w-full rounded-8 shadow-none border-1">
                    <div className="flex items-center justify-between px-16 h-64 border-b-1">
                        <Typography className="text-16 font-bold">Vos statistques</Typography>

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
                    {['gagner', 'perdue'].map(id => (
                        <div className="flex flex-wrap items-center w-full p-8" key={id}>
                            <div className="flex flex-col w-full sm:w-1/3 p-8">
                                <Typography className="text-14" color="textSecondary">
                                    {widgets.potentiels[id].title}
                                </Typography>
                                <div className="flex items-center">

                                    <Typography className={id === 'gagner'? "text-32 truncate text-green":"text-32 truncate "}>
                                        {
                                        parseFloat(widgets.potentiels[id].somme).toLocaleString(
                                            undefined, // leave undefined to use the browser's locale,
                                            // or use a string like 'en-US' to override it.
                                            { minimumFractionDigits: 2 }
                                        )
                                        }
                                    </Typography>
                                    <Typography className="text-20 ml-4" color="textSecondary">
                                        {user.data ? user.data.currency : ''}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex w-full sm:w-2/3 p-8">
                                <div className="h-96 w-full">
                                    <Line
                                        data={{
                                            labels: labels,
                                            datasets: widgets.potentiels[id].datasets
                                        }}
                                        options={options}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <Divider />
                    <div className="flex flex-col w-full px-16 py-24">
                        <Typography className="text-14" color="textSecondary">
                            Potentiels
                        </Typography>
                        <div className="flex items-center">

                            <Typography className="text-32">
                                {
                                parseFloat(widgets.potentiels.total).toLocaleString(
                                    undefined, // leave undefined to use the browser's locale,
                                    // or use a string like 'en-US' to override it.
                                    { minimumFractionDigits: 2 }
                                )
                                }
                            </Typography>
                            <Typography className="text-32 ml-4" color="textSecondary">
                                {user.data ? user.data.currency : ''}
                            </Typography>
                        </div>
                    </div>
                </Paper>
                :
                <ContentLoader
                    height={380}
                    width={800}
                    speed={3}
                    primaryColor="#d9d9d9"
                    secondaryColor="#ecebeb"
                >
                    <rect x="58" y="129" rx="0" ry="0" width="479" height="6" />
                    <rect x="78" y="147" rx="0" ry="0" width="188" height="26" />
                    <rect x="226" y="43" rx="0" ry="0" width="300" height="25" />
                    <rect x="227" y="76" rx="0" ry="0" width="299" height="25" />
                    <circle cx="93" cy="53" r="14" />
                    <circle cx="127" cy="53" r="14" />
                    <circle cx="161" cy="53" r="14" />
                    <circle cx="161" cy="90" r="14" />
                    <circle cx="127" cy="90" r="14" />
                    <circle cx="93" cy="90" r="14" />
                </ContentLoader>}

        </>
    );
}

export default React.memo(Widget8);

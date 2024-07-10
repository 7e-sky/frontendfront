import React, { useEffect } from 'react';
import { Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions'
import ContentLoader from 'react-content-loader'
import { Doughnut } from 'react-chartjs-2';

function Widget5(props) {

    const dispatch = useDispatch();
    const widgets = useSelector(({ dashboardApp }) => dashboardApp.widgets);

    useEffect(() => {
        dispatch(Actions.getDemandeDevisByProduct());
    }, [dispatch]);

    return (

        <>
            {widgets.loadingDDP === false

                ?
                <Paper className="w-full rounded-8 shadow-none border-1">
                    <div className="flex items-center justify-between px-16 h-64 border-b-1">
                        <Typography className="text-16 font-bold">Demandes devis par produit / service </Typography>


                    </div>
                    <div className="h-400 w-full p-32">
                        <Doughnut
                            data={{
                                labels: widgets.dataDDP.labels,
                                datasets: widgets.dataDDP.datasets
                            }}
                            options={{
                                cutoutPercentage: 0,
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

export default React.memo(Widget5);

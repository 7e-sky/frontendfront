import React, { useEffect, useState } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import AbonnementsTable from './AbonnementsTable';
import AbonnementsHeader from './AbonnementsHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";
import { Tab, Tabs } from '@material-ui/core';
import CommandesTable from './CommandesTable';

function Abonnements() {

    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (!user.id) {
            return;
        }
        dispatch(Actions.getAbonnements(user.id));

    }, [dispatch, user]);
    useEffect(() => {
        if (!user.id) {
            return;
        }
        dispatch(Actions.getCommandes(user.id));
    }, [dispatch, user]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }
    return (
        <>
            <Helmet>
                <title>Abonnements | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>
            <FusePageCarded
                classes={{
                    content: "flex flex-col h-full",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <AbonnementsHeader />
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{ root: "w-full h-64" }}
                    >
                        <Tab className="h-64 normal-case" label="Abonnement" />
                        <Tab className="h-64 normal-case" label="Commande" />
                    </Tabs>

                }
                content={
                    <div className="p-16 sm:p-24 max-w-2xl w-full">
                        {/*Order Details*/}
                        {tabValue === 0 &&
                            <AbonnementsTable />
                        }
                        {tabValue === 1 && (
                            <CommandesTable />
                        )}
                    </div>
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('abonnementFrsApp', reducer)(Abonnements);

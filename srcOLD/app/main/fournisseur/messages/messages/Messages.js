import React, { useEffect } from 'react';
import { FusePageCarded } from '@fuse';
import withReducer from 'app/store/withReducer';
import MessageTable from './MessageTable';
import MessageHeader from './MessageHeader';
import reducer from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../store/actions';
import { Helmet } from "react-helmet";

function Message() {

    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    useEffect(() => {
        if (user)
            dispatch(Actions.getMessages(user.id));
    }, [dispatch, user]);

    return (
        <>
            <Helmet>
                <title>Messages | Les Achats Industriels</title>
                <meta name="robots" content="noindex, nofollow" />
                <meta name="googlebot" content="noindex" />
            </Helmet>

            <FusePageCarded
                classes={{
                    content: "flex",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <MessageHeader />
                }
                content={
                    <MessageTable />
                }
                innerScroll
            />
        </>
    );
}

export default withReducer('messagesFrsApp', reducer)(Message);

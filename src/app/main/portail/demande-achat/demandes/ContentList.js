import React from 'react';
import DemandeListItem from './DemandeListItem';
import HeaderContentList from './HeaderContentList';

function ContentList(props) {

    return (
        <div className="flex flex-col">
            <HeaderContentList />
            <DemandeListItem />
        </div>
    );
}

export default React.memo(ContentList);

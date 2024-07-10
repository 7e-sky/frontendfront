import React from 'react';
import ProduitListItem from './ProduitListItem';
import HeaderContentList from './HeaderContentList';


function ContentList(props) {

    return (
        <div className="flex flex-col">
            <HeaderContentList />
            <ProduitListItem />
           

        </div>
    );
}

export default React.memo(ContentList);

import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { PostList, PostEdit, PostCreate, PostIcon } from '../Posts/Posts';

function Administrator(){
    return (
    < Admin dataProvider = { jsonServerProvider('http://localhost:4000') } >
        <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} />
    </Admin > 
);
}

export default Administrator;

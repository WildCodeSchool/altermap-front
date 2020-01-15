import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UserList, UserEdit, UserCreate } from '../Users/Users';

function Administrator() {
  return (
    <Admin dataProvider={jsonServerProvider('/api/v1')}>
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    </Admin>
  );
}

export default Administrator;

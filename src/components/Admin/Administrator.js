import React from 'react';
import { fetchUtils, Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

import { UserList, UserEdit, UserCreate } from '../Users/Users';

function Administrator() {
  const httpClient = (url, options = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('altermap-token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
  };
  const dataProvider = jsonServerProvider('/api/v1', httpClient);

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    </Admin>
  );
}

export default Administrator;

import React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, EmailField, TextField, EditButton, TextInput,
} from 'react-admin';

export const UserList = (props) => (
  <List title="Altermap" {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="lastname" />
      <TextField source="company" />
      <EmailField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

// const UserTitle = ({ record }) => (
//   <span>
// Post
//     {' '}
//     {record ? `"${record.title}"` : ''}
//   </span>
// );

export const UserEdit = (props) => (
  <Edit title="Editer un utilisateur" {...props}>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="lastname" />
      <TextInput source="company" />
      <TextInput source="email" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = (props) => (
  <Create title="Créer un utilisateur" {...props}>
    <SimpleForm>
      <TextInput source="lastname" />
      <TextInput source="company" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

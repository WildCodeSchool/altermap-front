import React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, EmailField, TextField, EditButton, TextInput, Toolbar, SaveButton,
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

const UserCreateToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton
      label="SAVE"
      redirect="list"
      submitOnEnter={false}
      variant="text"
    />
  </Toolbar>
);

export const UserCreate = (props) => (
  <Create title="Créer un utilisateur" {...props}>
    <SimpleForm toolbar={<UserCreateToolbar />}>
      <TextInput source="lastname" />
      <TextInput source="company" />
      <TextInput source="email" />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

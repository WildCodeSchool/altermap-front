import React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, EmailField, TextField, EditButton, TextInput, Toolbar, SaveButton, email,
} from 'react-admin';
import { required } from 'ra-core';

const validateEmail = email();

export const UserList = (props) => (
  <List title="Altermap" {...props}>
    <Datagrid>
      <TextField source="lastname" />
      <TextField source="company" />
      <EmailField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit title="Editer un utilisateur" {...props}>
    <SimpleForm>
      <TextInput source="lastname" />
      <TextInput source="company" />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" />
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
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

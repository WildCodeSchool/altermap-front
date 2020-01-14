import React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, DateField, TextField, EditButton, TextInput, DateInput,
} from 'react-admin';
import BookIcon from '@material-ui/icons/Book';

export const PostIcon = BookIcon;

export const UserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="lastname" />
      <TextField source="company" />
      <TextField source="email" />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => (
  <span>
Post
    {' '}
    {record ? `"${record.title}"` : ''}
  </span>
);

export const UserEdit = (props) => (
  <Edit title={<UserTitle />} {...props}>
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

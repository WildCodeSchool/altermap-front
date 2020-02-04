import React from 'react';
import {
  List, Datagrid, Edit, Create, SimpleForm, EmailField, TextField, EditButton, TextInput, Toolbar,
  SaveButton, email, SelectInput, BooleanInput, FormDataConsumer,
} from 'react-admin';

const validateEmail = email();

export const UserList = (props) => (
  <List title="Altermap" {...props}>
    <Datagrid>
      <TextField source="lastname" />
      <TextField source="role" />
      <EmailField source="email" />
      <EditButton />
    </Datagrid>
  </List>
);

export const UserEdit = (props) => (
  <Edit title="Editer un utilisateur" {...props}>
    <SimpleForm>
      <TextInput source="lastname" />
      <SelectInput
        source="role"
        choices={[
          { id: '1', name: 'Lecture seul' },
          { id: '2', name: 'Chef' },
          { id: '3', name: 'Superadmin' },
        ]}
      />
      <TextInput source="email" validate={validateEmail} />
      <BooleanInput source="editPassword" />
      <FormDataConsumer>
        {({ formData, ...rest }) => formData.editPassword
          && <TextInput source="password" {...rest} />}
      </FormDataConsumer>
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
      <SelectInput
        source="role"
        choices={[
          { id: '1', name: 'Lecture seul' },
          { id: '2', name: 'Chef' },
          { id: '3', name: 'Super Admin' },
        ]}
      />
      <TextInput source="email" validate={validateEmail} />
      <TextInput source="password" />
    </SimpleForm>
  </Create>
);

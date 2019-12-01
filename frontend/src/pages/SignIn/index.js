import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Form onSubmit={handleSubmit} data-testid="tech-form" schema={schema}>
      <label htmlFor="email">E-mail</label>
      <Input id="email" name="email" type="email" placeholder="Your e-mail" />

      <label htmlFor="password">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Your secret password"
      />
      <button type="submit">{loading ? 'Loadding...' : 'Login'}</button>
      <Link to="/register">Create free account</Link>
    </Form>
  );
}

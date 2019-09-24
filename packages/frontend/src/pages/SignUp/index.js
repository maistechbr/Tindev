import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Invalid e-mail')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6)
    .required('Password is required'),
});

export default function Main() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  return (
    <Form onSubmit={handleSubmit} data-testid="tech-form" schema={schema}>
      <label htmlFor="name">Full name</label>
      <Input id="name" name="name" placeholder="Your full name" />

      <label htmlFor="email">E-mail</label>
      <Input id="email" name="email" type="email" placeholder="Your e-mail" />

      <label htmlFor="password">Password</label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Your secret password"
      />
      <button type="submit">
        {loading ? 'Loadding...' : 'Create account'}
      </button>
      <Link to="/">I already have an account</Link>
    </Form>
  );
}

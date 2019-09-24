import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail is required'),
  password: Yup.string().email('Password is required'),
});

export default function Main() {
  function handleSubmit({ email, password }) {}

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
      <button type="submit">Adicionar</button>
      <Link to="/register">Create free account</Link>
    </Form>
  );
}

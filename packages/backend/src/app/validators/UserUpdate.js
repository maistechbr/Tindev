import { object, string, ref } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().strict(true),
      email: string()
        .strict(true)
        .email(),
      oldPassword: string()
        .strict(true)
        .min(6),
      password: string()
        .strict(true)
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.strict(true).required() : field
        ),
      confirmPassword: string()
        .strict(true)
        .when('password', (password, field) =>
          password
            ? field
                .required()
                .strict(true)
                .oneOf([ref('password')])
            : field
        ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: { message: 'Validations invalids', err } });
  }
};

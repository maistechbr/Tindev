import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      email: string()
        .strict(true)
        .email()
        .required(),
      password: string()
        .strict(true)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: { message: 'Validations invalids', err } });
  }
};

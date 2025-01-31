import { Hono } from 'hono';
import { userController } from './controller/user-controller';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';
import { contactController } from './controller/contact-controller';
import { addressController } from './controller/address-controller';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

// user route api
app.route('/', userController);

// contact route api
app.route('/', contactController);

// addresses route api
app.route('/', addressController);

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
    c.status(err.status);
    return c.json({
      errors: err.message,
    });
  } else if (err instanceof ZodError) {
    c.status(400);
    return c.json({
      errors: err.message,
    });
  } else {
    c.status(500);
    return c.json({
      errors: err.message,
    });
  }
});

export default app;

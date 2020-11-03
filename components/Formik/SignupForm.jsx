import { Formik, Form, Field } from 'formik';
import { Fieldset, Input, Password, Submit } from '../Forms';
import { signup as signupValues } from '../../models';
import { signup } from '../../controllers/identity';

const SignupForm = () => (
  <Formik {...signupValues} onSubmit={signup}>
    <Form>
      <Fieldset name="name" className="mb-2" label={<div className="text-gray-800">Your name</div>}>
        <Field name="name" type="text" as={Input} />
      </Fieldset>
      <Fieldset
        name="email"
        className="mb-2"
        label={<div className="text-gray-800">Your email</div>}
      >
        <Field name="email" type="email" as={Input} />
      </Fieldset>
      <Fieldset
        name="password"
        className="mb-2"
        label={<div className="text-gray-800">Your password</div>}
      >
        <Field name="password" as={Password} />
      </Fieldset>
      <Submit className="mt-2">Signup</Submit>
    </Form>
  </Formik>
);

export default SignupForm;

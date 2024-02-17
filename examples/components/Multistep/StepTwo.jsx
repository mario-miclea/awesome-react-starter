import { Button } from '@components';
import { Form } from '@components/Formik';
import { formCookie, router } from '@lib';
import { Formik } from 'formik';
import { initialValues, validationSchema } from '../../models/multi-step-two';
import { Age, Country, DateOfBirth, UsState } from '../Formik';

const StepTwo = () => {
  const handleSubmit = (data) => {
    // Save values in a persistent store and move to next step
    formCookie.append('multi-step-form', data);
    // Move to next step
    router.push('/examples/multi-step-three');
  };
  const handlePrevious = () => {
    // Move to previous step
    router.push('/examples/multi-step-one');
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className="grid gap-4" debug={true}>
        <div className="grid gap-4 md:grid-cols-2">
          <Country />
          <UsState />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <DateOfBirth />
          <Age />
        </div>
        <div className="flex flex-wrap gap-4">
          <Button type="submit" className="button full primary">
            Continue
          </Button>
          <Button className="button mini secondary" onClick={handlePrevious}>
            Back to previous step
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default StepTwo;

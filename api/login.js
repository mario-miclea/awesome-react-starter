import { axios, router, toaster } from '../lib';
import { store } from '../auth';

const login = async (ref, data) => {
  try {
    // execute google recaptcha
    data['g-recaptcha-response'] = await ref.current.executeAsync();

    const { token } = axios.post('login', data);
    store.dispatch({ type: 'SET', jwt: token });

    // notify user and other actions
    toaster.success('Login successful');
    router.push('/admin');
  } catch ({ message }) {
    toaster.error(message);

    // reset google recaptcha on invalid login
    ref.current.reset();
  }
};

export default login;

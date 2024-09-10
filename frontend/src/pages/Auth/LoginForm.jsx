import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/authContext';
import Loader from '@/components/shared/Loader';
import { callLogin } from '@/apiCall';

// Define Zod schema
const signinValidation = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
});

const LoginForm = () => {
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(signinValidation),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit = async (values) => {
    try {
      await callLogin(values, dispatch);
      navigate('/'); // Redirect to home page on successful login
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
      <Form {...form}>
        <div className='sm:w-420 flex-center flex-col'>
          <div className='flex items-center space-x-2'>
            <img className='custom-logo' src='/assets/icon/appIcon.svg' alt='logo'/>
            <span className='logo-text'>Fakebook</span>
          </div>
          <h2 className='h4-bold md:h3-bold pt-5 sm:pt-7'>Sharing your moments</h2>
          <p className='text-light-3 small-medium md:base-regular mt-2'>Enter your account</p>

          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full mt-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input type='text' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' className='shad-input' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='shad-button_primary' disabled={isFetching}>
              {isFetching ? (
                <div className='flex-center gap-2'>
                  <Loader /> Loading...
                </div>
              ) : 'Sign in'}
            </Button>
            <p className='text-small-regular text-light-2 text-center mt-2'>Don't have an account?
              <Link to='/sign-up' className='text-primary-500 text-small-semibold ml-1'>Sign up</Link>
            </p>
          </form>
        </div>
      </Form>
  );
};

export default LoginForm;
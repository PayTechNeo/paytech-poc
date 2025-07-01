import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { authSagaActions } from '../store/sagas/authSaga'
import { FORM_FIELDS_NAMES } from '../constants/auth'
import { Button } from '../components/button'
import { Input } from '../components/input'
import type { RootState } from '../types'


interface LoginFormValues {
  [FORM_FIELDS_NAMES.EMAIL]: string
  [FORM_FIELDS_NAMES.PASSWORD]: string
}

const validationSchema = Yup.object().shape({
  [FORM_FIELDS_NAMES.EMAIL]: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  [FORM_FIELDS_NAMES.PASSWORD]: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
})

const LoginPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const auth = useSelector((state: RootState) => state.auth) || {}
  const { loginLoadingState, showErrorMessage, showSuccessMessage, navigationPath } = auth as any
  
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('token')
    if (storedUser) {
      navigate('/dashboard')
      return
    }

    // Handle navigation based on auth state
    if (navigationPath === '/dashboard') {
      navigate('/dashboard')
    } else if (navigationPath === '/login') {
      // Clear the navigation path after handling it
      dispatch({ type: 'auth/setNavigationPath', payload: null })
    }
  }, [navigationPath, navigate, dispatch])

  const handleSubmit = (values: LoginFormValues) => {
    dispatch(authSagaActions.login(values) as any)
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-indigo-600">
            Hey, good to see you
          </h2>
          <p className="mt-2 text-center text-lg sm:text-xl font-bold text-indigo-600">
            Let's Sign in you
          </p>

         {showErrorMessage && (
            <p className="mt-2 text-center text-red-600 text-sm sm:text-base">
              {showErrorMessage}
            </p>
          )}

          {showSuccessMessage && (
            <p className="mt-2 text-center text-green-600 text-sm sm:text-base">
              {showSuccessMessage}
            </p>
          )}
        </div>

        <Formik
          initialValues={{
            [FORM_FIELDS_NAMES.EMAIL]: '',
            [FORM_FIELDS_NAMES.PASSWORD]: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              <Input
                name={FORM_FIELDS_NAMES.EMAIL}
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={values[FORM_FIELDS_NAMES.EMAIL]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[FORM_FIELDS_NAMES.EMAIL] && errors[FORM_FIELDS_NAMES.EMAIL]}
                required
              />

              <Input
                name={FORM_FIELDS_NAMES.PASSWORD}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={values[FORM_FIELDS_NAMES.PASSWORD]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[FORM_FIELDS_NAMES.PASSWORD] && errors[FORM_FIELDS_NAMES.PASSWORD]}
                required
                endIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                }
              />

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                variant="contained"
                className="w-full"
                disabled={loginLoadingState?.state === 'LOADING'}
              >
                {loginLoadingState?.state === 'LOADING' ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="text-sm text-center">
                <Link
                  to="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage 
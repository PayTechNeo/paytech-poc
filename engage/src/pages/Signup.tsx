import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { authActions } from '../store/slices/authSlice'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { authSagaActions } from '../store/sagas/authSaga'
import type { RootState } from '../types'

const FORM_FIELDS_NAMES = {
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  EMAIL: 'email',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  ORGANIZATION_NAME: 'organizationName'
} as const

interface FormField {
  fieldName: string
  isRequired: boolean
  type: string
  label: string
  placeholder: string
  isEmail?: boolean
  isPassword?: boolean
}

interface SignupFormValues {
  [FORM_FIELDS_NAMES.FIRSTNAME]: string
  [FORM_FIELDS_NAMES.LASTNAME]: string
  [FORM_FIELDS_NAMES.EMAIL]: string
  [FORM_FIELDS_NAMES.PASSWORD]: string
  [FORM_FIELDS_NAMES.CONFIRM_PASSWORD]: string
  [FORM_FIELDS_NAMES.ORGANIZATION_NAME]: string
}

const formFields: FormField[] = [
  {
    fieldName: FORM_FIELDS_NAMES.FIRSTNAME,
    isRequired: true,
    type: 'text',
    label: 'First Name',
    placeholder: 'Enter your first name'
  },
  {
    fieldName: FORM_FIELDS_NAMES.LASTNAME,
    isRequired: true,
    type: 'text',
    label: 'Last Name',
    placeholder: 'Enter your last name'
  },
  {
    fieldName: FORM_FIELDS_NAMES.EMAIL,
    isRequired: true,
    isEmail: true,
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email'
  },
  {
    fieldName: FORM_FIELDS_NAMES.PASSWORD,
    isRequired: true,
    isPassword: true,
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password'
  },
  {
    fieldName: FORM_FIELDS_NAMES.CONFIRM_PASSWORD,
    isRequired: true,
    isPassword: true,
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm your password'
  },
  {
    fieldName: FORM_FIELDS_NAMES.ORGANIZATION_NAME,
    isRequired: true,
    type: 'text',
    label: 'Organization name',
    placeholder: 'Enter your organization name'
  }
]

// Create validation schema with password matching
const validationSchema = Yup.object().shape({
  [FORM_FIELDS_NAMES.FIRSTNAME]: Yup.string().required('First name is required'),
  [FORM_FIELDS_NAMES.LASTNAME]: Yup.string().required('Last name is required'),
  [FORM_FIELDS_NAMES.EMAIL]: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  [FORM_FIELDS_NAMES.PASSWORD]: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  [FORM_FIELDS_NAMES.CONFIRM_PASSWORD]: Yup.string()
    .oneOf([Yup.ref(FORM_FIELDS_NAMES.PASSWORD), null], 'Passwords must match')
    .required('Confirm password is required'),
  [FORM_FIELDS_NAMES.ORGANIZATION_NAME]: Yup.string().required('Organization name is required')
})

const SignupPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { loginLoadingState, showErrorMessage, navigationPath } = useSelector((state: RootState) => state.auth || {})

  useEffect(() => {
    // Handle navigation to login page after successful registration
    if (navigationPath === '/login') {
      navigate('/login')
      // Clear the navigation path after handling it
      dispatch({ type: 'auth/setNavigationPath', payload: null })
    }
  }, [navigationPath, navigate, dispatch])

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      // Get user agent and IP address
      const userAgent = navigator.userAgent
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      // const ipData = await ipResponse.json()
      // const ipAddress = ipData.ip

      // Dispatch registration action
      dispatch(authSagaActions.register({
        values: {
          firstName: values[FORM_FIELDS_NAMES.FIRSTNAME],
          lastName: values[FORM_FIELDS_NAMES.LASTNAME],
          email: values[FORM_FIELDS_NAMES.EMAIL],
          password: values[FORM_FIELDS_NAMES.PASSWORD],
          organizationName: values[FORM_FIELDS_NAMES.ORGANIZATION_NAME]
        },
        // userAgent,
        // ipAddress
      }))
    } catch (err: any) {
      dispatch(authActions.setShowErrorMessage("Error during registration: " + err.message))
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-lg space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-lg sm:text-xl font-bold text-gray-600">
            Join us today
          </p>
          
         {showErrorMessage && (
            <p className="mt-2 text-center text-red-600 text-sm sm:text-base">
              {showErrorMessage}
            </p>
          )}
        </div>
        <Formik
          initialValues={{
            [FORM_FIELDS_NAMES.FIRSTNAME]: '',
            [FORM_FIELDS_NAMES.LASTNAME]: '',
            [FORM_FIELDS_NAMES.EMAIL]: '',
            [FORM_FIELDS_NAMES.PASSWORD]: '',
            [FORM_FIELDS_NAMES.CONFIRM_PASSWORD]: '',
            [FORM_FIELDS_NAMES.ORGANIZATION_NAME]: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  name={FORM_FIELDS_NAMES.FIRSTNAME}
                  label={formFields[0].label}
                  placeholder={formFields[0].placeholder}
                  value={values[FORM_FIELDS_NAMES.FIRSTNAME]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={formFields[0].isRequired}
                  type={formFields[0].type}
                  error={touched[FORM_FIELDS_NAMES.FIRSTNAME] && errors[FORM_FIELDS_NAMES.FIRSTNAME]}
                />
                <Input
                  name={FORM_FIELDS_NAMES.LASTNAME}
                  label={formFields[1].label}
                  placeholder={formFields[1].placeholder}
                  value={values[FORM_FIELDS_NAMES.LASTNAME]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={formFields[1].isRequired}
                  type={formFields[1].type}
                  error={touched[FORM_FIELDS_NAMES.LASTNAME] && errors[FORM_FIELDS_NAMES.LASTNAME]}
                />
              </div>

              <Input
                name={FORM_FIELDS_NAMES.EMAIL}
                label={formFields[2].label}
                placeholder={formFields[2].placeholder}
                value={values[FORM_FIELDS_NAMES.EMAIL]}
                onChange={handleChange}
                onBlur={handleBlur}
                required={formFields[2].isRequired}
                type={formFields[2].type}
                error={touched[FORM_FIELDS_NAMES.EMAIL] && errors[FORM_FIELDS_NAMES.EMAIL]}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  name={FORM_FIELDS_NAMES.PASSWORD}
                  label={formFields[3].label}
                  placeholder={formFields[3].placeholder}
                  value={values[FORM_FIELDS_NAMES.PASSWORD]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={formFields[3].isRequired}
                  type={showPassword ? 'text' : 'password'}
                  error={touched[FORM_FIELDS_NAMES.PASSWORD] && errors[FORM_FIELDS_NAMES.PASSWORD]}
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

                <Input
                  name={FORM_FIELDS_NAMES.CONFIRM_PASSWORD}
                  label={formFields[4].label}
                  placeholder={formFields[4].placeholder}
                  value={values[FORM_FIELDS_NAMES.CONFIRM_PASSWORD]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={formFields[4].isRequired}
                  type={showConfirmPassword ? 'text' : 'password'}
                  error={touched[FORM_FIELDS_NAMES.CONFIRM_PASSWORD] && errors[FORM_FIELDS_NAMES.CONFIRM_PASSWORD]}
                  endIcon={
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  }
                />
              </div>

              <Input
                name={FORM_FIELDS_NAMES.ORGANIZATION_NAME}
                label={formFields[5].label}
                placeholder={formFields[5].placeholder}
                value={values[FORM_FIELDS_NAMES.ORGANIZATION_NAME]}
                onChange={handleChange}
                onBlur={handleBlur}
                required={formFields[5].isRequired}
                type={formFields[5].type}
                error={touched[FORM_FIELDS_NAMES.ORGANIZATION_NAME] && errors[FORM_FIELDS_NAMES.ORGANIZATION_NAME]}
              />

              <Button
                type="submit"
                variant="contained"
                className="w-full"
                disabled={loginLoadingState?.state === 'LOADING'}
              >
                {loginLoadingState?.state === 'LOADING' ? 'Creating account...' : 'Sign up'}
              </Button>

              <div className="text-sm text-center">
                <Link
                  to="/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignupPage 
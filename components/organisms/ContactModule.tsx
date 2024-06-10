import axios, { AxiosResponse } from 'axios'
import { Form, Formik, FormikErrors, FormikHelpers, FormikTouched } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import * as Yup from 'yup'

import Input from '#atoms/Input'
import Layout from '#atoms/Layout'
import Textarea from '#atoms/Textarea'
import useContactModuleAnimations from '#gsap/useContactFormAnimations'
import { GetTokenResponse, PostMailResponse } from '#lib/types'
import Button from '#molecules/Button'
import HeadlineArea from '#molecules/HeadlineArea'

type ContactFormValues = {
  name: string
  email: string
  message: string
}

const InputFormHelperError = ({
  errors,
  touched,
  selector,
}: {
  errors: FormikErrors<ContactFormValues>
  touched: FormikTouched<ContactFormValues>
  selector: keyof ContactFormValues
}) =>
  touched[selector] &&
  errors[selector] && <div className="text-warning absolute text-sm">{errors[selector]}</div>

const InputFormHelperWrap = ({
  isError,
  children,
}: {
  isError: boolean
  children: React.ReactNode
}) => <div className={`${isError ? 'pb-5' : 'pb-0'} relative transition-padding`}>{children}</div>

const InputFormHelper = ({
  name,
  placeholder,
  type,
  errors,
  touched,
  selector,
  inputClass,
}: {
  name: string
  placeholder: string
  type: 'text' | 'email' | 'textarea'
  errors: FormikErrors<ContactFormValues>
  touched: FormikTouched<ContactFormValues>
  selector: keyof ContactFormValues
  inputClass: string
}) => {
  const isError = useMemo(
    () => !!(touched[selector] && errors[selector]),
    [errors, selector, touched],
  )

  const inputComponent = useMemo(() => {
    if (type === 'textarea') {
      return <Textarea name={name} className={inputClass} placeholder={placeholder} />
    }
    return <Input type={type} className={inputClass} name={name} placeholder={placeholder} />
  }, [inputClass, name, placeholder, type])

  return (
    <InputFormHelperWrap isError={isError}>
      {inputComponent}
      <InputFormHelperError errors={errors} touched={touched} selector={selector} />
    </InputFormHelperWrap>
  )
}

// todo: utils
const prepareFormData = (formValues?: Record<string, string>) => {
  const formData = new FormData()
  if (formValues) {
    Object.entries({ ...formValues }).forEach(([key, value]) => {
      formData.append(key, value)
    })
  }
  return formData
}

// todo: to api fncs
const getToken = () =>
  axios.post<GetTokenResponse>('http://localhost:9000/token/', null, { withCredentials: true })

// todo: to api fncs
const postMail: (formData: FormData) => Promise<AxiosResponse<PostMailResponse>> = (
  formData: FormData,
) =>
  axios.post<PostMailResponse>('http://localhost:9000/hello/', formData, {
    withCredentials: true,
  })

const formDefaultValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

const formSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  message: Yup.string().min(2, 'Too Short!').max(850, 'Too Long!').required('Required'),
})

const ContactModule = () => {
  const [isServerError, setIsServerError] = useState<boolean>(false)
  const { gsapContactModuleRef, onSuccessAnimationHandler } = useContactModuleAnimations()

  const handleSubmit = useCallback(
    async (formValues: ContactFormValues) => {
      const token = await getToken()
        .catch(() => {
          setIsServerError(true)
          return undefined
        })
        .then(async res => {
          if (res && res?.status > 200) {
            setIsServerError(true)
            return undefined
          }
          return res?.data.token
        })

      if (!token) return
      const preparedData = prepareFormData({ ...formValues, token })

      await postMail(preparedData)
        .catch(() => {
          setIsServerError(true)
          return null
        })
        .then(res => {
          if (res && res?.status > 200) {
            setIsServerError(true)
            return
          }
          onSuccessAnimationHandler()
          setIsServerError(false)
        })
    },
    [onSuccessAnimationHandler],
  )

  return (
    <div className="relative z-10">
      <Layout
        $fullWidth
        className="bg-gradient-to-b via-10% from-dark absolute top-0 w-full h-50 z-7"
      />
      <Layout ref={gsapContactModuleRef} className="relative z-8">
        <div className="md:w-3/4 mx-auto pixi-hitbox">
          <HeadlineArea headline="Still wanna collaborate? 😅" subHeadline="Get in touch with me" />
          <Formik
            initialValues={formDefaultValues}
            validationSchema={formSchema}
            onSubmit={(
              values: ContactFormValues,
              { setSubmitting }: FormikHelpers<ContactFormValues>,
            ) => {
              handleSubmit(values)
              setSubmitting(false)
            }}
          >
            {({ errors, dirty, touched, isValid }) => (
              <Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <InputFormHelper
                    name="name"
                    placeholder="Name *"
                    type="text"
                    errors={errors}
                    touched={touched}
                    selector="name"
                    inputClass="w-full"
                  />
                  <InputFormHelper
                    name="email"
                    placeholder="Email *"
                    type="email"
                    errors={errors}
                    touched={touched}
                    selector="email"
                    inputClass="w-full"
                  />
                </div>
                <div className="mb-2">
                  <InputFormHelper
                    name="message"
                    placeholder="Your Message *"
                    type="textarea"
                    errors={errors}
                    touched={touched}
                    selector="message"
                    inputClass="w-full"
                  />
                </div>
                <Button
                  label="Send"
                  type="submit"
                  className={`bg-primary ${dirty && isValid ? 'opacity-100' : 'opacity-60'}`}
                />
              </Form>
            )}
          </Formik>
          {isServerError && (
            <div className="p-3 bg-dark text-error">
              Something went wrong while submitting the form, please try again
            </div>
          )}
        </div>
      </Layout>
    </div>
  )
}

export default ContactModule

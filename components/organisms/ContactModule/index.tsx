import axios from 'axios'
import { FormEvent, useRef } from 'react'

import Layout from '#atoms/Layout'
import HeadlineArea from '#molecules/HeadlineArea'

const getToken = () => axios.post('https://mail.unterberg.dev/token/')

const ContactModule = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const tokenQuery = await getToken()
    const formData = new FormData(formRef.current ? formRef.current : undefined)
    formData.append('token', tokenQuery.data.token)

    axios.post('https://mail.unterberg.dev/hello/', formData, {
      withCredentials: true, // Ensure cookies are included in the request
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    // .then(response => {
    //   // console.log('Form submitted successfully:', response.data)
    // })
    // .catch(error => {
    //   // console.error('Error submitting the form:', error)
    // })
  }

  return (
    <Layout>
      <HeadlineArea headline="Still wanna collaborate? 😅" subHeadline="Get in touch with me" />
      <form ref={formRef} method="POST" onSubmit={event => handleSubmit(event)}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <textarea name="message" placeholder="Message" />
        <button type="submit">Send</button>
      </form>
    </Layout>
  )
}

export default ContactModule

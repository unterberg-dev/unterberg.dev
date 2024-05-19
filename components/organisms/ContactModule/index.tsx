import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import Layout from '#atoms/Layout'
import HeadlineArea from '#molecules/HeadlineArea'

const ContactModule = () => {
  const {
    data: token,
    error,
    refetch,
  } = useQuery({
    queryKey: ['contactFormToken'],
    enabled: false,
    queryFn: async () => {
      const response = await fetch('https://mail.unterberg.dev/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    },
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(token)
  }, [token])

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(error)
  }, [error])

  return (
    <Layout>
      <HeadlineArea headline="Still wanna collaborate? 😅" subHeadline="Get in touch with me" />
    </Layout>
  )
}

export default ContactModule

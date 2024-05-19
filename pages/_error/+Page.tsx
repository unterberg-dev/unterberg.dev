import H2Headline from '#atoms/H2Headline'
import Layout from '#atoms/Layout'

const ErrorPage = ({ is404, errorInfo }: { is404: boolean; errorInfo?: string }) => (
  <Layout className="mt-20">
    {is404 ? (
      <>
        <H2Headline className="mb-4">404 Page Not Found</H2Headline>
        <p>This page could not be found.</p>
        <p>{errorInfo}</p>
      </>
    ) : (
      <>
        <H2Headline className="mb-4">500 Internal Server Error</H2Headline>
        <p>Something went wrong.</p>
      </>
    )}
  </Layout>
)

export default ErrorPage

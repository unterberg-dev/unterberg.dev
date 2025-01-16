import rc from "react-classmate"

interface LayoutTwProps {
  $fullWidth?: boolean
}

export default rc.div<LayoutTwProps>`
  m-auto
  ${(p) => (p.$fullWidth ? "w-full" : "max-w-7xl")}
  px-4
  px-lg-0
`

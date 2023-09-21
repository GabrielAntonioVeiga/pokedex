import { createGlobalStyle } from 'styled-components'

export const devices = {
  mobile: 'max-width: 500px'
}

export default createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    display: block;
  }

  * {
    margin: 0px;
  }
`

import 'react-toastify/dist/ReactToastify.css'
import { extendTheme } from '@chakra-ui/react'
import { breakpoints } from './custom'

const globalStyles = {
  body: {
    fontFamily: 'Roboto',
    overflowX: 'hidden',
    backgroundColor: 'gray.900',
  },
}

export const theme = extendTheme({
  breakpoints,
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
  },
  styles: { global: globalStyles },
})

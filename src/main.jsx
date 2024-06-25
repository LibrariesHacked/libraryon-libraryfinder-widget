import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import App from './App.jsx'

const container = document.getElementById('libraryfinder-widget')
const shadowContainer = container.attachShadow({ mode: 'open' })
const shadowRootElement = document.createElement('div')
shadowContainer.appendChild(shadowRootElement)

const cache = createCache({
  key: 'css',
  prepend: true,
  container: shadowContainer
})

const theme = createTheme({
  typography: { fontFamily: ['Lexend', 'sans-serif'].join(',') },
  palette: {
    primary: {
      main: container.dataset.primary || '#3f51b5'
    },
    secondary: {
      main: container.dataset.primary || '#f50057'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiPopover: {
      defaultProps: {
        container: shadowRootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: shadowRootElement
      }
    },
    MuiModal: {
      defaultProps: {
        container: shadowRootElement
      }
    }
  }
})

ReactDOM.createRoot(shadowRootElement).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <App
          width={container.dataset.width}
          height={container.dataset.height}
        />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
)

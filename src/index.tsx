import ReactDOM from 'react-dom/client';
import App from './App';
import { Reset } from 'styled-reset';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './theme';
import { HelmetProvider } from 'react-helmet-async';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-weight: 300;
    font-family: 'Hi Melody', serif;
    background-color: ${(props) => props.theme.bgColor};
    color: black;
    line-height: 1.2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input, textarea, select {
    outline: none;
  }
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <Reset />
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

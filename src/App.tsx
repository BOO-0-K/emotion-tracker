import { Helmet } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/Layout';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'new',
        element: <div>New</div>,
      },
      {
        path: 'diary/:id',
        element: <div>Diary</div>,
      },
      {
        path: 'edit/:id',
        element: <div>Edit</div>,
      },
      {
        path: 'me',
        element: <div>Me</div>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />
  },
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }
});

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <Helmet>
        <title>감정 일기장</title>
        <link href='https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap' rel='stylesheet'></link>
      </Helmet>
      <Wrapper>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Wrapper>
    </>
  );
}

export default App;

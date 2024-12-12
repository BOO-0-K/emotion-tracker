import { Helmet } from 'react-helmet-async';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';
import Layout from './components/Layout';
import Login from './routes/Login';
import NotFound from './routes/NotFound';
import Home from './routes/Home';
import ProtectedRoute from './components/ProtectedRoute';
import New from './routes/New';
import Me from './routes/Me';
import ConfirmModal from './components/ConfirmModal';
import AlertModal from './components/AlertModal';
import Edit from './routes/Edit';
import Diary from './routes/Diary';


const router = createBrowserRouter([
  {
    path: '/',
    element: (<ProtectedRoute>
      <Layout />
    </ProtectedRoute>),
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'new',
        element: <New />,
      },
      {
        path: 'diary/:id',
        element: <Diary />,
      },
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'me',
        element: <Me />,
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
        <title>DIARY</title>
        <link href="https://fonts.googleapis.com/css2?family=Sunflower:wght@300;500;700&display=swap" rel="stylesheet"></link>
      </Helmet>
      <Wrapper>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </Wrapper>
      <ConfirmModal />
      <AlertModal />
    </>
  );
}

export default App;

import React from 'react';
import './App.css';
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListUsers from './pages/ListUsers/ListUsers';
import FormUser from './pages/FormUser/FormUser';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListUsers />,
  },
  {
    path: "/users",
    element: <ListUsers />,
  },
  {
    path: "users/:userId",
    element: <FormUser />,
  },
]);

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
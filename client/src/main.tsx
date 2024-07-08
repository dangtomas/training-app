import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.tsx';
import Trainings from './pages/TrainingsPage.tsx';
import TrainingForm from './pages/TrainingForm.tsx';
import MainPage from './pages/MainPage.tsx';
import Prices from './pages/Prices.tsx';
import Profile from './pages/Profile.tsx';
import Members from './pages/Members.tsx';
import "./assets/styles.css";
import NotFoundPage from './pages/NotFoundPage.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },
    {
        path:"/login",
        element: <Login/>,
    },
    {
        path: "/trainings",
        element: <Trainings />,
    },
    {
        path: "/training-form",
        element: <TrainingForm />,
    },
    {
        path: "/prices",
        element: <Prices/>,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path:"/members",
        element: <Members />,
    },
    {
        path:"*",
        element: <NotFoundPage />
    }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

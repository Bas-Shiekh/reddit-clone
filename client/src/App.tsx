import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, LoginPage, RegisterPage, CreatePostPage, SavePage } from './pages';
import './App.css';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "post/create",
      element: <CreatePostPage />,
    },
    {
      path: "save",
      element: <SavePage />,
    },
  ]);

  return (
      <div className="App">
        <RouterProvider router={router} />
      </div>
  );
}

export default App;

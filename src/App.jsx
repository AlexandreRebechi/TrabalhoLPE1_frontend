import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from "./componente/telas/Home"
import MenuPrivado from "./componente/telas/MenuPrivado";
import Login from "./componente/telas/login/Login";
import MenuPublico from "./componente/telas/MenuPublico";
import Produtos from "./componente/telas/produto/Produtos";
import Pais from "./componente/telas/pais/Pais";
import Estados from "./componente/telas/estados/Estados";
import Cidades from "./componente/telas/cidades/Cidades";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPublico />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  },
  {
    path: "/privado",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "pais",
        element: <Pais />
      },
      {
        path: "estados",
        element: <Estados />
      },
      {
        path: "cidades",
        element: <Cidades/>
      }
      ,
      {
        path: "produtos",
        element: <Produtos />
      },
      {
        path: "login",
        element: <Login />
      }
    ]
  }
])
function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;

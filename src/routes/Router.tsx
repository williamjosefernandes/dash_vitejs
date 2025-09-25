import { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

// utilities
const Typography = lazy(() => import("../views/typography/Typography"));
const Table = lazy(() => import("../views/tables/Table"));
const Form = lazy(() => import("../views/forms/Form"));
const Shadow = lazy(() => import("../views/shadows/Shadow"));
const Alert = lazy(() => import("../views/alerts/Alerts"));

// icons
const Solar = lazy(() => import("../views/icons/Solar"));

// authentication
const Login = lazy(() => import('../views/auth/login/Login'));
const Register = lazy(() => import('../views/auth/register/Register'));
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const Error = lazy(() => import('../views/auth/error/Error'));

// Gabaritte pages
const Home = lazy(() => import('../views/gabaritte/home/Home'));
const PlanosEstudo = lazy(() => import('../views/gabaritte/planos-estudo/PlanosEstudo'));
const Disciplinas = lazy(() => import('../views/gabaritte/disciplinas/Disciplinas'));
const Planejamento = lazy(() => import('../views/gabaritte/planejamento/Planejamento'));
const Revisoes = lazy(() => import('../views/gabaritte/revisoes/Revisoes'));
const Trilhas = lazy(() => import('../views/gabaritte/trilhas/Trilhas'));
const Conteudo = lazy(() => import('../views/gabaritte/conteudo/Conteudo'));
const Resumos = lazy(() => import('../views/gabaritte/resumos/Resumos'));
const Simulados = lazy(() => import('../views/gabaritte/simulados/Simulados'));
const Insights = lazy(() => import('../views/gabaritte/insights/Insights'));
const Historico = lazy(() => import('../views/gabaritte/historico/Historico'));
const Estatisticas = lazy(() => import('../views/gabaritte/estatisticas/Estatisticas'));
const Configuracoes = lazy(() => import('../views/gabaritte/configuracoes/Configuracoes'));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Navigate to="/gabaritte/home" /> },
      
      // Gabaritte routes
      { path: '/gabaritte/home', exact: true, element: <Home /> },
      { path: '/gabaritte/planos-estudo', exact: true, element: <PlanosEstudo /> },
      { path: '/gabaritte/disciplinas', exact: true, element: <Disciplinas /> },
      { path: '/gabaritte/planejamento', exact: true, element: <Planejamento /> },
      { path: '/gabaritte/revisoes', exact: true, element: <Revisoes /> },
      { path: '/gabaritte/trilhas', exact: true, element: <Trilhas /> },
      { path: '/gabaritte/conteudo', exact: true, element: <Conteudo /> },
      { path: '/gabaritte/resumos', exact: true, element: <Resumos /> },
      { path: '/gabaritte/simulados', exact: true, element: <Simulados /> },
      { path: '/gabaritte/insights', exact: true, element: <Insights /> },
      { path: '/gabaritte/historico', exact: true, element: <Historico /> },
      { path: '/gabaritte/estatisticas', exact: true, element: <Estatisticas /> },
      { path: '/gabaritte/configuracoes', exact: true, element: <Configuracoes /> },
      
      // Original routes
      { path: '/ui/typography', exact: true, element: <Typography /> },
      { path: '/ui/table', exact: true, element: <Table /> },
      { path: '/ui/form', exact: true, element: <Form /> },
      { path: '/ui/alert', exact: true, element: <Alert /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  }
  ,
];

const router = createBrowserRouter(Router)

export default router;

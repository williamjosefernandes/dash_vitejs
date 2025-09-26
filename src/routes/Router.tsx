import { lazy } from 'react';
import { Navigate, createBrowserRouter } from "react-router";

/* ***Layouts**** */
const FullLayout = lazy(() => import('../layouts/full/FullLayout'));
const BlankLayout = lazy(() => import('../layouts/blank/BlankLayout'));

// Dashboard
const Dashboard = lazy(() => import('../views/dashboards/Dashboard'));

// utilities
const Typography = lazy(() => import("../views/typography/Typography"));
const Table = lazy(() => import("../views/tables/Table"));
const Form = lazy(() => import("../views/forms/Form"));
const Shadow = lazy(() => import("../views/shadows/Shadow"));
const Alert = lazy(() => import("../views/alerts/Alerts"));

// icons
const Solar = lazy(() => import("../views/icons/Solar"));

// Gabaritte Pages
const SubjectsPage = lazy(() => import('../views/subjects/SubjectsPage'));
const SubjectDetails = lazy(() => import('../views/subjects/SubjectDetails'));
const TrailsPage = lazy(() => import('../views/trails/TrailsPage'));
const ContentPage = lazy(() => import('../views/content/ContentPage'));
const SummariesPage = lazy(() => import('../views/summaries/SummariesPage'));
const SimulationsPage = lazy(() => import('../views/simulations/SimulationsPage'));
const InsightsPage = lazy(() => import('../views/insights/InsightsPage'));
const HistoryPage = lazy(() => import('../views/history/HistoryPage'));
const StatisticsPage = lazy(() => import('../views/statistics/StatisticsPage'));
const CronogramaPage = lazy(() => import('../views/cronograma/CronogramaPage'));
const CriarCronogramaPage = lazy(() => import('../views/cronograma/CriarCronogramaPageWrapper'));
const StudyPlansPage = lazy(() => import('../views/studyPlans/StudyPlansPage'));
const SettingsPage = lazy(() => import('../views/settings/SettingsPage'));

// authentication
const Login = lazy(() => import('../views/auth/login/Login'));
const Register = lazy(() => import('../views/auth/register/Register'));
const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));
const Error = lazy(() => import('../views/auth/error/Error'));

const routerConfig = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      
      // Gabaritte Routes
      { path: '/subjects', exact: true, element: <SubjectsPage /> },
      { path: '/subjects/:id', exact: true, element: <SubjectDetails /> },
      { path: '/trails', exact: true, element: <TrailsPage /> },
      { path: '/content', exact: true, element: <ContentPage /> },
      { path: '/summaries', exact: true, element: <SummariesPage /> },
      { path: '/simulations', exact: true, element: <SimulationsPage /> },
      { path: '/insights', exact: true, element: <InsightsPage /> },
      { path: '/history', exact: true, element: <HistoryPage /> },
      { path: '/statistics', exact: true, element: <StatisticsPage /> },
      { path: '/cronograma', exact: true, element: <CronogramaPage /> },
      { path: '/cronograma/criar', exact: true, element: <CriarCronogramaPage /> },
      { path: '/study-plans', exact: true, element: <StudyPlansPage /> },
      { path: '/settings', exact: true, element: <SettingsPage /> },
      
      // UI Routes
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
  },
];

const router = createBrowserRouter(routerConfig);

export default router;

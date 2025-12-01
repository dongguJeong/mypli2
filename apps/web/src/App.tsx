import Home from "./page/home";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./component/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Search from "./page/Search";
import Bookmark from "./page/Bookmark";
import Myplaylist from "./page/MyPlaylist";
import Playlist from "./page/Playlist";
import Bulletin from "./page/Bulletin";
import ReportPage from "./page/ReportPage";
import ProtectedRoute from "./component/ProtectedRoute";

const routeList = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/bookmark",
    element: <Bookmark />,
  },
  {
    path: "/mypli",
    element: <Myplaylist />,
  },

  {
    path: "/bulletin",
    element: <Bulletin />,
  },
  {
    path: "/playlist/:id",
    element: <Playlist />,
  },
  {
    path: "/admin/report",
    element: (
      <ProtectedRoute requireAdmin>
        <ReportPage />
      </ProtectedRoute>
    ),
  },
];

const router = createBrowserRouter(
  routeList.map((v) => {
    return {
      ...v,
      element: <Layout>{v.element}</Layout>,
    };
  })
);

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;

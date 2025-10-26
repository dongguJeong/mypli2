import Home from "./page/home";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./component/layout/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const routeList = [
  {
    path: "/",
    element: <Home />,
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

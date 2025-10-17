import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components-route/layout/Layout";

const routeList = [
  {
    path: "/",
    element: <div>home</div>,
  },
  {
    path: "/like",
    element: <div>like</div>,
  },
  {
    path: "/myPlaylist",
    element: <div>playlist</div>,
  },
];

const router = createBrowserRouter(
  routeList.map((item) => {
    return {
      ...item,
      element: <Layout>{item.element}</Layout>,
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

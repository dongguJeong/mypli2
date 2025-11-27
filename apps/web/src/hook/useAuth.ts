import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Auth } from "../api/auth";

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (data: { email: string; password: string }) => Auth.login(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "status"] });
    },
  });

  const signup = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      Auth.signup(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "status"] });
    },
  });

  const logout = useMutation({
    mutationFn: () => Auth.logout(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "status"] });
    },
  });

  const { data: status } = useQuery({
    queryKey: ["auth", "status"],
    queryFn: async () => {
      const res = await Auth.status();
      return res.data;
    },
    retry: false,
  });

  return {
    status,
    login,
    logout,
    signup,
  };
}

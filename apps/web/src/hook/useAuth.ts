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

  const { data: user, isLoading: isAuthLoading } = useQuery({
    queryKey: ["auth", "status"],
    queryFn: async () => {
      const res = await Auth.status();
      return res.data.user ?? null;
    },
    retry: false, // 세션 만료 시 에러를 계속 재시도하지 않음
  });

  return {
    user,
    login,
    logout,
    isAuthLoading,
    signup,
  };
}

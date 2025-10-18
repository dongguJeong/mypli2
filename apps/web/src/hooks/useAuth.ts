import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Auth } from "../api/auth";

export function useAuth() {
  const queryClient = useQueryClient();

  const status = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const res = await Auth.status();
      return res.data.user;
    },
    retry: false,
  });

  const login = useMutation({
    mutationFn: (data: { email: string; password: string }) => Auth.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  // 회원가입
  const signup = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      Auth.signup(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  // 로그아웃
  const logout = useMutation({
    mutationFn: () => Auth.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["status"] });
    },
  });

  return {
    status: status,
    login: login,
    signup: signup,
    logout: logout,
  };
}

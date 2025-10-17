import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useModalStore } from "../../store/modal-store";
import { AppErrorBoundary } from "../AppErrorBoundary";
import type { LoginProps } from "../../api/auth";
import { useAuth } from "../../hooks/useAuth";

export default function SignupModal() {
  const { currentModal, switchModal } = useModalStore();
  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    signup.mutateAsync(data);
  };

  if (currentModal !== "signup") return null;

  return (
    <div className="flex flex-col items-center text-black gap-4">
      <AppErrorBoundary>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 w-full"
        >
          <Input
            placeholder="이메일"
            type="email"
            {...register("email", { required: true })}
            className={errors.email ? "border-red-500" : ""}
          />

          <Input
            placeholder="비밀번호"
            type="password"
            {...register("password", { required: true })}
            className={errors.password ? "border-red-500" : ""}
          />

          <Button buttonSize="lg" disabled={signup.isPending}>
            <span>회원가입</span>
          </Button>
        </form>
      </AppErrorBoundary>
      <div className="bg-gray-200 w-full h-[1px]" />

      <h2>
        계정이 있으신가요?{" "}
        <span
          onClick={() => switchModal("signup")}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          로그인 하러가기
        </span>
      </h2>
    </div>
  );
}

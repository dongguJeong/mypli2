import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useModalStore } from "../../store/modal-store";
import { useAuth } from "../../hooks/useAuth";
import type { LoginProps } from "../../api/auth";

export default function LoginModal() {
  const { currentModal, switchModal, closeModal } = useModalStore();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    try {
      await login.mutateAsync(data);
      closeModal();
    } catch (e) {
      console.error(e);
    }
  };

  if (currentModal !== "login") return null;

  return (
    <div className="flex flex-col items-center text-black gap-4">
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
          autoComplete="off"
          {...register("password", { required: true })}
          className={errors.password ? "border-red-500" : ""}
        />

        <Button buttonSize="lg" disabled={login.isPending}>
          <span>로그인</span>
        </Button>
      </form>

      <div className="bg-gray-200 w-full h-[1px]" />

      <h2>
        계정이 없으신가요?{" "}
        <span
          onClick={() => switchModal("signup")}
          className="underline underline-offset-4 font-semibold cursor-pointer"
        >
          회원가입 하러가기
        </span>
      </h2>
    </div>
  );
}

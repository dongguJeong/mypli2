import { Auth } from "../../api/auth";
import { useAlert } from "../../hook/useAlert";
import { useModalStore } from "../../store/modal-store";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { useForm, type SubmitHandler } from "react-hook-form";

export interface ILogin {
  email: string;
  password: string;
}

export default function LoginModal() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILogin>();

  const { showAlert } = useAlert();

  const { open, currentModal, close } = useModalStore();
  if (currentModal !== "login") return;
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await Auth.login(data);
      showAlert("로그인 성공");
      close();
    } catch (err) {
      const message = err.response?.data?.message;
      setError("email", { type: "server" });
      setError("password", { type: "server" });
      showAlert(message);
    }
  };

  return (
    <Modal title="로그인">
      <div className="flex flex-col gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            className="rounded-sm"
            type="email"
            error={!!errors.email}
            placeholder="이메일"
            {...register("email", { required: true })}
          />

          <Input
            type="password"
            className="rounded-sm"
            error={!!errors.password}
            placeholder="비밀번호"
            {...register("password", { required: true, minLength: 4 })}
          />

          <Button>
            <span className="flex-1 text-center font-semibold">로그인</span>
          </Button>
        </form>
        <div className="w-full text-center text-sm">
          <span>계정이 없으신가요? </span>
          <span
            className="cursor-pointer underline "
            onClick={(e) => {
              e.stopPropagation();
              open("signup");
            }}
          >
            회원가입하러 가기
          </span>
        </div>
      </div>
    </Modal>
  );
}

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

export default function SignupModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILogin>();

  const { showAlert } = useAlert();

  const { open, currentModal } = useModalStore();
  if (currentModal !== "signup") return;
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    try {
      await Auth.signup(data);
      showAlert("회원가입 성공");
    } catch (err) {
      const message = err.response?.data?.message;

      showAlert(message);
      if (message.includes("이미 가입된 이메일입니다.")) {
        setError("email", { type: "server", message });
        setError("password", { type: "server", message });
      }
    }
  };

  return (
    <Modal title="회원가입">
      <div className="flex flex-col gap-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            className="rounded-sm"
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
            <span className="flex-1 text-center font-semibold">회원가입</span>
          </Button>
        </form>
        <div className="w-full text-center text-sm">
          <span>계정이 있으신가요? </span>
          <span
            className="cursor-pointer underline "
            onClick={(e) => {
              e.stopPropagation();
              open("login");
            }}
          >
            로그인하러 가기
          </span>
        </div>
      </div>
    </Modal>
  );
}

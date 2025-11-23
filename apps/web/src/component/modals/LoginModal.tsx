import { AxiosError } from "axios";
import { useAlert } from "../../hook/useAlert";
import { useAuth } from "../../hook/useAuth";
import { useModalStore } from "../../store/modal-store";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import { useForm, type SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";

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
  const { login } = useAuth();
  if (currentModal !== "login") return;
  const onSubmit: SubmitHandler<ILogin> = (data) => {
    login.mutate(data, {
      onSuccess: () => {
        showAlert("로그인 성공");
        close();
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError) {
          const message = error.response?.data?.message;

          setError("email", { type: "server" });
          setError("password", { type: "server" });
          showAlert(message);
        } else {
          showAlert("알 수 없는 오류가 발생했습니다.");
        }
      },
    });
  };

  return (
    <Modal>
      <div
        className="w-xl min-h-1/2 bg-[#212121] flex flex-col gap-6 p-8 "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold">로그인</span>
          <Button ghost color="black" onClick={close} buttonSize="sm">
            <IoClose className="w-6 h-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-10">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Input
              className="rounded-sm"
              type="email"
              inputSize="lg"
              error={!!errors.email}
              placeholder="이메일"
              {...register("email", { required: true })}
            />

            <Input
              type="password"
              inputSize="lg"
              className="rounded-sm"
              error={!!errors.password}
              placeholder="비밀번호"
              {...register("password", { required: true, minLength: 4 })}
            />

            <Button buttonSize="lg">
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
      </div>
    </Modal>
  );
}

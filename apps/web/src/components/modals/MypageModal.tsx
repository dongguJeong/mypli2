import { IoPencil } from "react-icons/io5";
import { useModalStore } from "../../store/modal-store";

const MyPageModal = () => {
  const { currentModal, switchModal } = useModalStore();

  const handleUnsubscribe = () => {
    console.log("회원탈퇴");
  };

  const isLoading = false;

  if (currentModal !== "mypage") return null;
  return (
    <div>
      <button
        type="button"
        className="absolute right-[5rem] top-[1.6rem] z-40 text-black hover:bg-gray rounded-full flex-center p-2"
        onClick={() => switchModal("mypageEdit")}
      >
        <IoPencil className="w-4 h-4" />
      </button>
      {isLoading ? (
        <div>로딩 중입니다</div>
      ) : (
        <div className="flex flex-col text-black gap-10">
          <div className="flex-center">
            <div
              className={`w-[200px] h-[200px] relative block overflow-hidden 
              cursor-pointer
            `}
            >
              <image className="w-full h-full bg-gray-600" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-5 items-center">
              <span className="text-sm">이메일</span>
              <span className="text-lg font-medium">test@email.com</span>
            </div>
            <div className="w-full pt-4">
              <button
                onClick={handleUnsubscribe}
                type="button"
                className="text-xs items-start text-zinc-400"
              >
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPageModal;

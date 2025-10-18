import { useNavigate } from "react-router-dom";
import { Modal } from "../Modal";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "../Input";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import MyPageModal from "../modals/MypageModal";
import MyPageEditModal from "../modals/MypageEditModal";
import { useAuth } from "../../hooks/useAuth";
import { useModalStore } from "../../store/modal-store";
import Button from "../Button";
import { useSideBarStore } from "../../store/sidebar-store";

export default function Gnb() {
  const { status } = useAuth();
  const { switchModal } = useModalStore();
  const navigate = useNavigate();
  const { toggleSideBar } = useSideBarStore();

  function handleLogout() {
    navigate("/");
  }

  function search(e: React.FormEvent<HTMLFormElement>) {
    navigate(`search/${e.target.value}`);
  }

  return (
    <>
      <Modal type="login" title="로그인">
        <LoginModal />
      </Modal>
      <Modal type="signup" title="회원가입">
        <SignupModal />
      </Modal>

      <Modal type="mypage" title="마이 페이지">
        <MyPageModal />
      </Modal>

      <Modal type="mypageEdit" title="편집">
        <MyPageEditModal />
      </Modal>

      <ul className="flex items-center justify-between fixed top-0 left-0 z-[100] w-full bg-black h-[3.5rem] px-6">
        <li className="flex flex-row gap-4 items-center">
          <button
            id="hamburger-menu"
            className="cursor-pointer p-2 rounded-full hover:bg-white/20"
            type="button"
            onClick={toggleSideBar}
          >
            <GiHamburgerMenu className="h-5 w-5" />
          </button>
          <a href="/" className="flex items-center justify-center">
            <span className="font-bold text-xl text-primary">MYPLI</span>
          </a>
        </li>
        <li className="w-2/6">
          <form onSubmit={search}>
            <Input className="border-b" placeholder="검색" />
          </form>
        </li>
        <li className="flex flex-row gap-5">
          {status.data && (
            <Button onClick={() => switchModal("mypage")}>
              <span>마이페이지</span>
            </Button>
          )}
          {status.data ? (
            <Button onClick={handleLogout}>
              <span>로그아웃</span>
            </Button>
          ) : (
            <Button
              onClick={() => switchModal("login")}
              buttonSize="sm"
              ghost
              border
              className="border-white"
            >
              <span>로그인</span>
            </Button>
          )}
        </li>
      </ul>
    </>
  );
}

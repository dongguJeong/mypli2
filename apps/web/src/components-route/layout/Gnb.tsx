import { useNavigate } from "react-router-dom";
import { Modal } from "../../components/Modal";
import { GiHamburgerMenu } from "react-icons/gi";
import Input from "../../components/Input";
import LoginModal from "../../components/modals/LoginModal";
import SignupModal from "../../components/modals/SignupModal";
import MyPageModal from "../../components/modals/MypageModal";
import MyPageEditModal from "../../components/modals/MypageEditModal";
import { useAuth } from "../../hooks/useAuth";
import { useModalStore } from "../../store/modal-store";

export default function Gnb() {
  const { isLoggedIn } = useAuth();
  const { switchModal } = useModalStore();
  const navigate = useNavigate();

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

      <ul
        className="pr-8 pl-6 py-5 flex items-center justify-between 
    fixed top-0 left-0 z-[90] w-full bg-black"
      >
        <li className="flex flex-row gap-8 items-center">
          <GiHamburgerMenu />
          <a href="/" className="flex items-center justify-center">
            <span className="font-bold text-lg text-primary">MYPLI</span>
          </a>
        </li>
        <li className="w-2/6">
          <form onSubmit={search}>
            <Input />
          </form>
        </li>
        <li className="flex flex-row gap-5">
          {isLoggedIn && (
            <button onClick={() => switchModal("mypage")}>
              <span>마이페이지</span>
            </button>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout}>
              <span>로그아웃</span>
            </button>
          ) : (
            <button onClick={() => switchModal("login")}>
              <span>로그인</span>
            </button>
          )}
        </li>
      </ul>
    </>
  );
}

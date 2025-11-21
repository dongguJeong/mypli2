import { useNavigate } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";

import Button from "../Button";
import Input from "../Input";
import { useSidebarStore } from "../../store/sidebar-store";
import { useModalStore } from "../../store/modal-store";
import LoginModal from "../modals/LoginModal";
import SignupModal from "../modals/SignupModal";
import { useAuth } from "../../hook/useAuth";

export default function Gnb() {
  const { toggleSidebar } = useSidebarStore();
  const { open } = useModalStore();
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const search = e.target.value;
    if (search.trim()) return;
    navigate(`/search/${search}`);
  }

  return (
    <nav className="w-full h-16 items-center flex px-10 justify-between sticky top-0 py-2">
      <div className="flex gap-5 items-center">
        <Button
          ghost
          color="white"
          buttonSize="sm"
          type="button"
          className="hover:bg-white/10 rounded-md"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </Button>
        <a
          href="/"
          className="text-xl text-primary font-bold w-16 flex items-center pt-1"
        >
          MYPLI
        </a>
      </div>
      <form className="w-1/3 " onSubmit={onSubmit}>
        <Input
          ghost
          color="white"
          placeholder="검색"
          className="border-t-0 border-r-0 border-l-0 "
        />
      </form>
      <Button
        color="white"
        ghost
        onClick={() => {
          if (user) {
            logout.mutateAsync();
            navigate("/");
          } else {
            open("login");
          }
        }}
      >
        {user ? "로그아웃" : "로그인"}
      </Button>

      <LoginModal />
      <SignupModal />
    </nav>
  );
}

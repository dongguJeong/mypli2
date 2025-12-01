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
  const { status, logout } = useAuth();

  const navigate = useNavigate();
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    if (!search.trim()) return;
    navigate(`/search?q=${search}`);
  }

  return (
    <>
      <LoginModal />
      <SignupModal />
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
            className="text-xl text-primary font-bold w-16 flex items-center pt-1 pl-5"
          >
            MYPLI
          </a>
        </div>
        <form className="w-1/3 " onSubmit={onSubmit}>
          <Input
            name="search"
            ghost
            color="white"
            placeholder="검색"
            className="border-t-0 border-r-0 border-l-0 rounded-none"
          />
        </form>
        <div className="flex gap-3 items-center">
          <div className="w-30 items-center text-center">
            <span>{status?.user?.username}</span>
          </div>
          <Button
            color="white"
            className="w-20"
            ghost
            onClick={() => {
              if (status?.loggedIn) {
                logout.mutateAsync();
                navigate("/");
              } else {
                open("login");
              }
            }}
          >
            {status?.loggedIn ? "로그아웃" : "로그인"}
          </Button>
        </div>
      </nav>
    </>
  );
}

import { GoPlus } from "react-icons/go";
import Button from "../component/Button";
import Title from "../component/Title";
import { useNavigate } from "react-router";

export default function Myplaylist() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex  gap-10">
        <Title text="내 플레이리스트" />
        <Button
          onClick={() => navigate("create")}
          buttonSize="sm"
          color="white"
          ghost
          border
          className="border-white border hover:underline"
        >
          <GoPlus />
          플레이리스트 생성
        </Button>
      </div>
    </div>
  );
}

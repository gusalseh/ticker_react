import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../theme/daisyui";

export default function NoMatch() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="flex flex-col p-4 items-center justify-center h-screen text-center">
      {/* <p className="text-xl text-center alert alert-error">
        Oops! No page found!
      </p> */}
      <h1 className="text-6xl font-bold bg-clip-text">Oops!</h1>
      <h2 className="text-2xl font-bold text-gray-800 mt-4">
        404 - PAGE NOT FOUND
      </h2>
      <p className="text-base text-gray-600 mt-2">
        찾고 있는 페이지가 제거되었거나 이름이 변경되었거나 일시적으로 사용할 수
        없습니다.
      </p>
      <div className="flex justify-center mt-4">
        <Button
          className="ml-4 btn-xs bg-orange-400 text-white"
          onClick={goBack}
        >
          뒤로
        </Button>
      </div>
    </div>
  );
}

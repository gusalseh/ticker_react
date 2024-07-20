import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../theme/daisyui";

export default function NoMatch() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <div className="flex flex-col p-4">
      <p className="text-xl text-center alert alert-error">
        Oops! No page found!
      </p>
      <div className="flex justify-center mt-4">
        <Button className="ml-4 btn-primary btn-xs" onClick={goBack}>
          go Back
        </Button>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isAuthiticated } = useAuth();
  useEffect(
    function () {
      if (!isAuthiticated) navigate("/");
    },
    [isAuthiticated, navigate]
  );
  return isAuthiticated ? children : null;
}

export default ProtectedRoute;

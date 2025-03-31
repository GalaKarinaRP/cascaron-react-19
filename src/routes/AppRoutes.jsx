import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRouteGuard } from "./guard/ProtectedRouteGuard";
import { Dashboard } from "../ui/components/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={<ProtectedRouteGuard element={Dashboard} />}
      ></Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default AppRoutes;

import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Loading } from "../helpers/Loading";
import { AuthRoutes } from "../Auth/routes/AuthRoutes";
import AppRoutes from "../routes/AppRoutes";
import { startRefreshToken } from "../Auth/store/auth_thunk";
import {
  getInLocalStorageGeneral,
  LocalStorageKeys,
} from "../utilities/localStorage.utility";

const AppRouter = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tokenExp = getInLocalStorageGeneral(LocalStorageKeys.TOKEN_EXP_DATE);
    const formattedDate = new Date(tokenExp * 1000);
    const currentDate = new Date();

    if (formattedDate) {
      if (currentDate <= formattedDate) {
        console.log("entro a renovar el token");
        dispatch(startRefreshToken()); // Ayuda a renovar el token si se recarga la paginación
      }
    }

    // Ayuda a renovar el token si se recarga la paginación
    //Agregr dispacth para crear funcion que renueve toke cada cierto tiempo
  }, [dispatch]);

  const { loading } = useSelector((state) => state.ui);
  const { checking } = useSelector((state) => state.auth);

console.log(checking);



  if (checking) {
    return <Loading  />;
  }

  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        {loading && <Loading/>}
        <Routes>
          {/* Login */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* App */}
          <Route path="/*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default AppRouter;

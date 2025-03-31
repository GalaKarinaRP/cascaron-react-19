import { Suspense, useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SidebarPage } from "./Sidebar";
import logoSuperior from '../../assets/img/logo_ibero_superior.png'
import { Loading } from "../../helpers/Loading";
import { getMenuUser } from "../../Auth/store";
import { DocumentManagmentScreen } from "../../components/Admin/DocumentManagment/page/DocumentManagmentScreen";
import { NotFound } from "../../components/404/NotFound";
import { LinkingDocumentsScreen } from "../../components/Admin/LinkingDocuments/page/LinkingDocumentsScreen";

export const Dashboard = () => {
  const [toggled, setToggled] = useState(false);
  const dispatch = useDispatch();
  const { routes = [] , profileId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (profileId) {
      dispatch(getMenuUser(profileId));
    }
  }, [dispatch, profileId]);

  const componentMapping = {
    'GestiondedocumentosScreen': DocumentManagmentScreen,
    'VinculaciondedocumentosScreen' :LinkingDocumentsScreen,  
};

  

  return (
    <Suspense
      fallback={
        <Loading mensaje="" type={"spinningBubbles"} color={"#485C8F"} />
      }
    >
       {/* Logo en la esquina superior derecha */}
       <div className="logo-container">
        <img src={logoSuperior} alt="Logo" className="logo" /> {/* Ajusta el tamaño según sea necesario */}
      </div>
      <div
        className={`app ${false ? "rtl" : ""} ${
          false ? "toggled recaptcha-hidden" : ""
        }`}
      >  
        <SidebarPage toggled={toggled} setToggled={setToggled} />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/*" element={<NotFound/>} />
          {routes.map((route, routeIndex) => 
           {
            const Component =
              componentMapping[route.element] ?? NotFound;
            return (
              <Route
                key={`${route}-${routeIndex}`}
                path={route.path.replace("/dashboard", "")}
                element={<Component/>}
              />
            );
          })}
        </Routes>
      </div>
    </Suspense>
  );
};

      {/* <div>
          <ul>
          {routes.map((route, routeIndex) => 
           {
            const Component =
              componentMapping[route.element] ?? NotFound;
            return (
              <li
                key={`${route}-${routeIndex}`}
                path={route.path.replace("/dashboard", "")}
                element={<Component/>}
              >{route.element}</li>
            );
          })}
          </ul>
        </div> */}

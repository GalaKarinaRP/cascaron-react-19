import { appIdConfig, ID_TIPO_EMPLEADO } from "../../config";
import { AxiosData } from "../../services/AxiosConnexion";
import { ManageAxiosResponse } from "../../services/ResponseActionService";
import { TypeService } from "../../services/TypeService";
import { uiFinishLoading, uiStartLoading } from "../../ui/store";
import {
  LocalStorageKeys,
  persistLocalStorageGeneral,
} from "../../utilities/localStorage.utility";
import { SnackbarUtilities } from "../../utilities/snackbar-manager";
import {
  login,
  loginCheckingFinish,
  logout,
  setMenuProfile,
  setProfilesInfo,
} from "./authSlice";

export const startLoadingProfilesApp = () => {
  return async (dispatch) => {
    const appId = appIdConfig;
    dispatch(uiStartLoading("Iniciando Sesión..."));

    const resp = await AxiosData({
      endpoint: "Auth/ProfilesByAppId",
      method: "GETDIT",
      body: null,
      queryString: { appId }, // Puedes omitir esto si es null o undefined
    });

    console.log(resp);

    dispatch(uiFinishLoading());

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      dispatch(setProfilesInfo(resp.data));
    }
  };
};

export const startLogin = (account, password, profileId, token, navigate) => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading("Iniciando Sesión..."));

    const idDetApp = appIdConfig;
    const digit = "";
    const idTipoUsuario = ID_TIPO_EMPLEADO;

    const resp = await AxiosData({
      endpoint: "Auth/LoginExterno",
      method: "LOGINEXTERNO",
      body: { account, digit, password, idDetApp, profileId, idTipoUsuario },
      queryString: null, // Puedes omitir esto si es null o undefined
    });

    

    dispatch(uiFinishLoading());

    console.log(resp);

    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      const expiryToke = JSON.parse(atob(resp.data.token.split(".")[1])).exp;
      const expiryRefreshToke = JSON.parse(
        atob(resp.data.refreshToken.split(".")[1])
      ).exp;

      // Almacena los tokens y sus fechas de expiración en el localStorage
      persistLocalStorageGeneral(LocalStorageKeys.TOKEN, resp.data.token);
      persistLocalStorageGeneral(LocalStorageKeys.TOKEN_EXP_DATE, expiryToke);
      persistLocalStorageGeneral(
        LocalStorageKeys.REFRESH_TOKEN,
        resp.data.refreshToken
      );
      persistLocalStorageGeneral(
        LocalStorageKeys.TOKEN_REFRESH_EXP_DATE,
        expiryRefreshToke
      );

      dispatch(
        login({
          token: resp.data.token,
          roleid: resp.data.profileId,
          // mapping: resp.data[0].mapping,
          isAuthenticated: true,
          perfil: {
            nombre: resp.data.userName,
            userName: resp.data.email,
            role: resp.data.profile,
          },
          profileId: resp.data.profileId,
        })
      );

      navigate("/");
      SnackbarUtilities.success(`Bienvenido/a ${resp.data.userName} `);
    } else {
      dispatch(ManageAxiosResponse(resp));
    }
  };
};

export const startRefreshToken = () => {
  return async (dispatch, getState) => {
    dispatch(uiStartLoading("Validando Sesión..."));

    const resp = await AxiosData({
      endpoint: "Auth/refreshToken",
      method: "GETDIT",
      body: null,
      queryString: null, // Puedes omitir esto si es null o undefined
    });

    // let jsonSt = JSON.stringify(refresh);
    // const resp = JSON.parse(jsonSt);
    dispatch(uiFinishLoading());
    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      const expiryToke = JSON.parse(atob(resp.data.token.split(".")[1])).exp;
      const expiryRefreshToke = JSON.parse(
        atob(resp.data.refreshToken.split(".")[1])
      ).exp;

      persistLocalStorageGeneral(LocalStorageKeys.TOKEN, resp.data.token);
      persistLocalStorageGeneral(LocalStorageKeys.TOKEN_EXP_DATE, expiryToke);
      persistLocalStorageGeneral(
        LocalStorageKeys.REFRESH_TOKEN,
        resp.data.refreshToken
      );
      persistLocalStorageGeneral(
        LocalStorageKeys.TOKEN_REFRESH_EXP_DATE,
        expiryRefreshToke
      );
    } else if (resp.respuestaStatus === TypeService.AxiosApi401) {
      dispatch(startLogout());
    } else {
      dispatch(loginCheckingFinish());
      Swal.fire("Error", "Ocurrio un error, intente mas tarde", "error");
    }
  };
};

export const getMenuUser = (profileId) => {
  return async (dispatch) => {
    const appId = appIdConfig

    dispatch(uiStartLoading('Cargando rutas...'))

    const resp = await AxiosData({
      endpoint: "MenuRouter/GetMenuRouter",
      method: "GETDIT",
      body: null,
      queryString:  { appId, profileId }, // Puedes omitir esto si es null o undefined
    });
  

    dispatch(uiFinishLoading())    
 
    //Si la respuesta es correcta,Aqui va codigo propio de las siguientes accioes a realizar
    if (resp.respuestaStatus === TypeService.AxiosApiOk) {
      
      const routes = remapRoutes(resp.data);      
      dispatch(setMenuProfile(routes))
    }
    // administra las respuestas del api en caso de no ser exitosa
    else {
      dispatch(ManageAxiosResponse(resp))
    }
  }
}

const remapRoutes = (data) => {
  // Crea un diccionario para almacenar las rutas mapeadas
  const routesMap = {};

  data = data.filter((a) => a.access == 1);

  // Primero, inicializamos cada elemento que sea un padre (idParent = 0)
  data.forEach(item => {
      if (item.idParent === 0) {
          routesMap[item.idPermission] = {
              path: item.path,
              element: item.element,
              label: item.permission,
              routes: []
          };
      }
  });

  // Ahora, asignamos cada subruta a su respectivo padre usando idParent
  data.forEach(item => {
      if (item.idParent !== 0) {
          const parent = routesMap[item.idParent];
          if (parent) {
              parent.routes.push({
                  path: item.path,
                  element: item.element,
                  label: item.permission
              });
          }
      }
  });

  // Convierte el diccionario de rutas en un arreglo
  return Object.values(routesMap);
};


export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(logout())
    dispatch(uiModalClose())
  }
}

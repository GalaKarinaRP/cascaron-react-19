import axios from "axios";
import { configGlobal } from "../config";
import { TypeService } from "./TypeService";

// Función para hacer peticiones HTTP
export const AxiosData = async ({ endpoint, method, body, queryString }) => {
  const urlApi = `${configGlobal.urlApiIbero}${endpoint}`;

  const AxiosResponse = {
    data: null,
    respuestaStatus: null,
    message: "",
    success: 0,
  };

  let response;

  // Lógica para manejar diferentes métodos HTTP
  switch (method) {
    case "LOGINEXTERNO":
      response = await axios.post(
        `${configGlobal.urlApiGestion}${endpoint}`,
        body
      );
      break;
    case "LOGINACCESOSDIT":
      response = await axios.post(
        `${configGlobal.urlApiGestion}${endpoint}`,
        body
      );
      break;
    case "GETDIT":
      response = await axios.get(`${configGlobal.urlApiGestion}${endpoint}`, {
        params: queryString,
      });
      break;
    case "POST":
      response = await axios.post(urlApi, body);
      break;
    case "GET":
      response = await axios.get(urlApi, {
        params: queryString,
      });
      break;
    default:
      throw new Error("Unsupported HTTP method");
  }

  const { data, success, message } = response.data;
  AxiosResponse.data = data;
  AxiosResponse.message = message;
  AxiosResponse.success = success;
  AxiosResponse.respuestaStatus =
    success == 1 ? TypeService.AxiosApiOk : TypeService.AxiosApiOkFail;
  return AxiosResponse;
};

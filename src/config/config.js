const VITE_API_KEY = import.meta.env.VITE_API_KEY;

let appIdConfig = 353; //Cambiarla en produccion
let configGlobal = {
  urlApiIbero: "",
  urlApiGestion: "",
};

const ID_TIPO_STUDENT = 21;
const ID_TIPO_PROFESSOR = 3;
const ID_TIPO_PROFESOR_ASIGNATURA = 22;
// const ID_TIPO_EMPLEADO = 29;
const ID_TIPO_EMPLEADO = 24;


let REACT_APP_RECAPTCHA_GOOGLE = "6LePDXkqAAAAAMPIzgAshOKlZ6ZupYX0xoNozaMG";
let REACT_APP_CLAVE_SECRETA = "6LePDXkqAAAAACdB44xVWjaOUVcCRJyHXmZMdu0e";

if (VITE_API_KEY === "local") {
  configGlobal = {
    urlApiIbero: "https://localhost:7104/api/",
    urlApiGestion: "https://administracion-ditdes.ibero.mx/back/api/",
  };
  REACT_APP_RECAPTCHA_GOOGLE = "6LfoH3kqAAAAAJoAnd5ObrGu4BZBwimub717XG5w";
  REACT_APP_CLAVE_SECRETA = "6LfoH3kqAAAAAA3YSWEXB7K_NQVr7tXYSOv0dHSf";
}

if (VITE_API_KEY === "development") {
  configGlobal = {
    urlApiIbero: "https://iberobuspsdes.ibero.mx/back/api/",
    urlApiGestion: "https://administracion-ditdes.ibero.mx/back/api/",
  };
}

if (VITE_API_KEY === "test") {
  configGlobal = {
    urlApiIbero: "https://iberobuspspru.ibero.mx/back/api/",
    urlApiGestion: "https://administracion-ditpru.ibero.mx/back/api/",
  };
}

if (VITE_API_KEY === "production") {
  configGlobal = {
    urlApiIbero: "https://iberobusps.ibero.mx/back/api/",
    urlApiGestion: "https://solicitudesti.ibero.mx/back/api/",
  };
}

export {
  configGlobal,
  appIdConfig,
  REACT_APP_RECAPTCHA_GOOGLE,
  REACT_APP_CLAVE_SECRETA,
  ID_TIPO_EMPLEADO,
};

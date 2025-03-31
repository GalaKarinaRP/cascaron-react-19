import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { REACT_APP_RECAPTCHA_GOOGLE } from "../../config";
import "../styles/styles_login.css";
import { useNavigate } from "react-router-dom";
import { startLogin } from "../store/auth_thunk";
import { FaEyeSlash } from "../../assets/img/icons/FaEyeSlash";
import { FaEye } from "../../assets/img/icons/FaEye";
export const AuthEmployee = ({ profile }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  let formData = {
    account: "33872",
    password: "Prueb@s1",
  };

  ///Si es produccion, quita el usuario pruebas
  if (
    window.location.href.includes("https://prestamoequipo.ibero.mx/") ||
    window.location.href.includes("https://prestamoequipodes.ibero.mx/") ||
    window.location.href.includes("https://prestamoequipopru.ibero.mx/")
  ) {
    formData = {
      account: "",
      password: "",
    };
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {

      console.log(profile);
      
      const executeRecaptcha = async () => {
        const token = await window.grecaptcha.execute(
          REACT_APP_RECAPTCHA_GOOGLE,
          { action: "submit" }
        );
        // const profileId = profile.value;
        const profileId = profile.value;

        const { account, password } = values;
        setToken(token); // Aquí puedes usar el token como desees
        token != ""
          ? dispatch(startLogin(account, password, profileId, token, navigate))
          : "";
      };

      executeRecaptcha();
    } catch (err) {
      console.log(err);
      setToken("");
    }
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Campo requerido"),
    account: Yup.string()
      .matches(/^[0-9]+$/, "La cuenta solo puede contener números")
      .max(8, "La cuenta no puede tener más de 8 caracteres")
      .required("Campo requerido"),
  });

  const requerido = "Este campo es requerido";

  const [usuario, setUser] = useState(false);

  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={formData}
      onSubmit={handleOnSubmit}
      validationSchema={Yup.object({})}
    >
      {(formik) => (
        <Form noValidate>
          <div className="row">
            <div className="col sm-12 col-md-12 mb-4">
              <div className="form-group">
                <label htmlFor="account" className="color-title">
                  No. Cuenta
                </label>
                <Field
                  className="form-control form-control-login mb-0"
                  name="account"
                  placeholder="Ingresar no. cuenta"
                  required
                />
                <ErrorMessage
                  name="account"
                  component="span"
                  className="text-danger"
                  role="alert"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col sm-12 col-md-12">
              <label htmlFor="password" className="color-title">
                Contraseña
              </label>
              <div className="password-input-container">
                <Field
                  className="form-control form-control-login mb-0"
                  name="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"} // Cambiar tipo según el estado
                  required
                />
                <span
                  className="password-toggle"
                  onClick={togglePassword}
                  role="button"
                >
                  {showPassword ? (
                   <FaEyeSlash/>
                  ) : (
                  <FaEye/>
                    // Icono de ojo abierto
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="span"
                className="text-danger"
                role="alert"
              />
            </div>
          </div>

          <div className="row">
            <div className="content-btn -mrgnTop-1r mt-5">
              <input className="ingresar-btn" type="submit" value="Ingresar" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

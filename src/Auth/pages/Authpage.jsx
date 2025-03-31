import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthEmployee, AuthStudent } from "../components";
import Select from "react-select";
import ibero_login from '../../assets/img/ibero_login.png'
import logoSuperior from '../../assets/img/logo_ibero_superior.png'
import { startLoadingProfilesApp } from "../store/auth_thunk";
import { getProfilesApp } from "../functions/functions";
import '../styles/styles_login.css'

const customStyles = {
  control: (base) => ({
    ...base,
    border: 'none', // Elimina el contorno
    boxShadow: 'none', // Elimina la sombra
  }),
  singleValue: (base) => ({
    ...base,
    color: 'red', // Cambia el color del texto del valor seleccionado a rojo
  }),
  option: (base) => ({
    ...base,
    color: 'black', // Deja el texto de las opciones en negro
  }),
  placeholder: (base) => ({
    ...base,
    color: 'gray', // Deja el texto del placeholder en gris (puedes cambiarlo si lo prefieres)
  }),
};

export const Authpage = () => {
  const dispatch =  useDispatch();
  const [selected, setSelected] = useState({value:1, label:'Administrador'})
  const [options, setOptions] = useState([])
  const { profilesApp } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startLoadingProfilesApp());
  }, []);

  useEffect(() => {
    if(profilesApp) setOptions(getProfilesApp(profilesApp));
  }, [profilesApp]);

  useEffect(() => {
    if(options.length > 0 && options!= undefined){
      setSelected(options[0])
    }
  }, [options]);

  const handleChange = (value) => {
    setSelected(value)
  }

  const renderView = () => {
    return <AuthEmployee profile={selected} />;   
  }

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <!-- Columna de Imagen --> */}
        <div className="col-md-6 p-0 d-none d-md-block">
          <img
            src={ibero_login}
            alt="Imagen Decorativa"
            className="w-100 h-100"
          />
        </div>

        {/* <!-- Columna de Formulario de Login --> */}
        <div className="col-md-6 d-flex align-items-start justify-content-center">
           {/* Logo en la esquina superior derecha */}
       <div className="logo-container">
        <img src={logoSuperior} alt="Logo" className="logo" /> {/* Ajusta el tamaño según sea necesario */}
      </div>
          <div className="w-75">
            <br />
            <h2 className="ib-h2">Servicios en Línea</h2>
            <br />
            <h2 className="titulo-login">Iniciar Sesión</h2>
            <div className="row mb-5">
              <div className="col-md-4">
                <p className="subtitulo-login">Ingresa con tu cuenta de </p>
              </div>
              <div className="col-md-4">
                <Select options={options} onChange={handleChange} styles={customStyles}   value={selected}  />
              </div>
            </div>
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  )
}

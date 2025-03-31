import { REACT_APP_RECAPTCHA_GOOGLE } from "./config";
import AppRouter from "./router/AppRouter";
import "./styles/styles.scss";
const script = document.createElement("script");
script.src = `https://www.google.com/recaptcha/api.js?render=${REACT_APP_RECAPTCHA_GOOGLE}`; // Ruta al script que deseas ejecutar
document.body.appendChild(script);
function App() {
  return <AppRouter />;
}

export default App;

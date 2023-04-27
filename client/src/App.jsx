import "./index.css";
import { useRoutes } from "react-router-dom";
import generalroutes from "./Routes/Pageroutes";

import 'react-toastify/dist/ReactToastify.css'
function App() {
  const routes=useRoutes(generalroutes)
  return routes
}

export default App;

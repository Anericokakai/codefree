import "./index.css";
import { useRoutes } from "react-router-dom";
import generalroutes from "./Routes/Pageroutes";

function App() {
  const routes=useRoutes(generalroutes)
  return routes
}

export default App;

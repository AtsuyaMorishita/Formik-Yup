import "./App.css";
import FormDev from "./components/formDev";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormConfirm from "./components/formConfirm";
import FormFinish from "./components/formFinish";
import { FormProvider } from "./context/FormikContext";

function App() {
  return (
    <FormProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FormDev />}></Route>
          <Route path="/confirm" element={<FormConfirm />}></Route>
          <Route path="/finish" element={<FormFinish />}></Route>
        </Routes>
      </Router>
    </FormProvider>
  );
}

export default App;

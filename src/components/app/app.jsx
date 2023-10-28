import AppHeader from "../app-header/app-header";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../../pages";
import appStyles from './app.module.css';

function App() {
  return (
    <div className={appStyles.App}>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;

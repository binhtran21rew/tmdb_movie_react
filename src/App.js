import Register from "./pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import publicRoute from "./config/Routes";
import Header from "./components/header/Header";
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import { GlobalContext } from "./context/GlobalState";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoute.map((route, i) => {
            const Page = route.component;
            return (
              <Route 
                key={i}
                path={route.path}
                element={
                  <>
                  <Header />
                    <Page />
                  </>
                }
              />
            )
          })}
        </Routes>

      </div>
    </BrowserRouter>

  );
}

export default App;

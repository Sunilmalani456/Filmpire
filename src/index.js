import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import ToggleColorModeProvider from "./utils/ToggleColorMode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// redux toolkit
import { Provider } from "react-redux";
import { store } from "./app/store";

// const theme = createTheme({});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorModeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToggleColorModeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

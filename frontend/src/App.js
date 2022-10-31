import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/header";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import UserCollection from "./pages/UserCollection";
import PrivateProfile from "./pages/PrivateProfile";
import CreateCollection from "./pages/CreateCollection";
import CreateItem from "./pages/CreateItem";
import ViewItem from "./pages/ViewItem";
import TagCollection from "./pages/TagCollection";
import SearchCollection from "./pages/SearchCollection";
import Welcome from "./pages/Welcome";
import {IntlProvider} from 'react-intl'
import enMessages from "./localization/en.json"
import plMessages from "./localization/pl.json"
import locales from "./localization/locales"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage } from "./features/language/languageSlice";

function App() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  console.log("language from the state:",language)
  const messages = {
    [locales.EN]: enMessages,
    [locales.PL]: plMessages
  }
  const [locale, setLocale] = useState(locales[language])
  const [languageChosen, setLanguage] = useState(language)

  useEffect(() => {
    dispatch(getLanguage())
    setLanguage(language)
    setLocale(locales[language])
  }, [language]);
  return (
    <>
      <IntlProvider locale={locale} messages={messages[languageChosen]}>
        <Router>
          <div class="container-main">
            <div className="content-wrap">
              <Header />
              <Routes>
                <Route path="/userCollection/:id" element={<UserCollection />} />
                <Route path="/userProfile/:id" element={<UserProfile />} />
                <Route path="/Main" element={<Main />} />
                <Route path="/" element={<Welcome />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/me" element={<PrivateProfile />} />
                <Route path="/Collection" element={<CreateCollection />} />
                <Route path="/Item" element={<CreateItem />} />
                <Route path="/ViewItem/:id" element={<ViewItem />} />
                <Route path="/TagCollection" element={<TagCollection />} />
                <Route path="/SearchCollection" element={<SearchCollection />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </IntlProvider>
    </>
  );
}

export default App;

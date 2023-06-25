/* eslint-disable react-refresh/only-export-components */
import { createContext , useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Dashboard
import { DashBoard } from "./Admin/DashBoard";
import { Books } from "./Admin/Books Page/Books";
import { Writers } from "./Admin/Writers Page/Writers";
import { Quotes } from "./Admin/Quotes Page/Quotes";
import { History } from "./Admin/History Page/History";
import { About } from './Admin/About Page/About';
import { Nav } from "./Admin/Nav";
import { Aside } from "./Admin/Aside";
import { PageNotFound } from './Admin/PageNotFound';
import './App.css'

export const RefreshContext = createContext();


function App() {
  const [refresh,setRefresh]= useState(true);
  return (
    <RefreshContext.Provider value={{refresh,setRefresh}}>
    
    <BrowserRouter>
      <Nav />
      <Aside />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/books" element={<Books />} />
        <Route path="/orders" element={<History />} />
        <Route path="/writers" element={<Writers />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/about" element={<About/>} />
        <Route path="/*" element={<PageNotFound />} /> 
      </Routes>
    </BrowserRouter>
  </RefreshContext.Provider>
  );
}

export default App;


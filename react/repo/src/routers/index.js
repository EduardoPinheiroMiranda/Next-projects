import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "../pages/Main";
import { Repositorio } from "../pages/Repositorio";


export function RouterApp(){

    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Main/>}/>
                <Route path="/repositorio/:repositoryName" element={<Repositorio/>}/>
            </Routes>
        </BrowserRouter>
    );
}
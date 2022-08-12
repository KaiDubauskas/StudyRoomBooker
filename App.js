import React from "react";
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Buttrick, Central, Feather, Furman, logo, Peabody, Stevenson
} from './Images';

import StartReservation from "./components/add-reservation";
import Studyroom from "./components/studyrooms";
import StudyroomsList from "./components/studyrooms-list";
import FillReservation from "./components/fill-reservation";

function App() {
  return (
    <div div className="App" >
      <header>
        <div
          class="container-fluid d-inline-flex flex-column flex-md-row align-items-center justify-content-between p-3 pl-md-4 pr-md-2 mb-0 border-bottom shadow-sm backCol">
          <img class="my-0 mr-md-auto" height="40" src={logo} alt="Vanderbilt"
            href="https://www.vanderbilt.edu/" />
          <nav class="backCol my-4 my-md-0 mr-md-3">
            <a class="p-4" href="https://www.vanderbilt.edu/">Home</a>
            <a class="p-4" href="https://www.vanderbilt.edu/academics/">Academics</a>
            <a class="p-4" href="https://admissions.vanderbilt.edu/connect/">Connect</a>
            <a class="p-4" href="https://admissions.vanderbilt.edu/myappvu/">MyAppVu</a>
          </nav>
        </div>
      </header>
      <div class="bg-white">

        <Switch>
          <Route exact path={["/", "/studyrooms"]} component={StudyroomsList} />
          <Route exact path="/studyrooms/reserve"
            render={(props) => (
              <StartReservation {...props} />
            )}
          />
          <Route exact path="/studyrooms/reserve/new"
            render={(props) => (
              <FillReservation {...props} />
            )}
          />

        </Switch>

      </div>
    </div >
  );
}

export default App;

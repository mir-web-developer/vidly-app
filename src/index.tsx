import * as React from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import App from "./App";
import {BrowserRouter} from 'react-router-dom'


const rootElement = document.getElementById("root");
render(<BrowserRouter><App /></BrowserRouter>, rootElement);

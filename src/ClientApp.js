import React from 'react';
import { hydrate } from 'react-dom';
import App from './App'


// Dont render this, because I care what is here 
// This allowme to render this on node.js

hydrate(<App />, document.getElementById("root"));
import express from "express";
import React from 'react';
// import { renderToString } from 'react-dom/server';
import { renderToNodeStream } from 'react-dom/server';
import { ServerLocation } from '@reach/router';
import fs from 'fs';
import App from '../src/App';

const PORT = process.env.PORT ||3000;

const html = fs.readFileSync('dist/index.html').toString();


// You can use EJS and Handlebars to render each part together
const parts = html.split('not rendered')

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
    // show first the css and html parts 
    res.write(parts[0]) // line added for nodeStream code
    const reactMarkup = (
        <ServerLocation url={req.url}>
            <App />
        </ServerLocation>
    )
    
    // Lines added for node stream code
    const stream = renderToNodeStream(reactMarkup);
    stream.pipe(res, { end: false });
    stream.on('end', () => {
        res.write(parts[1]);
        res.end();
    })
    /////////
    
    // Lines commented before node stream 
    // res.send(parts[0] + renderToNodeStream(reactMarkup) + parts[1]);
    // res.end();
});

console.log('listening on ' + PORT);

app.listen(PORT)

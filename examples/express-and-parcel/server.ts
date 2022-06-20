import express from "express";
import {telefunc, telefuncConfig} from "telefunc"
import {provideTelefuncContext} from "telefunc";

const port = 5000;

telefuncConfig.telefuncFiles = [require.resolve("./hello.telefunc.mjs")];

(async () => {
    const app = express();


    // Serve static pages (for production use):
    app.use(express.static('client/dist'));

    // Telefunc integration:
    app.use(express.text()) // Parse & make HTTP request body available at `req.body`
    app.all('/_telefunc', async (req, res) => {
        // The usual Telefunc integration
        const httpResponse = await telefunc({ url: req.url, method: req.method, body: req.body })
        const { body, statusCode, contentType } = httpResponse
        res.status(statusCode).type(contentType).send(body)
    })
    

    await app.listen(5000);
    console.log("Server started: http://localhost:" + port);
})();
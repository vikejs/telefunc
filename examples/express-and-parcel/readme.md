Example of using Telefunc with a simple express server and parcel as packager for the client/browser

This examples has the frontend files in a [separate package folder (client)](./client) as opposed to the simpler [express-and-vite](../vite) example. Note: Vite is a quiet similar packager as parcel. 

To run it:

```bash
git clone git@github.com:vikejs/telefunc
cd telefunc/examples/express-and-parcel
npm install
cd client && npm install && cd ..
npm run start
```

#### Development

Start the **backend** dev server (port 5000) which monitors for file changes:

```bash
npm run dev:backend
```

Start the **frontend** dev server (port 1234) which monitors for file changes in the [client package folder](./client) 

```bash
cd client && npm run dev
```

The frontend server redirects all /_telefunc api calls to the backend server. _See [.proxyrc](client/.proxyrc)_
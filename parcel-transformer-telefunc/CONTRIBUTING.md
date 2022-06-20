This package's source is located inside https://github.com/vikejs/telefunc

- Add dependencies to [package.json](package.json):
  ```json
  "dependencies": {
     ...
     "telefunc": "telefunc": "file:../telefunc",
  }
- Run [package.json#scripts.dev](package.json) to watch for file changes and recompile automatically in the backround.

### Use this [Client/server example](../examples/express-and-parcel)
 - Add devDependencies to it's [package.json](../examples/express-and-parcel/package.json):
   ```json
   "devDependencies": {
      ...
      "telefunc": "file:../../telefunc"
   }
 - Add devDependencies to it's [**client**/package.json](../examples/express-and-parcel/client/package.json):
   ```json
   "devDependencies": {
      ...
      "parcel-transformer-telefunc": "file:../../../parcel-transformer-telefunc"
   }
 
- Run (debug) [package.json#scripts.build](../examples/express-and-parcel/package.json) and it should execute into this transformer's code
// Some tools don't support `package.json#exports`, such as:
// parcel (currently uses commonjs only -> see transformer.js)
export * from './dist/node/transformer/transformTelefuncFile'
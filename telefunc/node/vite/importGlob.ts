export { importGlobOff }
export { importGlobOn }

import { writeFileSync } from 'fs'
import { telefuncFileExtensionsExtGlob } from '../transformer/telefuncFileExtensions'
const dir = __dirname + (() => '')() // trick to avoid `@vercel/ncc` to glob import
const telefuncFilesGlobPath = `${dir}/telefuncFilesGlob.js`
const importGlob = `import.meta.glob("/**/*.telefunc.${telefuncFileExtensionsExtGlob}")`

function importGlobOff() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      'exports.importGlobOff = true',
      ''
    ].join('\n')
  )
}

function importGlobOn() {
  writeFileSync(
    telefuncFilesGlobPath,
    // prettier-ignore
    [
      `export const telefuncFilesGlob = ${importGlob};`,
      ''
    ].join('\n')
  )
}

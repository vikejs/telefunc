// This API is used by parcel-transformer-telefunc package
export { transformTelefuncFile }

import { getExportNames } from './getExportNames'
import { transformTelefuncFileSync } from './transformTelefuncFileSync'

/**
 *
 * @param sourceCode
 * @param filePath
 * @param rootPath Path to the root
 */
async function transformTelefuncFile(sourceCode: string, filePath: string, rootPath: string) {
  const exportNames = await getExportNames(sourceCode)
  return transformTelefuncFileSync(filePath, rootPath, exportNames)
}

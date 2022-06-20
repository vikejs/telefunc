import {Transformer} from '@parcel/plugin';
import {dirname} from "path";

const findPkg = require("find-pkg");

//import {transformTelefuncFile} from "telefunc/transformer";
const {transformTelefuncFile} = require("telefunc/transformer");

export default new Transformer({
    async transform({asset}) {

        // Determine package path:
        const packageJsonFile =await findPkg(dirname(asset.filePath));
        if(!packageJsonFile) {
            throw new Error("Cannot find package dir for file: " + asset.filePath + ". Make sure there's a package.json in one if its parent dirs.");
        }

        let packagePath = dirname(packageJsonFile);
        let sourceCode = await asset.getCode();

        const { code } = await transformTelefuncFile(sourceCode, asset.filePath, packagePath);

        // Return a new asset (must be a NEW asset, otherwise when modifying the current asset like in the example, it doesn't work somehow. Dit it like in @parcel/transformer-typescript-tsc/src/TSCTransformer.js)
        return [{
            type: 'ts',
            filePath: asset.filePath,
            content: code,
            map: null,
        }];

    }
});
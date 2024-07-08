# TypeScript, Vite & Vitest npm library starter template

A starter template for an npm library written in TypeScript.. The relevant files are the `tsconfig.json` `vite.config.js` and `package.json`. For more information on publishing npm packages at infoware, see the [wiki](http://iwwiki.iw04.local/mediawiki/index.php/Publishing_npm_packages)

In the `/lib` folder, there are is an example class, function, and interface declaration as well as a `main.ts` which imports and exports all of these files for the library mode.

To use this template, clone the repo and the replace the remote `origin` with the url of your new library's empty repo.

```
    git clone /url/to/template mynewrepo
    cd mynewrepo
    git remote set-url origin /url/of/new/empty/repo
    git install
    git push -u origin master
```

#### tsconfig.json

The module and `module: "NodeNext"` and `moduleResolution: "NodeNext"` are key to letting your exported .js files pick up the .ts typings. It is important to note that you have to explicitly import classes/functions from modules using the `.js` extension. For more information on this, check out the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/modules/theory.html#module-resolution-for-libraries).

    {
        "compilerOptions": {
            "target": "ESNext",
            "module": "NodeNext",
            "moduleResolution": "NodeNext",
            "lib": ["DOM", "ES6"],
            "declaration": true,
            "outDir": "dist",
            "rootDir": "lib",
            "strict": true,
            "skipLibCheck": true
        },
        "include": ["lib/**/*.ts"]
    }

#### vite.config.js

To create one big happy d.ts file for all of your modules, use the [vite plugin dts](https://github.com/qmhc/vite-plugin-dts). In the first npm library we published, we renamed the `main.js` file to be `map-tiles.js`. To follow this pattern with the `.d.ts` naming, use the `beforeWriteFile` option. It is important that the main entry file name matches with the d.ts main file name to pick up the typings.

    import { defineConfig } from "vite";
    import { resolve } from "node:path";
    import dts from "vite-plugin-dts";

    export default defineConfig({
        build: {
            lib: {
            //eslint-disable-next-line
            entry: resolve(__dirname, "lib/main.ts"),
            formats: ["es"],
            //!change this to your package name
            name: "my-package",
            fileName: "my-package",
            },
            sourcemap: true,
            target: "esnext",
            // Leave minification up to applications.
            minify: false,
        },
        plugins: [
            //this plugin will create a d.ts file for each file in your lib structure, what is imported to lib/main.ts
            //we add the beforeWriteFile option to rename the main.d.ts to the package's name so that the compiler will pick up the types
            dts({
            beforeWriteFile: (filePath, content) => ({
                //!change the replace file name with your package name
                filePath: filePath.replace("dist/main.d.ts", "dist/my-package.d.ts"),
                content,
            }),
            }),
        ],
    });

#### package.json

In the package.json, make sure the `main` and the `types` options are pointing to the dist folder, using the file name that you outputted with the `vite.config.js` file. In the `build` step, run `tsc` before `vite build` to generate declaration files for all of the modules in the `/lib` folder as well.

    {
        "name": "vite-ts-lib-starter",
        "version": "0.0.0",
        "description": "Your package description here",
        "keywords": [
            "typescript"
        ],
        "author": "infoware GmbH",
        "license": "ISC",
        "type": "module",
        "files": [
            "dist",
            "lib"
        ],
        "main": "dist/your-package-name.js",
        "types": "dist/your-package-name.d.ts",
        "scripts": {
            "test": "vitest",
            "dev": "vite src",
            "build": "vitest && tsc && vite build",
            "prepublish": "vite build && npm login --scope=@maptrip",
            "publish": "npm publish --access public"

        },
        "devDependencies": {
            "typescript": "^5.4.5",
            "vite": "^5.2.0",
            "vitest": "^1.6.0"
        },
        "dependencies": {
            "vite-plugin-dts": "^3.9.0"
        }
    }


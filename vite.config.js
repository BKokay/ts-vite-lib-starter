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
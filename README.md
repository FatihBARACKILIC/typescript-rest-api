# Node.js API From Scratch using TypeScript, Express.js and MongoDB

Source: [YouTube][youTubeUrl]

## Setting Up The Project, Prettier and ESLint

1. [Create **package.json**](#packagejson)
2. [Create **tsconfig.json**](#tsconfigjson)
3. [Download basic **npm packages** for this project.](#download-packages)

### package.json

+ Create package.json with ```npm init -y``` _(-y optional)_ command.

### tsconfig.json

+ Create tsconfig.json with ```tsc --init``` or ```npx tsc --init``` command and fill up like this example. I manually
  added the ones a comment lines with next to them.

```json lines
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "baseUrl": "./src",
    /* Specify the base directory to resolve non-relative module names. */
    "paths": {
      "@/resources/*": [
        "resources/*"
      ],
      "@/utils/*": [
        "utils/*"
      ],
      "@/middleware/*": [
        "middleware/*"
      ]
    },
    /* Specify a set of entries that re-map imports to additional lookup locations.*/
    "outDir": "./dist",
    /* Specify an output folder for all emitted files. */
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

### Download packages

+ ```npm i express dotenv```
+ ```npm i -D @types/express```

> Note: You can run this command if your IDE or Text Editor does not have prettier and eslint.
> ```
> npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express
> ```
> + Create .prettierrc.json and customize for yourself.
> + Create .eslintrc.json and customize for yourself.

## .gitignore and .env

1. Create **.gitignore** file add customize.
2. Create **.env** file and add these
```dotenv
NODE_ENV=development
PORT=3000
MONGO_PATH={your_mongo_path}
MONGO_USER={your_mongo_user}
MONGO_PASSWORD={your_mongo_password}
```

## Module Aliases
Short time ago we added ```"paths":{...}``` option to tsconfig.json which was just for TypeScript. Now we must add same option for JavaScript version. For that we should install ```module_alias``` package. Run this command.

```
npm i module_alias
```

And add these lines to your **package.json** file.

```json
"_moduleAliases": {
    "@/resources": "dist/resources",
    "@/utils": "dist/utils",
    "@/middleware": "dist/middleware"
}
```

## Folder Structure

+ src
  + middleware
  + resources
  + utils
  + app.ts
  + index.ts




















[//]: # (URLs)

[youTubeUrl]: https://www.youtube.com/playlist?list=PLfHWiTTUTVXfbwpJcIE6AwgCOaC5gWNOe
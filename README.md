# Node.js API From Scratch using TypeScript, Express.js and MongoDB

Source: [YouTube][youTubeUrl]

## Setting Up The Project, Prettier and ESLint

1. [Create **package.json**](#packagejson)
2. [Create **tsconfig.json**](#tsconfigjson)
3. [Download basic **npm packages** for this project.](#download-packages)

### package.json

* Create package.json with ```npm init -y``` _(-y optional)_ command.

### tsconfig.json

* Create tsconfig.json with ```tsc --init``` or ```npx tsc --init``` command and fill up like this example. I manually
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

* ```npm i express dotenv```
* ```npm i -D @types/express```

> Note: You can run this command if your IDE or Text Editor does not have prettier and eslint.
> ```
> npm i -D typescript tsc-watch eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/parser @typescript-eslint/eslint-plugin @types/node @types/express
> ```
> * Create .prettierrc.json and customize for yourself.
> * Create .eslintrc.json and customize for yourself.
***

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
***

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
***

## Folder Structure

* src
  * middleware
  * resources
  * utils
  * app.ts
  * index.ts
***

## Write The Framework Logic

### Get in App.ts file

#### 1. Import packages we will use
```typescript
import express, { Application } from "express" 
import mongoose from "mongoose"
import compression from "compression"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import Controller from "@/utils/interfaces/controller.interface"
import ErrorMiddleware from "@/middleware/error.middleware"
```

#### What will us do with these packages?

* Express.js: Web Framework.
* Mongoose: Connect to MongoDB.
* Middlewares
  * Compression: Compresses requests.
  * Cors: Setts the cors settings.
  * Morgan: HTTP request logger.
  * Helmet: Secures your express app.

#### 2. [Create App class](./src/app.ts)

* Define two variables for express and port.
* Set constructor
  * Get two variables for controllers and port.
  * Create in class and call in construction function these methods
    * private initialiseDatabaseConnection(): void
    * private initialiseMiddleware(): void
    * private initialiseControllers(controllers: Controller[]): void
    * private initialiseErrorHandling(): void

> * Controllers data type must be Controller[]
> * Create a file ./utils>interfaces>controller.interface.ts
> * Define an interface which name is Controller
> * Controller's interface get two variables ```path: string``` and ```router: Router```

> Error handler
> Create a function in ./middleware>error.middleware.ts

## Start app.ts

in the index.ts file we are going to start App class



[//]: # (URLs)

[youTubeUrl]: https://www.youtube.com/playlist?list=PLfHWiTTUTVXfbwpJcIE6AwgCOaC5gWNOe
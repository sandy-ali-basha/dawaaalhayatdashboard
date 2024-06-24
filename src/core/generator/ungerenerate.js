const fs = require("fs");
const path = require("path");
const getFileName = require("./file-name.utiles");

const args = process.argv.slice(2);

if (args.length < 1) {
    throw new Error(
        "Must Provide Component Name"
    );
}

const componentName = args[0];
const fileName = getFileName(componentName);
const ComponentName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

// const dirPath = args.length > 1 ? args[1] : process.env.INIT_CWD;
const dirPath = path.join(args.length > 1 ? args[1] : process.env.INIT_CWD, 'src/modules');
const apidirPath = path.join(args.length > 1 ? args[1] : process.env.INIT_CWD, 'src/api');
const HooksdirPath = path.join(args.length > 1 ? args[1] : process.env.INIT_CWD, 'src/hooks');

// * removing files
fs.unlinkSync(path.join(dirPath, componentName, `${ComponentName}Routing.jsx`));
fs.unlinkSync(path.join(dirPath, componentName, `${ComponentName}Component.jsx`));

// * removing components
fs.unlinkSync(path.join(dirPath, componentName, 'components', `ChangeStatus.jsx`));
fs.unlinkSync(path.join(dirPath, componentName, 'components', `Dialog.jsx`));

// * removing component hooks
fs.unlinkSync(path.join(dirPath, componentName, 'hooks', `useChangeStatus.js`));
fs.unlinkSync(path.join(dirPath, componentName, 'hooks', `use${ComponentName}Create.js`));

// * removing pages
fs.unlinkSync(path.join(dirPath, componentName, 'pages', `${ComponentName}Create.jsx`));
fs.unlinkSync(path.join(dirPath, componentName, 'pages', `${ComponentName}Index.jsx`));
fs.unlinkSync(path.join(dirPath, componentName, 'pages', `${ComponentName}Update.jsx`));
fs.unlinkSync(path.join(dirPath, componentName, 'pages', `${ComponentName}View.jsx`));

// * removing api file 
fs.unlinkSync(path.join(apidirPath, fileName, `${fileName}.js`));

// * removing hooks
fs.unlinkSync(path.join(HooksdirPath, fileName, `use${ComponentName}.js`));
fs.unlinkSync(path.join(HooksdirPath, fileName, `useDelete${ComponentName}.js`));

// * removing folders
fs.rmdirSync(path.join(dirPath, fileName, 'hooks'), { recursive: true });
fs.rmdirSync(path.join(dirPath, fileName, 'components'), { recursive: true });
fs.rmdirSync(path.join(dirPath, fileName, 'pages'), { recursive: true });

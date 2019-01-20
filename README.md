# ClimaViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.3. The aim of this project is to create a web app to show changes in our swiss clima.

## Installation
Before you can run the development server you have to install some neccessarly libraries:
- node.js
- nodemon (We use it to have to possibility of a hot deploy. But you can also use node)
- mongoDB

Go to the root project, api and cron-jobs-node folder and run following command to install all packages:
```shell
$ npm install
```

## Development server

Run `ng serve` in root project folder for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `mongod` for a mongoDB server. Please consider that in the first time there are NO DATA in database. The prod website show tracked data.

Run `nodemon server.js` in api folder for the backend server. The connection with the database will be automatically established.

Run `node index.js` in cron-jobs-node folder for the cronjob. The connection with the database will be automatically established.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

To get help or information about the ClimaViewer project please contact us.

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**



## Contributors
| <a href="https://github.com/kozinai" target="_blank">**Kozinai**</a> | <a href="https://github.com/mujko1" target="_blank">**Mujko1**</a> |

This project was development by these two contributors.

---

## Prod
You can access the demo on following link in the bfh network:
<a href="http://147.87.116.18:4200" target="_blank">**Prod Website**</a>

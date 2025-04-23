# importent steps 
1- run this command on terminal inside project (Get-ExecutionPolicy) if give you (restricted) run this command (Set-ExecutionPolicy RemoteSigned -Scope CurrentUser) 
2- install npm by run this comman inside project terminal (npm install)
3- install angular cli by run this command inside project terminal (npm install -g @angular/cli)


# use microsoft visual studio code to open angular project
  download from here https://code.visualstudio.com/

# Edit the links 

go to homeservice.service.ts 
full path (src/app/services/homeservice.service.ts) 
to update the links inside it 
example from project 
(https://localhost:7035/api/Card/GetAllCards)
you must change the number after localhost 
how to change it 
run one of the api using swagger testing tool 
and copy it to all methods inside angular project (only number)

# Edit path 
on (src/app/assets/CardImages) 
click Right then chose copy path 
go back to api project 
and copy the path in 
uploadimage method inside CardController 
on this line (var fullPath = Path.Combine("YourPath", fileName));



# BusinessCard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

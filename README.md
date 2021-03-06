# THE COOKBOOK

The project is a website that allows to show desired cooking recipe. It also allows the user to add new recipies if they are logged in.

## Used Frameworks:
- Python 3.9.0 64-bit
- Django 3.1.3
- React 17.0.1
- Material-UI 4.11.2
- Babel 7.12.10
- Webpack 5.11.0

## Used Database:
 - MySQL 8.0

 ## !!!Important Notices!!!
 1. If you want for Django to work with MySQL you have to install proper version of mysqlclient. The best option is to download *.whl file and install it using pip.
 2. mysqlclient does not work with the newest versions of MySQL e.g. MySQL 8.0. There is a however workaround. There is a need to change the password checking from sha256 caching to standard, because the module mysqlclient does not work with the newest sha256.

## Installation
- Clone this repository
- Edit `CookBook\dbconf\my.conf` file to make connection with mysql database or create database and user with proper information shown in this file
- Activate virtual environment using:
  - Linux: 
  `CookBookVenv390amd64\Scripts\activate`
  - Windows: 
  `CookBookVenv390amd64\Scripts\activate.bat`
- Run The server with the application using command: 

   `python CookBook\manage.py runserver`
   
### Now go and improve your cooking skills :)

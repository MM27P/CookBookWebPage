The project is a website that allows to show desired cooking recipe. It also allows the user to add new recipies if they are logged in.

Used Frameworks:
 - Django
 - React
 - Material-UI
 - Babel

Used Database:
 - MySQL

 !!!Important Notices!!!
 1. If you want for Django to work with MySQL you have to install proper version of mysqlclient. The best option is to download *.whl file and install it using pip.
 2. mysqlclient does not work with the newest versions of MySQL e.g. MySQL 8.0. There is a however workaround. There is a need to change the password checking from sha256 caching to standard, because the module mysqlclient does not work with the newest sha256.

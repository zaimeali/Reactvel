1) Db created in phpmyadmin
2) composer require laravel/ui
3) php artisan ui bootstrap
4) php artisan ui react 
    (if laravel version less than 7 than use php artisan preset react)
5) npm install
6) npm run dev
7) no need to put db_socket bcz of windows OS
8) import schema in AppServiceProvider and use in boot function
9) php artisan make:migration create_tasks_table
10) define fields in a new migrated file
11) php artisan migrate
12) php artisan make:model Task
13) write fields which are fillable in a model Task
14) Install react router (npm i --save reactstrap react react-dom)
15) npm run dev   (for compile new changes)
16) php artisan make:controller TasksController
17) code functions in controller file
18) create routes in api.php
19) go to the postman and fill data through get and post, and in body use x-www-form-urlencoded when     created new data
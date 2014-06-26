todoApp.controller("ToDoCtrl", function ($scope, ParseService) {
    var model = {
        items: []
    };

    //Delete a ToDo
    $scope.deleteToDo = function (idP) {
        angular.forEach($scope.todos.items, function (item) {
            if (item.id == idP) $scope.todos.items.splice($scope.todos.items.indexOf(item), 1);
        });
        ParseService.deleteToDo(idP);
    }

    //Add new ToDo
    $scope.addNewItem = function (actionText) {
        ParseService.saveToDo(actionText).then(function (results) {
            $scope.todos.items.push({ action: actionText, done: false, id: results.id });
        });
    };

    //Get all Todos
    ParseService.getToDos().then(function (results) {
        model.items = results;
        $scope.todos = model;
    });
});
todoApp.service('ParseService', function ($q, ParseAppId, ParseJSId) {
    //Initialize Parse
    Parse.initialize(ParseAppId,ParseJSId);

    //Get all ToDos
    this.getToDos = function () {
        var items = [];
        var defer = $q.defer();
        var ToDo = Parse.Object.extend("ToDo");
        var query = new Parse.Query(ToDo);
        query.find({
            success: function (results) {
                angular.forEach(results, function (result) {
                    items.push({
                        action: result.get("action"),
                        done: result.get("done"),
                        id: result.id
                    });
                });
                defer.resolve(items);
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
        return defer.promise;
    }

    //Save ToDo
    this.saveToDo = function (action) {
        var defer = $q.defer();
        var ToDo = Parse.Object.extend("ToDo");
        var todo = new ToDo();
        todo.set("action", action);
        todo.set("done", false);
        todo.save(null, {
            success: function (todo) {
                defer.resolve(todo);
            },
            error: function (todo, error) {
                alert('Failed to create new object, with error code: ' + error.description);
            }
        });
        return defer.promise;
    }

    //Delete ToDo
    this.deleteToDo = function (id) {
        var ToDo = Parse.Object.extend("ToDo");
        var todo = new ToDo();
        todo.set("id", id);
        todo.destroy({
            success: function (myObject) {
                // The object was deleted from the Parse Cloud.
            },
            error: function (myObject, error) {
                // The delete failed.
            }
        });
    }
});
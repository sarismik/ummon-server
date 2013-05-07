module.exports = function(ummon){
  var api = {};
  

  /**
   * Ummon Status
   */
  api.status = function(req, res) {
    res.json(200,'status');
  };


  /**
   * What tasks are running
   */
  api.ps = function(req, res){
    var pids = Object.keys(ummon.workers);

    res.json(200, {
      "count":pids.length,
      "workers": pids
    });
  };


  /**
   * Send the logs!
   */
  api.log = function(req, res){
    res.json(200, 'log');
  };


  api.showTask = function(req, res){
    var p = req.params;
    if (!ummon.tasks[p.taskid]) {
      res.json(404, "Task not found!");
    }
    
    res.json(200, {"task":ummon.showTask(p.taskid) });
  };


  /**
   * Create a task and add it to a collection
   *
   * Accepts:
   * 
   *     {
   *        "name":"hello",
   *        "command": "echo Hello;",
   *        "trigger": {
   *          "time": "* * * * *"
   *        }
   *      }
   */
  api.createTask = function(req, res){
    var task = ummon.createTask(req.body);

    res.json(200, {"message":"Task "+task.id+" successfully created", "task":task});
  };

  
  api.updateTask = function(req, res){
    var p = req.params;
    var t = req.body;

    if (!ummon.tasks[p.taskid]) {
      res.json(404, "Task not found!");
    }

    var task = ummon.updateTask(t);

    res.json(200, {"message":"Task "+task.id+" successfully updated", "task":task});
  };


  api.deleteTask = function(req, res){
    var p = req.params;

    if (!ummon.tasks[p.taskid]) {
      res.json(404, "Task not found!");
    }

    ummon.deleteTask(p.taskid);

    res.json(200, {"message":"Task "+p.taskid+" successfully deleted"});
  };

  return api;
};
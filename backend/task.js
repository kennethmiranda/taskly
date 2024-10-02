const task = {
    name: null, // String, required, unique
    description: null, // String, required
    deadline: null, // Date, required
    status: null, // Boolean, required
    createdAt: null, // Date, required
    taskid: null, // String, required, unique
    priorityLevel: null, // String, required
    notifablebyemail: null, // Boolean, required

}

module.exports = task;
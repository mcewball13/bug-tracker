const fs = require('fs');


//---------------------------------
//        Seeds for testing
//          will differ
//---------------------------------
let bugs = require('data/bugs.json')


export const bugsRepo = {
    getAll,
    getBugById,
    create,
    update,
    delete: _delete
};

function getAll(){
    return bugs;
}



function create({ title, description, priority, status, dateCreated, dateUpdated, dateClosed, employee_id }){
    const bug = {title, description, priority, status, dateCreated, dateUpdated, dateClosed, employee_id };

    if(!dateCreated){
        bug.dateCreated = new Date().toISOString();
    };

    bugs.push(bug);
    saveToDatabase();
};



function update(id, {title, description, priority, status, dateCreated, dateUpdated, dateClosed, employee_id }){
    const params = {title, description, priority, status, employee_id};

    const bug = bugs.find(id);


    //if the params title already exists for another bug will throw an error
    if (params.title !== bug.title && bugs.find( x => x.title === params.title))
        throw `Bug report with the title ${params.title} already exists`;

    // if the params priority is the same as bug's current priority will not update
    if (params.priority === bug.priority)
        throw `This is already the current status of the bug report, try again`
        delete params.priority;

    bug.dateUpdated = new Date().toISOString();

    if(priority === 'closed'){
        bug.dateClosed = new Date().toISOString();
    };

    Object.assign(bug, params);
    saveToDatabase();

}; 

// filters through database by id
function _delete(id) {
    bugs = bugs.filter(x => x.id.toString() !== id.toString());
    saveToDatabase();
}


// private helper function to write changes to database
function saveToDatabase(){
    fs.writeFileSync('data/bugs.json', JSON.stringify(bugs, null, 4));
}
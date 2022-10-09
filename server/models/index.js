import Company from './Company';
import Employee from './Employee';
import Bug from './Bug';
import Tag from './Tag';
import Ticket from './Ticket';
import Comment from './Comment';



// ===========================================================
// Create associations with the main company
// ===========================================================

Company.hasMany(Employee, {
    foreignKey: 'company_id',
});
Employee.belongsTo(Company, {
    foreignKey: 'company_id',
});


// ===========================================================
// Create associations with the Employee
// ===========================================================

Employee.hasMany(Bug, {
    foreignKey: 'employee_id',
});
Bug.belongsTo(Employee, {
    foreignKey: 'employee_id',
});
Employee.hasMany(Ticket, {
    foreignKey: 'employee_id',
});
Ticket.belongsTo(Employee, {
    foreignKey: 'employee_id',
});
Employee.hasMany(Comment, {
    foreignKey: 'employee_id',
});
Comment.belongsTo(Employee, {
    foreignKey: 'employee_id',
});

// ===========================================================
// Create associations with the Tickets
// ===========================================================
Ticket.hasMany(Comment, {
    foreignKey: 'ticket_id',
});
Comment.belongsTo(Ticket, {
    foreignKey: 'ticket_id',
});

// Through Tables for many to many relationships
Ticket.belongsToMany(Tag, {
    through: 'ticket_has_tag',
    foreignKey: 'ticket_id',
    as: 'tags',
    
});
Tag.belongsToMany(Ticket, {
    through: 'ticket_has_tag',
    foreignKey: 'tag_id',
    as: 'tickets',
    
});

// ===========================================================
// Create associations with the Bugs
// ===========================================================
Bug.hasMany(Comment, {  
    foreignKey: 'bug_id',
});
Comment.belongsTo(Bug, {
    foreignKey: 'bug_id',
});

// Through Tables for many to many relationships

Bug.belongsToMany(Tag, {
    through: 'bug_has_tag',
    foreignKey: 'bug_id',
    as: 'tags',
});
Tag.belongsToMany(Bug, {
    through: 'bug_has_tag',
    foreignKey: 'tag_id',
    as: 'bugs',
});

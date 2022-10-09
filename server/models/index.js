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
    foreignKey: 'companyId',
});
Employee.belongsTo(Company, {
    foreignKey: 'companyId',
});


// ===========================================================
// Create associations with the Employee
// ===========================================================

Employee.hasMany(Bug, {
    foreignKey: 'employeeId',
});
Bug.belongsTo(Employee, {
    foreignKey: 'employeeId',
});
Employee.hasMany(Ticket, {
    foreignKey: 'employeeId',
});
Ticket.belongsTo(Employee, {
    foreignKey: 'employeeId',
});
Employee.hasMany(Comment, {
    foreignKey: 'employeeId',
});
Comment.belongsTo(Employee, {
    foreignKey: 'employeeId',
});

// ===========================================================
// Create associations with the Tickets
// ===========================================================
Ticket.hasMany(Comment, {
    foreignKey: 'ticketId',
});
Comment.belongsTo(Ticket, {
    foreignKey: 'ticketId',
});

// Through Tables for many to many relationships
Ticket.belongsToMany(Tag, {
    through: 'ticket_has_tag',
    foreignKey: 'ticketId',
    as: 'tags',
});
Tag.belongsToMany(Ticket, {
    through: 'ticket_has_tag',
    foreignKey: 'tagId',
    as: 'tickets',
});

// ===========================================================
// Create associations with the Bugs
// ===========================================================
Bug.hasMany(Comment, {  
    foreignKey: 'bugId',
});
Comment.belongsTo(Bug, {
    foreignKey: 'bugId',
});

// Through Tables for many to many relationships

Bug.belongsToMany(Tag, {
    through: 'bug_has_tag',
    foreignKey: 'bugId',
    as: 'tags',
});
Tag.belongsToMany(Bug, {
    through: 'bug_has_tag',
    foreignKey: 'tagId',
    as: 'bugs',
});

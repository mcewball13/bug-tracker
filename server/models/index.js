import Company from './Company.js';
import Employee from './Employee.js';
import Bug from './Bug.js';
import Tag from './Tag.js';
import Ticket from './Ticket.js';
import Comment from './Comment.js';

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
Ticket.belongsTo(Bug, {
  foreignKey: 'bug_id',
  allowNull: true,
});
Bug.belongsTo(Ticket, {
  foreignKey: 'ticket_id',
  allowNull: true,
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

export { Company, Employee, Bug, Tag, Ticket, Comment };

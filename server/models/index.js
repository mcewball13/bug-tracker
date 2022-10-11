const Bugs = require('./Bugs');
const Company = require('./Company');
const Department = require('./Department');
const Employee = require('./Employee');
const Projects = require('./Projects');
const Tickets = require('./Tickets');

Company.hasMany(Employee, {
    foreignKey: 'company_id',
    onDelete: 'CASCADE',
  });

  Projects.hasMany(Bugs, {
    foreignKey: 'bug_id',
    onDelete: 'CASCADE',
  });

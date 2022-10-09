const Company = require('./Company');
const Employee = require('./Employee');


// ===========================================================
// Create associations with the main company
// ===========================================================

Company.hasMany(Employee, {
    foreignKey: 'companyId',
});
Employee.belongsTo(Company, {
    foreignKey: 'companyId',
});
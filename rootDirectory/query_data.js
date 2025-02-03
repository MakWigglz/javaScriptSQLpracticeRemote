const { createConnection } = require('./database');

function queryAllCustomers(callback) {
    const db = createConnection();
    db.all("SELECT * FROM customers", [], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
        db.close();
    });
}

function queryCustomersByCountry(country, callback) {
    const db = createConnection();
    db.all("SELECT * FROM customers WHERE Country = ?", [country], (err, rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
        db.close();
    });
}

function printCustomers(customers) {
    customers.forEach(customer => {
        console.log(`ID: ${customer.id}`);
        console.log(`Name: ${customer.First_Name} ${customer.Last_Name}`);
        console.log(`Company: ${customer.Company}`);
        console.log(`Country: ${customer.Country}`);
        console.log(`Email: ${customer.Email}`);
        console.log("------------------------");
    });
}

module.exports = { queryAllCustomers, queryCustomersByCountry, printCustomers };
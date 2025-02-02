const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const csv = require('csv-parser');

function createConnection() {
    return new sqlite3.Database('customer_data.db', (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the customer_data database.');
    });
}

function initDb() {
    const db = createConnection();

    db.run(`CREATE TABLE IF NOT EXISTS customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        Customer_Id TEXT,
        First_Name TEXT,
        Last_Name TEXT,
        Company TEXT,
        City TEXT,
        Country TEXT,
        Phone_1 TEXT,
        Phone_2 TEXT,
        Email TEXT,
        Subscription_Date TEXT,
        Website TEXT
    )`, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Customers table created successfully.');
            importData(db);
        }
    });
}

function importData(db) {
    fs.createReadStream('customers-100.csv')
        .pipe(csv())
        .on('data', (row) => {
            db.run(`INSERT INTO customers (
                Customer_Id, First_Name, Last_Name, Company, City, Country, 
                Phone_1, Phone_2, Email, Subscription_Date, Website
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                row['Customer Id'], row['First Name'], row['Last Name'], row['Company'],
                row['City'], row['Country'], row['Phone 1'], row['Phone 2'],
                row['Email'], row['Subscription Date'], row['Website']
            ], (err) => {
                if (err) {
                    console.error(err.message);
                }
            });
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            db.close((err) => {
                if (err) {
                    console.error(err.message);
                }
                console.log('Database connection closed.');
            });
        });
}

module.exports = { createConnection, initDb };
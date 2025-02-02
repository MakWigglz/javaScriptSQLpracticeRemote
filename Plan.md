Certainly! I'll create a JavaScript module that performs similar functionality to the csvSQLite project, including the main.py, query_data.py, and database.py files. We'll use Node.js for this implementation, as it allows us to work with the file system and create a local database.

First, let's set up the project:

1. Create a new directory for your project.
2. Initialize a new Node.js project by running `npm init -y` in the project directory.
3. Install required dependencies by running `npm install sqlite3 csv-parser`.

Now, let's create the JavaScript files:

**File: /path/to/your/project/database.js**
```javascript
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
```

**File: /path/to/your/project/query_data.js**
```javascript
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
```

**File: /path/to/your/project/main.js**
```javascript
const readline = require('readline');
const { initDb } = require('./database');
const { queryAllCustomers, queryCustomersByCountry, printCustomers } = require('./query_data');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    initDb();

    function showMenu() {
        console.log("\n1. View all customers");
        console.log("2. View customers by country");
        console.log("3. Exit");
        rl.question("Enter your choice (1-3): ", handleChoice);
    }

    function handleChoice(choice) {
        switch (choice) {
            case '1':
                queryAllCustomers(printCustomers);
                setTimeout(showMenu, 100);
                break;
            case '2':
                rl.question("Enter country name: ", (country) => {
                    queryCustomersByCountry(country, printCustomers);
                    setTimeout(showMenu, 100);
                });
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log("Invalid choice. Please try again.");
                showMenu();
        }
    }

    showMenu();
}

main();
```

To run the program:

1. Make sure you have Node.js installed on your system.
2. Place the `customers-100.csv` file in the same directory as your JavaScript files.
3. Run the following command in your terminal:

```bash
node main.js
```

This JavaScript implementation provides the same functionality as the Python version:

1. It creates a SQLite database and imports data from the CSV file.
2. It allows users to view all customers or filter customers by country.
3. It provides a simple command-line interface for interacting with the data.

The main differences are:

- We're using Node.js and its ecosystem (sqlite3, csv-parser) instead of Python.
- The code is structured in a more modular way, with separate files for database operations, querying, and the main program logic.
- We're using callbacks and setTimeout to handle asynchronous operations, which is common in Node.js.

This implementation should work similarly to the Python version, allowing you to query and display customer data from the CSV file using a SQLite database.
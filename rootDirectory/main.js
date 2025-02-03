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
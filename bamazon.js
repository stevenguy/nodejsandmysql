// Node declarations
const inquirer = require("inquirer")
const mysql = require("mysql")

// SQL Connection Info
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon_db"
});

// SQL Connection and load store
connection.connect(function(e) {
  if (e) throw e
  loadStore()
});

// Product array to push inventory
let prodLists = []

// Display inventory
function loadStore() {
    connection.query("SELECT * FROM inventory", function(e, res) {
            if (e) throw e;
            console.log('Current Inventory: \n');
            for (let i = 0; i < res.length; i++) {
                console.log(
                'Item ID: ' + res[i].item_id + '\n' +
                'Product Name: ' + res[i].prod_name + '\n' +
                'Department: ' + res[i].depart_name + '\n' +
                'Price: $' + res[i].price + '\n' +
                '------------------\n'
                )
             prodLists.push('Item ID: ' + res[i].item_id + ", " + res[i].prod_name + ", " + res[i].depart_name + ", " + res[i].price)
            }
        addToCart(prodLists)
    })
}

// Add to cart function
function addToCart(prodLists) {

    inquirer
    .prompt([{
      name: "item",
      type: "list",
      message: "What do you want to buy?",
      choices: prodLists
    },{
        name: "quantity",
        type: "input",
        validate: validateNumber,
        filter: Number,
        message: "How many? 1, 2, 3, or 10?",
      }]
    )
    .then(function(answer) {
        let id = answer.item.match(/^Item ID: (\d+)/)[1]
        checkout(id, answer.quantity)
    })
}

// Order confirmation and notification
function checkout(id, quantity) {
    connection.query('SELECT * FROM inventory WHERE ?', {item_id: id}, function(e, res) {
        if (e) throw e
        if(quantity > res[0].stock_qty) {
            console.log("We don't have enough! Sorry!  Restocking soon!")
            redirect()
        } else {
            let newStockQty = res[0].stock_qty - quantity
            connection.query('UPDATE inventory SET ? WHERE ?', [{stock_qty: newStockQty}, {item_id: id}], function(e, res) {
                if (e) throw e
                console.log('Your order has been placed!  Thank you for your purchase!')
                redirect()
            })
        }
    })
}

// Turn string into integer
function validateNumber(val) {
    if(Number.isInteger(parseFloat(val)) == true && Math.sign(val) == 1) {
        return true
    } else {
        return 'Out of Stock!  Restocking soon!'
    }
}

// Redirect after purchase
function redirect() {
    inquirer
    .prompt({
      name: "home",
      type: "list",
      message: "Keep shopping?",
      choices: ['Yes, lets make it rain!', 'No, my bank account hates me at the moment!']
    })
    .then(function(answer) {
        if(answer.home === 'Yes, lets make it rain!') {
            loadStore()
        } else {
           process.exit()
        }
    })
}
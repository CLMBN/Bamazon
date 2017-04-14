//NPM Requirements
var mysql = require('mysql');
var inquirer = require('inquirer');

//mySQL connection
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password: 'test',
	database: "Bamazon"
});

//connect to database
connection.connect(function(err){
	if (err) throw err;
	// show all products available
	showAllProducts().then(function(result) {
		//list each item
		result.showEach(function(item){
			console.log('Item ID: ' + item.item_id + ' | Product Name: ' + item.product_name + ' | Price: ' + item.price);
		});
	//after menu is displayed ask what user would like to do
	}).then(function() {
		return optionQuestion();
	});
});

// function to show menu of available items
function showAllProducts() {
	return new Promise(function(resolve, reject) {
		//use select to bring back all products in the table
		connection.query("SELECT * FROM products", function(err, res) {
			if (err) reject(err);
			resolve(res);
		});
	});
}

//Prompt user with options to purchase from menu of items
function optionQuestion() {
	return inquirer.prompt([{
		name: 'product_id',
		message: 'What is the ID of the product you would like to purchase?',
		type: 'input',
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			} else {
				console.log('\nPlease a valid ID from menu');
				return false;
			}
		}
	},{
		name: 'numberOfItems',
		message: 'How many if this item would you like to purchase?',
		type: 'input',
		validate: function(value) {
			if (isNaN(value) === false) {
				return true;
			} else {
				console.log('\nPlease a valid quantity.');
				return false;
			}
		}
	}]).then(function(answer) {
		return new Promise(function(resolve, reject) {
			//match up the item id the user selected against the products table
			connection.query("SELECT * FROM products WHERE item_id=?", answer.product_id, function(err,res) {
				if (err) reject(err);
				resolve(res);
			});
		//check if there is enough of the item in stock
		}).then(function(result) {
			//if there we are low on items
			if (answer.numberOfItems > result[0].stock_quantity) {
				return "Insufficient quantity!";
			//if ther are enough
			} else {
				var status = {};
				//pull answer from users response
				status.answer = answer;
				//display result of the query
				status.result = result;
				return status;
			}
		}).catch(function(err) {
			console.log(err);
			connection.destroy();
		}).then(function(status) {
			//display if there enough of the item in stock
			if (status.answer) {
				var newStockAmount = status.result[0].stock_quantity - status.answer.numberOfItems;
				var product = status.answer.product_id;
				var totalCost = (status.result[0].price * status.answer.numberOfItems).toFixed(2);
				//update table with new values to adjust what was purchased
				connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStockAmount, product], function(err, res) {
					if(err) reject(err);
					console.log('Total Purchase Cost is $' + totalCost);
					//close connection
					connection.destroy();
				});
			} else {
				console.log(status);
				// close connection
				connection.destroy();
			}
		});
	});
}
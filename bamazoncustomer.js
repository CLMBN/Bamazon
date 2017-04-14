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


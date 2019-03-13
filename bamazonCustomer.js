var mysql = require('mysql');
var inquirer = require('inquirer');

function bamazon(){
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB"
 });
 
 
 connection.connect(function(err){
    if(err) throw err;
    console.log("Connected to Database");
 
    
    connection.query("Select * from product", function (err, response){
        if(err) throw err;
        console.table(response);
        
        startQuery(response);
    });

    function moreOps(){
        inquirer.prompt([
            {
            name: "BuyMore",
            message: "Would You like no buy another item? (y/n) ",
            type: "input",
        
            },
           
          ]).then(function(userInput) {
              if(userInput.BuyMore==='y' || userInput.BuyMore === 'Y'){
                    bamazon();
              } else if(userInput.BuyMore==='n' || userInput.BuyMore === 'N'){
                    console.log("Ok, thanks for shopping with Bamazon!");
                    connection.end();
              }


          }); 

    }


    function startQuery(response){
        inquirer.prompt([
            {
            name: "idInquiry",
            message: "What is the id of the Product you wish to buy?",
            type: "input",
        
            },
            {
                name: "prodnum",
                message: "How Many Units do you wish to buy?",
                type: "input",
            
            }
          ]).then(function(userInput) {
            console.log(userInput);
            var itemfound = false;
            var theNum = userInput.prodnum;
            var theItem = '';
            
           for(var i =0; i<response.length; i++){
               
               if(userInput.idInquiry == response[i].id && userInput.prodnum<response[i].stock_quantity){
                //    console.log(response[i].product_name);
                   itemfound = true;
                   theItem = response[i];
               } 

           }

           if(itemfound === true){
               console.log("YUP!");
               console.table(theItem);
               console.log("Congrats! You purchased "+ theNum +" "+ theItem.product_name +" for a total of "+"$"+(theItem.price*theNum) );
               
               connection.query("UPDATE product SET stock_quantity='"+(theItem.stock_quantity-theNum)+"' WHERE product_name='"+theItem.product_name+"'", function (err, response){
                if(err) throw err;
                // console.log(response);
                moreOps();
                
                });
           

           } else {
               console.log("sorry, thats not a valid request!");
           }
           
            
            
        
          });
        }

        
})
} 

bamazon();
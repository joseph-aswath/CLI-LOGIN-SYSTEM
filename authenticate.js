const fs = require('fs');
const inquirer = require('inquirer');


var objTemplate = {name:"", pw:""} ;  //object template 
var objRead = fs.readFileSync('./USERS.json',"utf8", function(err){console.log("error");});
var objMain = JSON.parse(objRead);

/*
var object = [
    {name:"abc",pw:"123"},
    {name:"def",pw:"456"},
    {name:"ghi",pw:"789"}
];*/

var questions = [
    {
        name:"options",
        type:"list",
        choices: [{name:"LOGIN",value:0},{name:"REGISTER",value:1}],
        //validate: toggle();
    }
];

var userDetails = [
    {
        name:"USERNAME",
        type:"input",
        message:"USER-NAME:"
    },
    {
        name:"PASSWORD",
        type:"password",
        message:"PIN-CODE:"
    }
];

var userDetails2 = [    
    {
        name: "user_name",
        type:"input",
        message: "user-name:"       
    },
    {
        name:"pass_word",
        type:"password",
        message:"pincode:"
    }
];

inquirer.prompt(questions).then(function(answers1){   
    /*******************************************************************************************/
        //REGISTER
        console.log("!!!no special characters are allowed!!!");
        if(answers1.options == 1) {

            inquirer.prompt(userDetails).then(function(answers2){

            objTemplate.name = answers2.USERNAME;
            objTemplate.pw = answers2.PASSWORD;

            objMain.push(objTemplate);
            //objMain.length += 1; updating the length of the array of objects 
            fs.writeFile('./USERS.json',JSON.stringify(objMain), err=> {if(err) {throw err}});

            console.log("\n", "registratoin successful!");
            console.log("\n");
            console.log(`

░██╗░░░░░░░██╗███████╗██╗░░░░░░█████╗░░█████╗░███╗░░░███╗███████╗
░██║░░██╗░░██║██╔════╝██║░░░░░██╔══██╗██╔══██╗████╗░████║██╔════╝
░╚██╗████╗██╔╝█████╗░░██║░░░░░██║░░╚═╝██║░░██║██╔████╔██║█████╗░░
░░████╔═████║░██╔══╝░░██║░░░░░██║░░██╗██║░░██║██║╚██╔╝██║██╔══╝░░
░░╚██╔╝░╚██╔╝░███████╗███████╗╚█████╔╝╚█████╔╝██║░╚═╝░██║███████╗
░░░╚═╝░░░╚═╝░░╚══════╝╚══════╝░╚════╝░░╚════╝░╚═╝░░░░░╚═╝╚══════╝
            `);
        });
    }
/********************************************************************************************** */
    //LOGIN      
            else if (answers1.options == 0) { 
                inquirer.prompt(userDetails2).then(function(answers3){
                
                //linear search
                for(var i = 0; i <= objMain.length ; i++){
                    
                    if(objMain[i].name == answers3.user_name && objMain[i].pw == answers3.pass_word) {
                            console.log("welcome: login was successful");
                            console.log("\n");
                            console.log(`

░██████╗██╗░░░██╗░█████╗░░█████╗░███████╗░██████╗░██████╗
██╔════╝██║░░░██║██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
╚█████╗░██║░░░██║██║░░╚═╝██║░░╚═╝█████╗░░╚█████╗░╚█████╗░
░╚═══██╗██║░░░██║██║░░██╗██║░░██╗██╔══╝░░░╚═══██╗░╚═══██╗
██████╔╝╚██████╔╝╚█████╔╝╚█████╔╝███████╗██████╔╝██████╔╝
╚═════╝░░╚═════╝░░╚════╝░░╚════╝░╚══════╝╚═════╝░╚═════╝░

                            `);
                            break;
                            } 
                            
                            else if(objMain[i].pw !== answers3.pass_word && objMain[i].name !== answers3.user_name) {
                                        continue;
                                        console.log("wrong password or user name");
                                        console.log("\n");
                                        console.log(`
                        
███████╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔════╝██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
█████╗░░███████║██║██║░░░░░█████╗░░██║░░██║
██╔══╝░░██╔══██║██║██║░░░░░██╔══╝░░██║░░██║
██║░░░░░██║░░██║██║███████╗███████╗██████╔╝
╚═╝░░░░░╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═════╝░

                                        `);    
                                                            
                                    }     
                                    
                            else if(null) { 
                                
                                console.log("login failed");
                                console.log(`
                                
███████╗░█████╗░██╗██╗░░░░░███████╗██████╗░
██╔════╝██╔══██╗██║██║░░░░░██╔════╝██╔══██╗
█████╗░░███████║██║██║░░░░░█████╗░░██║░░██║
██╔══╝░░██╔══██║██║██║░░░░░██╔══╝░░██║░░██║
██║░░░░░██║░░██║██║███████╗███████╗██████╔╝
╚═╝░░░░░╚═╝░░╚═╝╚═╝╚══════╝╚══════╝╚═════╝░

                                `);
                            }
                
                }

            }); 
            }
        });
    /******************************************************************************************/
    

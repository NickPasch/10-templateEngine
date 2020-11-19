const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
var finalTeam = [];

function toInput(){
inquirer.prompt([
    {
        type: "list",
        message: "Create employee?",
        name: "employee",  
        choices: ["Yes",  "No"]  
    }
]).then (answers =>{
    console.log(answers.employee)
    switch(answers.employee){
        case 'Yes':
            createEmployee();
            break;
        case 'No':
            fs.writeFile(outputPath, render(finalTeam), (err) =>{
                if (err) throw err;
                else{
                    console.log("successfully rendered html")
                }
            })
            break;
        default:
    }

})
}

toInput();

var theName = "";

function createEmployee(answer){
    console.log(answer)

    inquirer.prompt([
        {
        type: "input",
        message: "What is the name of this employee?",
        name: "name"
        },
        {
        type: "number",
        message: "What is this employee's ID?",
        name: "id"
        },
        {
        type: "input",
        message: "What is this employee's email?",
        name: "email"
        },
        {
        type: "list",
        message: "what type of employee is this?",
        name: "employee",
        choices: ["Intern", "Engineer", "Manager", "No More"]
        }
    ]
    ).then(answers =>{
        switch(answers.employee){
            case 'Intern':
                const newIntern = new Intern (answers.name, answers.id, answers.email)
                console.log(newIntern)
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What school do you or did you attend?",
                        name: "school"
                    }
                ]).then(answers =>{
                    newIntern.school = answers.school
                    console.log(newIntern)
                    finalTeam.push(newIntern)
                    addMore();
                })
                break;
            case 'Engineer':
                const newEngineer = new Engineer (answers.name, answers.id, answers.email)
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your github username?",
                        name: "git"
                    }
                ]).then(answers =>{
                    newEngineer.github = answers.git
                    console.log(newEngineer)
                    finalTeam.push(newEngineer)
                    addMore();
                })
                break;
            case 'Manager':
                const newManager = new Manager (answers.name, answers.id, answers.email)
                console.log(newManager)
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your office number?",
                        name: "num"
                    }
                ]).then(answers =>{
                    newManager.officeNumber = answers.num
                    console.log(newManager)
                    finalTeam.push(newManager)
                    addMore();
                })
                // addMore();
                break;
            case 'No More':
                fs.writeFile(outputPath, render(finalTeam), (err) =>{
                    if(err) throw err;
                    else{
                        console.log("successfully rendered html")
                    }
                })
            default:

        }
    })
}

function addMore(){
    inquirer.prompt({
        type:"list",
        message:"Would you like to add more?",
        name:"bool",
        choices:["Yes", "No"]
    }).then(answers =>{
        switch(answers.bool){
            case 'Yes':
                toInput();
                break;
            case 'No':
                fs.writeFile(outputPath, render(finalTeam), (err) =>{
                    if (err) throw err;
                    else{
                        console.log("successfully rendered html")
                    }
                })
        }
    }) 
}


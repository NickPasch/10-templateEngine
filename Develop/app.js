const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Here at the top we have all the required modules and such that we need


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

// Here I define the array for the final team that will be displayed on the html 
var finalTeam = [];

// This is the first question that is asked when the user invokes the program or asks to input another employee
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
    // This switch deals so that the html will be rendered if 'no and will ask questions if 'yes'
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
// Running the function 
toInput();


// This is run if 'yes' is selected, it gathers all information for a standard employee and sees for  
// which type of employee the user wants 
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
        // Switch case handling the answers to which type of employee so that 
        // I can know which unique type of data to grab next
        switch(answers.employee){
            case 'Intern':
                // This code is basically pasted into all other cases, and constructs the new specific object
                const newIntern = new Intern (answers.name, answers.id, answers.email)
                console.log(newIntern)
                // Getting the last information
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What school do you or did you attend?",
                        name: "school"
                    }
                ]).then(answers =>{
                    // Setting the last information
                    newIntern.school = answers.school
                    console.log(newIntern)
                    // Pushing to final array
                    finalTeam.push(newIntern)
                    // Ask if user wants to add another
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
            // If no more, then the html will be rendered
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
    // Asking if they do or do not want to add more after adding their last employee
    inquirer.prompt({
        type:"list",
        message:"Would you like to add more?",
        name:"bool",
        choices:["Yes", "No"]
    }).then(answers =>{
        // Prompting necessary questions to add a new employee
        switch(answers.bool){
            case 'Yes':
                // Recycle other code
                toInput();
                break;
            case 'No':
                // Write html if no 
                fs.writeFile(outputPath, render(finalTeam), (err) =>{
                    if (err) throw err;
                    else{
                        console.log("successfully rendered html")
                    }
                })
        }
    }) 
}


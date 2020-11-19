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
        choices: ["Intern", "Engineer", "Manager"]
        }
    ]
    ).then(answers =>{
        console.log(answers.name)
        console.log(answers.id)
        console.log(answers.email)
        console.log(answers.employee)
        theName = answers.name;
        switch(answers.employee){
            case 'Intern':
                var arr = [];
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What school do you or did you attend?",
                        name: "school"
                    }
                ]).then(answers =>{
                    arr.push(answers.school)
                })
                console.log(arr[0])
                // console.log(answers.id)
                break;
            case 'Engineer':
                createEngineer(answers.employee);
                break;
            case 'Manager':
                createManger(answers.employee);
                break;
            default:

        }
    })
}

var allInterns = [];

// function createIntern(){
//     // console.log(answer.name)
//     inquirer.prompt([
//         {
//             type: "input",
//             message: "What school do you or did you attend?",
//             name: "school"
//         }
//     ]).then(answers =>{

//         console.log(answers.school);
//         return answers.school;
//         // intern.getSchool(answers.school);
//         // console.log(intern)
//         // intern1.school = answers.school;
//         // console.log(intern)
//     })

// }

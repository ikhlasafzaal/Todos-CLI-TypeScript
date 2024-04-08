#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todos = [];
let choicesCondition = true;
while (choicesCondition) {
    let questionsChoices = await inquirer.prompt([
        {
            type: 'list',
            name: "choices",
            message: "What would you like to choose",
            choices: ["Add", "Read", "Edit", "Delete", "Exit"]
        }
    ]);
    if (questionsChoices.choices === "Add") {
        let condition = true;
        while (condition) {
            let questionsToDos = await inquirer.prompt([
                {
                    name: "firstQuestion",
                    type: "input",
                    message: "What would you like to Add in List?"
                }
            ]);
            if (!questionsToDos.firstQuestion) {
                console.log(chalk.bold.yellowBright("Empty Data Insertion Not Allowed!"));
            }
            else {
                let questionsToDosConfirmation = await inquirer.prompt([
                    {
                        name: "secondQuestion",
                        type: "confirm",
                        message: "Do you want to Add More or Not?",
                        default: "true"
                    }
                ]);
                todos.push(questionsToDos.firstQuestion);
                console.log(`${todos}`);
                condition = questionsToDosConfirmation.secondQuestion;
            }
        }
    }
    else if (questionsChoices.choices === "Read") {
        if (todos.length === 0) {
            console.log(chalk.yellow('No tasks available.'));
        }
        else {
            console.log(chalk.bold.cyanBright("ToDo List:"));
            for (let todo of todos) {
                console.log(`- ${todo}`);
            }
        }
    }
    else if (questionsChoices.choices === "Edit") {
        if (todos.length === 0) {
            console.log(chalk.yellow('No tasks to update.'));
        }
        else {
            let updateChoice = await inquirer.prompt([
                {
                    name: 'index',
                    type: 'number',
                    message: 'Enter the serial no of the task you want to update:',
                }
            ]);
            const updateIndex = updateChoice.index - 1;
            if (updateIndex >= 0 && updateIndex < todos.length) {
                let updateChoice = await inquirer.prompt([
                    {
                        name: 'updatedTask',
                        type: 'input',
                        message: 'Enter the updated task:'
                    }
                ]);
                todos[updateIndex] = updateChoice.updatedTask;
                console.log(chalk.bgGreenBright.bold('\n \t Task Updated Successfully.\n'));
            }
            else {
                console.log(chalk.red.bold('Invalid index or task does not exist.'));
            }
        }
    }
    else if (questionsChoices.choices === "Delete") {
        if (todos.length === 0) {
            console.log(chalk.yellow('No tasks to delete.'));
        }
        else {
            let deleteChoice = await inquirer.prompt([
                {
                    name: 'index',
                    type: 'number',
                    message: 'Enter the index of the task you want to delete:',
                }
            ]);
            const deleteIndex = deleteChoice.index - 1;
            if (deleteIndex >= 0 && deleteIndex < todos.length) {
                todos.splice(deleteIndex, 1);
                console.log(chalk.bgRedBright.bold('\n \t Task Deleted Successfully.\n'));
            }
            else {
                console.log(chalk.red.bold('Invalid index or task does not exist.'));
            }
        }
    }
    else if (questionsChoices.choices === "Exit") {
        choicesCondition = false;
        console.log(chalk.red.bold('Exited from Program...'));
    }
}

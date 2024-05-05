#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { questions } from "./questions.js";
let score = 0;
// console.log("questions :>> ", questions);
async function promptQuestion(question, index) {
    const answer = await inquirer.prompt({
        type: "list",
        name: `question${index}`,
        message: question.statement,
        choices: question.options.map((option, index) => ({
            name: `${index + 1}. ${option}`,
            value: index,
        })),
    });
    if (answer[`question${index}`] === question.answer)
        score += 10;
    //   console.log("answer :>> ", answer[`question${index}`]);
}
async function askQuestions() {
    for (let i = 0; i < questions.length; i++) {
        await promptQuestion(questions[i], i);
        console.log("\n");
    }
    const bgColor = score > 60 ? "bgGreen" : "bgRed";
    const message = chalk.blue[bgColor].bold(`Your quiz score is ${score} out of 100.\n`);
    // Log the message
    console.log(message);
}
askQuestions();

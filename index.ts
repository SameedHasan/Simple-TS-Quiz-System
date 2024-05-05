#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { questions } from "./questions.js";
let score: number = 0;

async function promptQuestion(question: any, index: number): Promise<void> {
  const answer = await inquirer.prompt({
    type: "list",
    name: `question${index}`,
    message: question.statement,
    choices: question.options.map((option: string, index: number) => ({
      name: `${index + 1}. ${option}`,
      value: index,
    })),
  });
  if (answer[`question${index}`] === question.answer) score += 10;
}
async function askQuestions() {
  for (let i = 0; i < questions.length; i++) {
    await promptQuestion(questions[i], i);
    console.log("\n");
  }

  const bgColor = score > 60 ? "bgGreen" : "bgRed";
  const message = chalk.blue[bgColor].bold(
    `Your quiz score is ${score} out of 100.\n`
  );

  console.log(message);
}

askQuestions();

#!/usr/bin/env node

import { execSync } from "child_process";
import degit from "degit";
import chalk from "chalk";
import prompts from "prompts";
import path from "path";
import fs from "fs";

async function main() {
    console.log(chalk.blue("\n🚀 Welcome to create-iclasser-react-component CLI! 🚀\n"));

    // Ask for the project name
    const response = await prompts({
        type: "text",
        name: "projectName",
        message: "Enter the name of your new component project:",
        initial: "iclasser-react-component"
    });

    const projectName = response.projectName.trim();
    const targetDir = path.join(process.cwd(), projectName);

    if (fs.existsSync(targetDir)) {
        console.log(chalk.red(`\n❌ Error: Directory '${projectName}' already exists.\n`));
        process.exit(1);
    }

    console.log(chalk.green("\n📥 Cloning iClasser React LMS Components...\n"));

    // Clone the repository
    const repo = "iClasser/iclasser-react-lms-components";
    const emitter = degit(repo, { cache: false });

    try {
        await emitter.clone(targetDir);
        console.log(chalk.green("\n✅ Project setup complete!\n"));
        console.log(chalk.cyan(`\nNext steps:\n\n  cd ${projectName}\n  npm install\n  npm run dev\n`));
    } catch (err) {
        console.error(chalk.red(`\n❌ Error: ${err.message}\n`));
    }
}

main();

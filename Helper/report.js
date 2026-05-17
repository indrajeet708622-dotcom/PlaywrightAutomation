const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const { generateDocs } = require('./doc');

let sanitizedReportName;
let dateandtime;

async function runPlaywrightAndGenerateAllureReport() {

    // Directories
    const reportContent = path.join(process.cwd(), 'allure-results');
    const resultDir = path.join(process.cwd(), 'Results');

    // Create Results folder
    if (!fs.existsSync(resultDir)) {
        fs.mkdirSync(resultDir);
    }

    // Create Reports folder
    const reportsDir = path.join(process.cwd(), 'Reports');

    if (!fs.existsSync(reportsDir)) {
        fs.mkdirSync(reportsDir);
    }

    let attachmentSourcesArray = [];

    try {

        const files = fs.readdirSync(reportContent);

        for (const file of files) {

            if (file.endsWith('.json')) {

                const filePath = path.join(reportContent, file);

                const data = JSON.parse(
                    fs.readFileSync(filePath, 'utf-8')
                );

                let attachmentSourcesForThisTestCase = [];
                let attachmentNamesForThisTestCase = [];

                // Create tc folder
                const testCaseDir = path.join(
                    resultDir,
                    `tc${attachmentSourcesArray.length + 1}`
                );

                if (!fs.existsSync(testCaseDir)) {
                    fs.mkdirSync(testCaseDir);
                }

                const testCaseAttachmentDir = testCaseDir;

                // Read attachments
                if (data.steps) {

                    data.steps.forEach(step => {

                        if (step.attachments) {

                            step.attachments.forEach(attachment => {

                                attachmentSourcesForThisTestCase.push(
                                    attachment.source
                                );

                                attachmentNamesForThisTestCase.push(
                                    attachment.name
                                );

                            });

                        }

                    });

                }

                // Save JSON
                const processedJsonPath =
                    path.join(testCaseDir, file);

                fs.writeFileSync(
                    processedJsonPath,
                    JSON.stringify(data, null, 2),
                    'utf-8'
                );

                // Copy attachments
                attachmentSourcesForThisTestCase.forEach(
                    (attachmentSource) => {

                        const attachmentSourcePath =
                            path.join(reportContent, attachmentSource);

                        const attachmentDestPath =
                            path.join(
                                testCaseAttachmentDir,
                                path.basename(attachmentSource)
                            );

                        if (fs.existsSync(attachmentSourcePath)) {

                            fs.copyFileSync(
                                attachmentSourcePath,
                                attachmentDestPath
                            );

                        }

                    }
                );

                attachmentSourcesArray.push(
                    attachmentSourcesForThisTestCase
                );

            }

        }

    } catch (error) {

        console.error('Error:', error);

    }

    // Generate Allure reports
    for (let i = 1; i <= attachmentSourcesArray.length; i++) {

        execSync(
            `npx allure generate Results/tc${i} --clean --single-file`,
            { stdio: 'inherit' }
        );

        const allureReportPath =
            path.join(process.cwd(), 'allure-report');

        const tcReportPath =
            path.join(process.cwd(), `Results/tc${i}`);

        const reportHtml = fs.readFileSync(
            `${allureReportPath}/index.html`,
            'utf-8'
        );

        const files = fs.readdirSync(tcReportPath);

        let testCaseNames = [];

        // Read testcase names
        for (const file of files) {

            if (file.endsWith('.json')) {

                const filePath =
                    path.join(tcReportPath, file);

                const data = JSON.parse(
                    fs.readFileSync(filePath, 'utf8')
                );

                if (data.name) {
                    testCaseNames.push(data.name);
                }

            }

        }

        // Create reports
        if (testCaseNames.length > 0) {

            testCaseNames.forEach(testCaseName => {

                let reportName = testCaseName;

                // Sanitize report name
                sanitizedReportName =
                    reportName.replace(
                        /[^a-zA-Z0-9_-]/g,
                        '_'
                    );

                // Date time
                const date = new Date();

                const year = date.getFullYear();

                const month = String(
                    date.getMonth() + 1
                ).padStart(2, '0');

                const day = String(
                    date.getDate()
                ).padStart(2, '0');

                const hours = String(
                    date.getHours()
                ).padStart(2, '0');

                const minutes = String(
                    date.getMinutes()
                ).padStart(2, '0');

                const seconds = String(
                    date.getSeconds()
                ).padStart(2, '0');

                dateandtime =
                    `_${hours}_${minutes}_${seconds}_${day}_${month}_${year}`;

                // Write report
                fs.writeFileSync(
                    `./Reports/${sanitizedReportName}${dateandtime}.html`,
                    reportHtml
                );

            });

        }

    }

    // Generate DOCX
    await generateDocs();
}

module.exports = runPlaywrightAndGenerateAllureReport;
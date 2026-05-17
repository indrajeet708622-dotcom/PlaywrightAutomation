const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, ImageRun } = require('docx');

let sanitizedReportName;
let dateandtime;

// Method to generate reports
async function generateDocs() {

    const resultDir = path.join(process.cwd(), 'Results/');
    let screenshotIndex = 1;

    // Get list of directories
    const directories = fs.readdirSync(resultDir)
        .filter(item =>
            fs.statSync(path.join(resultDir, item)).isDirectory()
        );

    // Loop through each test case folder
    for (let j = 0; j < directories.length; j++) {

        // Wait for 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        const reportContent = path.join(resultDir, directories[j]);
        const files = fs.readdirSync(reportContent);

        let testCaseNames = [];
        let attachmentNamesForThisTestCase = [];

        // Read JSON files
        for (const file of files) {

            if (file.endsWith('.json')) {

                const filePath = path.join(reportContent, file);

                const data = JSON.parse(
                    fs.readFileSync(filePath, 'utf8')
                );

                // Store test case names
                if (data.name) {
                    testCaseNames.push(data.name);
                }

                // Store attachment names
                if (data.steps) {

                    data.steps.forEach(step => {

                        if (step.attachments) {

                            step.attachments.forEach(attachment => {
                                attachmentNamesForThisTestCase.push(
                                    attachment.name
                                );
                            });

                        }

                    });

                }

            }

        }

        // Generate sanitized report name
        if (testCaseNames.length > 0) {

            testCaseNames.forEach(testCaseName => {

                sanitizedReportName =
                    testCaseName.replace(/[^a-zA-Z0-9_-]/g, '_');

                const date = new Date();

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');

                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');
                const seconds = String(date.getSeconds()).padStart(2, '0');

                dateandtime =
                    `_${hours}_${minutes}_${seconds}_${day}_${month}_${year}`;
            });

        }

        const allureResultsFolder =
            path.join(resultDir, directories[j]);

        const doc = new Document({
            creator: "Playwright Test Automation",
            title: "Test Report - Screenshots",
            subject: "Screenshots from Playwright tests",
            sections: []
        });

        // Check folder exists
        if (fs.existsSync(allureResultsFolder)) {

            const imageFiles = fs.readdirSync(allureResultsFolder)
                .filter(file => file.endsWith('.png'))
                .map(file => {

                    const filePath =
                        path.join(allureResultsFolder, file);

                    const stats = fs.statSync(filePath);

                    return {
                        file,
                        filePath,
                        ctime: stats.birthtime
                    };

                });

            // Sort by creation time
            imageFiles.sort((a, b) => a.ctime - b.ctime);

            if (imageFiles.length > 0) {

                imageFiles.forEach((file) => {

                    const screenshotPath = file.filePath;

                    const imageBuffer =
                        fs.readFileSync(screenshotPath);

                    const screenshotName =
                        attachmentNamesForThisTestCase[screenshotIndex - 1]
                        || `Screenshot ${screenshotIndex}`;

                    doc.addSection({
                        children: [
                            new Paragraph({
                                text: `Screenshot ${screenshotIndex}: ${screenshotName}`,
                            }),
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: imageBuffer,
                                        transformation: {
                                            width: 600,
                                            height: 400
                                        }
                                    })
                                ]
                            })
                        ]
                    });

                    screenshotIndex++;

                });

            }

        }

        // Create Docs folder if not exists
        const outputDir = path.join(process.cwd(), 'Docs');

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        // Generate DOCX buffer
        const buffer = await Packer.toBuffer(doc);

        const filePath = path.join(
            outputDir,
            `${sanitizedReportName}${dateandtime}.docx`
        );

        fs.writeFileSync(filePath, buffer);

        screenshotIndex = 1;
    }
}

// Export function
module.exports = { generateDocs };
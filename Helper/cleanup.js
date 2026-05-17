const fs = require('fs');
const path = require('path');

// Function to clean the Allure results directory
function cleanAllureResults() {

    const resultsDir = './allure-results';

    // Check if directory exists
    if (fs.existsSync(resultsDir)) {

        // Get all files and subdirectories
        const files = fs.readdirSync(resultsDir);

        // Iterate through files
        files.forEach(file => {

            // Full file path
            const filePath = path.join(resultsDir, file);

            // Check if it is NOT a directory
            if (!fs.statSync(filePath).isDirectory()) {

                // Delete file
                fs.unlinkSync(filePath);

                console.log(`Deleted file: ${filePath}`);
            }
        });

        console.log("Allure results cleaned successfully.");

    } else {

        console.log(
            `Allure results directory '${resultsDir}' does not exist.`
        );
    }
}

// Export function
module.exports = cleanAllureResults;
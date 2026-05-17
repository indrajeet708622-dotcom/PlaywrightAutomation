// @ts-check
const { defineConfig, devices } =require('@playwright/test');
const {execSync}=require('child_process');
const rimraf=require('rimraf');



//function to delete a directory

/**
 * @param {String} dir
 */ 


const deleteDir=(dir) =>{

  rimraf.sync(dir);
  console.log(`Deleted Directory Before Execution: ${dir}`);
};


//Delete the test-results directory before running tests
const resultDir='./test-results';
deleteDir(resultDir);

const resultDir1='./Results';
deleteDir(resultDir1);

const resultDir2='./playwright-report';
deleteDir(resultDir2);

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  timeout:100 * 60 * 1000,
  expect:{
           timeout:10*1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */

reporter: [
  ['html'],
  ['allure-playwright', { outputFolder: 'allure-results' }]
],
  // reporter: process.env.RP_SWITCH=="true" ? [
  //  ['html'],
  //  ['list'],
  //  ['line'],
  //  ['allure-playwright'],
  //  ['@']
  // ],
  globalSetup: './Helper/cleanup.js',
  globalTeardown: './Helper/report.js',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */




  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    launchOptions: {
        args:["--start-maximized"]
    },
  
    httpCredentials:{
              
      username:'testuser',
      password:'Password1'

    },
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout:15*6000,
    screenshot :'only-on-failure',
    video:'off',
    headless:false
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // ,

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


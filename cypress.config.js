import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5051/api", 
    supportFile: false,
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
  },
});

// setupNodeEvents(on, config) {
      // Custom Tasks (like DB seeding, resetting test data):
// },
// Reset your DB before each test
// Generate test tokens
// Log results or seed data

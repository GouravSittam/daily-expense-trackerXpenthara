#!/usr/bin/env node

/**
 * Pre-deployment verification script
 * Checks if all necessary files and configurations are in place
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
};

console.log("\n" + "=".repeat(60));
console.log("🚀 Pre-Deployment Verification for Vercel");
console.log("=".repeat(60) + "\n");

let hasErrors = false;
let hasWarnings = false;

// Check required files
const requiredFiles = [
  "server.js",
  "vercel.json",
  "api/index.js",
  "package.json",
  "config/database.js",
];

console.log("📁 Checking required files...\n");
requiredFiles.forEach((file) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    log.success(`Found: ${file}`);
  } else {
    log.error(`Missing: ${file}`);
    hasErrors = true;
  }
});

// Check vercel.json configuration
console.log("\n⚙️  Checking vercel.json configuration...\n");
try {
  const vercelConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "vercel.json"), "utf8")
  );

  if (vercelConfig.version === 2) {
    log.success("Vercel version: 2");
  } else {
    log.error("Vercel version should be 2");
    hasErrors = true;
  }

  if (vercelConfig.builds && vercelConfig.builds[0].src === "api/index.js") {
    log.success("Build source: api/index.js");
  } else {
    log.error("Build source should be api/index.js");
    hasErrors = true;
  }

  if (vercelConfig.routes && vercelConfig.routes[0].dest === "api/index.js") {
    log.success("Routes configured correctly");
  } else {
    log.error("Routes should point to api/index.js");
    hasErrors = true;
  }
} catch (error) {
  log.error(`Error reading vercel.json: ${error.message}`);
  hasErrors = true;
}

// Check .env.example
console.log("\n🔐 Checking environment variables...\n");
const envExamplePath = path.join(__dirname, ".env.example");
if (fs.existsSync(envExamplePath)) {
  log.success("Found .env.example");
  const envContent = fs.readFileSync(envExamplePath, "utf8");

  const requiredEnvVars = [
    "MONGODB_URI",
    "JWT_SECRET",
    "CLIENT_URL",
    "NODE_ENV",
  ];
  requiredEnvVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      log.success(`${varName} defined in .env.example`);
    } else {
      log.warning(`${varName} not found in .env.example`);
      hasWarnings = true;
    }
  });
} else {
  log.warning(".env.example not found");
  hasWarnings = true;
}

// Check package.json
console.log("\n📦 Checking package.json...\n");
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
  );

  if (packageJson.type === "module") {
    log.success("Module type: ES6 (module)");
  } else {
    log.warning('Consider setting "type": "module" in package.json');
    hasWarnings = true;
  }

  const requiredDeps = [
    "express",
    "mongoose",
    "cors",
    "dotenv",
    "jsonwebtoken",
    "bcryptjs",
  ];
  requiredDeps.forEach((dep) => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      log.success(`Dependency: ${dep}`);
    } else {
      log.error(`Missing dependency: ${dep}`);
      hasErrors = true;
    }
  });
} catch (error) {
  log.error(`Error reading package.json: ${error.message}`);
  hasErrors = true;
}

// Check server.js for export
console.log("\n📤 Checking server.js export...\n");
try {
  const serverContent = fs.readFileSync(
    path.join(__dirname, "server.js"),
    "utf8"
  );

  if (serverContent.includes("export default app")) {
    log.success("Express app is exported");
  } else {
    log.error("server.js should export the Express app: export default app;");
    hasErrors = true;
  }

  if (serverContent.includes("connectDB()")) {
    log.success("Database connection is called");
  } else {
    log.warning("Database connection might not be initialized");
    hasWarnings = true;
  }
} catch (error) {
  log.error(`Error reading server.js: ${error.message}`);
  hasErrors = true;
}

// Summary
console.log("\n" + "=".repeat(60));
console.log("📊 Verification Summary");
console.log("=".repeat(60) + "\n");

if (!hasErrors && !hasWarnings) {
  log.success("All checks passed! Ready for deployment. 🎉");
  console.log("\n📝 Next steps:");
  console.log("   1. Commit and push your changes to GitHub");
  console.log("   2. Set environment variables in Vercel dashboard");
  console.log('   3. Configure root directory to "backend" in Vercel');
  console.log("   4. Deploy!");
} else if (hasErrors) {
  log.error("Found errors that need to be fixed before deployment.");
  console.log("\n📖 Please check the errors above and fix them.");
  process.exit(1);
} else if (hasWarnings) {
  log.warning("Found warnings. Deployment may still work, but please review.");
  console.log("\n📖 Please check the warnings above.");
}

console.log("\n" + "=".repeat(60) + "\n");

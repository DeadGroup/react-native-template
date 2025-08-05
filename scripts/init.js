#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Configuration
const CONFIG = {
  projectName: path.basename(process.cwd()),
  get packageName() { return `com.${this.projectName.toLowerCase()}`; },
  get oldPackageName() { return `com.deadgroup.${this.projectName.toLowerCase()}`; },
  oldIOSName: "Template",
  projectRoot: process.cwd(),
};

// Utility functions
const createPackagePath = (packageName) => path.join(
  CONFIG.projectRoot,
  "android", "app", "src", "main", "java",
  ...packageName.split(".")
);

const replaceInFile = (filePath, replacements) => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, "utf8");
  let hasChanges = false;
  
  replacements.forEach(({ from, to }) => {
    const regex = new RegExp(from, "g");
    if (regex.test(content)) {
      content = content.replace(regex, to);
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    fs.writeFileSync(filePath, content);
    console.log(`🔄 Updated: ${filePath}`);
  }
};

const safeRename = (oldPath, newPath, description) => {
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ ${description}: ${path.basename(oldPath)} -> ${path.basename(newPath)}`);
    return true;
  }
  return false;
};

// Android operations
const processAndroidFiles = () => {
  console.log("\n📱 Processing Android files...");
  
  const oldPackagePath = createPackagePath(CONFIG.oldPackageName);
  const newPackagePath = createPackagePath(CONFIG.packageName);
  
  // Create new package directory
  fs.mkdirSync(newPackagePath, { recursive: true });
  
  // Move Kotlin files
  const kotlinFiles = ["MainActivity.kt", "MainApplication.kt"];
  kotlinFiles.forEach(fileName => {
    const oldPath = path.join(oldPackagePath, fileName);
    const newPath = path.join(newPackagePath, fileName);
    safeRename(oldPath, newPath, `Moved ${fileName}`);
  });
  
  // Clean up old package directory
  const oldRootPath = path.join(oldPackagePath);
  if (fs.existsSync(oldRootPath)) {
    fs.rmSync(oldRootPath, { recursive: true, force: true });
    console.log(`🗑️  Removed old package directory`);
  }
};

// iOS operations  
const processIOSFiles = () => {
  console.log("\n🍎 Processing iOS files...");
  
  const iosPath = path.join(CONFIG.projectRoot, "ios");
  if (!fs.existsSync(iosPath)) {
    console.log("⚠️  iOS directory not found, skipping...");
    return;
  }
  
  const paths = {
    oldProject: path.join(iosPath, CONFIG.oldIOSName),
    newProject: path.join(iosPath, CONFIG.projectName),
    oldXcodeproj: path.join(iosPath, `${CONFIG.oldIOSName}.xcodeproj`),
    newXcodeproj: path.join(iosPath, `${CONFIG.projectName}.xcodeproj`),
    oldWorkspace: path.join(iosPath, `${CONFIG.oldIOSName}.xcworkspace`),
    newWorkspace: path.join(iosPath, `${CONFIG.projectName}.xcworkspace`),
    oldScheme: path.join(iosPath, `${CONFIG.oldIOSName}.xcodeproj/xcshareddata/xcschemes/${CONFIG.oldIOSName}.xcscheme`),
    newScheme: path.join(iosPath, `${CONFIG.oldIOSName}.xcodeproj/xcshareddata/xcschemes/${CONFIG.projectName}.xcscheme`),
  };
  
  // Rename scheme first (before xcodeproj rename)
  safeRename(paths.oldScheme, paths.newScheme, "Renamed Xcode scheme");
  
  // Rename directories and files
  safeRename(paths.oldProject, paths.newProject, "Renamed iOS project directory");
  safeRename(paths.oldXcodeproj, paths.newXcodeproj, "Renamed Xcode project");
  safeRename(paths.oldWorkspace, paths.newWorkspace, "Renamed Xcode workspace");
};

// Configuration file updates
const updateConfigurationFiles = () => {
  console.log("\n⚙️  Updating configuration files...");
  
  const newPackagePath = createPackagePath(CONFIG.packageName);
  
  const fileUpdates = [
    // Cross-platform
    {
      path: "app.json",
      description: "App configuration",
      replacements: [
        { from: '"name":\\s*".*?"', to: `"name": "${CONFIG.projectName}"` },
        { from: '"displayName":\\s*".*?"', to: `"displayName": "${CONFIG.projectName}"` },
      ]
    },
    
    // Android
    {
      path: "android/app/build.gradle",
      description: "Android build config",
      replacements: [
        { from: 'namespace\\s+".*?"', to: `namespace "${CONFIG.packageName}"` },
        { from: 'applicationId\\s+".*?"', to: `applicationId "${CONFIG.packageName}"` },
      ]
    },
    {
      path: `${newPackagePath}/MainActivity.kt`,
      description: "MainActivity package",
      replacements: [
        { from: `package ${CONFIG.oldPackageName}`, to: `package ${CONFIG.packageName}` }
      ]
    },
    {
      path: `${newPackagePath}/MainApplication.kt`,
      description: "MainApplication package", 
      replacements: [
        { from: `package ${CONFIG.oldPackageName}`, to: `package ${CONFIG.packageName}` }
      ]
    },
    
    // iOS
    {
      path: `ios/${CONFIG.projectName}.xcodeproj/project.pbxproj`,
      description: "Xcode project config",
      replacements: [
        { from: "Template", to: CONFIG.projectName },
        { from: "PRODUCT_BUNDLE_IDENTIFIER = .*?;", to: `PRODUCT_BUNDLE_IDENTIFIER = ${CONFIG.packageName};` },
      ]
    },
    {
      path: `ios/${CONFIG.projectName}/Info.plist`,
      description: "iOS Info.plist",
      replacements: [
        { from: "<string>Template</string>", to: `<string>${CONFIG.projectName}</string>` },
      ]
    },
    {
      path: `ios/${CONFIG.projectName}/AppDelegate.swift`,
      description: "iOS AppDelegate",
      replacements: [
        { from: 'withModuleName: "Template"', to: `withModuleName: "${CONFIG.projectName}"` },
      ]
    },
    {
      path: "ios/Podfile",
      description: "CocoaPods config",
      replacements: [
        { from: "target 'Template'", to: `target '${CONFIG.projectName}'` },
      ]
    },
    {
      path: `ios/${CONFIG.projectName}.xcworkspace/contents.xcworkspacedata`,
      description: "Xcode workspace config",
      replacements: [
        { from: "Template\\.xcodeproj", to: `${CONFIG.projectName}.xcodeproj` },
      ]
    },
    {
      path: `ios/${CONFIG.projectName}.xcodeproj/xcshareddata/xcschemes/${CONFIG.projectName}.xcscheme`,
      description: "Xcode scheme config",
      replacements: [
        { from: "Template\\.app", to: `${CONFIG.projectName}.app` },
        { from: 'BlueprintName = "Template"', to: `BlueprintName = "${CONFIG.projectName}"` },
        { from: 'BuildableName = "TemplateTests\\.xctest"', to: `BuildableName = "${CONFIG.projectName}Tests.xctest"` },
        { from: 'BlueprintName = "TemplateTests"', to: `BlueprintName = "${CONFIG.projectName}Tests"` },
        { from: "Template\\.xcodeproj", to: `${CONFIG.projectName}.xcodeproj` },
      ]
    }
  ];
  
  fileUpdates.forEach(({ path: filePath, description, replacements }) => {
    replaceInFile(filePath, replacements);
  });
};

// Main execution
const main = () => {
  console.log(`🚀 Initializing React Native project: ${CONFIG.projectName}`);
  console.log(`📦 Package name: ${CONFIG.packageName}`);
  
  try {
    processAndroidFiles();
    processIOSFiles(); 
    updateConfigurationFiles();
    
    console.log(`\n🎉 Project initialization completed successfully!`);
    console.log(`📱 Your React Native app "${CONFIG.projectName}" is ready to go!`);
  } catch (error) {
    console.error(`\n❌ Error during initialization:`, error.message);
    process.exit(1);
  }
};

main();

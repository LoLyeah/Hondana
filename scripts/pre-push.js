#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function runGit(cmd) {
  try {
    return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
  } catch (e) {
    return '';
  }
}

// 1. Read stdin to get the refs being pushed
let stdin = '';
try {
  stdin = fs.readFileSync(0, 'utf-8');
} catch (e) {
  // Stdin read failure or empty stdin
  process.exit(0);
}

if (!stdin.trim()) {
  process.exit(0);
}

const lines = stdin.trim().split('\n');
const firstLine = lines[0];
const parts = firstLine.split(/\s+/);
if (parts.length < 4) {
  process.exit(0);
}

const [localRef, localSha, remoteRef, remoteSha] = parts;

// If it's a delete push (localSha is all zeros)
const isDeletePush = localSha === '0000000000000000000000000000000000000000' || /^0+$/.test(localSha);
if (isDeletePush) {
  process.exit(0);
}

// If local and remote match exactly (nothing to push)
if (localSha === remoteSha) {
  process.exit(0);
}

// 2. Check if the latest commit is already a version bump commit
const lastCommitMsg = runGit('git log -1 --format=%s');
if (
  lastCommitMsg.includes('[skip hook]') || 
  lastCommitMsg.includes('[skip ci]') ||
  lastCommitMsg.startsWith('chore: bump version to')
) {
  process.exit(0);
}

// 3. Determine commits being pushed
let commitsLog = '';
const isNewRemoteRef = remoteSha === '0000000000000000000000000000000000000000' || /^0+$/.test(remoteSha);

if (isNewRemoteRef) {
  // If remote branch is new, check commits between origin/main (or default branch) and HEAD
  const hasOriginMain = runGit('git rev-parse --verify origin/main');
  if (hasOriginMain) {
    commitsLog = runGit(`git log origin/main..${localSha} --format=%s`);
  } else {
    // If no origin/main, just check the last commit
    commitsLog = runGit(`git log -1 ${localSha} --format=%s`);
  }
} else {
  // Check commits between remote SHA and local SHA
  commitsLog = runGit(`git log ${remoteSha}..${localSha} --format=%s`);
}

// If we couldn't get any commit messages, default to checking the last commit
if (!commitsLog) {
  commitsLog = runGit(`git log -1 ${localSha} --format=%s`);
}

// 4. Decide if it is a major or minor change
const commits = commitsLog.split('\n').filter(Boolean);
let isMajor = false;

for (const msg of commits) {
  const normalized = msg.toLowerCase();
  if (
    normalized.includes('[major]') ||
    normalized.startsWith('major:') ||
    normalized.startsWith('breaking:') ||
    normalized.includes('breaking change') ||
    /^[a-z]+!(\([a-z-]+\))?:/.test(normalized) // Conventional commits breaking change syntax
  ) {
    isMajor = true;
    break;
  }
}

// 5. Read current version and bump it
const projectRoot = runGit('git rev-parse --show-toplevel') || process.cwd();
const packageJsonPath = path.join(projectRoot, 'package.json');
const versionJsonPath = path.join(projectRoot, 'data/version.json');

let currentVersion = '1.0.0';
let pkg = {};

if (fs.existsSync(packageJsonPath)) {
  try {
    pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (pkg.version && pkg.version.startsWith('1.')) {
      currentVersion = pkg.version;
    }
  } catch (e) {
    // ignore
  }
}

// Fallback to data/version.json if package.json didn't have it
if (fs.existsSync(versionJsonPath) && currentVersion === '1.0.0') {
  try {
    const vJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    if (vJson.version && vJson.version.startsWith('1.')) {
      currentVersion = vJson.version;
    }
  } catch (e) {
    // ignore
  }
}

const match = currentVersion.match(/^1\.(\d+)\.(\d+)$/);
let x = 0;
let y = 0;
if (match) {
  x = parseInt(match[1], 10);
  y = parseInt(match[2], 10);
}

const oldVersion = `1.${x}.${y}`;
if (isMajor) {
  x += 1;
  y = 0;
} else {
  y += 1;
}
const newVersion = `1.${x}.${y}`;

console.log(`[Version Hook] Detecting ${isMajor ? 'MAJOR' : 'MINOR'} change in push.`);
console.log(`[Version Hook] Bumping version: ${oldVersion} -> ${newVersion}`);

// 6. Update files
pkg.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');

const versionData = {
  version: newVersion,
  developedBy: 'LoLyeah'
};
fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');

// 7. Commit changes and push
try {
  const remoteName = process.argv[2] || 'origin';
  const branchName = runGit('git rev-parse --abbrev-ref HEAD') || 'main';
  
  execSync('git add package.json data/version.json', { stdio: 'inherit' });
  execSync(`git commit -m "chore: bump version to ${newVersion} [skip hook]"`, { stdio: 'inherit' });
  
  console.log(`[Version Hook] Version commit created. Pushing to ${remoteName}/${branchName}...`);
  execSync(`git push ${remoteName} ${branchName} --no-verify`, { stdio: 'inherit' });
  
  // Abort the original push since we replaced it with the new push
  process.exit(1);
} catch (e) {
  console.error('[Version Hook] Error during version bump commit or push:', e.message);
  process.exit(1);
}

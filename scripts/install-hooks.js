const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const gitDir = path.join(projectRoot, '.git');
const hooksDir = path.join(gitDir, 'hooks');
const hookTarget = path.join(hooksDir, 'pre-push');
const hookSource = path.join(projectRoot, 'scripts', 'pre-push.js');

if (!fs.existsSync(gitDir)) {
  console.error('[Install Hooks] Error: .git directory not found. Are you in a git repository?');
  process.exit(1);
}

if (!fs.existsSync(hooksDir)) {
  fs.mkdirSync(hooksDir, { recursive: true });
}

try {
  // Read from scripts/pre-push.js and write to .git/hooks/pre-push
  const content = fs.readFileSync(hookSource, 'utf8');
  fs.writeFileSync(hookTarget, content, { mode: 0o755 });
  
  // Explicitly set executable permission using chmodSync to be 100% sure on Mac/Linux
  try {
    fs.chmodSync(hookTarget, '755');
  } catch (chmodErr) {
    // If chmodSync fails, log it but continue
    console.warn('[Install Hooks] Warning: Failed to set executable permissions via chmodSync:', chmodErr.message);
  }
  
  console.log('[Install Hooks] Pre-push hook installed successfully at .git/hooks/pre-push');
} catch (err) {
  console.error('[Install Hooks] Failed to install pre-push hook:', err.message);
  process.exit(1);
}

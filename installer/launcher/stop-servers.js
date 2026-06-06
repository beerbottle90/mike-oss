// mike-oss × ArthurLegal — Server Stop Script
// Node.js ile çalıştırılır (hem launcher hem uninstaller tarafından)
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const pidFile = path.join(
    process.env.TEMP || process.env.TMP || "C:\\Temp",
    "mikeoss-pids.txt",
);

if (fs.existsSync(pidFile)) {
    const pids = fs.readFileSync(pidFile, "utf8").trim().split(/\r?\n/);
    for (const pid of pids) {
        const p = parseInt(pid, 10);
        if (!isNaN(p)) {
            try {
                execSync(`taskkill /PID ${p} /F /T`, { stdio: "ignore" });
            } catch (_) {}
        }
    }
    fs.unlinkSync(pidFile);
}

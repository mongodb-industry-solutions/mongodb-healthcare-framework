const { spawn } = require("child_process");

/**
 * Runs a Python script by filename (assumed to be in the `scripts` folder).
 *
 * @param {string} filename - The Python script filename (e.g., "hello.py").
 * @returns {Promise<string>} - Resolves with the script output or rejects with an error.
 */
function runPythonScript(filename) {
  return new Promise((resolve, reject) => {
    const scriptPath = `src/scripts/${filename}`;

    const python = spawn("python3", [scriptPath], {
      cwd: process.cwd(),
    });

    let dataToSend = "";
    let errorData = "";

    python.stdout.on("data", (data) => {
      dataToSend += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorData += data.toString();
    });

    python.on("close", (code) => {
      if (code === 0) {
        resolve(dataToSend.trim());
      } else {
        reject(`Python script failed with code ${code}: ${errorData.trim()}`);
      }
    });
  });
}

module.exports = runPythonScript;

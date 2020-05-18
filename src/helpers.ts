import path from "path";
import os from "os";

/**
 * returns the for the headless browsers temp directory where e.g. session data is stored
 */
export function getTempDir() {
    return path.resolve(os.tmpdir(), "_snapurl-temp");
}

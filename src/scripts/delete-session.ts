import {rmdirSync} from "fs";
import assert from "assert";
import {getTempDir} from "../helpers";

const path = getTempDir();

console.log(`Deleting temp dir ${path}`)
assert.ok(path.includes("_snapurl_temp")); //🤞

rmdirSync(path, {recursive: true});
console.log(`Deleted temp dir ${path}`);
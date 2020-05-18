import puppeteer from "puppeteer"
import http from "http";
import dotenv from "dotenv";
import "log-timestamp";
import {getTemplate} from "./templates";
import {getTempDir} from "./helpers";

dotenv.config();

const isInteractive = process.env["INTERACTIVE"] === "true";
const urlString = "URL";
const url = process.env[urlString];
if (!url) {
    console.error("Missing mandatory env variable", urlString);
    process.exit(-2);
} else {
    console.log("monitoring ", url);
}

const domSelector = process.env.DOM_SELECTOR || "body";

/**
 * @return base64 encoded screenshot
 */
const snapUrl = async (): Promise<string> => {
    const label = "creating screenshot";
    const t = Date.now();
    const userDataDir = getTempDir();
    const launchOptions: puppeteer.LaunchOptions = {
        userDataDir,
        headless: !isInteractive,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    };

    const browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    const w = parseInt(process.env.DISP_W as string, 10);
    const h = parseInt(process.env.DISP_H as string, 10);

    await page.setViewport({
        width: w || 2560,
        height: h || 1440
    });
    await page.setCacheEnabled(false);

    const viewOptions: puppeteer.DirectNavigationOptions = isInteractive ? {} : {
        timeout: 30e3
    };

    await page.goto(url, viewOptions);
    await page.waitFor(10e3);

    if (!isInteractive) {
        const element = await page.$(domSelector);
        let base64 = "";
        const scrOptions: puppeteer.Base64ScreenShotOptions = {
            encoding: "base64",
        }

        if (!element) {
            console.warn("Required ID not found in DOM");
            base64 = await page.screenshot(scrOptions);
        } else {
            base64 = await element.screenshot(scrOptions);
        }
        await browser.close();
        console.log(`${label} ${(Date.now() - t)}ms`);

        return base64;
    }

    return "";
};

(async () => {
    let screenshot: string = "";

    const requestListener = function (req: any, res: any): void {
        if (req.url === "/") {
            res.writeHead(200);
            return res.end(getTemplate(screenshot, isInteractive));
        }

        if (req.url === "/img") {
            res.writeHead(200);
            return res.end(screenshot);
        }

        res.writeHead(404);
        return res.end();

    }

    const server = http.createServer(requestListener);
    server.listen(process.env.PORT || 8080);

    screenshot = await snapUrl()
        .catch((e) => {
            console.error(e);
            process.exit(-1);
        });

    if (!isInteractive) {
        const sT = () => {
            setTimeout(async () => {
                try {
                    screenshot = await snapUrl()
                } catch (e) {
                    console.error(e)
                }
                sT();
            }, 60e3);
        };

        sT();
    }
})();
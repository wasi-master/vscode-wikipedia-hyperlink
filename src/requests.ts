import { URL } from "url";

const https = require('https');
const qs = require('querystring');

export interface RequestOptions {
    headers?: { [key: string]: string | number }
}

/**
 * Parse a request body based on known MIME types, based on the Content-Type
 * header. If unknown or undefined, will return the original request body.
 * @param {Object} opts - The request options.
 * @param {Object|string} body - The request body.
 * @returns {Object|string} A parsed request body for known MIME types, or the original request body.
 */
function parse(opts: RequestOptions = {}, body: Object | string) {
    if (opts.headers == null) {
        return body;
    }

    switch (opts.headers['Content-Type']) {
        case 'application/json': return JSON.stringify(body);
        case 'application/x-www-form-urlencoded': return qs.stringify(body);
        default: return body;
    }
}

/**
 * Make an asynchronous request to an HTTP or HTTPS address. Automatically
 * derives protocol from URL input, and content length from the request body.
 * @param {URL|string} url - The request URL.
 * @param {Object} opts - The request options.
 * @param {Object|string} body - The request body.
 * @returns {Promise} A promise to return either a response object, or an error.
 */
export function request(url: URL | string, opts: RequestOptions = {}, body: Object | string = ''): Promise<any>  {
    const data = parse(opts, body);

    if (opts.headers == null) {
        opts.headers = {};
    }
    return new Promise((resolve, reject) => {
        if (!(url instanceof URL)) {
            url = new URL(url);
        }
        const tick = new Date().getTime();
        const request = https.request(url, opts, (response: any) => {
            const chunks: any[] = [];

            response.on('data', (chunk: any) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                try {
                    const { headers } = response;
                    const body = chunks.join('');
                    resolve({ headers, body });
                }
                catch (error) {
                    reject(error);
                }
            });

            response.on('error', (error: Error) => {
                reject(error);
            });
        });

        request.write(data);
        request.end();
    });
}

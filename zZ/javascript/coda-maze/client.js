
const request = require('superagent');

const isDebugMode = () => process.argv[2] === '-d';

/**
 * http request helper, if failed, will retry every 5 seconds, until succeed
 * 
 * @return: response if response is valid with no request errors
 */
async function getResponseFromHttpRequest(httpRequest, operationName, isValidRepsonse) {
    let response;

    const maxRetry = 10;
    let retryCount = 0;

    await httpRequest
        .retry(maxRetry, (error, res) => {
            response = res;

            if (!isValidRepsonse(res)) {

                ++retryCount;

                const responseSerialized = response ? JSON.stringify(response, null, 2) : 'empty response';

                const status =
                    (response && response.status) ||
                    (error && error.status) ||
                    500;

                if (status !== 503 || isDebugMode()) {
                    console.error(`Failed Operation ${operationName}, Error: "${error}", Status: ${status}, Response ${responseSerialized}`);
                }
            }

            return !isValidRepsonse(res);
        })
        .then(res => response = res)
        .catch(error => {
            if (retryCount > maxRetry) {
                console.log(`Failed Operation ${operationName}, Maximum Retries reached, Try Again later`);
            }
        });

    return response;
}

/**
 * create maze http request
 * 
 * @return: return metedata {id, height, width}, if status is 201
 */
async function getNewMazeInfo() {
    const httpRequest = request
        .post('https://maze.coda.io/maze')
        .set('accept', 'json');

    const operationName = 'Create Maze';
    const isValidRepsonse = response =>
        response &&
        response.status === 201 &&
        response.text;

    const response = await getResponseFromHttpRequest(
        httpRequest,
        operationName,
        isValidRepsonse
    );

    const data = JSON.parse(response.text);

    if (isDebugMode()) {
        console.debug(`Maze Created: ${JSON.stringify(data, null, 2)}`);
    }
    console.debug(`Solving maze with id: ${data.id}`);

    return data;
}

/**
 * check point validity
 * 
 * @return: return true if point in maze is valid
 */
async function checkPointValidity(id, x, y) {
    const pointStatus = {
        200: 'valid',
        403: 'invalid'
    };

    const httpRequest = request
        .get(`https://maze.coda.io/maze/${id.trim()}/check?x=${x}&y=${y}`)
        .set('accept', 'json');

    const operationName = 'Check Point Validity';
    const isValidRepsonse = (response, error) => {
        return (
            response &&
            pointStatus[response.status]
        );
    }

    const response = await getResponseFromHttpRequest(
        httpRequest,
        operationName,
        isValidRepsonse
    );

    if (isDebugMode()) {
        console.debug(`Solving Point ${x} ${y} is ${response && pointStatus[response.status]}`);
    }

    return response && pointStatus[response.status] === 'valid';
}

/**
 * publish path result
 * 
 * @return: return 200 if path is a correct solution, otherwise return 422
 */
async function publishResult(path, data) {
    const resultStatus = {
        200: 'valid',
        422: 'invalid'
    };

    const httpRequest = request
        .post(`https://maze.coda.io/maze/${data.id.trim()}/solve`)
        .send(path)
        .set('accept', 'json');

    const operationName = 'Check Point Validity';
    const isValidRepsonse = (response, error) => {
        return (
            response &&
            resultStatus[response.status]
        );
    }

    const response = await getResponseFromHttpRequest(
        httpRequest,
        operationName,
        isValidRepsonse
    );

    if (response && response.status === 200) {
        console.log(`Ordered set of moves: ${JSON.stringify(path)}`);
    } else if (response && response.status === 422) {
        console.log(`No Valid Solution to Maze: ${JSON.stringify(data, null, 2)}`)
    } else {
        console.log(`Max Retries Failed, please check your internet connections, or contact the service provider`);
    }
}

exports.checkPointValidity = checkPointValidity;
exports.getNewMazeInfo = getNewMazeInfo;
exports.publishResult = publishResult;
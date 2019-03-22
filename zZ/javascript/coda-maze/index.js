
const client = require('./client');

/**
 * create maze
 * 
 * @return: return metedata {id, height, width}, if status is 201
 */
async function createMaze() {
    const response = await client.getNewMazeInfo();

    const data = JSON.parse(response.text);
    console.log(`Solving maze with id: ${JSON.stringify(data, null, 2)}`);

    return data;
}

async function trySolveMaze(data) {

    // constant
    const { id, width, height } = data;

    if (width <= 0 || height <= 0 || !id) {
        return null;
    }

    // inline helper
    const getPointFromHashCode = pointHashCode => {
        const coordinateStringList = pointHashCode.split(' ');
        const x = parseInt(coordinateStringList[0]);
        const y = parseInt(coordinateStringList[1]);

        return { x, y }
    }

    const getPointHashCode = (x, y) => `${x} ${y}`;

    const isValidPointInMaze = async (pointHashCode) => {
        const { x, y } = getPointFromHashCode(pointHashCode);

        if (x < 0 || x >= width || y < 0 || y >= height ||
            visited.has(pointHashCode)) {

            return false;
        }

        return await client.checkPointValidity(id, x, y);
    }

    const getQueueEntry = (pointHashCode, path) => {
        return {
            pointHashCode,
            path
        };
    }

    // bfs

    const visited = new Set();
    const queue = [];

    if (await isValidPointInMaze(getPointHashCode(0, 0))) {
        queue.push(getQueueEntry(getPointHashCode(0, 0), [{ x: 0, y: 0 }]));
    }

    while (queue.length) {
        const entry = queue.shift();
        const { x, y } = getPointFromHashCode(entry.pointHashCode);

        if (x === width - 1 && y === height - 1) {
            return entry.path;
        }

        visited.add(entry.pointHashCode);

        const neighbourPointHashCodeList = [[-1, 0], [1, 0], [0, -1], [0, 1]]
            .map(pointDelta => getPointHashCode(pointDelta[0] + x, pointDelta[1] + y));

        for (const neighbourPointHashCode of neighbourPointHashCodeList) {

            if (await isValidPointInMaze(neighbourPointHashCode)) {

                const path = Array.from(entry.path);
                path.push(getPointFromHashCode(neighbourPointHashCode));

                queue.push(getQueueEntry(neighbourPointHashCode, path));
            }
        }
    }

    return null;
}

async function solveMaze() {
    const data = await client.getNewMazeInfo();
    const path = await trySolveMaze(data);
    await client.publishResult(path, data);
}

solveMaze();
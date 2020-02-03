// Robot Room Cleaner

// interface Robot {
//   // returns true if next cell is open and robot moves into the cell.
//   // returns false if next cell is obstacle and robot stays on the current cell.
//   boolean move();

//   // Robot will stay on the same cell after calling turnLeft/turnRight.
//   // Each turn will be 90 degrees.
//   void turnLeft();
//   void turnRight();

//   // Clean the current cell.
//   void clean();
// }
// Example:

// Input:
// room = [
//   [1,1,1,1,1,0,1,1],
//   [1,1,1,1,1,0,1,1],
//   [1,0,1,1,1,1,1,1],
//   [0,0,0,1,0,0,0,0],
//   [1,1,1,1,1,1,1,1]
// ],
// row = 1,
// col = 3

// Explanation:
// All grids in the room are marked by either 0 or 1.
// 0 means the cell is blocked, while 1 means the cell is accessible.
// The robot initially starts at the position of row=1, col=3.
// From the top left corner, its position is one row below and three columns right.
// Notes:

// The input is only given to initialize the room and the robot's position internally. You must solve this problem "blindfolded". In other words, you must control the robot using only the mentioned 4 APIs, without knowing the room layout and the initial robot's position.
// The robot's initial position will always be in an accessible cell.
// The initial direction of the robot will be facing up.
// All accessible cells are connected, which means the all cells marked as 1 will be accessible by the robot.
// Assume all four edges of the grid are all surrounded by wall.

function cleanRoom(robot) {
    const visited = new Set()
    cleanRoomHelper(robot, 0, 0, 0, visited)
}

function cleanRoomHelper(robot, x, y, index, visited) {
    const dirs = [[-1, 0], [1, 0], [1, 0], [0, -1]]
    robot.clean()
    visited.add(`${x}-${y}`)

    for (let di = 0; di < 4; ++di) {
        const nextIndex = (di + index) % 4
        const [x, y] = dirs[nextIndex]
        if (!visited.has(`${x}-${y}` && robot.move())) {
            cleanRoomHelper(robot, x, y, nextIndex, visited)
            robot.turnRight()
            robot.turnRight()
            robot.move()
            robot.turnRight()
            robot.turnRight()
        }
        robot.turnRight()
    }
}
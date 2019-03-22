using System;
using System.Drawing;
using System.Collections.Generic;

/// <summary>
/// Command Center Class
/// The Singleton Class Command Center is responsible of parsing incoming commands,
/// inserting additional commands as needed using shortest path, executing commands,
/// and consuming Grid and Rover Information, and notify Grid and Rover to update their information.
/// </summary>

namespace RoverOnMars
{
    /// <summary>
    /// Enum of Directions of Rover isfacing
    /// </summary>
    public enum Direction
    {
        N,
        E,
        S,
        W
    }

    public class CommandCenter : ICommandCenter
    {
        private static CommandCenter commandCenter;

        private CommandCenter()
        {
        }

        /// <summary>
        /// get singleton of the commandcenter, create only if commandCenter is null
        /// </summary>
        /// <returns>
        /// the commandcenter singleton
        /// </returns>
        public static CommandCenter GetCommandCenter()
        {
            if (commandCenter != null)
            {
                return commandCenter;
            }

            commandCenter = new CommandCenter();
            return commandCenter;
        }

        /// <summary>
        /// Command Center Move Method to parse, insert if needed, and execute command stream
        /// </summary>
        /// <returns>
        /// returns whether rover could move successfully based on the commandstream
        /// </returns>
        /// <param name="roverId">
        /// rover with rover ID to move
        /// </param>
        /// <param name="commandstream">
        /// rover assigned command stream
        /// </param>
        /// <param name="grid">
        /// rover assigned grid
        /// </param>
        /// <param name="direction">
        /// orginal and keep-updated rover direction
        /// </param>
        /// <param name="position">
        /// orginal and keep-updated rover position
        /// </param>
        public bool Move(int roverId, string commandstream, Grid grid, ref Direction direction, ref Point position)
        {
            for (int i = 0; i < commandstream.Length; i++)
            {
                char command = commandstream[i];
                if (!isValidMove(roverId, command, grid, ref direction, ref position))
                {
                    Direction nextDirection = direction;
                    Point nextPosition = new Point(position.X, position.Y);

                    int nextIndex = getIndexOfNextValidCommand(roverId, i, commandstream, grid, ref nextDirection, ref nextPosition);
                    if (nextIndex == -1)
                    {
                        return false;
                    }

                    string commandStreamOfNextValidRoverState = getCommandStreamBetweenRoverState(grid, direction, position, nextDirection, nextPosition);
                    Move(roverId, commandStreamOfNextValidRoverState, grid, ref direction, ref position);

                    i = nextIndex;
                }
                else
                {
                    executeCommand(command, ref direction, ref position);
                }
            }

            return true;
        }

        /// <summary>
        /// helper method to get command stream with shortest path between two location and also directions
        /// </summary>
        /// <returns>
        /// returns command stream with shortest path between two location and also directions
        /// </returns>
        /// <param name="grid">
        /// rover assigned grid
        /// </param>
        /// <param name="fromDirection">
        /// rover source direction
        /// </param>
        /// <param name="fromPosition">
        /// rover source position
        /// </param>
        /// <param name="toDirection">
        /// rover destination direction
        /// </param>
        /// <param name="toPosition">
        /// rover destination position
        /// </param>
        public string getCommandStreamBetweenRoverState(Grid grid, Direction fromDirection, Point fromPosition, Direction toDirection, Point toPosition)
        {
            bool[,] visited = new bool[grid.Height, grid.Width];
            for (int y = 0; y < grid.Height; ++y)
            {
                for (int x = 0; x < grid.Width; ++x)
                {
                    if (grid.IsPositionOccupied(new Point(x, y)))
                    {
                        visited[y, x] = true;
                    }
                }
            }

            Queue<Tuple<Point, Direction, string>> queue = new Queue<Tuple<Point, Direction, string>>();
            queue.Enqueue(Tuple.Create(fromPosition, fromDirection, ""));


            while (queue.Count != 0)
            {
                var currTuple = queue.Dequeue();
                Point currPosition = currTuple.Item1;
                Direction currDirection = currTuple.Item2;
                string currCommandStream = currTuple.Item3;

                if (currPosition == toPosition)
                {
                    return currCommandStream + getCommandStreamBetweenDirections(currDirection, toDirection);
                }

                visited[currPosition.Y, currPosition.X] = true;

                Dictionary<Direction, int[]> directionToMoveDeltaMap = new Dictionary<Direction, int[]>();
                directionToMoveDeltaMap.Add(Direction.N, new int[] { 0, 1 });
                directionToMoveDeltaMap.Add(Direction.E, new int[] { 1, 0 });
                directionToMoveDeltaMap.Add(Direction.S, new int[] { 0, -1 });
                directionToMoveDeltaMap.Add(Direction.W, new int[] { -1, 0 });

                foreach (Direction nextDirection in directionToMoveDeltaMap.Keys)
                {
                    int[] moveDelta = directionToMoveDeltaMap[nextDirection];
                    int nextX = currPosition.X + moveDelta[0];
                    int nextY = currPosition.Y + moveDelta[1];

                    Point nextPosition = new Point(nextX, nextY);

                    if (grid.IsPositionInbound(nextPosition) && !visited[nextY, nextX])
                    {
                        string nextCommandStream = currCommandStream + getCommandStreamBetweenDirections(currDirection, nextDirection) + @"M";

                        queue.Enqueue(Tuple.Create(nextPosition, nextDirection, nextCommandStream));
                    }
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// helper method to get shortest command stream between two directions
        /// </summary>
        /// <returns>
        /// returns shortest command stream between two directions
        /// </returns>
        /// <param name="fromDirection">
        /// rover source direction
        /// </param>
        /// <param name="toDirection">
        /// rover destination direction
        /// </param>
        public string getCommandStreamBetweenDirections(Direction fromDirection, Direction toDirection)
        {
            int distance = (toDirection + 4 - fromDirection) % 4;
            if (distance <= 2)
            {
                return new String('R', Math.Abs(distance));
            }

            return new String('L', 4 - Math.Abs(distance));
        }

        /// <summary>
        /// determines current command corresponds to a valid move
        /// </summary>
        /// <returns>
        /// returns current command corresponds to a valid move
        /// </returns>
        /// <param name="roverId">
        /// rover ID assigned to current rover
        /// </param>
        /// <param name="command">
        /// current being processed single command
        /// </param>
        /// <param name="grid">
        /// rover assigned grid
        /// </param>
        /// <param name="direction">
        /// orginal and keep-updated rover direction, if <paramref name="shouldMofifyState"/> is true
        /// </param>
        /// <param name="position">
        /// orginal and keep-updated rover position, if <paramref name="shouldMofifyState"/> is true
        /// </param>
        /// <param name="shouldMofifyState">
        /// direction, and position will be updated if it is true, 
        /// they would not be updated, otherwise it is false
        /// </param>
        public bool isValidMove(int roverId, char command, Grid grid, ref Direction direction, ref Point position, bool shouldMofifyState = false)
        {
            Direction currDirection = direction;
            Point currPosition = position;

            executeCommand(command, ref currDirection, ref currPosition);

            if (shouldMofifyState)
            {
                direction = currDirection;
                position = currPosition;
            }

            if (grid.IsPositionOccupiedByOtherRovers(roverId, currPosition) || !grid.IsPositionInbound(currPosition))
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// execute a single command to update rover state
        /// </summary>
        /// <param name="command">
        /// current being processed single command
        /// </param>
        /// <param name="direction">
        /// orginal and keep-updated rover direction
        /// </param>
        /// <param name="position">
        /// orginal and keep-updated rover position
        /// </param>
        public void executeCommand(char command, ref Direction direction, ref Point position)
        {
            switch (command)
            {
                case 'L':
                    direction = (Direction)(((int)direction + 3) % 4);
                    break;
                case 'R':
                    direction = (Direction)(((int)direction + 1) % 4);
                    break;
                case 'M':
                    switch (direction)
                    {
                        case Direction.N:
                            position.Y++;
                            break;
                        case Direction.S:
                            position.Y--;
                            break;
                        case Direction.E:
                            position.X++;
                            break;
                        case Direction.W:
                            position.X--;
                            break;
                    }
                    break;
                default:
                    position.X = -1;
                    position.Y = -1;
                    break;
            }
        }

        /// <summary>
        /// helper method to get next index of command which accumaltes a valid rover state in grid
        /// </summary>
        /// <returns>
        /// returns the index of next command which accumaltes a valid rover state in grid
        /// </returns>
        /// <param name="roverId">
        /// rover id assigned to rover
        /// </param>
        /// <param name="index">
        /// starting index of the search
        /// </param>
        /// <param name="commandstream">
        /// command stream assigned to rover
        /// </param>
        /// <param name="grid">
        /// grid assigned to rover
        /// </param>
        /// <param name="direction">
        /// orginal and keep-updated rover direction
        /// </param>
        /// <param name="position">
        /// orginal and keep-updated rover position
        /// </param>
        public int getIndexOfNextValidCommand(int roverId, int index, string commandstream, Grid grid, ref Direction direction, ref Point position)
        {
            for (; index < commandstream.Length; ++index)
            {
                if (isValidMove(roverId, commandstream[index], grid, ref direction, ref position, true))
                {
                    return index;
                }
            }

            return -1;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Drawing;

/// <summary>
/// Grid Class
/// The Grid class would have basic information of the Grid.
/// It also has knowledge and notify Command Center that
/// whether each position in a grid is vacant or taken by a Rover with rover Id
/// </summary>

namespace RoverOnMars
{
    public class Grid
    {
        private readonly int width, height;
        private Dictionary<int, Point> roverPositionMap = new Dictionary<int, Point>();
        private HashSet<Point> roverOccupiedPositions = new HashSet<Point>();

        /// <summary>
        /// Constructor of a Grid using user input
        /// </summary>
        /// <returns>
        /// a Grid instance created by user input
        /// </returns>
        public Grid()
        {
            int x = 0, y = 0;
            string input = string.Empty;
            do
            {
                Console.Write("Enter Graph Upper Right Coordinate: ");
                input = Console.ReadLine().Trim();

            } while (!Program.ProcessInputForGrid(input, ref x, ref y));

            width = x + 1;
            height = y + 1;
        }

        /// <summary>
        /// Constructor of a Grid using pre-defined upper right corner coordinate
        /// </summary>
        /// <returns>
        /// a Grid instance created by pre-defined upper right corner coordinate
        /// </returns>
        /// <param name="upperRight">
        /// right x coordinate
        /// </param>
        /// <param name="upperTop">
        /// uppper y coordinate
        /// </param>
        public Grid(int upperRight, int upperTop)
        {
            width = upperRight + 1;
            height = upperTop + 1;
        }

        /// <summary>
        /// Notigy Rover to Change Rover State, and Update Grid Information
        /// </summary>
        /// <param name="roverId">
        /// rover with rover ID needs to be updated
        /// </param>
        /// <param name="direction">
        /// rover final direction
        /// </param>
        /// <param name="position">
        /// rover final position
        /// </param>
        public void ChangeRoverState(int roverId, Direction direction, Point position)
        {
            if (roverPositionMap.ContainsKey(roverId))
            {
                roverOccupiedPositions.Remove(roverPositionMap[roverId]);
                roverPositionMap[roverId] = position;
            }
            else
            {
                roverPositionMap.Add(roverId, position);
            }

            Rover.getRover(roverId).ChangeState(direction, position);
            roverOccupiedPositions.Add(position);
        }

        /// <summary>
        /// Determines if the grid position is occupied by any rover
        /// </summary>
        /// <returns>
        /// returns whether the grid position is occupied by any rover
        /// </returns>
        /// <param name="position">
        /// grid position to check
        /// </param>
        public bool IsPositionOccupied(Point position)
        {
            return roverOccupiedPositions.Contains(position);
        }

        /// <summary>
        /// Determines if the grid position is occupied by other rover
        /// </summary>
        /// <returns>
        /// returns whether the grid position is occupied by other rover
        /// </returns>
        /// <param name="roverId">
        /// rover with rover ID wants to check
        /// </param>
        /// <param name="position">
        /// grid position to check
        /// </param>
        public bool IsPositionOccupiedByOtherRovers(int roverId, Point position)
        {
            if (roverPositionMap.ContainsKey(roverId) && roverPositionMap[roverId].Equals(position))
            {
                return false;
            }

            return IsPositionOccupied(position);
        }

        /// <summary>
        /// Determines if the rover position is out of bound regards to current grid
        /// </summary>
        /// <returns>
        /// returns whether the grid position is out of bound regards to current grid
        /// </returns>
        /// <param name="position">
        /// rover position to check
        /// </param>
        public bool IsPositionInbound(Point position)
        {
            return 0 <= position.X && position.X < width && 0 <= position.Y && position.Y < height;
        }

        public int Width
        {
            get
            {
                return width;
            }
        }

        public int Height
        {
            get
            {
                return height;
            }
        }
    }
}

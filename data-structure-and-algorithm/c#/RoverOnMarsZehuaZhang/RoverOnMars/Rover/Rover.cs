using System;
using System.Collections.Generic;
using System.Drawing;

/// <summary>
/// Rover Class
/// The Rover class would have basic information of Rover status, like position, direction.
/// And it would also have basic move method, but how to move is the job of the Command Center.
/// On initialization, it would be assigned to a grid, and a command center.
/// It also has a class property of a list rovers, so we could easily fetch the Rover with a rover Id
/// </summary>

namespace RoverOnMars
{
    public class Rover : IRover
    {
        private Point position;
        private int roverId;
        private Direction direction;
        private ICommandCenter commandCenter;
        private Grid grid;

        /// <summary>
        /// all deployed rovers with rover ID
        /// </summary>
        private static Dictionary<int, Rover> rovers = new Dictionary<int, Rover>();

        /// <summary>
        /// get a deployed rover
        /// </summary>
        /// <returns>
        /// a deployed rover if any
        /// </returns>
        /// <param name="roverId">
        /// deployed rover ID
        /// </param>
        public static Rover getRover(int roverId)
        {
            return rovers.ContainsKey(roverId) ? rovers[roverId] : null;
        }

        /// <summary>
        /// Constructor of a Rover Instance
        /// </summary>
        /// <returns>
        /// a Rover Instance
        /// </returns>
        /// <param name="roverId">
        /// rover ID
        /// </param>
        /// <param name="x">
        /// original deployed position x
        /// </param>
        /// <param name="y">
        /// original deployed position y
        /// </param>
        /// <param name="direction">
        /// original deployed direction
        /// </param>
        /// <param name="commandCenter">
        /// assigned command center
        /// </param>
        /// <param name="grid">
        /// assigned grid
        /// </param>
        public Rover(int roverId, int x, int y, char direction, ICommandCenter commandCenter, Grid grid)
        {
            position.X = x;
            position.Y = y;
            this.direction = (Direction)Enum.Parse(typeof(Direction), direction.ToString());

            this.commandCenter = commandCenter;
            this.grid = grid;
            this.roverId = roverId;

            if (rovers.ContainsKey(roverId))
            {
                rovers[roverId] = this;
            }
            else
            {
                rovers.Add(roverId, this);
            }
        }

        /// <summary>
        /// Rover move method
        /// </summary>
        /// <returns>
        /// whether the move is valid or not
        /// </returns>
        /// <param name="commandStream">
        /// command stream sent to the rover
        /// </param>
        public bool Move(string commandStream)
        {
            bool moveStatus = commandCenter.Move(roverId, commandStream, grid, ref direction, ref position);
            grid.ChangeRoverState(roverId, direction, position);

            return moveStatus;
        }

        /// <summary>
        /// Rover move method
        /// </summary>
        /// <param name="position">
        /// position wanted to change
        /// </param>
        /// <param name="direction">
        /// direction wanted to change
        /// </param>
        public void ChangeState(Direction direction, Point position)
        {
            this.direction = direction;
            this.position = position;
        }

        public int RoverId
        {
            get
            {
                return roverId;
            }
        }

        public int X
        {
            get
            {
                return position.X;
            }
        }
        public int Y
        {
            get
            {
                return position.Y;
            }
        }
        public char Orientation
        {
            get
            {
                return (char)direction.ToString()[0];
            }
        }

        public string State
        {
            get
            {
                return X.ToString() + " " + Y.ToString() + " " + Orientation.ToString();
            }
        }

        public Grid Grid
        {
            get
            {
                return grid;
            }
            set
            {
                grid = value;
            }
        }
    }
}
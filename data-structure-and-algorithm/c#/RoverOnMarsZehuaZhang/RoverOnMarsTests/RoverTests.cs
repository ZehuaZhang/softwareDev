using NUnit.Framework;
using RoverOnMars;
using System;
using System.Collections.Generic;
using System.Drawing;

namespace RoverOnMarsTests
{
    [TestFixture]
    public class RoverTests
    {
        private static CommandCenter commandCenter = CommandCenter.GetCommandCenter();
        private static Grid grid = new Grid(5, 5);
        private static List<Rover> rovers = CreateRovers();
        private static List<char> orientationList = new List<char>();
        private static List<Point> pointList = new List<Point>();

        [TestCase(0, 1, 2, Direction.N, 5, 5)]
        [TestCase(1, 2, 2, Direction.E, 5, 5)]
        [TestCase(2, 3, 5, Direction.S, 5, 5)]
        [TestCase(3, 5, 1, Direction.W, 5, 5)]
        public void RoverInstance_ShouldReturn_CorrectProperties_When_Creating(int roverId, int x, int y, Direction direction, int gridUpperX, int gridUpperY)
        {
            Grid grid = new Grid(gridUpperX, gridUpperY);
            Rover rover = new Rover(roverId, x, y, direction.ToString()[0], commandCenter, grid);

            Assert.AreEqual(rover.X, x);
            Assert.AreEqual(rover.Y, y);
            Assert.AreEqual(rover.Orientation, direction.ToString()[0]);
            Assert.AreEqual(rover.State, String.Format("{0} {1} {2}", x, y, direction.ToString()));
            Assert.AreEqual(rover.Grid, grid);

            grid = new Grid(10, 20);
            rover.Grid = grid;
            Assert.AreEqual(rover.Grid, grid);
        }

        [TestCase(Direction.N, 1, 2)]
        [TestCase(Direction.E, 2, 3)]
        [TestCase(Direction.S, 3, 4)]
        [TestCase(Direction.W, 4, 5)]
        public void ChangeState_ShouldChange_RoverStateAccordingly(Direction direction, int x, int y)
        {
            Rover rover = new Rover(1, 0, 1, Direction.N.ToString()[0], commandCenter, new Grid(5, 5));

            Point position = new Point(x, y);

            rover.ChangeState(direction, position);

            Assert.AreEqual(rover.X, position.X);
            Assert.AreEqual(rover.Y, position.Y);
            Assert.AreEqual(rover.Orientation, direction.ToString()[0]);
        }

        [Test, Sequential, NonParallelizable]
        [TestCase(0, "LMLMLMLMM", 1, 2, Direction.N, 1, 3, Direction.N, true)]
        [TestCase(1, "MMRMMRMRRM", 3, 3, Direction.E, 5, 1, Direction.E, false)]
        [TestCase(2, "LMLMLMLMMM", 1, 2, Direction.N, 1, 4, Direction.N, false)]
        public void Move_ShouldChange_RoverStateAccordingly_BeforeRoverDeployedSequentially(
            int roverId,
            string commandStream,
            int X,
            int Y,
            Direction direction,
            int exprectedX,
            int expectedY,
            Direction expectedDirection,
            bool shouldReassign)
        {
            if (shouldReassign)
            {
                ReassignRoverGrid();
            }

            Rover rover = Rover.getRover(roverId);
            rover.ChangeState(direction, new Point(X, Y));

            bool moveStatus = rover.Move(commandStream);

            Assert.AreEqual(rover.Orientation, expectedDirection.ToString()[0]);
            Assert.AreEqual(rover.X, exprectedX);
            Assert.AreEqual(rover.Y, expectedY);

            Assert.AreEqual(moveStatus, true);

        }

        [Test, Sequential, NonParallelizable]
        [TestCase(0, "RML", 2, 2, Direction.N)]
        [TestCase(1, "LRMM", 2, 1, Direction.S)]
        [TestCase(2, "LLM", 2, 4, Direction.W)]
        [TestCase(3, "RRM", 5, 5, Direction.E)]
        public void Move_ShouldChange_RoverStateAccordingly_EvenAfterRoversAreDeployed(int roverId, string commandStream, int exprectedX, int expectedY, Direction expectedDirection)
        {
            ResetRoverState();

            bool moveStatus = rovers[roverId].Move(commandStream);

            for (int i = 0; i < rovers.Count; ++i)
            {
                Rover rover = rovers[i];
                char orientation = orientationList[i];
                Point point = pointList[i];
                if (rover.RoverId != roverId)
                {
                    Assert.AreEqual(rover.Orientation, orientation);
                    Assert.AreEqual(rover.X, point.X);
                    Assert.AreEqual(rover.Y, point.Y);
                }
                else
                {
                    Assert.AreEqual(rover.Orientation, expectedDirection.ToString()[0]);
                    Assert.AreEqual(rover.X, exprectedX);
                    Assert.AreEqual(rover.Y, expectedY);
                }
            }

            Assert.AreEqual(moveStatus, true);
        }

        private static List<Rover> CreateRovers()
        {
            Rover rover1 = new Rover(0, 1, 2, Direction.N.ToString()[0], commandCenter, grid);
            Rover rover2 = new Rover(1, 2, 3, Direction.S.ToString()[0], commandCenter, grid);
            Rover rover3 = new Rover(2, 3, 4, Direction.E.ToString()[0], commandCenter, grid);
            Rover rover4 = new Rover(3, 4, 5, Direction.W.ToString()[0], commandCenter, grid);

            List<Rover> rovers = new List<Rover>();
            rovers.Add(rover1);
            rovers.Add(rover2);
            rovers.Add(rover3);
            rovers.Add(rover4);

            return rovers;
        }

        private static void ResetRoverState()
        {
            grid.ChangeRoverState(0, Direction.N, new Point(1, 2));
            grid.ChangeRoverState(1, Direction.S, new Point(2, 3));
            grid.ChangeRoverState(2, Direction.E, new Point(3, 4));
            grid.ChangeRoverState(3, Direction.W, new Point(4, 5));

            orientationList = new List<char>();
            pointList = new List<Point>();
            foreach (Rover rover in rovers)
            {
                orientationList.Add(rover.Orientation);
                pointList.Add(new Point(rover.X, rover.Y));
            }
        }

        private static void ReassignRoverGrid()
        {
            grid = new Grid(5, 5);

            foreach (Rover rover in rovers)
            {
                rover.Grid = grid;
            }
        }
    }
}

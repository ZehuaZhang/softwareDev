using System;
using System.Drawing;
using System.Collections.Generic;
using NUnit.Framework;
using RoverOnMars;

namespace RoverOnMarsTests
{
    [TestFixture]
    public class GridTests
    {
        private static CommandCenter commandCenter = CommandCenter.GetCommandCenter();
        private static Grid grid = new Grid(5, 5);
        private static List<Rover> rovers = CreateRovers();

        [TestCase(5, 5)]
        [TestCase(1, 2)]
        public void GridInstance_ShouldReturn_CorrectProperties_When_Creating(int gridUpperX, int gridUpperY)
        {
            Grid grid = new Grid(gridUpperX, gridUpperY);

            Assert.AreEqual(grid.Width, gridUpperX + 1);
            Assert.AreEqual(grid.Height, gridUpperY + 1);
        }

        [TestCase(0, Direction.S, 2, 3)]
        [TestCase(1, Direction.E, 3, 4)]
        [TestCase(2, Direction.W, 4, 5)]
        [TestCase(3, Direction.N, 5, 1)]
        public void ChangeRoverLocation_ShouldUpdate_RoverStateAccordingly(int roverId, Direction direction, int x, int y)
        {
            ResetRoverState();

            List<char> orientationList = new List<char>();
            List<Point> pointList = new List<Point>();
            foreach (Rover rover in rovers)
            {
                orientationList.Add(rover.Orientation);
                pointList.Add(new Point(rover.X, rover.Y));
            }

            grid.ChangeRoverState(roverId, direction, new Point(x, y));
            
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
                    Assert.AreEqual(rover.Orientation, direction.ToString()[0]);
                    Assert.AreEqual(rover.X, x);
                    Assert.AreEqual(rover.Y, y);
                }
            }
        }

        [TestCase(1, 2)]
        [TestCase(2, 3)]
        [TestCase(3, 4)]
        [TestCase(0, 1)]
        public void IsPositionOccupied_ShouldReturn_True_WhenPositionIsOccupied(int x, int y)
        {
            ResetRoverState();
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionOccupied(position), true);
        }

        [TestCase(2, 1)]
        [TestCase(3, 2)]
        [TestCase(4, 3)]
        [TestCase(5, 4)]
        public void IsPositionOccupied_ShouldReturn_False_WhenPositionIsNotOccupied(int x, int y)
        {
            ResetRoverState();
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionOccupied(position), false);
        }

        [TestCase(0, 1, 2)]
        [TestCase(1, 2, 3)]
        [TestCase(2, 3, 4)]
        [TestCase(3, 0, 1)]
        public void IsPositionOccupiedByOtherRovers_ShouldReturn_True_WhenPositionIsOccupiedByOtherRovers(int roverId, int x, int y)
        {
            ResetRoverState();
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionOccupiedByOtherRovers(roverId, position), true);
        }

        [TestCase(0, 0, 1)]
        [TestCase(1, 1, 2)]
        [TestCase(2, 2, 3)]
        [TestCase(3, 3, 4)]
        public void IsPositionOccupiedByOtherRovers_ShouldReturn_False_WhenPositionIsOccupiedByRoverItself(int roverId, int x, int y)
        {
            ResetRoverState();
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionOccupiedByOtherRovers(roverId, position), false);
        }

        [TestCase(1, 2)]
        [TestCase(2, 3)]
        [TestCase(3, 4)]
        [TestCase(4, 5)]
        public void IsPositionInbound_ShouldReturn_True_WhenPositionIsInbound(int x, int y)
        {
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionInbound(position), true);
        }

        [TestCase(6, 1)]
        [TestCase(6, 2)]
        [TestCase(6, 3)]
        [TestCase(6, 4)]
        [TestCase(1, 6)]
        [TestCase(2, 6)]
        [TestCase(3, 6)]
        [TestCase(4, 6)]
        [TestCase(-1, -2)]
        [TestCase(-2, -3)]
        [TestCase(-3, -4)]
        [TestCase(-4, -5)]
        public void IsPositionInbound_ShouldReturn_False_WhenPositionIsOutOfBound(int x, int y)
        {
            Point position = new Point(x, y);

            Assert.AreEqual(grid.IsPositionInbound(position), false);
        }

        private static List<Rover> CreateRovers()
        {
            Rover rover1 = new Rover(0, 0, 1, Direction.N.ToString()[0], commandCenter, grid);
            Rover rover2 = new Rover(1, 1, 2, Direction.S.ToString()[0], commandCenter, grid);
            Rover rover3 = new Rover(2, 2, 3, Direction.E.ToString()[0], commandCenter, grid);
            Rover rover4 = new Rover(3, 3, 4, Direction.W.ToString()[0], commandCenter, grid);

            ResetRoverState();

            List<Rover> rovers = new List<Rover>();
            rovers.Add(rover1);
            rovers.Add(rover2);
            rovers.Add(rover3);
            rovers.Add(rover4);

            return rovers;
        }

        private static void ResetRoverState()
        {
            grid.ChangeRoverState(0, Direction.N, new Point(0, 1));
            grid.ChangeRoverState(1, Direction.S, new Point(1, 2));
            grid.ChangeRoverState(2, Direction.E, new Point(2, 3));
            grid.ChangeRoverState(3, Direction.W, new Point(3, 4));
        }
    }
}
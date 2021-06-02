using NUnit.Framework;
using RoverOnMars;
using System.Drawing;

namespace RoverOnMarsTests
{
    [TestFixture]
    public class CommandCenterTests
    {
        private static CommandCenter commandCenter;
        private static Grid grid = new Grid(5, 5);

        [Test]
        public void GetCommandCenter_ShouldAlwaysReturn_SameInstance()
        {
            Assert.AreNotEqual(CommandCenter.GetCommandCenter(), null);

            commandCenter = CommandCenter.GetCommandCenter();
            Assert.AreEqual(commandCenter, CommandCenter.GetCommandCenter());

            commandCenter = CommandCenter.GetCommandCenter();
            Assert.AreEqual(commandCenter, CommandCenter.GetCommandCenter());
        }
        
        [Test, Sequential, NonParallelizable]
        [TestCase(0, "LMLMLMLMM", 1, 2, Direction.N, 1, 3, Direction.N)]
        [TestCase(1, "MMRMMRMRRM", 3, 3, Direction.E, 5, 1, Direction.E)]
        [TestCase(2, "LMLMLMLMMM", 1, 2, Direction.N, 1, 4, Direction.N)]
        public void Move_ShouldUpdate_RoverStateAccordingly(
            int roverId,
            string commandStream,
            int X,
            int Y,
            Direction direction,
            int exprectedX,
            int expectedY,
            Direction expectedDirection)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            Point position = new Point(X, Y);
            bool moveStatus = commandCenter.Move(roverId, commandStream, grid, ref direction, ref position);

            Assert.AreEqual(exprectedX, position.X);
            Assert.AreEqual(expectedY, position.Y);
            Assert.AreEqual(expectedDirection, direction);

            Assert.AreEqual(true, moveStatus);
        }

        [Test, Sequential, NonParallelizable]
        [TestCase(1, 2, Direction.N, 1, 3, Direction.N, "M")]
        [TestCase(3, 3, Direction.E, 5, 1, Direction.E, "MMRMML")]
        [TestCase(1, 2, Direction.N, 1, 4, Direction.N, "MM")]
        public void getCommandStreamBetweenRoverState_ShouldReturn_CorrectCommandStreamToNavigateAccordingly(
            int fromX,
            int fromY,
            Direction fromDirection,
            int toX,
            int toY,
            Direction toDirection,
            string expectedCommandStream)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            string commandStream = commandCenter.getCommandStreamBetweenRoverState(grid, fromDirection, new Point(fromX, fromY), toDirection, new Point(toX, toY));

            Assert.AreEqual(expectedCommandStream, commandStream);
        }

        [TestCase(Direction.N, Direction.W, "L")]
        [TestCase(Direction.N, Direction.E, "R")]
        [TestCase(Direction.N, Direction.S, "RR")]
        [TestCase(Direction.W, Direction.S, "L")]
        [TestCase(Direction.W, Direction.N, "R")]
        [TestCase(Direction.W, Direction.E, "RR")]
        public void getCommandStreamBetweenDirections_ShouldReturn_CorrectCommandStreamToNavigateAccordingly(
            Direction fromDirection,
            Direction toDirection,
            string expectedCommandStream)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            string commandStream = commandCenter.getCommandStreamBetweenDirections(fromDirection, toDirection);

            Assert.AreEqual(expectedCommandStream, commandStream);
        }

        [TestCase(0, 1, Direction.W, 'M', false)]
        [TestCase(0, 1, Direction.N, 'M', false)]
        [TestCase(0, 1, Direction.E, 'M', true)]
        public void isValidMove_ShouldReturnCorrectly_ConsideringWhetherRoverIsInBound_and_WhetherGridIsOccupiedByOtherRovers(
            int X,
            int Y,
            Direction direction,
            char command,
            bool expectedValidStatus)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            grid = new Grid(5, 5);
            Rover rover1 = new Rover(0, X, Y, direction.ToString()[0], commandCenter, grid);
            Rover rover2 = new Rover(1, 0, 2, Direction.N.ToString()[0], commandCenter, grid);
            grid.ChangeRoverState(1, Direction.N, new Point(0, 2));

            Point position = new Point(X, Y);
            bool validStatus = commandCenter.isValidMove(0, command, grid, ref direction, ref position);

            Assert.AreEqual(expectedValidStatus, validStatus);
        }

        [TestCase(1, 2, Direction.N, 'L', 1, 2, Direction.W)]
        [TestCase(3, 3, Direction.E, 'R', 3, 3, Direction.S)]
        [TestCase(1, 2, Direction.N, 'M', 1, 3, Direction.N)]
        [TestCase(1, 2, Direction.N, '@', -1, -1, Direction.N)]
        public void executeCommand_ShouldModify_RoverStateCorrectlyGivenACommand(
            int X,
            int Y,
            Direction direction,
            char command,
            int exprectedX,
            int expectedY,
            Direction expectedDirection)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            Point position = new Point(X, Y);

            commandCenter.executeCommand(command, ref direction, ref position);

            Assert.AreEqual(exprectedX, position.X);
            Assert.AreEqual(expectedY, position.Y);
            Assert.AreEqual(expectedDirection, direction);
        }

        [TestCase(Direction.W, 0, 1, "MRRMMM", Direction.E, 0, 1, 3)]
        [TestCase(Direction.N, 0, 1, "MMMM", Direction.N, 0, 3, 1)]
        [TestCase(Direction.W, 0, 1, "MMM", Direction.W, -3, 1, -1)]
        public void getIndexOfNextValidCommand_ShouldReturn_NextValidIndex_and_ShouldModify_CorretlyRoverState(
            Direction direction,
            int X,
            int Y,
            string commandstream,
            Direction expectedDirection,
            int exprectedX,
            int expectedY,
            int expectedIndex)
        {
            commandCenter = CommandCenter.GetCommandCenter();

            grid = new Grid(5, 5);
            Rover rover1 = new Rover(0, X, Y, direction.ToString()[0], commandCenter, grid);
            Rover rover2 = new Rover(1, 0, 2, Direction.N.ToString()[0], commandCenter, grid);
            grid.ChangeRoverState(1, Direction.N, new Point(0, 2));

            Point position = new Point(X, Y);

            int index = commandCenter.getIndexOfNextValidCommand(0, 0, commandstream, grid, ref direction, ref position);

            Assert.AreEqual(expectedIndex, index);

            Assert.AreEqual(exprectedX, position.X);
            Assert.AreEqual(expectedY, position.Y);
            Assert.AreEqual(expectedDirection, direction);

        }
    }
}
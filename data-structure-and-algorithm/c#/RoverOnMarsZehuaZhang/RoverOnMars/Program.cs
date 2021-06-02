using System;
using System.Text.RegularExpressions;

namespace RoverOnMars
{
    class Program
    {
        static void Main(string[] args)
        {
            Grid grid = new Grid();
            int roverCount = GetRoverCount();

            for (int roverId = 1; roverId <= roverCount; ++roverId)
            {
                IRover rover = CreateRover(roverId, CommandCenter.GetCommandCenter(), grid);

                String commandStream = GetCommandStreamForRover(roverId);
                Console.Write("Rover {0} Output: ", roverId);
                if (!rover.Move(commandStream))
                {
                    Console.WriteLine("Movement was not successful");
                }
                else
                {
                    Console.WriteLine(rover.State);
                }
            }

            Console.WriteLine("All Rover(s) have been deployed, Press any key to exit");
            Console.ReadKey();
        }

        public static string GetCommandStreamForRover(int roverId)
        {
            string commandStream = string.Empty;

            do
            {
                Console.Write("Rover {0} Movement Plan: ", roverId);
                commandStream = Console.ReadLine().ToUpper().Trim();

            } while (!ProcessInputForCommandStream(commandStream));

            return commandStream;
        }

        public static IRover CreateRover(int roverId, ICommandCenter commandCenter, Grid grid)
        {
            int x = 0, y = 0;
            char direction = 'U';
            string input = string.Empty;

            do
            {
                Console.Write("Rover {0} Starting Position: ", roverId);
                input = Console.ReadLine().Trim();
            } while (!ProcessInputForCreateRover(input, ref x, ref y, ref direction, grid));

            return new Rover(roverId, x, y, direction, commandCenter, grid);
        }

        public static int GetRoverCount()
        {
            int roverCount = 0;
            string inputForCount = string.Empty;

            do
            {
                Console.Write("Enter Number of Rovers: ");
                inputForCount = Console.ReadLine().Trim();
            } while (!ProcessInputForRoverCount(inputForCount, ref roverCount));

            return roverCount;
        }

        public static bool ProcessInputForGrid(string coordinateStream, ref int x, ref int y)
        {
            try
            {
                string[] coordinateList = coordinateStream.Split(new char[] { ' ' });
                x = int.Parse(coordinateList[0]);
                y = int.Parse(coordinateList[1]);

                if (coordinateList.Length == 2 && x >= 0 && y >= 0)
                {
                    return true;
                }

                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: X Y (X > 0, Y > 0)\n");
                return false;
            }
            catch
            {
                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: X Y\n");
                return false;
            }
        }

        public static bool ProcessInputForCreateRover(string coordinateStream, ref int x, ref int y, ref char direction, Grid grid)
        {
            try
            {
                string[] coordinateList = coordinateStream.Split(new char[] { ' ' });
                x = int.Parse(coordinateList[0]);
                y = int.Parse(coordinateList[1]);
                direction = char.Parse(coordinateList[2]).ToString().ToUpper().ToCharArray()[0];

                if (coordinateList.Length == 3 && @"NSEW".Contains(direction.ToString()) && 0 <= x && x < grid.Width && 0 <= y && y <= grid.Height)
                {
                    return true;
                }

                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: X Y D (X > 0, Y > 0, D one of {N, E, S, W})\n");
                return false;
            }
            catch
            {
                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: X Y D (X > 0, Y > 0, D one of {N, E, S, W})\n");
                return false;
            }
        }

        public static bool ProcessInputForCommandStream(string commandStream)
        {
            try
            {
                if (Regex.IsMatch(commandStream, @"^[LMR]*$"))
                {
                    return true;
                }

                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: string consists of only letters from letter group L, R, and M\n");
                return false;
            }
            catch
            {
                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: string consists of only letters from letter group L, R, and M\n");
                return false;
            }
        }

        public static bool ProcessInputForRoverCount(string countStream, ref int count)
        {
            try
            {
                count = int.Parse(countStream);
                if (count >= 0)
                {
                    return true;
                }

                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: count (count >= 0)\n");
                return false;
            }
            catch
            {
                Console.WriteLine("Invalid Entry, Please Re-Enter with Format: count (count >= 0)\n");
                return false;
            }
        }
    }
}

/// <summary>
/// Rover Interface
/// </summary>
/// namespace RoverOnMars
/// 

namespace RoverOnMars
{
    interface IRover
    {
        // 
        int X
        {
            get;
        }

        int Y
        {
            get;
        }

        char Orientation
        {
            get;
        }

        Grid Grid
        {
            get;
            set;
        }

        string State
        {
            get;
        }

        bool Move(string steps);
    }
}
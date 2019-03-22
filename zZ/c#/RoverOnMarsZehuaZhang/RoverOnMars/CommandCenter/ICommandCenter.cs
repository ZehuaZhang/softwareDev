using System.Drawing;

namespace RoverOnMars
{
    public interface ICommandCenter
    {
        bool Move(int id, string steps, Grid grid, ref Direction direction, ref Point position);
    }
}
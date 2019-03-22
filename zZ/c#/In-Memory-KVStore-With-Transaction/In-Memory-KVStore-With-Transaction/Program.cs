using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace In_Memory_KVStore_With_Transaction
{
    class Program
    {
        static void Main(string[] args)
        {
            string commandStream = string.Empty;

            Console.WriteLine("");

            bool shouldExit = false;

            DB db = new DB();

            do
            {
                commandStream = Console.ReadLine().ToUpper().Trim();

                string[] commanList = commandStream.Split(new char[] { ' ' });

                switch (commanList[0])
                {
                    case "SET":
                        db.Set(commanList[1], commanList[2]);
                        break;
                    case "GET":
                        string value = db.Get(commanList[1]);
                        if (value == null)
                        {
                            Console.WriteLine(commanList[1] + " NOT SET");
                        }
                        Console.WriteLine(value);
                        break;
                    case "COUNT":
                        Console.WriteLine(db.Count(commanList[1]));
                        break;
                    case "DELETE":
                        db.Delete(commanList[1]);
                        break;
                    case "BEGIN":
                        db.BeginTransaction();
                        break;
                    case "COMMIT":
                        bool status = db.EndTransaction();
                        if (!status)
                        {
                            Console.WriteLine("NO TRANSACTION");
                        }
                        break;
                    case "ROLLBACK":
                        db.Rollback();
                        break;
                    case "EXIT":
                        shouldExit = true;
                        break;
                    default:
                        break;
                }
            } while (!shouldExit);

            Console.ReadKey();

            // Go to http://aka.ms/dotnet-get-started-console to continue learning how to build a console app! 
        }
    }
}

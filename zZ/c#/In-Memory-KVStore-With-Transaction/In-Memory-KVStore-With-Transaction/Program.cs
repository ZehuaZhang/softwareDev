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

            bool shouldExit = false;

            DB db = new DB();

            do
            {
                List<string> commanList = new List<string>();
                
                do
                {
                    Console.Write("> ");
                    commandStream = Console.ReadLine().ToUpper().Trim();

                    commanList = commandStream
                        .Split(new char[] { ' ' })
                        .ToList()
                        .Where(command => !String.IsNullOrEmpty(command.Trim()))
                        .ToList();
                } while (commanList.Count == 0);

                switch (commanList[0])
                {
                    case "SET":
                        if (commanList.Count != 3)
                        {
                            goto default;
                        }
                        db.Set(commanList[1], commanList[2]);
                        break;
                    case "GET":
                        if (commanList.Count != 2)
                        {
                            goto default;
                        }
                        string value = db.Get(commanList[1]);
                        if (value == null)
                        {
                            Console.WriteLine(commanList[1] + " NOT SET");
                        }
                        else {
                            Console.WriteLine(commanList[1] + " = " + value);
                        }
                        break;
                    case "COUNT":
                        if (commanList.Count != 2)
                        {
                            goto default;
                        }
                        Console.WriteLine(db.Count(commanList[1]));
                        break;
                    case "DELETE":
                        if (commanList.Count != 2)
                        {
                            goto default;
                        }
                        db.Delete(commanList[1]);
                        break;
                    case "BEGIN":
                        if (commanList.Count != 1)
                        {
                            goto default;
                        }
                        db.BeginTransaction();
                        break;
                    case "COMMIT":
                        if (commanList.Count != 1)
                        {
                            goto default;
                        }
                        bool status = db.EndTransaction();
                        if (!status)
                        {
                            Console.WriteLine("NO TRANSACTION");
                        }
                        break;
                    case "ROLLBACK":
                        if (commanList.Count != 1)
                        {
                            goto default;
                        }
                        db.Rollback();
                        break;
                    case "EXIT":
                        if (commanList.Count != 1)
                        {
                            goto default;
                        }
                        shouldExit = true;
                        break;
                    default:
                        Console.WriteLine("INVALID COMMAND, PLEASE TRY AGAIN");
                        break;
                }
            } while (!shouldExit);

            Console.ReadKey();

            // Go to http://aka.ms/dotnet-get-started-console to continue learning how to build a console app! 
        }
    }
}

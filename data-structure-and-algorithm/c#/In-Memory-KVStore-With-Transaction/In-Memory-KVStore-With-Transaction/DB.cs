using System.Collections.Generic;

namespace In_Memory_KVStore_With_Transaction
{
    class DB
    {
        private Dictionary<string, string> store;
        private Dictionary<string, int> valueCount;
        private Stack<Pair<Dictionary<string, string>, Dictionary<string, int>>> stack;
        private bool isTransaction;
        public DB()
        {
            store = new Dictionary<string, string>();
            valueCount = new Dictionary<string, int>();
            stack = new Stack<Pair<Dictionary<string, string>, Dictionary<string, int>>>();
            isTransaction = false;
        }

        public void Set(string key, string value, bool isRollBack = false)
        {
            if (isTransaction && !isRollBack)
            {
                storePreviousStateHistory(key, value);
            }

            if (store.ContainsKey(key))
            {
                DecreaseValueCount(store[key]);
            }

            store[key] = value;
            IncreaseValueCount(store[key]);
        }

        public string Get(string key)
        {
            if (!store.ContainsKey(key))
            {
                return null;
            }

            return store[key];
        }

        public int Count(string value)
        {
            if (!valueCount.ContainsKey(value))
            {
                return 0;
            }

            return valueCount[value];
        }

        public void Delete(string key, bool isRollBack = false)
        {
            if (isTransaction && !isRollBack)
            {
                string value = Get(key);
                storePreviousStateHistory(key, value);
            }

            if (store.ContainsKey(key))
            {
                string value = store[key];

                UpdateValueCount(value, valueCount[value] - 1);
                store.Remove(key);
            }
        }

        public void BeginTransaction()
        {
            stack.Push(new Pair<Dictionary<string, string>, Dictionary<string, int>>());
            
            isTransaction = true;
        }

        public bool EndTransaction()
        {
            if (stack.Count == 0)
            {
                return false;
            }

            stack.Pop();
            if (stack.Count == 0)
            {
                isTransaction = false;
            }
            return true;
        }

        public void Rollback()
        {
            Pair<Dictionary<string, string>, Dictionary<string, int>> stackDB = stack.Peek();

            Dictionary<string, string> stackStore = stackDB.getFirstChild();
            Dictionary<string, int> stackValueCount = stackDB.getSecondChild();

            if (stackStore != null)
            {
                foreach (string key in stackStore.Keys)
                {
                    string value = stackStore[key];
                    
                    if (value == null)
                    {
                        Delete(key, true);
                    }
                    else
                    {
                        Set(key, value, true);
                    }
                }
            }

            if (stackValueCount != null)
            {
                foreach (string value in stackValueCount.Keys)
                {
                    int count = stackValueCount[value];
                    UpdateValueCount(value, count);
                }
            }

            EndTransaction();
        }

        private void storePreviousStateHistory(string key, string value)
        {
            Pair<Dictionary<string, string>, Dictionary<string, int>> stackDB = stack.Peek();
            Dictionary<string, string> stackStore = stackDB.getFirstChild();
            Dictionary<string, int> stackValueCount = stackDB.getSecondChild();

            if (!stackStore.ContainsKey(key))
            {
                stackStore[key] = Get(key);
            }

            if (Get(key) != null && !stackValueCount.ContainsKey(Get(key)))
            {
                stackValueCount[Get(key)] = Count(Get(key));
            }

            if (value != null && !stackValueCount.ContainsKey(value))
            {
                stackValueCount[value] = Count(value);
            }
        }

        private void UpdateValueCount(string value, int count)
        {
            valueCount[value] = count;

            if (valueCount[value] == 0)
            {
                valueCount.Remove(value);
            }
        }

        private void IncreaseValueCount(string value)
        {
            int count = Count(value);

            UpdateValueCount(value, count + 1);
        }

        private void DecreaseValueCount(string value)
        {
            int count = Count(value);

            UpdateValueCount(value, count - 1);
        }
    }
}

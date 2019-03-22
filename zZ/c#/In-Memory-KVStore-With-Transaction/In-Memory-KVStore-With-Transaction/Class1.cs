using System.Collections.Generic;

namespace In_Memory_KVStore_With_Transaction
{
    class DB
    {
        private Dictionary<string, string> store;
        private Dictionary<string, int> valueCount;
        private Stack<Dictionary<string, KeyValuePair<string, int>>> stack;
        private bool isTransaction;
        public DB()
        {
            store = new Dictionary<string, string>();
            valueCount = new Dictionary<string, int>();
            stack = new Stack<Dictionary<string, KeyValuePair<string, int>>>();
            isTransaction = false;
        }

        public void Set(string key, string value, bool isRollBack = false)
        {
            if (isTransaction && !isRollBack)
            {
                Dictionary<string, KeyValuePair<string, int>> stackDB = stack.Peek();
                if (!stackDB.ContainsKey(key))
                {
                    stackDB[key] = new KeyValuePair<string, int>(Get(key), Count(key));
                }
            }

            if (store.ContainsKey(key) && store[key] != value)
            {
                UpdateValueCount(store[key], valueCount[store[key]] - 1);
            }

            store[key] = value;

            int count = 0;
            if (valueCount.ContainsKey(value))
            {
                count = valueCount[value];
            }
            UpdateValueCount(value, count + 1);
        }

        public string Get(string key)
        {
            if (!store.ContainsKey(key))
            {
                return null;
            }

            return store[key];
        }

        public int Count(string key)
        {
            if (!valueCount.ContainsKey(key))
            {
                return 0;
            }

            return valueCount[key];
        }

        public void Delete(string key, bool isRollBack = false)
        {
            if (isTransaction && !isRollBack)
            {
                Dictionary<string, KeyValuePair<string, int>> stackDB = stack.Peek();
                if (!stackDB.ContainsKey(key))
                {
                    stackDB[key] = new KeyValuePair<string, int>(Get(key), Count(key));
                }
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
            stack.Push(new Dictionary<string, KeyValuePair<string, int>>());
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

        private void UpdateValueCount(string value, int count)
        {
            valueCount[value] = count;

            if (valueCount[value] == 0)
            {
                valueCount.Remove(value);
            }
        }

        public void Rollback()
        {
            Dictionary<string, KeyValuePair<string, int>> stackDB = stack.Peek();
            
            foreach (string key in stackDB.Keys)
            {
                KeyValuePair<string, int> valueAndCountPair = stackDB[key];
                string value = valueAndCountPair.Key;
                int count = valueAndCountPair.Value;

                if (value == null)
                {
                    Delete(key, true);

                    UpdateValueCount(value, count);
                }
                else
                {
                    Set(key, value, true);

                    UpdateValueCount(value, count);
                }
            }

            EndTransaction();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace In_Memory_KVStore_With_Transaction
{
    class Pair<T1, T2>
        where T1 : class
        where T2 : class
    {
        private T1 data1;
        private T2 data2;

        public Pair(T1 data1, T2 data2)
        {
            this.data1 = data1;
            this.data2 = data2;
        }

        public Pair()
        {
        }

        public T1 getFirstChild()
        {
            return data1;
        }

        public T2 getSecondChild()
        {
            return data2;
        }
    }
}

class Singleton { 
    private volatile static Singleton obj; 
  
    private Singleton() {
    } 
  
    public static Singleton getInstance() { 
        if (obj == null) { 
            synchronized (Singleton.class) { 
                if (obj == null) {
                    obj = new Singleton();
                }
            } 
        } 
        return obj; 
    } 
} 

class Singleton2 { 
    private Singleton2() {
    } 

    private static class InnerSingleton {
        private static final Singleton2 instance = new Singleton2();
    }
  
    public static Singleton getInstance() { 
        return InnerSingleton.instance;
    } 
} 
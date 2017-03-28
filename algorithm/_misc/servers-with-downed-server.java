// This is the text editor interface. 
// Anything you type or change here will be seen by the other person in real time.

//hostnames = ["server1.snapchat.com", "server2.snapchat.com", "server3.snapchat.com"]

//LoadBalancer lb = new LoadBalancer(hostnames)
//username = "myUser1"
//lb.get_server(username) -> "server1.snapchat.com"

import java.util.*;

public class LoadBalancer {
    public static void main(String[] args) {
        String[] hostnames1 = {"server1.snapchat.com", "server2.snapchat.com", "server3.snapchat.com", "server4.snapchat.com", "server5.snapchat.com"};
        LoadBalancer lb = new LoadBalancer(hostnames1);
        String username1 = "myUser1";
        String username2 = "myUser2";
        String username3 = "myUser3";
        System.out.println(username1 + " : " + lb.get_server(username1));
        System.out.println(username2 + " : " + lb.get_server(username2));
        System.out.println(username3 + " : " + lb.get_server(username3));
        System.out.println("\n");
        lb.downedServer("server3.snapchat.com");
        System.out.println(username1 + " : " + lb.get_server(username1));
        System.out.println(username2 + " : " + lb.get_server(username2));
        System.out.println(username3 + " : " + lb.get_server(username3));
    }
    
    private String[] servers;
    private Set<Integer> downed;
    
    public LoadBalancer(String[] serverList) {
        servers = serverList.clone();
        downed = new HashSet<>();
    }
    
    public void downedServer(String downedServerName) {
        for (int i = 0; i < servers.length; i++) {
            if (servers[i].equals(downedServerName)) {
                downed.add(i);
            }
        }
    }
    
    public String get_server(String name) {
        // if (downed.size() == server.length) {
        //     return Exception;
        // }
        Integer hash = name.hashCode();
        Integer index = hash % servers.length;
        
        while (downed.contains(index)) {
            index = (index + 1) % servers.length;
        }
        
        return servers[index];
    }
}
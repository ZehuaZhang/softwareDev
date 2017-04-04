// Load Balancer

// e.x.
// hostnames = ["server1.zehua.com", "server2.zehua.com", "server3.zehua.com"]
// username = ["username1", "username2", "username3"]

// LoadBalancer lb = LoadBalancer()
// lb.add("server1.zehua.com")
// lb.add("server2.zehua.com")
// lb.add("server3.zehua.com")
// lb.get("username1") -> "server3.zehua.com"
// lb.get("username2") -> "server1.zehua.com"
// lb.get("username3") -> "server2.zehua.com"

class LoadBalancer {
public:
  LoadBalancer() {
  }

  void add(int serverId) {
    servers.push_back(serverId);
    idx[serverId] = prev(servers.end());
  }

  void remove(int serverId) {
    if (!idx.count(serverId)){
      return;
    }
    servers.erase(idx(serverId))
    idx.erase(serverId);
  }

  void setBad(string serverId) {
     if (!idx.count(serverId)) {
      return;
     }
     downed.insert(serverId);
  }

  int get(string username) {
    if (downed.size() == servers.size()) {
      return -1;
    }
    int index = str_hash(username) % servers.size();

    while (downed.contains(*(server.begin() + index))) {
      index = (index + 1) % servers.size();
    }
    return *(server.begin() + index);
  } 
private:
  list<int> servers;
  unordered_map<int, list<int>::iterator> idx;
  unordered_set<list<int>::iterator> downed;
  hash<string> str_hash;
}
/**
 * Design Log Storage System
 * 
 * You are given several logs that each log contains a unique id and timestamp. Timestamp is a string that has the following format: Year:Month:Day:Hour:Minute:Second, for example, 2017:01:01:23:59:59.
 * All domains are zero-padded decimal numbers.
 * 
 * Design a log storage system to implement the following functions:
 * 
 * void Put(int id, string timestamp): Given a log's unique id and timestamp, store the log in your storage system.
 * 
 * int[] Retrieve(String start, String end, String granularity): Return the id of logs whose timestamps are within the range from start to end. Start and end all have the same format as timestamp.
 * However, granularity means the time level for consideration.
 * For example, start = "2017:01:01:23:59:59", end = "2017:01:02:23:59:59", granularity = "Day", it means that we need to find the logs within the range from Jan. 1st 2017 to Jan. 2nd 2017.
 * 
 * Example 1:
 * 
 * put(1, "2017:01:01:23:59:59");
 * put(2, "2017:01:01:22:59:59");
 * put(3, "2016:01:01:00:00:00");
 * retrieve("2016:01:01:01:01:01","2017:01:01:23:00:00","Year"); // return [1,2,3], because you need to return all logs within 2016 and 2017.
 * retrieve("2016:01:01:01:01:01","2017:01:01:23:00:00","Hour"); // return [1,2], because you need to return all logs start from 2016:01:01:01 to 2017:01:01:23, where log 3 is left outside the range.
 * 
 * Note:
 * 
 * There will be at most 300 operations of Put or Retrieve.
 * Year ranges from [2000,2017]. Hour ranges from [00,23].
 * Output for Retrieve has no order required.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class LogSystem  {
    LogSystem() {
        unitIndex = new HashMap<>();
        unitIndex.put("year", 4);
        unitIndex.put("month", 7);
        unitIndex.put("day", 10);
        unitIndex.put("hour", 13);
        unitIndex.put("minute", 16);
        unitIndex.put("second", 19);

        logs = new ArrayList<>();
    }

    public void put(int id, String timestamp) {
        logs.add(new Pair(id, timestamp));
    }
    
    public List<Integer> retrieve(String start, String end, String unit) {
        List<Integer> result = new ArrayList<>();
        int index = unitIndex.get(unit.toLowerCase());
        for (Pair log : logs) {
            String timestamp = log.timestamp;
            if (timestamp.substring(0, index).compareTo(start.substring(0, index)) >= 0 &&
                timestamp.substring(0, index).compareTo(end.substring(0, index)) <= 0) {
                
                result.add(log.id);
            }
        }
        return result;
    }

    private final Map<String, Integer> unitIndex;
    private List<Pair> logs;

    private class Pair {
        int id;
        String timestamp;

        Pair(int id, String timestamp) {
            this.id = id;
            this.timestamp = timestamp;
        }
    }
}

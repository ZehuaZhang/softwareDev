/**
 * Logger Rate Limiter
 * 
 * Design a logger system that receive stream of messages along with its timestamps, each message should be printed if and only if it is not printed in the last 10 seconds.
 * 
 * Given a message and a timestamp (in seconds granularity), return true if the message should be printed in the given timestamp, otherwise returns false.
 * 
 * It is possible that several messages arrive roughly at the same time.
 * 
 * Example:
 * 
 * Logger logger = new Logger();
 * 
 * // logging string "foo" at timestamp 1
 * logger.shouldPrintMessage(1, "foo"); returns true; 
 * 
 * // logging string "bar" at timestamp 2
 * logger.shouldPrintMessage(2,"bar"); returns true;
 * 
 * // logging string "foo" at timestamp 3
 * logger.shouldPrintMessage(3,"foo"); returns false;
 * 
 * // logging string "bar" at timestamp 8
 * logger.shouldPrintMessage(8,"bar"); returns false;
 * 
 * // logging string "foo" at timestamp 10
 * logger.shouldPrintMessage(10,"foo"); returns false;
 * 
 * // logging string "foo" at timestamp 11
 * logger.shouldPrintMessage(11,"foo"); returns true;
 */

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.LinkedList;
import java.util.Queue;

public class Logger {
    Logger() {
        history = new LinkedList<>();
        printedMessages = new HashSet<>();
        timeConstraint = 10;
    }
    
    public boolean shouldPrintMessage(int timestamp, String message) {
        while (!history.isEmpty() && history.peek().timestamp <= timestamp - timeConstraint) {
            Message entry = history.poll();
            if (printedMessages.contains(entry.message)) {
                printedMessages.remove(entry.message);
            }
        }

        if (printedMessages.contains(entry.message)) {
            return false;
        }

        history.offer(new Message(timestamp, message));
        printedMessages.add(message);
        return true;
    }

    private Queue<Message> history;
    private Set<String> printedMessages;
    private final int timeConstraint;

    public class Message {
        public int timestamp;
        public String message;

        Message(int timestamp, String message) {
            this.timestamp = timestamp;
            this.message = message;
        }
    }
}
    
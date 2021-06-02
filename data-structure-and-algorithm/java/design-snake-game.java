/**
 * Design Snake Game
 * 
 * Design a Snake game that is played on a device with screen size = width x height. Play the game online if you are not familiar with the game.
 * 
 * The snake is initially positioned at the top left corner (0,0) with length = 1 unit.
 * 
 * You are given a list of food's positions in row-column order. When a snake eats the food, its length and the game's score both increase by 1.
 * 
 * Each food appears one by one on the screen. For example, the second food will not appear until the first food was eaten by the snake.
 * 
 * When a food does appear on the screen, it is guaranteed that it will not appear on a block occupied by the snake.
 * 
 * Example:
 * Given width = 3, height = 2, and food = [[1,2],[0,1]].
 * 
 * Snake snake = new Snake(width, height, food);
 * 
 * Initially the snake appears at position (0,0) and the food at (1,2).
 * 
 * |S| | |
 * | | |F|
 * 
 * snake.move("R"); -> Returns 0
 * 
 * | |S| |
 * | | |F|
 * 
 * snake.move("D"); -> Returns 0
 * 
 * | | | |
 * | |S|F|
 * 
 * snake.move("R"); -> Returns 1 (Snake eats the first food and right after that, the second food appears at (0,1) )
 * 
 * | |F| |
 * | |S|S|
 * 
 * snake.move("U"); -> Returns 1
 * 
 * | |F|S|
 * | | |S|
 * 
 * snake.move("L"); -> Returns 2 (Snake eats the second food)
 * 
 * | |S|S|
 * | | |S|
 * 
 * snake.move("U"); -> Returns -1 (Game over because snake collides with border)
 */

import java.util.Arrays;
import java.util.Deque;

public class SnakeGame {
    SnakeGame(int width, int height, Deque<Integer[]> food) {
        this.width = width;
        this.height = height;
        this.food = food;
        this.score = 0;
        this.snake = new Deque<Integer[]>();
        snake.offerFirst(new Integer[]{0, 0});
    }
    
    int move(string direction) {
        // remove tail
        Integer[] tail = snake.pollLast();

        // get head
        int x = snake.peekFirst()[0];
        int y = snake.peekFirst()[1];

        // make new head from head based on direction
        if (direction == "U") {
            --x;
        } else if (direction == "L") {
            --y;
        } else if (direction == "U") {
            ++x;
        } else if (direction == "R") {
            ++y;
        }

        // check validity of new head
        if (x < 0 || x >= height || y < 0 || y >= width) {
            return -1;
        }

        for (Integer[] entry : snake) {
            if (Arrays.equals(entry, new Integer[] {x, y})) {
                return -1;
            }
        }

        // add new head
        snake.offer(new Integer[] {x, y});

        // add tail back once food is eaten
        if (!food.isEmpty() && food.peekFirst().equals(snake.peekFirst())) {
            food.poll();
            snake.offerLast(tail);
            ++score;
        }

        return score;
    }

    private Deque<Integer[]> food;
    private Deque<Integer[]> snake;
    private int width;
    private int height;
    private int score;
}
    
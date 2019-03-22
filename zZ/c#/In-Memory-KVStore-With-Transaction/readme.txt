I had a bug on "value count" which will stays for values created between begin transaction and rollback
To Fix this, I should have two dictionaries on to the stack
key-value (exsiting), value-count(should have added)

All other cases and other commands are correct, like normal queries, (nested) transaction & rollback
(I did fix another bug after video has ended)
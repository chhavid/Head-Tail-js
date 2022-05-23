`head [-n count | -c bytes] [file ...]`

```
head file...
  Displays first lines of a file. 
  This filter displays the first count lines or bytes of each of the specified files It defaults to 10 lines.

head -c bytes file
   Print bytes of each of the specified files.

head -n count file
   Print count lines of each of the specified files.

If more than a single file is specified, each file is preceded by a header consisting of the string “==> XXX <==” where
“XXX” is the name of the file.

```

 `tail [-c # | -n #] [file ...]`

 ```
tail file...
   Displays the last part of a file.
   Numbers having a leading plus (‘+’) sign are relative to the beginning of the input. Numbers having a leading minus (‘-’) sign or no explicit sign are relative to the end of the input. The default starting location is the last 10 lines of the input.

tail -c number, --bytes=number
   The location is number bytes.

tail -n number, --lines=number
   The location is number lines.

If more than a single file is specified, each file is preceded by a header consisting of the string “==> XXX <==” where “XXX” is the name of the file.

 ```

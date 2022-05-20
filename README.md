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
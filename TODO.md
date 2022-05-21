**TODO:**

- [ ] Refactor parseArgs.
- [ ] Should give error if both options are given together.
- [ ] Should also except -num as -n num.
- [ ] Should give error if there is options but no file.

**Consider:**

- [ ] Giving array of objects for filename and content in mock function.

**DONE:**

- [x] Format output with spaces ,symbol and fileName.
- [x] Should override the option if same option is given again.
- [x] Parser should give more information about the options.
- [x] Modify contract of parseArgs.
- [x] Give usage if no parameters are given.
- [x] Case of -c with 0.
~~- [x] Using delimiters in options.~~
- [x] Testing of main with multiple files.
- [x] Add spaces while showing output of multiple files.
- [x] Separated parse function with option and default.
- [x] Give head of more than one file. 
- [x] Accept and parse more than one file.
- [x] Changing function name `firstLines`.
- [x] Combine getLines and getBytes function.
- [x] Extract tests in another file.
- [x] Extract functions in another file.
- [x] Give error if unable to read file.
- [x] Add try catch block while reading file.
- [x] Provide default of 10 for count option.
- [x] Accept options from user.
- [x] Add a function to parse command line arguments.
- [x] Add a sample file for using head.
- [x] Take readFileSyc as parameter.
- [x] Test headMain.
- [x] Make headMain.
- [x] Accept file from user.
- [x] Make head work for data only.
- [x] Make `'\n'` a constant.
- [x] Make `0` a constant.
- [x] Test giveBytes and giveLines.
- [x] Extract function to count and give lines.
- [x] Extract function to count the bytes.
- [x] Does -c counts the newline character also? (yes)
- [x] Add `bytes` (-c) option.
- [x] Object for options of `-c` and `-n`.
- [x] Pass count in object.
- [x] Change the name of `src/head.js`.
- [x] Add option for `count` of lines.
- [x] Add parameter to specify count of lines in head.
- [x] Tests for firstLines.
- [x] Parameterize the number of lines in firstLines. 
- [x] Extract splitting and joining of content.
- [x] Extract the logic of giving starting lines.
- [x] Should only give upto 10 lines.
- [x] Should split content in array to count.
- [x] Make head work for more than one line.
- [x] Make `head.js`.
- [x] Set an expectation/testCase for head.
- [x] Make `testHead.js` file.
- [x] Make `src` and `test` directories.
- [x] Establish contract for head.
- [x] Make `README.md`.
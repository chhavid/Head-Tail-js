# TAIL

- **TODO:**

  - [ ] Refactor parseArgs.
  - [ ] Parse and validate args for tail.
  - [ ] Add validations for tail.
  - [ ] Add -q option in tail.
  - [ ] Add -r option in tail.
  - [ ] Implement -q and -r functionality in tail.

  <br/>
  
- **CONSIDER:**
 
  - [ ] `0` is valid option argument in tail.

  <br/>

- **DONE:**

  - [x] Added -q and -r in parse.
  - [x] Modify slice function for tail.
  - [x] `+num` is also a valid option argument in tail.
  - [x] `-n +num` is also a valid option argument in tail.
  - [x] Make formatArgs for tail.
  - [x] Fix tail main.
  - [x] Add test for intermediate functions.
  - [x] Make arrow functions.
  - [x] Take file from command line for tail.
  - [x] Implement tail.js.
  - [x] Parameterized the throw message in parse.
  - [x] Implement `tail` for data.
  - [x] Implement tailMain.
  - [x] Add expectation/testCase for tail.
  - [x] Make `tailLib.js`.
  - [x] Make `testTailLib.js`.
  - [x] Read how tail works.
  - [x] Set contract for `tail`.

<br/>

# HEAD

- **TODO:**

- **Consider:**

- **DONE:**

  - [x] Take decision of byte or lines only once.
  - [x] Put only readfile in try catch.
  - [x] Fix isOption.
  - [x] Passing args in main. 
  - [x] Refactor validateOptions. 
  - [x] Refactor parseArgs. 
  - [x] Make mock for console of log and error.
  - [x] Should give console error if `file is invalid`.
  - [x] Modify and throw error messages.
  - [x] Correct `illegal count` error.
  - [x] Change name `count` to `line`.
  - [x] For both valid and invalid files, should give head of valid one and error for invalid file.
  - [x] Added validation of arguments in headMain.
  - [x] Giving array of objects for filename and content in mock function.
  - [x] Move validations in separate file.
  - [x] Test formatArgs.
  - [x] Removed regular expressions from conditions.
  - [x] Should throw error if count is 0
  - [x] Throw objects.
  - [x] Test intermediate parse functions.
  - [x] Test validate options.
  - [x] Should give error if both options are given together.
  - [x] Should also accept -num as -n num.
  - [x] Should work without space between n and num.
  - [x] Should give error if any other option than -n and -c is given.
  - [x] Should give error if there is options but no file.
  - [x] Format output with spaces ,symbol and fileName.
  - [x] Should override the option if same option is given again.
  - [x] Parser should give more information about the options.
  - [x] Modify contract of parseArgs.
  - [x] Give usage if no parameters are given.
  - [x] Case of -c with 0.
~~  - [x] Using delimiters in options.~~
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
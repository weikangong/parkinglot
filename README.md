# Prerequisites
1. Latest version of [node](https://nodejs.org/en/download/)
2. Latest version of [yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

# Set up
`yarn install`

# Run
Either:
1. Typing inputs manually in terminal: `yarn run start`
2. Feed in input files: `yarn run start < ./inputs/input1.txt`
A few sample input files have been populated in `./inputs`

# Assumptions
1. Accept upper/lower case words as input
2. Start and end of input will be trimmed
3. Input params are separated by space
4. Each line of input is separated by a newline
5. Lot assignment is based on a min heap to always assign smallest lot first
6. Validation checks for each params: event must be in string, vehicle must be in string, car plate must be in string and timestamp must be epoch time in number

# Corner cases
1. Reject duplicates on entry
2. Reject vehicles that does not exist on exit
3. Reject vehicles with negative time spent on exit
4. Reject invalid vehicle types

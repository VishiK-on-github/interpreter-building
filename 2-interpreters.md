# AST and Bytecode Interpreter

### AST Interpreter

AST Interpreter directly receives the AST created by the parser. Intepreter the
gives us the final result. The interpretation happens at runtime.

Example of code snippet and a possible AST:

#### Source Code

x = 15 x + 10 - 5

#### AST

[ program, [ - [assign, x, 15], - [sub, [add, x, 10], 5 ] ] ]

Refer: https://astexplorer.net/

### Bytecode Interpreter

In case of bytecode interpreter there is an additional step during static time
to emit bytecode, this step is known as the bytecode emitter. It yields bytecode
such as: push "hello" call "print". Then the bytecode is sent to the
interpreter. Bytecode is used for storage optimization instead of an AST we
would used an array of instructions, this also allows for more granualar
instructions and probably more optimized code

VMs are of two types:

1. Stack based VM: utilizes the stack data structure (LIFO) and the assumption
   is result is always at the top of the stack

2. Register based VM: uses virtual registers, the result is stored on a register
   know as "accumulator" which has a mapping to a real world register via
   register allocation

Stack-based machine: we have 2 pointers stack and instruction ones to keep track
of operation and result

- push $15
- set %0
- push %0
- push $10
- add
- push $5
- sub

set value pops value from stack and assigns it to variable storage

Example for generating bytecode from JAVA and using util to get readable
bytecode

Register-based machine: We have 4 normal registers and 3 special registers
instruction pointer, stack pointer, base pointer. Intel arch is register based
machine with a stack for recursive functions.

- mov r1, $15
- add r1, $10
- sub r1, $5

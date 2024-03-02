# Parsing Pipeline

The parsing pipeline consists broadly of the following steps:

Suppose we write a program: print "hello"

1. Tokenizer (lexical analysis): this is used to yield a stream of tokens. It
   does not guarantee if a program is syntactically correct.

token has type and value: [ID: "print"], [STRING: "hello"]

2. Parser (syntactic analysis): This is used to check if a program is
   syntactically valid or not in theory. In practice, it yields us a tree like
   representation know as abstract syntax tree or AST. This happens at static or
   compile time

<call name="print" args=['hello'] />

### Runtime Semantics:

Despite having similar AST stucture scope handling might differ across
programming languages. In our case JS exmaple gives us the result but PHP does
not. This is because JS implements closures and hence it can access the parents
scope for variables which cannot be done (now possible) by PHP.

### Language types:

Interpreted: It knows what the programs mean. It implements semantics itself it
knows what it means to create a variable etc

Compiled: It delegates the understanding / meaning to a target language. After
converting it still needs to be interpreted

We might convert P1 -> O using interpreter for P1 or

We might convert P1 -> P2 using a compiler and then P2 -> O using an interpreter
for P2. In most cases the interpreter for compiled languages is the CPU and it
interpretes the compiled code to machine instruction

### Interpreter types:

1. AST (recursive) based: tree like
2. Bytecode-interpreters (VM): array of instructions (assembly like mov etc)

### Compiler types:

1. Ahead-of-time (AOT) compilers: C++ might call interpreter at compile time to
   pre-evaluate parts for optimization
2. Just-in-time (JIT) compiler: code generation at runtime (JS)
3. AST-transformers (transpilers): transformation at AST level

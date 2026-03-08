# Que1️⃣: What is the difference between var, let, and const?

## Answer 1: 

`Var`, `let`, `const` are used to declare variables, but they handle **scope** and **reassignment** differently.

**`var`** is the legacy way to declare variables. It is **function-scoped**, meaning it is available throughout the function it's in, and it can be both **reassigned and redeclared**. It is hoisted as `undefined`, which can sometimes lead to logic errors.

**`let`** and **`const`** were introduced to be more predictable using **block scoping** (limited to the `{}` they are inside). **`let`** allows you to **reassign** a value later, while **`const`** is for values that **cannot be changed** once set. Unlike `var`, neither allows you to redeclare the same variable name in the same block.

So, now we can decisioned that-
* Use **`const`** by default for cleaner, safer code.
* Use **`let`** only if you know the value needs to change.
* Avoid **`var`** in modern development to prevent scoping issues.

---
# Que2️⃣ What is the spread operator (...)?
## Answer 2:

The spread operator allows you to "unpack" elements from an array or object into individual elements. It is commonly used for making shallow copies or merging data without mutating the original source.

* **Arrays:** `const newArr = [...oldArr, 4, 5];`
* **Objects:** `const newObj = { ...oldObj, key: 'value' };`

Example:
```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

console.log("value of array2 is: "arr2);
```
Output
```
value of array2 is:  [1,2,3,4,5]
```

---
# Que3️⃣ What is the difference between map(), filter(), and forEach()?
## Ans 3:

These are array methods used to iterate over data, but their "output" is what sets them apart.

* **`forEach()`**: Executes a function for each element. It **does not return** anything (returns `undefined`). `forEach()` just a loops.
* **`map()`**: Creates a **new array** by applying a function to every element of the original array. Use it when you want to transform data.
* **`filter()`**: Creates a **new array** containing only the elements that pass a specific condition (return `true`).

---
# Que4️⃣ What is an arrow function?
## Answer 4:

Arrow functions provide a shorter syntax for writing function expressions. They also handle the `this` keyword differently. Arrow functions are a shorter way to write functions in ES6.

**Normal way:**

```javascript
function add(a, b) {
  return a + b;
}

```

**Arrow:**

```javascript
const add = (a, b) => a + b;

```

---
# Que5️⃣ What are template literals?
## Answer 5:

Template literals are string literals that allow for embedded expressions and multi-line strings. They use **backticks** (``) instead of quotes.

* **Interpolation:** We can plug variables directly into the string using `${variable}`.
* **Multi-line:** We don't need `\n` to start a new line; just hit Enter inside the backticks.

**Example:**

```javascript
const name = "Jakaria";
console.log(`Hello, my name is ${name}!
Welcome to the script.`);

```
**Output:**
```
Hello, my name is Jakaria!
Welcome to the script.
```
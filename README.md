# Thener
Thener is a library that mimics the then portion of a promise, allowing stateful
capture of a value and uni-directional transfer function passed to then.

```javascript
const thn = new Thener(1);
const thn2 = thn.then(e => 2 * e);
console.log(thn2.value); // 2
```

## Installing

`npm install thener`

## Main Example

Import and Construct

```javascript
import thener from "thener";
const thn = new Thener(3);
console.log(thn.value) // 3
```

Then

```javascript
const thn2 = thn.then(e => 2 * e);
console.log(thn2.value); // 6
```

Finally

```javascript
thn2.finally(() => console.log("No Change to value"));
console.log(thn2.value); // 6
```

Then Again

```javascript
const thn3 = thn2.then(e => 2 * e);
console.log(thn3.value); // 12
```

Errors

```javascript
thn2.then(() => { throw "Er1" }).then(() => { throw "Er2" });
thn2.catch(e => console.log(e)); // print errors
```

## API

### Construction

Thener accepts any type and will store it internally. Thener's are immutable,
any action will return a clone, or new 
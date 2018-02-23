# Thener
Thener is a library that mimics the then portion of a promise, allowing stateful
capture of a value and uni-directional transfer using functions passed to then.

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
import Thener from "thener";
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
any action will return a clone, or Thener with new value and carried over errors.

```javascript
import Thener from "thener";
const thn = new Thener(3);
console.log(thn.value) // 3
```

### Methods

#### then

then allows you to pass in a function to process the internal Thener data with.
then checks if the passed in value is a function, if it is not, it clones the
current then. then wraps your function in a try/catch block, if an error occurs,
it is stored internally in an error array for processing using catch. If you
would like to change what error value is stored, wrap your function in a
try/catch block and throw the value you wish to capture. Errors on the current
Thener will be added to the new Thener.

```javascript
import Thener from "thener";
const thn = new Thener(3);
const thn2 = thn.then(e => 2 * e);
console.log(thn2.value); // 6
```

#### finally

finally allows you to execute a function that isn't connected to internal data.

```javascript
import Thener from "thener";
const thn = new Thener(3);
thn.finally(e => 2*e);
console.log(thn.value) // 3
```

#### catch

catch allows you to process all of the stored errors by passing in a function.

```javascript
thn.then(() => { throw "Er1" }).then(() => { throw "Er2" });
thn.catch(e => console.log(e)); // print errors
```

### properties

#### value

A read only property returning the current internal value.

```javascript
import Thener from "thener";
const thn = new Thener(3);
console.log(thn.value) // 3
```

## Scripts

### Testing

To run mocha/chai tests. `npm run test`

### Examples

To run the main example. `npm run ex`

## License
Thener.js is relased under the MIT license.

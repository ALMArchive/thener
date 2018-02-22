import Thener from "../Thener";

const thn = new Thener(3);
console.log(thn.value) // 3

const thn2 = thn.then(e => 2 * e);
console.log(thn2.value); // 6

thn2.finally(() => console.log("No Change to value"));
console.log(thn2.value); // 6

thn2.then(() => { throw "Er1" }).then(() => { throw "Er2" });
thn2.catch(e => console.log(e)); // print errors

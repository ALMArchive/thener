import chai from 'chai';

import Thener from '../thener';

describe("Thener", function () {
  describe("Construction", function () {
    it('All types give back Thener', function () {
      const testVals = [null, undefined, "", 1, [], {}, Symbol(), () => {}];
      testVals.map(e => {
        const thn = new Thener(e);
        chai.expect(thn.constructor.name === "Thener").to.be.true;
      });
    });
    it('Has Correct value after construction', function () {
      const testVals = [null, undefined, "", 1, [], {}, Symbol(), () => {}];
      testVals.map(e => {
        const thn = new Thener(e);
        chai.expect(thn.value === e).to.be.true;
      });
    });
  });
  describe("thening", function () {
    it('Passing then anything but a function should return same then', function () {
      const thn = new Thener(1);
      chai.expect(thn.then(2).value).to.be.equal(1);
    });
    it('then gives back a thener', function () {
      const thn = new Thener(1);
      chai.expect(thn.then(e => e).constructor.name === "Thener").to.be.true;
    });
    it("thening gives correct results", function () {
      const thn = new Thener(1);
      chai.expect(thn.then(e => 2 * e).value).to.equal(2);
    });
    it("chain thening gives correct results", function () {
      const thn = new Thener(1);
      const val = thn.then(e => 2 * e).then(e => 3 * e).value;
      chai.expect(val).to.equal(6);
    });
  });
  describe("finally", function () {
    it('finally gives back a thener', function () {
      const thn = new Thener(1);
      chai.expect(thn.finally(e => e).constructor.name === "Thener").to.be.true;
    });
    it("finally gives back then with original value", function () {
      const thn = new Thener(1);
      chai.expect(thn.then(e => 2 * e).finally(() => {}).value).to.equal(2);
    });
    it("finally actually calls our function", function () {
      let cntr;
      {
        let i = 0;
        cntr = () => i++
      }
      const thn = new Thener(1);
      thn.finally(cntr);
      chai.expect(cntr()).to.equal(1);
    });
  });
  describe("errors", function () {
    it('Check Error is stored', function () {
      const thn = new Thener(1);
      thn.then(function() {
        throw 2;
      });

      const erAr = [];
      const pushAr = (val) => erAr.push(val);

      thn.catch(pushAr);
      chai.expect(erAr[0]).to.equal(2);
    });
    it('Check Error Flag', function () {
      const thn = new Thener(1);
      thn.then(function () {
        throw 2;
      });

      const erAr = [];
      const pushAr = (val) => erAr.push(val);

      thn.catch(pushAr);
      chai.expect(thn.error).to.be.true;
    });
    it('Error maintained after additional then', function () {
      const thn = new Thener(1);
      thn.then(function () {
        throw 2;
      });

      const erAr = [];
      const pushAr = (val) => erAr.push(val);

      const thn2 = thn.then(e => e);
      thn2.catch(pushAr);
      chai.expect(thn2.error).to.be.true;
    });
    it('Check Multiple Errors are stored', function () {
      const thn = new Thener(1);
      thn.then(function () {
        throw 2;
      }).then(function() {
        throw 3;
      });

      let erAr = [];
      const pushAr = (val) => erAr.push(val);

      thn.catch(pushAr);
      chai.expect(erAr[0]).to.equal(2);
      chai.expect(erAr[1]).to.equal(3);
      thn.then(() => { throw 4 });

      erAr = [];
      thn.catch(pushAr);
      chai.expect(erAr[2]).to.equal(4);
    });
  });
});

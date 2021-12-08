import { BigNumber as EthersBigNumber } from '@ethersproject/bignumber';
import BigNumber from 'bignumber.js';
import { Undefinable } from 'tsdef';

BigNumber.config({ EXPONENTIAL_AT: [-100, 100] });

type TValue = BN | EthersBigNumber | BigNumber.Value;

const bigNumberify = (n: any): string | number => {
  if (n && n.toString) {
    const primitive = n.toString();

    if (typeof primitive !== 'object') {
      return primitive;
    }
  }

  return n;
};

class BN extends BigNumber {
  constructor(n: TValue, base?: number) {
    super(bigNumberify(n), base);
  }

  abs(): BN {
    return new BN(super.abs());
  }

  div(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.div(bigNumberify(n), base));
  }

  dividedBy = this.div;

  pow(n: TValue, m?: Undefinable<TValue>): BN {
    return new BN(super.pow(bigNumberify(n), bigNumberify(m)));
  }

  exponentiatedBy = this.pow;

  minus(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.minus(bigNumberify(n), base));
  }

  mod(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.mod(bigNumberify(n), base));
  }

  modulo = this.mod;

  times(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.times(bigNumberify(n), base));
  }

  multipliedBy = this.times;

  negated(): BN {
    return new BN(super.negated());
  }

  plus(n: TValue, base?: Undefinable<number>): BN {
    return new BN(super.plus(bigNumberify(n), base));
  }

  sqrt(): BN {
    return new BN(super.sqrt());
  }

  squareRoot = this.sqrt;

  toDecimalPlaces(
    decimalPlaces: number,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
  ): BN {
    return new BN(super.dp(decimalPlaces, roundingMode));
  }

  toSignificant(
    significantDigits: number,
    roundingMode: BigNumber.RoundingMode = BigNumber.ROUND_DOWN
  ): BN {
    return this.gte(1)
      ? this.toDecimalPlaces(6)
      : new BN(super.precision(significantDigits, roundingMode));
  }

  toEtherBigNumber(): EthersBigNumber {
    return EthersBigNumber.from(this.toFixed(0));
  }

  clamp(min: TValue, max: TValue): BN {
    return BN.min(BN.max(this, min), max);
  }

  static clamp(number: TValue, min: TValue, max: TValue): BN {
    return BN.min(BN.max(number, min), max);
  }

  static max(...n: TValue[]): BN {
    return new BN(super.max(...n.map(bigNumberify)));
  }

  static min(...n: TValue[]): BN {
    return new BN(super.min(...n.map(bigNumberify)));
  }

  static toBN(p: Promise<BigNumber>): Promise<BN> {
    return p.then((v) => new BN(v));
  }

  static parseUnits(value: TValue, decimals = 18): BN {
    return new BN(10).pow(decimals).times(bigNumberify(value));
  }

  static formatUnits(value: TValue, decimals = 18): BN {
    return new BN(value).div(new BN(10).pow(decimals));
  }

  static percentOf(value: TValue, percent: TValue): BN {
    return new BN(new BN(value).times(percent).div(100).toFixed(0));
  }

  static ratioOf(valueA: TValue, valueB: TValue): BN {
    return new BN(valueA).div(valueB).times(100);
  }

  static ZERO = new BN(0);
  static MaxUint256 =
    '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'; // TODO: What about solana?
}

export type TEtherBigNumber = EthersBigNumber;

export default BN;
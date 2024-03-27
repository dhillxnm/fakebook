'use strict';
export default 'Shape';

export class Shape {
  constructor(name, colour) {
    this._name = name;
    this._colour = colour;
  }

  get name() {
    return this._name;
  }

  get colour() {
    return this._colour;
  }

  getInfo() {
    return `${this._colour} ${this._name}`;
  }
}
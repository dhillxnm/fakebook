class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return `ID: ${this.#id}, Name: ${this.#name}, Username: ${this.#userName}, Email: ${this.#email}`;
  }
}

export default User;

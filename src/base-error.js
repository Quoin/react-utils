class BaseError extends Error {
    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = `BaseError`;
    }
}

export default BaseError;

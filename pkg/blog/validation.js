const { Validator } = require('node-input-validator');

const Post = {
    title: 'required|string',
    content: 'required|string'
};

const PostPartial = {
    title: 'string',
    content: 'string'
};

const validate = async (data, schema) => {
    let v = new Validator(data, schema); // this is where the validation is set up
    let e = await v.check(); // this is where the validation hapens
    if (!e) {
        throw {
            code: 400,
            error: v.errors
        };
    }
};

module.exports = {
    Post,
    PostPartial,
    validate
};
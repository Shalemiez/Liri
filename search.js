const searchFor = () => {
    const arguments = process.argv;
    let argArr = [];
    for (let i = 3; i < arguments.length; i++) {
        argArr.push(arguments[i]);
    }
    return argArr.join("+");
};


module.exports = searchFor;

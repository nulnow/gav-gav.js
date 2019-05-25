/**
 * Searchs for arg provided by command line
 * arg type: --argName=argValue
 */
module.exports = function getArg(arg, def) {
    const regexp = RegExp(`--${arg}=(\\w{0,})`);
    return process.argv.find(arg => arg.match(regexp)) ?
        process.argv.find(arg => arg.match(regexp)).split('=')[1] : def;
}
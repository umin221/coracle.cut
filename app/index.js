var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);
        console.log(arguments)
    },
    initializing: function () {
        console.log('initializing 1 just ran');
    },
    prompting: function () {
        console.log('prompting 2 just ran');
    },
    configuring: function () {
        console.log('configuring 2 just ran');
    },
    writing: function () {
        var appName = arguments[0];
        if (appName) {
            this.fs.copy(
                this.templatePath('src/base/**/*.*'),
                this.destinationPath('src/'+ appName +'/')
            );
        } else {
            this.fs.copy(
                this.templatePath('**/*.*'),
                this.destinationPath('')
            );
        }
        console.log('writing 2 just ran');
    },
    install: function () {
        console.log('install 2 just ran');
    },
    end: function () {
        console.log('end 2 just ran');
    }
});
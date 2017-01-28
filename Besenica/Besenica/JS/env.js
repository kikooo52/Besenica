var Game = {};
Game.Env = {
    options: {},
    get: function (key) {
        if (typeof this.options[key] == 'undefined') {
            return null;
        }
        return this.options[key];
    },
    set: function (key, value) {
        this.options[key] = value;
    },
}

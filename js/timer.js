var Timer = function(){
    this.time = 0;
}

Timer.prototype.increment = function() {
    this.time++;
    if (this.time == 60) {
        this.reset();
    }    
}

Timer.prototype.reset = function() {
    this.time = 0;
}

Timer.prototype.modullo = function(mod) {
    return this.time % mod == 0;
}

Timer.prototype.less_than = function(amount) {
    return this.time < amount;
}

Timer.prototype.greater_than = function(amount) {
    return this.time > amount;
}
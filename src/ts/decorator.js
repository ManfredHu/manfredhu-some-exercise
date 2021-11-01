var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return console.log('123', c, r, target, key) && c > 3 && r && Object.defineProperty(target, key, r), r;
};
function thinFace(a) {
    console.log(a);
    console.log('开启瘦脸');
}
function IncreasingEyes(a) {
    console.log(a);
    console.log('增大眼睛');
}
var Girl = /** @class */ (function () {
    function Girl() {
    }
    Girl = __decorate([
        thinFace,
        IncreasingEyes
    ], Girl);
    return Girl;
}());

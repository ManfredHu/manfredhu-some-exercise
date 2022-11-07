"use strict";
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function camelCase(str) {
    return str.split('_').map((j, idx) => {
        j = j.toLowerCase();
        return idx === 0 ? j : capitalize(j);
    }).join('');
}
console.log(camelCase('TEST_VARIABLE'));

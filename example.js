SecureJSONLogic = require('./index.js');

var url=require('url');

var allowedVars = [
    'u.protocol',
    'u.slashes',
    'u.hostname',
    'u.host',
    'u.hostSpit',
    'u.port',
    'u.hash',
    'u.search',
    'u.query',
    'u.pathname',
    'u.path',
    'u.href',
    'u.hostnameSplit',
    'u.hostnameSplit.length'
];

var testLogicObject = {
    fkt: '&&',
    params: [
        {
            fkt: '==',
            params: [
                {
                    type: 'number',
                    name: 3
                },
                {
                    type: 'var',
                    name: 'u.hostnameSplit.length'
                }
            ]
        },
        {
            fkt: '==',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.com'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": '||',
            params: [
                {
                    "fkt": 'startswith',
                    params: [

                        {
                            type: 'var',
                            name: 'u.hostname'
                        },
                        {
                            type: 'string',
                            name: 'www.'
                        }
                    ]
                },
                {
                    "fkt": 'endswith',
                    params: [
                        {
                            type: 'var',
                            name: 'u.hostname'
                        },
                        {
                            type: 'string',
                            name: '.com'
                        }
                    ]
                }
            ]
        }
    ]
};

var testInputPositive = {
    u: url.parse('http://www.amazon.com/foobar?foo=bar')
};
testInputPositive.u.hostnameSplit=testInputPositive.u.hostname.split('.');

var testInputNegative = {
    u: url.parse('http://www.anydomain.com/foobar?foo=bar')
};
testInputNegative.u.hostnameSplit=testInputNegative.u.hostname.split('.');

console.log('## running example ##');

console.time("renderTime");
var f = SecureJSONLogic(testLogicObject, allowedVars);
console.timeEnd("renderTime");

console.log('### generated function: ###');
console.log(f.toString());
console.log('#############################');

console.log('### result for testInput: ###');
console.log(f(testInputPositive) + '   <- this should be true');
console.log(f(testInputNegative) + '   <- this should be false');
console.log('#############################');

var c = 5000000;
console.log('### time measurement ( running ' + c + ' times) ###');
console.time("exectime");
while (c > 0) {
    f(testInputPositive);
    c--;
}
console.timeEnd("exectime");
console.log('#################################################');
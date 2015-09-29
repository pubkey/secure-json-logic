SecureJSONLogic = require('./index.js');

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

var testInput = {
    u: {
        hostname: 'www.amazon.com',
        hostnameSplit: [
            'www',
            'amazon',
            'com'
        ]
    }
};


console.log('## running example ##');

console.time("renderTime");
var f = SecureJSONLogic(testLogicObject, allowedVars);
console.timeEnd("renderTime");

console.log('### generated function: ###');
console.log(f.toString());
console.log('#############################');

console.log('### result for testInput: ###');
console.log(f(testInput) + '   <- this should be true');
console.log('#############################');

var c=5000000;
console.log('### time measurement ( running '+c+' times) ###');
console.time("exectime");
while(c>0){
    f(testInput);
    c--;
}
console.timeEnd("exectime");
console.log('#################################################');
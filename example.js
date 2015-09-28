SecureJSONLogic=require('./index.js');

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
    'u.href'
];

var testLogicObject= {
    fkt: 'OR',
        params: [
        {
            fkt: 'equals',
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
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.de'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.co.uk'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.fr'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.es'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.it'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.cn'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.ca'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        },
        {
            "fkt": 'equals',
            params: [
                {
                    type: 'string',
                    name: 'www.amazon.co.jp'
                },
                {
                    type: 'var',
                    name: 'u.hostname'
                }
            ]
        }
    ]
};

var testInput={
    u:{
        hostname: 'www.amazon.de'
    }
};


var f=SecureJSONLogic(testLogicObject,allowedVars);

console.log('### generated function: ###');
console.log(f.toString());
console.log('###########################');

console.log('### result for testInput: ###');
console.log(f(testInput)+'   <- this should be true');
console.log('###########################');
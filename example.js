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
            "fkt": 'AND',
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

var testInput={
    u:{
        hostname: 'www.amazon.com'
    }
};


var f=SecureJSONLogic(testLogicObject,allowedVars);

console.log('### generated function: ###');
console.log(f.toString());
console.log('###########################');

console.log('### result for testInput: ###');
console.log(f(testInput)+'   <- this should be true');
console.log('###########################');
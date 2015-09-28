# secure-json-logic
Use logic-objects from uncertain sources and run them locally without breaking the own system
This module is optimized for performance-issues.

# Installation
`npm install secure-json-logic --save`

# npm page
[Visit npm-page](https://www.npmjs.com/package/secure-json-logic)

# github
[Visit github-page](https://github.com/danielsun174/secure-json-logic)

# example usage
Example usage is in the [example.js](https://github.com/danielsun174/secure-json-logic/blob/master/example.js) - file


# usage
```
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
//the above call will make 'f' a function like:
f=function(i) {
    try {
        if ((
            ("www.amazon.com" === i.u.hostname) ||
            ((i.u.hostname.indexOf("www.") === 0) && (i.u.hostname.substring(i.u.hostname.length - ".com".length, i.u.hostname.length) === ".com"))
            )) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

console.log('### generated function: ###');
console.log(f.toString());
console.log('###########################');

console.log('### result for testInput: ###');
console.log(f(testInput)+'   <- this should be true');
console.log('###########################');
```
/**
 *
 * @return {Function}
 * @type function
 * @constructor
 */
module.exports = (function SecureJSONLogic() {

    var self = this;


    var logicMethods = {
        /**
         * '=='
         * @param {Array.<{name: String, name: String}>} params array with param-objects, length=2
         * @param {{}} allowedVars
         */
        "==": function (params, allowedVars) {
            if (params.length == 2 &&
                self._paramParse(params[0], allowedVars) &&
                self._paramParse(params[1], allowedVars)
            ) {
                return self._paramParse(params[0], allowedVars) + '===' + self._paramParse(params[1], allowedVars);
            } else {
                return 'false';
            }
        },
        /**
         * true if param[] starts with param[1]
         * @param {Array.<{name: String, name: String}>} params array with param-objects, length=2
         * @param {{}} allowedVars
         */
        startswith: function (params, allowedVars) {
            if (params.length == 2 &&
                self._paramParse(params[0], allowedVars) &&
                self._paramParse(params[1], allowedVars)
            ) {
                return self._paramParse(params[0], allowedVars) + '.indexOf(' + self._paramParse(params[1], allowedVars) + ') === 0';
            } else {
                return 'false';
            }
        },
        /**
         * true if param[] starts with param[1]
         * @param {Array.<{name: String, name: String}>} params array with param-objects, length=2
         * @param {{}} allowedVars
         */
        endswith: function (params, allowedVars) {
            if (params.length == 2 &&
                self._paramParse(params[0], allowedVars) &&
                self._paramParse(params[1], allowedVars)
            ) {
                return self._paramParse(params[0], allowedVars) + '' +
                    '.substring(' + self._paramParse(params[0], allowedVars) + '.length' +
                    '-' + self._paramParse(params[1], allowedVars) + '.length,' +
                    ' ' + self._paramParse(params[0], allowedVars) + '.length' + ') === ' + self._paramParse(params[1], allowedVars);
            } else {
                return 'false';
            }
        }
    };


    /**
     * return the string which should be added to the if-code
     * @param {{type: String, name: String}} param
     * @param {String[]} allowedVars only vars contained in this array are allowed
     * @return {string|boolean}
     */
    self._paramParse = function (param, allowedVars) {
        param.type = param.type.toLowerCase();
        var isType = typeof param.name;

        switch (param.type) {
            case 'string':
                if (isType === "string") {
                    param.name = param.name.replace(/["']/g, '');
                    return '"' + param.name + '"';
                }
                break;

            case 'var':
                if (isType === "string") {
                    if (allowedVars.indexOf(param.name) > -1) {
                        return 'i.' + param.name;
                    } else {
                        return false;
                    }
                }
                break;

            case 'number':
                if (isType === "number") {
                    return param.name;
                }
                break;
        }

        return false;
    };

    /**
     * creates the code-string for the given logikObject
     * @param {{params: {}, fkt: String}} logikObj
     * @param {String[]} allowedVars only vars contained in this array are allowed
     * @return {String|boolean} string with logic-code or false if not parseable
     */
    self._makeCode = function (logikObj, allowedVars) {
        var ret = '(';

        if (!logikObj || !logikObj.fkt) {
            return false;
        }


        switch (logikObj.fkt) {
            case "&&":
                var ands = [];
                logikObj.params.forEach(function (lobj) {
                    var add = self._makeCode(lobj, allowedVars);
                    if (add) {
                        ands.push(add);
                    }
                });
                ret += ands.join(' && ');
                break;
            case "||":
                var ors = [];
                logikObj.params.forEach(function (lobj) {
                    var add = self._makeCode(lobj, allowedVars);
                    if (add) {
                        ors.push(add);
                    }
                });
                ret += ors.join(' || ');
                break;
            default:


                if (logicMethods[logikObj.fkt]) {
                    ret += logicMethods[logikObj.fkt](logikObj.params, allowedVars);
                } else {
                    return 'false';
                }
                break;
        }
        ret += ')';
        return ret;
    };

    /**
     * get the function
     * @param {{}} logikObject
     * @param {String[]} allowedVars only vars contained in this array are allowed
     * @return {function({Object})} returns function which needs an input-object with the logic-vars
     */
    self.makeFunction = function makeFunction(logikObject, allowedVars) {
        var logikString = self._makeCode(logikObject, allowedVars);

        var returnFkt = new Function();
        var evalCode = 'returnFkt=' +
            'function(i){' +
            '   try{' +
            '       if(' + logikString + '){return true;}' +
            '   }catch(e){' +
            '       ' +
            '   }' +
            '   return false;'+
            '}';

        //make function-code smaller
        evalCode = evalCode.replace(/\s+/g, ' ');
        evalCode = evalCode.replace(/\{ /g, '{');
        evalCode = evalCode.replace(/\} /g, '}');
        evalCode = evalCode.replace(/ && /g, '&&');
        evalCode = evalCode.replace(/ \=\=\= /g, '===');
        evalCode = evalCode.replace(/ \|\| /g, '||');
        try {
            eval(evalCode);
        } catch (e) {
            console.error('cant build logic-function of given logic-object');
            console.dir(e);
            var stack = new Error().stack;
            console.log(stack);
            console.log('++++++++++++++++++++++++++++++');
            console.log(evalCode);
            process.exit(1);
        }
        return returnFkt;
    };
    return self.makeFunction;
})();

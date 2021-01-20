/*
 *  jQuery Form Validator v. 1.1
 *  Author: Daniele Di Bernardo
 *  http://www.marzapower.com/
 *  
 *  This plugin is a modified version from this plugin:
 *      http://marcgrabanski.com/code/clean-form-validation
 *  by Marc Grabanski
 *
 *
 *  The jQuery Form Validator plugin is licensed under a Creative Commons License and is copyrighted (C)2008-2009 by Daniele Di Bernardo.
 *  The license page can be found at: http://creativecommons.org/licenses/by-nc-sa/2.5/it/
 * 
 */
 
/**
 * More detailed info can be found at the web page http://www.marzapower.com/blog/show/250 or
 * in the README.txt file that you should have received with this script.
 *
 */
    
 
var ValidatorClass = function() {}

ValidatorClass.prototype = {

    init: function (settings) {
        var mySettings = settings;
        
        if (settings['requiredFieldMsg'] == null)  mySettings['requiredFieldMsg']   = '* field is required';
        if (settings['emailFieldMsg'] == null)     mySettings['emailFieldMsg']      = '@ field must contain valid emails';
        if (settings['numericFieldMsg'] == null)   mySettings['numericFieldMsg']    = 'Green fields must contain numbers';
        if (settings['integerFieldMsg'] == null)   mySettings['integerFieldMsg']    = 'Blue fields must contain integer values';
        if (settings['bindEvent'] == null)         mySettings['bindEvent']          = 'click';
        if (settings['allowNullNumbers'] == null 
            || settings['allowNullNumbers'] != true)    mySettings['allowNullNumbers']   = false;
        
        if (settings['errorColors'] == null)
            mySettings['errorColors'] = {
                isRequired: '1px solid #ff0000',
                isEmail:    '1px solid #ff0000',
                isNumeric:  '1px solid #ff0000',
                isInteger:  '1px solid #ff0000',
                hasRegex:   '1px solid #ff0000'
            };
        
        this.settings = mySettings;
        this.form = $(this.settings["form"]);
        
        this.setElementsBinding();
        
    },
    
    reset: function() {
        var _this = this;
        
        if(this.settings) {
	        $(this.settings['bindElement']).each( function(index, element) {
	            $(element).unbind(_this.settings['bindEvent']);
	        });
	        this.settings = null;
        }
    },
    
    setElementsBinding : function() {
        var _this = this;
        
        if (this.isArray(this.settings['bindElement'])) {
            $.each(this.settings['bindElement'], function(i, el) {
                _this.bindElement(_this.settings['bindElement'][i], _this.settings['callback'][i]);
            });
        } else {
            this.bindElement(this.settings['bindElement'], this.settings['callback']);
        }
    },

    bindElement: function (element, callback) {
        var _this = this;

        $(element).bind(this.settings['bindEvent'], function() {
            error = _this.validate();

            if (_this.isEmpty(error)) {
                callback();
            } else {
                alert(error);
                return false;
            }
        });

    },
    
    validate: function () {
        error = '';
        validationTypes = new Array("isRequired", "isEmail", "isNumeric", "isInteger", "hasRegex");
        
        for (var n = 0; n < validationTypes.length; ++n) {    
            var x = this.settings[validationTypes[n]];
            var alreadyAlerted = false;
            
            if (x != null) {
                for(var i = 0; i < x.length; ++i)  {
                    var inputField;
                    var inputType;
                    var regex;
                    var message;
                    var name;
                    
                    if (validationTypes[n] != 'hasRegex') {
                        name = x[i];   
                    } else {
                        name = x[i][0];
                        regex = x[i][1];
                        message = x[i][2];
                    }
                    
                    var split = name.split('@');
                    if (split.length == 2) {
                        name = split[0];
                        inputType = split[1];
                    } else {
                        inputType = 'input';
                    }
                    
                    inputField = $(this.form).find(inputType + '[name=' + name + ']');
                    if ($(inputField).size() == 0) {
                        message = "Could not find a field with name '" + name + "' and type '" + inputType + "'!";
                        return message;
                    }
                    
                    switch (validationTypes[n]) {
                        case "isRequired" :
                            valid = !this.isEmpty($(inputField).val());
                            errorMsg = this.settings["requiredFieldMsg"];
                            break;
                        case "isEmail" :
                            valid = this.isEmail($(inputField).val());
                            errorMsg = this.settings["emailFieldMsg"];
                            break;
                        case "isNumeric" :
                            valid = this.isNumeric($(inputField).val());
                            errorMsg = this.settings["numericFieldMsg"];
                            break;
                        case "isInteger" :
                            valid = this.isInteger($(inputField).val());
                            errorMsg = this.settings["integerFieldMsg"];
                            break;
                        case "hasRegex" :
                            valid = this.testRegex($(inputField).val(), regex);
                            errorMsg = message;
                            break;
                        case "isDate" :
                            valid = this.isDate($(inputField).val());
                            errorMsg = message;
                            break;
                    }
                    
                    if(!valid) {
                        if (!alreadyAlerted || validationTypes[n] == 'hasRegex') {
                            error += errorMsg + "\n";
                            alreadyAlerted = true;
                        }
                        $(inputField).css('border', this.settings["errorColors"][validationTypes[n]]);
                    } else {
                        $(inputField).css('border', '');
                    }
                }
            }
        }
        
        return error;
    },
    
    // returns true if the string is not empty
    isEmpty: function (str) {
        return (str == null) || (str == undefined) || (str.length == 0) || /^\s.$/.test(str) ;
    },
    
    // returns true if the string is a valid email
    isEmail: function (str) {
        if(this.isEmpty(str)) return false;
        var re = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i
        return re.test(str);
    },
    
    // returns true if the string only contains characters 0-9 and is not null
    isNumeric: function (str) {
        if(this.isEmpty(str) && !this.settings['allowNullNumbers']) return false;
        if (isNaN(str)) return false;
        return true;
    },
    
    isInteger: function (str) {
        if (this.isEmpty(str) && !this.settings['allowNullNumbers']) return false;
        if (!str.match(/^[-]?\d+$/)) return false;
        return true;
    },
    
    isArray: function (obj) {
        return obj.constructor == Array;
    },
    
    testRegex : function (str, regex) {
        return regex.test(str);
    },

};

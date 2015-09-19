var Viewport = function(d) {
    // We pass window through as a parameter to make this more easily testable
    // by providing mock DOM properties.
    d = (typeof d !== 'undefined') ? d : window;

    // Return true if value is defined
    var defined = function(value) {
        return (typeof value !== 'undefined');
    };

    // Publicly accessable object
    return {
        window: function(property) {
            switch (property) {
                case 'height':
                    return d.document.documentElement.clientHeight;
                case 'width':
                    return d.document.documentElement.clientWidth;
                case 'pixelRatio':
                    return (defined(d.devicePixelRatio)) ? d.devicePixelRatio : 1;
                case 'orientation':
                    return (d.document.documentElement.clientWidth >= d.document.documentElement.clientHeight) ? 'landscape' : 'portrait';
            }
        },
        register: function(alias, properties) {
            this.aliases[alias] = properties;
        },
        parse: function(stringObject) {
            return (typeof stringObject === 'string') ? this.aliases[stringObject] : stringObject;
        },
        matches: function(condition, callback) {
            var obj = this.parse(condition);

            var lt, gt, eq;
            // Less than or equal to
            lt = function(a, b) {
                return (a <= b);
            };
            // Greater than or equal to
            gt = function(a, b) {
                return (a >= b);
            };
            // Equal to (absolute)
            eq = function(a, b) {
                return (a === b);
            };
            // Array of boolean values through ternary operation
            var matches = [
                (defined(obj.height) && defined(obj.height.max)) ? lt(this.window('height'), obj.height.max) : true,
                (defined(obj.height) && defined(obj.height.min)) ? gt(this.window('height'), obj.height.min) : true,
                (defined(obj.width) && defined(obj.width.max)) ? lt(this.window('width'), obj.width.max) : true,
                (defined(obj.width) && defined(obj.width.min)) ? gt(this.window('width'), obj.width.min) : true,
                (defined(obj.pixelRatio)) ? eq(this.window('pixelRatio'), obj.pixelRatio) : true,
                (defined(obj.orientation)) ? eq(this.window('orientation'), obj.orientation) : true,
            ];
            // Return boolean, expecting that no match is false for a true value
            if (!defined(callback)) {
                return (matches.indexOf(false) === -1);
            }
            callback();
        },
        aliases: {}
    };
};
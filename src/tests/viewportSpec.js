describe('Testsuite for viewport.js', function() {

    var ViewportClient = Viewport({
        document: {
            documentElement: {
                clientHeight: 886,
                clientWidth: 1700
            }
        },
        //devicePixelRatio: 1
    });

    it('Expect .window() to return the correct value', function() {
        expect(ViewportClient.window('height')).toBe(886);
        expect(ViewportClient.window('width')).toBe(1700);
        expect(ViewportClient.window('pixelRatio')).toBe(1);
        expect(ViewportClient.window('orientation')).toBe('landscape');
    });

    it('Expect .window() to return the correct value, when orientation should be portrait and .devicePixelRatio is provided', function() {
        var ViewportClient = Viewport({
            document: {
                documentElement: {
                    clientHeight: 1700,
                    clientWidth: 886
                }
            },
            devicePixelRatio: 2
        });

        expect(ViewportClient.window('pixelRatio')).toBe(2);
        expect(ViewportClient.window('orientation')).toBe('portrait');
    });

    var setAObj = {
        height: {
            max: 900,
            min: 400
        },
        width: {
            max: 1920,
            min: 1024
        },
        pixelRatio: 1
    };
    it('Expect .register() to add a property to .aliases with the object values', function() {
        ViewportClient.register('setA', setAObj);
        expect(ViewportClient.aliases.setA).toBe(setAObj);
    });

    it('Expect .parse() to return the object passed to it', function() {
        expect(ViewportClient.parse('setA')).toBe(setAObj);
        expect(ViewportClient.parse(setAObj)).toBe(setAObj);
    });

    it('Expect .matches() when given a condition to return the correct value', function() {
        expect(ViewportClient.matches(setAObj)).toBeTruthy();
        var setBObj = setAObj;
        setBObj.width.max = 1600;
        expect(ViewportClient.matches(setBObj)).toBeFalsy();
    });

    it ('Expect .caller() to call the given callback when given a passing condition', function() {
        var value;
        ViewportClient.matches(setAObj, function() {
            value = 1;
        });
        expect(value).toBe(1);
    });
});
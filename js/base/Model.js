window.Model = function(options) {
    let resourceName = options.resourceName
    return {
        init: function() {
            var APP_ID = 'ySmdY9GX63D3F15CMFaOnPc7-gzGzoHsz';
            var APP_KEY = 'tP6AYDHargVJmsN7MmoMvlcx';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        fetch: function() {
            var query = new AV.Query(resourceName);
            return query.find()
        },
        save: function(object) {
            var X = AV.Object.extend(resourceName);
            var x = new X();
            return x.save(object)
        }
    }
}
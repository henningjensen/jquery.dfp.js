describe('Request Non-Personalized Ads', function() {
    var cleanup = function () {
        $('.adunit').remove();
        $('script[src*="gpt.js"]').remove();
        window.googletag = undefined;
    };
    beforeEach(cleanup);
    afterEach(cleanup);

    it('Gets called correctly (page, default = false)', function(done) {
        var mock = {};
        mock.setRequestNonPersonalizedAds = function(param) {};

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function() {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setRequestNonPersonalizedAds: mock.setRequestNonPersonalizedAds
            };
        };

        spyOn(mock, 'setRequestNonPersonalizedAds').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
        });

        waitsForAndRuns(function() {
          if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
            return true;
          } else {
            return false;
          }
        }, function() {
          // DFP serves personalized ads by default, so no need to tell them not to
          expect(mock.setRequestNonPersonalizedAds).not.toHaveBeenCalled();
          done();
        }, 5000);
    });

    it('Gets called correctly (page, false)', function(done) {
        var mock = {};
        mock.setRequestNonPersonalizedAds = function(param) {};

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function() {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setRequestNonPersonalizedAds: mock.setRequestNonPersonalizedAds
            };
        };

        spyOn(mock, 'setRequestNonPersonalizedAds').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setRequestNonPersonalizedAds: false
        });

        waitsForAndRuns(function() {
          if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
            return true;
          } else {
            return false;
          }
        }, function() {
          // DFP serves personalized ads by default, so no need to tell them not to
          expect(mock.setRequestNonPersonalizedAds).not.toHaveBeenCalled();
          done();
        }, 5000);
    });

    it('Gets called correctly (page, true)', function(done) {
        var mock = {};
        mock.setRequestNonPersonalizedAds = function(param) {};

        var dummyTag = {};
        dummyTag.enableServices = function() {};
        dummyTag.pubads = function() {
            return {
                enableSingleRequest: function () {},
                setTargeting: function () {},
                collapseEmptyDivs: function () {},
                setRequestNonPersonalizedAds: mock.setRequestNonPersonalizedAds
            };
        };

        spyOn(mock, 'setRequestNonPersonalizedAds').and.callThrough();

        jQuery('body').append('<div class="adunit"></div>');
        jQuery.dfp({
            dfpID: 'xxxxxxxxx',
            googletag: dummyTag,
            setRequestNonPersonalizedAds: true
        });

        waitsForAndRuns(function() {
          if (typeof window.googletag.getVersion === 'function' && $('.adunit').data('googleAdUnit')) {
            return true;
          } else {
            return false;
          }
        }, function() {
          expect(mock.setRequestNonPersonalizedAds).toHaveBeenCalled();
          expect(mock.setRequestNonPersonalizedAds.calls.count()).toEqual(1);
          expect(mock.setRequestNonPersonalizedAds.calls.argsFor(0)[0]).toEqual(1);
          done();
        }, 5000);
    });
});

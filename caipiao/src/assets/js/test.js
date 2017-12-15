


(function() {

    function Ad() {
    }

    Ad.prototype.ad_func = function() {

    var ad = document.createElement("div");
    var adimg = document.createElement("img");
    ad.style.cssText = 'position:fixed; background: white; width: 100%; height: 100%; opacity:1; color: #ddd; z-index: 999; transition: all 1s';
    adimg.style.cssText = 'width:100%';
    adimg.src="http://tease.fancelue.com/scripts/ad/hm.ad1.png";
    ad.appendChild(adimg);
    document.body.appendChild(ad);

    setTimeout(function(){
      ad.style.opacity = '0';
    }, 3000);



     // cordova.InAppBrowser.open('http://www.baidu.com', '_blank', 'location=no,toolbar=no')

        return this;
    }

    window.Ad = Ad;

})(window);
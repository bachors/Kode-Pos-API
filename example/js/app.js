/* https://github.com/bachors/TMDb7 */

// Init App
var KP = new Framework7({
    modalTitle: 'Message',
    // Enable Material theme
    material: true,
    template7Pages: true
});

// Expose Internal DOM library
var f7 = Dom7;

// Add main view
var mainView = KP.addView('.view-main', {});

var tampung = false;

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
f7(document).on('ajaxStart', function(e) {
    KP.showPreloader();
});
f7(document).on('ajaxComplete', function(e) {
    KP.hidePreloader();
});

// Callbacks for specific pages when it initialized
KP.onPageInit('home', function(page) {

    load_data('list_propinsi.json', 'Propinsi', 'list_kotakab');

    f7('body').on('click', '.aw', function() {
        uri = f7(this).data('uri');
        title = f7(this).data('title');
        load_data(uri, title, 'kota_kab');
        return false;
    });

    f7('body').on('click', '#home', function() {
        load_data(tampung, 'Propinsi', 'list_kotakab');
        return false;
    });	

    f7('body').on('click', '.searchbar-clear', function() {
        pilter('');
        return false;
    });
	
	f7('#query').keydown(function() {
		setTimeout(function() {
			var d = f7('#query').val();
			pilter(d);
		}, 50)
	});

});

/* ===== Change statusbar bg when panel opened/closed ===== */
f7('.panel-left').on('open', function() {
    f7('.statusbar-overlay').addClass('with-panel-left');
});
f7('.panel-left').on('close', function() {
    f7('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});

mainView.router.loadPage('home.html');

function load_data(uri, title, uri2) {

    var html = '';
    if (typeof uri === 'object') {
        f7.each(uri, function(i, a) {
            html += '<li><a data-uri="' + uri2 + '/' + i + '.json" data-title="' + a + '" class="aw item-content">';
            html += '	<div class="item-media"><i class="material-icons">arrow_forward</i></div>';
            html += '	<div class="item-inner">';
            html += '		<div class="item-title-row">';
            html += '			<div class="item-title">' + a + '</div>';
            html += '		</div>';
            html += '	</div>';
            html += '</a></li>';
        });
        f7('#title').html(title);
        f7('#dataList').html(html);
    } else {

        f7.ajax({
            url: 'https://kodepos-2d475.firebaseio.com/' + uri,
            dataType: 'json',
            success: function(data) {
                if (title == 'Propinsi' && tampung === false) {
                    tampung = data;
                }
                if (Object.prototype.toString.call(data) === '[object Array]') {
                    f7.each(data, function(i, a) {
                        html += '<li><a class="item-content">';
                        html += '	<div class="item-media"><i class="material-icons">place</i></div>';
                        html += '	<div class="item-inner">';
                        html += '		<div class="item-title-row">';
                        html += '			<div class="item-title">' + data[i].kelurahan + '</div>';
                        html += '			<div class="item-after">' + data[i].kodepos + '</div>';
                        html += '		</div>';
                        html += '		<div class="item-text">' + data[i].kecamatan + '</div>';
                        html += '	</div>';
                        html += '</a></li>';
                    });
                } else {
					var x = sortProperties(data);
					f7.each(x, function(i, a) {
                        html += '<li><a data-uri="' + uri2 + '/' + x[i][0] + '.json" data-title="' + x[i][1] + '" class="aw item-content">';
                        html += '	<div class="item-media"><i class="material-icons">arrow_forward</i></div>';
                        html += '	<div class="item-inner">';
                        html += '		<div class="item-title-row">';
                        html += '			<div class="item-title">' + x[i][1] + '</div>';
                        html += '		</div>';
                        html += '	</div>';
                        html += '</a></li>';
                    });
                }
                f7('#title').html(title);
                f7('#dataList').html(html);
            },
            error: function() {
                KP.hidePreloader();
                KP.addNotification({
                    message: 'No Internet Connection'
                });
            }
        });

    }

}

function pilter(x){
	var el = f7('li');
	f7.each(el, function(i, a) {
		if(x == ''){
			f7(a).show();
		}else{
			var t = f7(a).find('.item-title').text();
			var r = new RegExp(x, "ig");
			if(t.match(r)){
				f7(a).show();
			}else{
				if(f7(a).find('.item-text').text() != null && f7(a).find('.item-text').text() != undefined){
					var tt = f7(a).find('.item-text').text();
					if(tt.match(r)){
						f7(a).show();
					}else{
						f7(a).hide();
					}
				}else{
					f7(a).hide();
				}
			}
		}
	});
}

function sortProperties(obj)
{
  // convert object into array
	var sortable=[];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(a, b)
	{
		var x=a[1].toLowerCase(),
			y=b[1].toLowerCase();
		return x<y ? -1 : x>y ? 1 : 0;
	});
	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}

// ==UserScript==
// @name          Toggl - Productivity Pack
// @namespace     https://github.com/mii-at/toggl-productivity-pack
// @description   This extension provides several productivity enhancements for Toggl time tracking (http://www.toggl.com).
// @icon          https://github.com/mii-at/toggl-productivity-pack/raw/master/resources/toggl-logo.png
// @version       1.1
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include       https://www.toggl.com/report*
// ==/UserScript==

function setState(context, state) {
	$('li:not(.opt-group) input[type="checkbox"][value!="0"]', $(context).parent()).attr('checked', !state);
	$('li:not(.opt-group) input[type="checkbox"][value!="0"]', $(context).parent()).trigger('click');
}

function setUpExtension() {
	if ($('.ui-multiselect-menu').length == 0) {
		setTimeout(setUpExtension, 500);
	}
	else {
		$('.ui-multiselect-menu').each(function() {
			if ($('input[type="checkbox"]', this).length > 0) {
				$(this).prepend('<a href="#" class="report-extensions-all">All</a> | <a href="#" class="report-extensions-none">None</a>');
			}
		});
		
		$('.report-extensions-all').on('click', function() {
			setState(this, true);
		});
		
		$('.report-extensions-none').on('click', function() {
			setState(this, false);
		});
	}
}

$(function() {
	setUpExtension();
});
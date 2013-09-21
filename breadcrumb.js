/*
    javascript sitemap render 
*/

    
function jsonRead(url)
{
	var result = null;
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		async: false,
		success: function(data) {
			result = data;
		} 
	});
	return result;
}


function breadcrumb(url, sitemap_json)
{
	var level = 0;
	var tmp_breadcrumb_name = [];
	var tmp_breadcrumb_url = [];
	var breadcrumb = [];
	var matched = false;

	$.each(sitemap_json, function(key, val) {
		matched = recursiveFunction(key, val, level, url);
		if(matched)
		{
			return;
		}
	})

	function recursiveFunction(key, val, level, searchUrl)
	{
		/* console.log("#" + level + " " + key + " => " + val); */

		if(key == 'page')
		{
			level = level + 1;
		}

		if(typeof(val) == 'object')
		{
			if( val['name'] && val['url'])
			{
				tmp_breadcrumb_name[level] = val['name'];
				tmp_breadcrumb_url[level] = val['url'];

				/* console.log("cache" + level + " " + val['name'] + " => " + val['url']); */

				/* if(RegExp(val['url']).test(searchUrl)) */
				if(val['url'].split('/').length == searchUrl.split('/').length && /[(\.\*)(\\d)]/.test(val['url']))
				{
					if(RegExp(val['url'].replace('?', '\\?')).test(searchUrl))
					{
						breadcrumb['name'] = tmp_breadcrumb_name.slice(1, level+1);
						breadcrumb['url'] = tmp_breadcrumb_url.slice(1, level+1);

						matched = true;
					}
				}
				else
				{
					if(val['url'] == searchUrl)
					{
						breadcrumb['name'] = tmp_breadcrumb_name.slice(1, level+1);
						breadcrumb['url'] = tmp_breadcrumb_url.slice(1, level+1);

						matched = true;
					}

				}
			}

			if(matched)
			{
				return matched;
			}
			else
			{
				$.each(val, function(key, val) { recursiveFunction(key, val, level, searchUrl); });
			}
		}
	}

	return breadcrumb;
}


$.fn.render = function(options) {                                                                                   

	var settings = jQuery.extend({
		sitemapUrl: '/sitemap',
		sitemapType: 'json',
		urlMode: 'standard'
		}, options || {});


	// read and parse sitemap
	if(settings.sitemapType == 'json')
	{
		sitemap = jsonRead(settings.sitemapUrl);
	}

	// current url type
	if(settings.urlMode == 'standard')
	{
		// "?c=News&a=Detail&id=4"
		currentUrl = window.location.search
	}
	else if(settings.urlMode == 'rewrite')
	{
		// "/news/4"
		currentUrl = window.location.pathname
	}


	// sitemap to breadcrumb
	breadcrumb = breadcrumb(currentUrl, sitemap);


	// breadcrumb to html (bootstrap style)
	bar = "";

	$.each(breadcrumb['name'], function(key, val) {
		if(key == breadcrumb['name'].length-1)
		{
			bar = bar + "<li class='active'>" + breadcrumb['name'][key] + "</li>";
		}
		else
		{
			bar = bar + "<li><a href='" + breadcrumb['url'][key] + "'>" + breadcrumb['name'][key] + "</a> <span class='divider'>/</span></li>";
		}
	});


	// render html
	var div = $(this);

	div.html(bar);
}

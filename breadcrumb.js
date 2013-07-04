/*
    Auto render to <ul class="breadcrumb">...</ul>
*/

/*
open http://www.utilities-online.info/xmltojson/#.UdQlDFOhWoS

<?xml version="1.0" encoding="UTF-8" ?>
	<site>
		<page>
			<name>top</name>
			<url>/</url>
			<page>
				<name>bulletin</name>
				<url>/bulletin</url>
				<page>
					<name>edit</name>
					<url>/bulletin/edit/.*</url>
				</page>
			</page>
		</page>
		<page>
			<name>admin</name>
			<url>/admin</url>
			<page>
				<name>user</name>
				<url>/user</url>
				<page>
					<name>add</name>
					<url>/user/add/.*</url>
				</page>
				<page>
					<name>edit</name>
					<url>/user/edit/.*</url>
				</page>
			</page>
			<page>
				<name>role</name>
				<url>/role</url>
				<page>
					<name>add</name>
					<url>/role/add/.*</url>
				</page>
				<page>
					<name>edit</name>
					<url>/role/edit/.*</url>
				</page>
			</page>
		</page>
	</site>
*/


sitemap = '\
{\
  "site": {\
    "page": [\
      {\
        "name": "首頁",\
        "url": "/",\
        "page": {\
          "name": "佈告欄",\
          "url": "/bulletin",\
	  "page": [\
	  {\
            "name": "新增文章",\
            "url": "/bulletin/add"\
          },\
	  {\
            "name": "修改文章",\
            "url": "/bulletin/edit/.*"\
          }\
	  ]\
        }\
      },\
      {\
        "name": "admin",\
        "url": "/admin",\
        "page": [\
          {\
            "name": "user",\
            "url": "/user",\
            "page": [\
              {\
                "name": "add",\
                "url": "/user/add/.*"\
              },\
              {\
                "name": "edit",\
                "url": "/user/edit/.*"\
              }\
            ]\
          },\
          {\
            "name": "role",\
            "url": "/role",\
            "page": [\
              {\
                "name": "add",\
                "url": "/role/add/.*"\
              },\
              {\
                "name": "edit",\
                "url": "/role/edit/.*"\
              }\
            ]\
          }\
        ]\
      }\
    ]\
  }\
}\
';

    
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

	$.each(sitemap_json, function(key, val) { recursiveFunction(key, val, level, url); })

	function recursiveFunction(key, val, level, searchUrl) {
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

				if(RegExp(val['url']).test(searchUrl))
				{
					breadcrumb['name'] = tmp_breadcrumb_name.slice(1, level+1);
					breadcrumb['url'] = tmp_breadcrumb_url.slice(1, level+1);
				}
			}
			$.each(val, function(key, val) { recursiveFunction(key, val, level, searchUrl); });
		}
	}

	return breadcrumb;
}


$(function(){
	// sitemap_json = $.parseJSON(sitemap);
	sitemap_json = jsonRead("/sitemap.json");

	breadcrumb = breadcrumb(window.location.pathname, sitemap_json);

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

	$(".breadcrumb").html(bar);
});

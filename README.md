breadcrumb.js
=============

A javascript tool that auto render breadcrumb.

## Usage

#### Standard url mode :

<pre><code>&lt;head&gt;
    &lt;script type="text/javascript" src="js/breadcrumb/breadcrumb.js"&gt;</script>
    &lt;script&gt;
        $(function(){
            $('.breadcrumb').render({ sitemapUrl: '/index.php?c=Default&a=Sitemap', sitemapType: 'json', urlMode: 'standard'});
        });
    &lt;/script&gt;
&lt;/head&gt;
</code></pre>

#### Rewrite url mode :

<pre><code>&lt;head&gt;
    &lt;script type="text/javascript" src="js/breadcrumb/breadcrumb.js"&gt;</script>
    &lt;script&gt;
        $(function(){
            $('.breadcrumb').render({ sitemapUrl: '/sitemap/json', sitemapType: 'json', urlMode: 'rewrite'});
        });
    &lt;/script&gt;
&lt;/head&gt;
</code></pre>

<?

function yaml2json($filename)
{
    return json_encode(yaml_parse_file($filename));
}

echo yaml2json('sitemap.yaml');

?>

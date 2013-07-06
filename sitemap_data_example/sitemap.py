def readYAML(filename):
    import yaml

    f = open(filename)

    yaml_data = yaml.load(f)

    f.close()

    return yaml_data


def dict2json(dict_data):
    import simplejson as json

    return json.dumps(dict_data)


if __name__ == '__main__':

    print dict2json(readYAML('sitemap.yaml'))

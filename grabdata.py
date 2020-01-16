import urllib.request
import json

page_number = 0
rank = 1
while True:
    page_number += 1
    try:
        url = "https://2020.battlecode.org/api/0/team/?ordering=-score%2Cname&page={}&search=".format(page_number)
        fp = urllib.request.urlopen(url)
    except:
        break
    bytes = fp.read()
    info = json.loads(bytes.decode("utf8"))
    for inf in info['results']:
        name = inf['name']
        filename = "".join(s if s.isalnum() else str(ord(s)) for s in name)
        try:
            data = json.load(open(f"data/{filename}.json", "r"))
        except:
            data = {"mus":[], "sigmas":[], "scores":[], "ranks":[], "wins":0, "losses":0, "strat":"Unknown"}
        data["mus"].append(inf['mu'])
        data["sigmas"].append(inf['sigma'])
        data["scores"].append(inf['score'])
        data["wins"] = inf['wins']
        data["losses"] = inf['losses']
        data["ranks"].append(rank)
        rank += 1
        json.dump(data, open(f"data/{filename}.json", "w"))
        

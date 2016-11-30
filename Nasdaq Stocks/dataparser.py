

with open("nasdaqlisted.txt", "r") as f:
    with open("data.json", "w") as d:
        line = f.readline() # skip first line
        d.write("[\n")
        line = f.readline()
        first = True
        
        while (len(line) >0):
            if not first:
              d.write(",")
            else:
                first = False
            stock = line.split('|')
            d.write("\n{\n")
            d.write("symbol: \""+stock[0]+"\",")
            d.write("name: \""+stock[1]+"\"\n}")
            line = f.readline()
            
        d.write("\n]")


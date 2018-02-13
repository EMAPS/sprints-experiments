import csv,json

res = {}

headers = ["donor","recipients","purposes","amount"]

f = open('donor-recipient.csv', 'rtU')
f2 = open('donor-purposes.csv', 'rtU')
f3 = open('donor-amount.csv', 'rtU')
try:
    reader = csv.reader(f,delimiter=";")
    next(reader, None)
    for row in reader:
        if row[0] in res:
          if row[1] in res[row[0]]["recipients"]:
             continue;
          else:
            res[row[0]]["recipients"].append(row[1])
        else:
          res[row[0]]={"recipients":[row[1]], "purposes" : 0, "amount" : 0}
finally:
    f.close()

try:
    reader = csv.reader(f2,delimiter=";")
    next(reader, None)
    for row in reader:
        res[row[0]]["purposes"] = res[row[0]]["purposes"]+1;

finally:
    f2.close()

try:
    reader = csv.reader(f3,delimiter=";")
    next(reader, None)
    for row in reader:
        res[row[0]]["amount"] = float(row[2])
finally:
    f3.close()

with open('25a-data.csv', 'wb') as csvfile:
    writer = csv.writer(csvfile, delimiter=',')
    writer.writerow(headers)

    for i,a in enumerate(res):
      print i,a
      writer.writerow([a, len(res[a]["recipients"]), res[a]["purposes"], res[a]["amount"]])

print json.dumps(res,indent=4)

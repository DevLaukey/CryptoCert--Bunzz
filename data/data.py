import csv
import json
filename = 'data.csv'

students = []


def cleanData(filename):
    # open the file
    students = []
    cleaned_data = []
    with open(filename, 'r') as f:
        for line in csv.DictReader(f):
            students.append(line)
            # only add the student if they have a name value
            # if line.keys()  != '' and line.values() != '':
            #     students.append(line)

    for student in students:
        student.pop("")
        if all(student.values()):
            cleaned_data.append(student)
    # print the data
    return(cleaned_data)


students = cleanData(filename)
Student_json = json.dumps(students)


images = [
    {"https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/"},
    {"https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/"},
    {"https://gateway.pinata.cloud/ipfs/QmZKvtY8eJcm1QVAzFQTBGQrRdCZ3jJRrRpKmd87cVY7wC/"}
]

def mapper(images, student):
    
    return student


print(mapper(images, Student_json))
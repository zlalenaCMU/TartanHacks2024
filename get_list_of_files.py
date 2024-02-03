import os

def get_list(path, out_path):
    files = os.listdir(path)
    f = open(out_path, "w")
    counter = 0
    for image in files:
        f.write(path + "/" + image)
        counter +=1
        if counter != len(files):
            f.write("\n")

    f.close()

def main():
    path ="owners"
    out_path = "lists/ownersList.csv"
    get_list(path, out_path)
if __name__ == '__main__':
    main()
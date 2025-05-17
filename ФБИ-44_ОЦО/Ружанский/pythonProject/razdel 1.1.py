def mathprogress():
    a = int(input("Введите исходное значение: "))
    d = int(input("С каким шагом: "))
    n = int(input("Введите конечное значение:  "))
    for x in range(a, n + 1, d):
        print(x)

mathprogress()
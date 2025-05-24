number = int(input('Введите число: '))
if number > 0:
    result = number + 10
else:
    result = number - 10
print(result)


if result % 2 == 0 and result % 5 == 0:
    print('Выполнимо')
else:
    print('нет')

x = int(input('Введите x координату: '))
y = int(input('Введите y координату: '))
if x > 0 and y > 0:
    print('Точка находится в первой четверти')
elif x < 0 and y > 0:
    print('Точка находится во второй четверти')
elif x < 0 and y < 0:
    print('Точка находится в 3й четверти')
elif x > 0 and y < 0:
    print('Точка находится в 4й четверти')
elif x == 0:
    print('Точка находится на оси x')
elif y == 0:
    print('Точка находится на оси y')
else:
    print("Точка находится в начале координат")


# euclidean.gostack
Euclidean API # GoStack Rocketseat - Desafio: Conceitos do Node.js -  Node.js > Yarn > Express

API modelada para criar representar objetos da Geometria euclidiana de forma iterativa.

## Iniciando
``` 
yarn install

yarn start
```

## Objetos

> Ponto

> Circunferência 

## Ponto

> [POST] /points

```
{
    "x": 1,
    "y": 2
}
```
resposta
```
{
    "type": 0,
    "id": "8658f937-7210-4386-9d3b-00b87ce51d53",
    "x": 1,
    "y": 2
}
```

> [GET] /points

resposta
```
[
    {
        "id": "ab9a88c6-1e75-4bd9-be65-87509ddb8bd4",
        "x": 1,
        "y": 2
    },
    {
        "id": "8658f937-7210-4386-9d3b-00b87ce51d53",
        "x": 1,
        "y": 2
    },
    {
        "id": "0067604f-a5d5-4635-8f19-310bc240dc32",
        "x": 1,
        "y": 2
    },
    {
        "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
        "x": 1,
        "y": 2
    }
]
```

> [GET] /points/:id

resposta
```
{
    "type": 0,
    "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
    "dependencies": ['a525c92c-e1a8-4959-bcd1-df14296abe3f'],
    "x": 33,
    "y": 24
}
```

> [PUT] /points/:id

```
{
    "x": 33,
    "y": 24
}
```
resposta
```
{
    "type": 0,
    "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
    "x": 33,
    "y": 24
}
```

> [DELETE] /points/:id

## Circunferência 

> [POST] /circumferences

```
{
    "a": "0067604f-a5d5-4635-8f19-310bc240dc32",
    "b": "a525c92c-e1a8-4959-bcd1-df14296abe3f"
}
```
resposta
```
{
    "type": 1,
    "id": "8dad45c4-8757-49db-8d59-f628b7ab94ee",
    "a": {
        "type": 0,
        "id": "0067604f-a5d5-4635-8f19-310bc240dc32",
        "x": 1,
        "y": 2
    },
    "b": {
        "type": 0,
        "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
        "x": 33,
        "y": 24
    },
    "radius": 38.8329756778952
}
```

> [GET] /circumferences

resposta
```
[
    {
        "id": "8dad45c4-8757-49db-8d59-f628b7ab94ee",
        "a": {
            "type": 0,
            "id": "ab9a88c6-1e75-4bd9-be65-87509ddb8bd4",
            "x": 1,
            "y": 2
        },
        "b": {
            "type": 0,
            "id": "8658f937-7210-4386-9d3b-00b87ce51d53",
            "x": 1,
            "y": 2
        },
        "radius": 0
    },
    {
        "id": "8dad45c4-8757-49db-8d59-f628b7ab94ee",
        "a": {
            "type": 0,
            "id": "0067604f-a5d5-4635-8f19-310bc240dc32",
            "x": 1,
            "y": 2
        },
        "b": {
            "type": 0,
            "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
            "x": 33,
            "y": 24
        },
        "radius": 38.8329756778952
    }
]
```

> [GET] /circumferences/:id

resposta
```
{
    "type": 0,
    "id": "a525c92c-e1a8-4959-bcd1-df14296abe3f",
    "dependencies": [],
    "x": 33,
    "y": 24
}
```

> [DELETE] /circumferences/:id

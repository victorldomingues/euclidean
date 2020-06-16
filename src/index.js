const express = require('express');
const { uuid } = require('uuidv4');
const ENV = {
    port: 3333
};
const app = express();

class Types {
    static POINT = 0;
    static CIRCUNFERENCE = 1;
}
class Object {
    constructor(type) {
        this.type = type;
        this.id = uuid();
        this.dependencies = new Map();
    }
    update() { }
}
class Point extends Object {
    constructor(x, y) {
        super(Types.POINT);
        this.x = x;
        this.y = y;
    }
    update() { }
}
class Circumference extends Object {
    constructor(center, radius) {
        super(Types.CIRCUNFERENCE);
        this.a = center;
        this.b = radius;
        this.radius = this.getRadius();
    }
    getRadius() {
        const cA = this.b.x - this.a.x;
        const cB = this.b.y - this.a.y;
        const radius = Math.sqrt(Math.pow(cA, 2) + Math.pow(cB, 2));
        this.radius = radius;
        return radius;
    }
    update() {
        this.getRadius();
    }
}

const objects = new Map();
const queryObjects = () => (Array.from(objects.values()));
const queryObjectsMapped = () => (queryObjects().map(x => ({ ...x, dependencies: Array.from(x.dependencies.values()) })));
const queryPoints = () => (queryObjects().filter(x => x.type === Types.POINT).map(({ id, x, y }) => ({ id, x, y })));
const queryCircumferences = () => (queryObjects().filter(x => x.type === Types.CIRCUNFERENCE).map(({ id, a, b, radius }) => ({ id, a, b, radius })));

function objectMiddleware(req, res, next) {
    const { id } = req.params;
    const object = objects.get(id);
    if (!object) return res.status(406).json({ message: `o servidor não encontrou o objeto com id: ${id}.` });
    return next();
}

function saveCircumferenceMiddleware(req, res, next) {
    const { a, b } = req.body;
    if (!a != !b) return res.status(400).json({ message: `O servidor espera um objeto no formato {a: 'point_id', b:'point_id'} sendo pontos A e B respectivamente.` });
    const pointA = objects.get(a);
    const pointB = objects.get(b);
    if (!pointA != !pointB) return res.status(406).json({ message: `O servidor não encontrou um dos objetos a: ${a} ou b: ${b}.` });
    return next();
}

function savePointMiddleware(req, res, next) {
    const { x, y } = req.body;
    if (!x != !y) return res.status(406).json({ message: `O servidor espera um objeto no formato {x: number, y:number} sendo coordenadas X e Y respectivamente.` });
    return next();
}

app.use(express.json());

// OBJECTS
app.get('/', (req, res) => {
    const { type } = req.query;
    if (type) return res.status(200).json(queryObjectsMapped().filter(x => x.type === Number(type)));
    return res.status(200).json(queryObjectsMapped());
});

// POINTS
app.get('/points', (req, res) => (res.status(200).json(queryPoints())));

app.get('/points/:id', objectMiddleware, (req, res) => {
    const point = objects.get(req.params.id);
    return (res.status(200).json({ ...point, dependencies: Array.from(point.dependencies.values()) }));
});

app.post('/points', savePointMiddleware, (req, res) => {
    const { x, y } = req.body;
    const point = new Point(x, y);
    objects.set(point.id, point);
    return res.status(200).json(point);
});

app.put('/points/:id', objectMiddleware, savePointMiddleware, (req, res) => {
    const { id } = req.params;
    const { x, y } = req.body;
    const point = objects.get(id);
    point.x = x;
    point.y = y;
    point.dependencies.forEach((p) => {
        const object = objects.get(p);
        object.update();
    });
    return res.status(200).json(point);
});

app.delete('/points/:id', objectMiddleware, (req, res) => {
    const { id } = req.params;
    const point = objects.get(id);
    point.dependencies.forEach(p => {
        const object = objects.get(p);
        if (object.type === Types.CIRCUNFERENCE) {
            object.a.dependencies.delete(p);
            object.b.dependencies.delete(p);
        };
        objects.delete(p);
    });
    objects.delete(id);
    return res.status(204).send();
});


// CIRCUMFERENCES
app.get('/circumferences', (req, res) => (res.status(200).json(queryCircumferences())));

app.get('/circumferences/:id', objectMiddleware, (req, res) => (res.status(200).json(objects.get(req.params.id))));

app.post('/circumferences', saveCircumferenceMiddleware, (req, res) => {
    const { a, b } = req.body;
    const pointA = objects.get(a);
    const pointB = objects.get(b);
    const circumference = new Circumference(pointA, pointB);
    pointA.dependencies.set(circumference.id, circumference.id);
    pointB.dependencies.set(circumference.id, circumference.id);
    objects.set(circumference.id, circumference);
    return res.status(200).json(circumference);
});

app.delete('/circumferences/:id', objectMiddleware, (req, res) => {
    const { id } = req.params;
    const circumference = objects.get(id);
    objects.delete(circumference.a.id);
    objects.delete(circumference.b.id);
    objects.delete(id);
    return res.status(204).send();
});

app.listen(ENV.port, () => {
    console.log(`Server running PORT:${ENV.port}`)
});
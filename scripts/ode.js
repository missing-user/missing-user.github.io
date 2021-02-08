var canvas = document.getElementById("canvas")

function f(t, y) {
    // return [Math.sin(t) - 0.2 * y[0]]
    // return [-y]
    return [2 * Math.sin(3 * t) + y[0] / 2]
}

class DGLsolver {
    constructor(resolution, dgl) {
        this.resolution = resolution
        this.dgl = dgl

    }

    euler(y0, t0, t1) {
        const h = (t1 - t0) / this.resolution
        var ts = Array.from({ length: this.resolution + 1 }, (_, k) => k * h + t0) //time series datapoints
        var ys = Array.from(Array(this.resolution + 1), () => Array(y0.length).fill(0))
        ys[0] = y0

        for (let i = 0; i < this.resolution; i++) {
            ys[i + 1] = this.dgl(ts[i], ys[i]).map((x, j) => ys[i][j] + x * h)  //y_n+1 = y_n + dy/dx *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }

    rk4(y0, t0, t1) {
        const h = (t1 - t0) / this.resolution
        var ts = Array.from({ length: this.resolution + 1 }, (_, k) => k * h + t0) //time series datapoints
        var ys = Array.from(Array(this.resolution + 1), () => Array(y0.length).fill(0))
        ys[0] = y0

        for (let i = 0; i < this.resolution; i++) {
            const k1 = this.dgl(ts[i], ys[i]) //y_n + k1 *h/2

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2) //y_n + k1 *h/2
            const k2 = this.dgl(ts[i] + h / 2, s1)

            const s2 = ys[i].map((y, j) => y + k2[j] * h / 2) //y_n + k2 *h/2
            const k3 = this.dgl(ts[i] + h / 2, s2)

            const s3 = ys[i].map((y, j) => y + k2[j] * h) //y_n + k3 *h
            const k4 = this.dgl(ts[i] + h, s3)
            ys[i + 1] = ys[i].map((x, j) => x + (k1[j] / 6 + k2[j] / 3 + k3[j] / 3 + k4[j] / 6) * h) //y_n+1 = y_n + (k1 +2*k2 + 2*k3 +k4)/6 *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }
}



var solve = new DGLsolver(1000, f)
const res1 = solve.euler([0.2], 0, 4)
const res2 = solve.rk4([0.2], 0, 4)

var solve = new DGLsolver(100, f)
const res12 = solve.euler([0.2], 0, 4)
const res22 = solve.rk4([0.2], 0, 4)


var solve = new DGLsolver(10, f)
const res13 = solve.euler([0.2], 0, 4)
const res23 = solve.rk4([0.2], 0, 4)


let data = [
    res1.ts,
    res1.ys.map((t) => t[0]),
    res2.ys.map((t) => t[0]),
];

const opts = {
    width: 900,
    height: 900,
    title: "ODE solution",
    scales: {
        x: { time: false },
    },
    series: [
        { label: "t" },
        {
            label: "euler",
            stroke: "#D32F2F",
        },
        {
            label: "rk4",
            stroke: "#12B02F",
        },
    ],
    axes: [
        {
            //	size: 30,
            label: "time [s]",
        },
        {
            //	size: 40,
            label: "value [unit]",
        }
    ],
};

let u = new uPlot(opts, data, document.body);

data = [
    res12.ts,
    res12.ys.map((t) => t[0]),
    res22.ys.map((t) => t[0]),
];
u = new uPlot(opts, data, document.body);

data = [
    res13.ts,
    res13.ys.map((t) => t[0]),
    res23.ys.map((t) => t[0]),
];
u = new uPlot(opts, data, document.body);

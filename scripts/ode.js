var canvas = document.getElementById("canvas")

function f(t, y) {
    // return [Math.sin(t) - 0.2 * y[0]]
    // return [-y]
    return [2 * Math.sin(3 * t) + y[0] / 4]
}

class DGLsolver {
    constructor(dgl, y0, t0, t1) {
        this.dgl = dgl
        this.y0 = y0
        this.t0 = t0
        this.t1 = t1
    }

    euler(resolution) {
        const h = (this.t1 - this.t0) / resolution
        var ts = Array.from(Array(resolution + 1), (_, k) => k * h + this.t0) //time series datapoints
        var ys = Array.from(Array(resolution + 1), () => Array(this.y0.length).fill(0))
        ys[0] = this.y0

        for (let i = 0; i < resolution; i++) {
            ys[i + 1] = this.dgl(ts[i], ys[i]).map((x, j) => ys[i][j] + x * h)  //y_n+1 = y_n + dy/dx *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }

    rk4(resolution) {
        const h = (this.t1 - this.t0) / resolution
        var ts = Array.from(Array(resolution + 1), (_, k) => k * h + this.t0) //time series datapoints
        var ys = Array.from(Array(resolution + 1), () => Array(this.y0.length).fill(0))
        ys[0] = this.y0

        for (let i = 0; i < resolution; i++) {
            const k1 = this.dgl(ts[i], ys[i]) // f(t, y_n)

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2)
            const k2 = this.dgl(ts[i] + h / 2, s1) // f(t + h/2, y_n + k1*h/2)

            const s2 = ys[i].map((y, j) => y + k2[j] * h / 2)
            const k3 = this.dgl(ts[i] + h / 2, s2) // f(t + h/2, y_n + k2*h/2)

            const s3 = ys[i].map((y, j) => y + k2[j] * h)
            const k4 = this.dgl(ts[i] + h, s3) // f(t + h, y_n + k3*h)
            ys[i + 1] = ys[i].map((x, j) => x + (k1[j] / 6 + k2[j] / 3 + k3[j] / 3 + k4[j] / 6) * h) //y_n+1 = y_n + (k1 +2*k2 + 2*k3 +k4)/6 *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }

    midpoint(resolution) {
        const h = (this.t1 - this.t0) / resolution
        var ts = Array.from(Array(resolution + 1), (_, k) => k * h + this.t0) //time series datapoints
        var ys = Array.from(Array(resolution + 1), () => Array(this.y0.length).fill(0))
        ys[0] = this.y0

        for (let i = 0; i < resolution; i++) {
            const k1 = this.dgl(ts[i], ys[i]) // f(t, y_n)

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2) // y_n + k1 * h/2
            const k2 = this.dgl(ts[i] + h / 2, s1) // f(t + h/2, y_n + k1*h/2)
            ys[i + 1] = ys[i].map((x, j) => x + k2[j] * h) //y_n+1 = y_n + k2 *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }
}



var solver = new DGLsolver(f, [0.2], 0, 8)

const referenceResult = solver.euler(1000)

let data = [
    referenceResult.ts,
    referenceResult.ys.map((t) => t[0]),
    solver.rk4(1000).ys.map((t) => t[0]),
    solver.midpoint(1000).ys.map((t) => t[0]),
];

const opts = {
    width: 900,
    height: 900,
    title: "Numerical ODE Solution",
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
        {
            label: "midpoint",
            stroke: "#ff8000",
        },
    ],
}
var plotElem = document.getElementById("plot")
var u = new uPlot(opts, data, plotElem)

window.addEventListener("resize", e => {
    u.setSize({ width: plotElem.clientWidth, height: plotElem.clientWidth });
})
u.setSize({ width: plotElem.clientWidth, height: plotElem.clientWidth });

function calcOde(resolution) {
    const res = solver.euler(~~resolution)
    data = [
        res.ts,
        res.ys.map((t) => t[0]),
        solver.rk4(~~resolution).ys.map((t) => t[0]),
        solver.midpoint(~~resolution).ys.map((t) => t[0]),
    ]
    u.setData(data)
}
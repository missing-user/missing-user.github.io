var canvas = document.getElementById("canvas")


class ODEsolver {
    constructor(ode, y0, t0, t1) {
        this.ode = ode
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
            ys[i + 1] = this.ode(ts[i], ys[i]).map((x, j) => ys[i][j] + x * h)  //y_n+1 = y_n + dy/dx *h
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
            const k1 = this.ode(ts[i], ys[i]) // f(t, y_n)

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2)
            const k2 = this.ode(ts[i] + h / 2, s1) // f(t + h/2, y_n + k1*h/2)

            const s2 = ys[i].map((y, j) => y + k2[j] * h / 2)
            const k3 = this.ode(ts[i] + h / 2, s2) // f(t + h/2, y_n + k2*h/2)

            const s3 = ys[i].map((y, j) => y + k2[j] * h)
            const k4 = this.ode(ts[i] + h, s3) // f(t + h, y_n + k3*h)
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
            const k1 = this.ode(ts[i], ys[i]) // f(t, y_n)

            const s1 = ys[i].map((y, j) => y + k1[j] * h / 2) // y_n + k1 * h/2
            const k2 = this.ode(ts[i] + h / 2, s1) // f(t + h/2, y_n + k1*h/2)
            ys[i + 1] = ys[i].map((x, j) => x + k2[j] * h) //y_n+1 = y_n + k2 *h
        }
        return {
            ts: ts,
            ys: ys
        }
    }
}

var solver
function setOde(ode) {
    solver = new ODEsolver(ode.f, ...ode.parameters)
}

var plotElem = document.getElementById("plot")

//All kinds of different ODEs

const DefaultODE = {
    f: (t, y) => [2 * Math.sin(3 * t) + y[0] / 4],
    parameters: [[0.2], 0, 8]
}

const ForcedOszillator = {
    f: (t, y) => [y[1], -5 * y[0] - y[1] / 10 + Math.sin(t) / 3],
    parameters: [[0, 5], 0, 500]
}

const Oszillator = {
    f: (t, y) => [y[1], -5 * y[0] - y[1] / 10 + Math.sin(t) / 3],
    parameters: [[0, 5], 0, 500]
}

const Airy = {
    f: (t, y) => [y[1], t * y[0]],
    parameters: [[0.2782174909, 0.2723742043], -15, 5]
}

const Duffing = {
    f: (t, y) => [y[1], 0.5 * Math.cos(t) - y[0] * y[0] * y[0] - 10 * y[0] - 0.01 * y[1]],
    parameters: [[0, 1], -50, 150]
}

const LotkaVolterra = {
    f: (t, y) => {
        const alpha = 1.5, beta = 1, delta = 3, gamma = 1
        return [alpha * y[0] - beta * y[0] * y[1], delta * y[0] * y[1] - gamma * y[1]]
    },
    parameters: [[1, 2], 0, 50]
}

const Lorentz = {
    f: (t, y) => {
        const delta = 10
        const beta = 8 / 3
        const radius = 28
        return [-delta * (y[0] - y[1]), radius * y[0] - y[1] - y[0] * y[2], -beta * y[2] + y[0] * y[1]]
    },
    parameters: [[0.1, 1, 0.5], 0, 50]
}
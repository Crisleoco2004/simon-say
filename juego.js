const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar=document.getElementById('btnEmpezar')
const hovers = document.getElementById('css-hover')
const ULTIMO_NIVEL = 5
const celesteText = document.getElementById('blue')
const violetaText = document.getElementById('pink')
const verdeText = document.getElementById('green')
const naranjaText = document.getElementById('orange')

class Juego{

    constructor(){
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel(),500)
    }

    inicializar() {
        this.elegirColor = this.elegirColor.bind(this)
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste,
            violeta, 
            naranja, 
            verde
        }
        hovers.setAttribute('href', './hover.css')
    }

    generarSecuencia(){
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random()*4))
    }

    siguienteNivel(){
        // this.atributo = nombre atributo
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(numero) {
        switch(numero){
            case 0:
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color){
        switch (color){
            case 'celeste':
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for (let i = 0; i < this.nivel; i++){
            let color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => {
                console.log(color)
                switch (color){
                    case 'verde':
                        verdeText.classList.add('green')
                        setTimeout(() => verdeText.classList.remove('green'), 500)
                        break;
                    case 'violeta':
                        violetaText.classList.add('pink')
                        setTimeout(() => violetaText.classList.remove('pink'), 500)
                        break;
                    case 'naranja':
                        naranjaText.classList.add('orange')
                        setTimeout(() => naranjaText.classList.remove('orange'), 500)
                        break;
                    case 'celeste':
                        celesteText.classList.add('blue')
                        setTimeout(() => celesteText.classList.remove('blue'), 500)
                        break;
                }
                this.iluminarColor(color)
            }, 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    
    apagarColor(color){
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subnivel]) {
            this.subnivel++
            if (this.subnivel == this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel == (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                }
                else {
                    setTimeout(this.siguienteNivel,1500)
                }
            }
        }else {
            this.perdioElJuego()
        }
    }

    ganoElJuego() {
        swal("Yuhuu", "Felicitaciones, ganaste el juego", "success")
            .then(this.inicializar())
    }

    perdioElJuego() {
        swal("Opps", "Lo sentimos, perdiste el juego", "error")
            .then(() => {
                this.inicializar()
                this.eliminarEventosClick()
            })
    }

    toggleBtnEmpezar(){
        if (btnEmpezar.classList.contains('hide') || btnEmpezar.classList.contains('opacity')){
            btnEmpezar.classList.remove('hide')
            btnEmpezar.classList.remove('opacity')
        }else {
            btnEmpezar.classList.add('opacity')
            setTimeout(() => {
                btnEmpezar.classList.add('hide');
                console.log('Oculto')
            }, 200) 
        }
    }

}
function empezarJuego(){
    window.juego = new Juego()
}

// Controladora
// Calculadora - Operações com apenas um número - Operações com dois números

const operations = [
  { number: 1, title: 'sum', hasTwoOperands: true, symbol: '+' },
  { number: 2, title: 'subtract', hasTwoOperands: true, symbol: '-' },
  { number: 3, title: 'multiply', hasTwoOperands: true, symbol: '*' },
  { number: 4, title: 'divide', hasTwoOperands: true, symbol: '/' },
  { number: 5, title: 'square', hasTwoOperands: false, symbol: 'sqr' },
  { number: 6, title: 'cube', hasTwoOperands: false, symbol: 'cbr' },
  { number: 7, title: 'squareRoot', hasTwoOperands: false, symbol: 'sqrt' },
  { number: 8, title: 'cubicRoot', hasTwoOperands: false, symbol: 'cbrt' },
  { number: 9, title: 'log', hasTwoOperands: false, symbol: 'log' }
]

// const
class Interface {
  constructor(
    inputElement,
    operationInfoElement,
    historyElement,
    historyModalElement,
    historyElementWrapper,
    negativeIndicatorElement
  ) {
    this.input = inputElement
    this.operationInfoElement = operationInfoElement
    this.historyElement = historyElement
    this.historyModalElement = historyModalElement
    this.historyElementWrapper = historyElementWrapper
    this.isBadOperation = false
    this.negativeIndicatorElement = negativeIndicatorElement
  }

  get getInput() {
    return this.input
  }

  addElementToInput(newElement) {
    console.log(controller.getNumberA)
    if (typeof controller.getNumberA !== 'undefined' && this.isBadOperation) {
      console.log('Entrou onde não devia')
      this.operationInfoElement.textContent = `${controller.getNumberA} ${controller.getOperationSymbol} `
    }
    if (controller.getResult == this.input.value) {
      this.input.value = ''
      controller.setResult = undefined
      this.operationInfoElement.textContent = ''
    }
    this.input.value = this.input.value + newElement

    // this.operationInfo.value = 'A'
    // this.operationInfo.classList.remove('no-visibility')
  }

  showHistoryElement() {
    this.historyElementWrapper.classList.remove('no-display')
    // this.historyElement.classList.remove('no-display')
    this.historyModalElement.classList.remove('no-display')
  }

  addNegativeIndicator() {
    this.negativeIndicatorElement.classList.remove('no-visibility')
  }

  removeNegativeIndicator() {
    this.negativeIndicatorElement.classList.add('no-visibility')
  }

  hideHistoryElement() {
    this.historyElementWrapper.classList.add('no-display')
    this.historyModalElement.classList.add('no-display')
  }

  createNewHistoryDataElement() {
    if (!this.isBadOperation) {
      const historyData = document.createElement('p')
      const historyDataWrapper = document.createElement('div')

      historyDataWrapper.appendChild(historyData)
      this.historyElement.insertBefore(
        historyDataWrapper,
        this.historyElement.firstChild
      )

      historyData.classList.add('history-number-text')
      historyData.textContent = this.operationInfoElement.textContent

      historyDataWrapper.classList.add('history-data-wrapper')
      controller.setOperation = undefined
      // controller.setOperationSymbol
    }
  }

  changeNumberSignal() {
    controller.setIsNegative = !controller.getIsNegative
    console.log(controller.getIsNegative)
  }

  changeOperationText() {
    if (!this.isBadOperation) {
      if (controller.getHasTwoOperands) {
        if (controller.getResult) {
          this.operationInfoElement.textContent =
            this.operationInfoElement.textContent +
            `${controller.getNumberB} = ${controller.getResult}`
          controller.setNumberA = undefined
          controller.setNumberB = undefined
        } else {
          this.operationInfoElement.textContent = `${controller.getNumberA} ${controller.getOperationSymbol} `
        }
      } else {
        this.operationInfoElement.textContent = `${controller.getOperationSymbol}(${controller.getNumberA}) = ${controller.getResult}`
        controller.setNumberA = undefined
      }
    }
  }

  changeOperationHistory() {
    if (!this.isBadOperation) {
      controller.setHistory = this.operationInfoElement.textContent
      controller.getHistory
    }
  }

  setNewNumber() {
    this.isBadOperation = false
    if (typeof controller.getOperation === 'undefined') {
      this.isBadOperation = true
      this.operationInfoElement.textContent =
        'Por favor, Selecione uma operação'
    }
    if (
      isNaN(+this.input.value) ||
      typeof this.input.value == 'undefined' ||
      this.input.value == ''
    ) {
      if (
        (controller.getHasTwoOperands &&
          typeof controller.getNumberA == 'undefined') ||
        isNaN(+this.input.value) ||
        this.input.value == ''
      ) {
        this.operationInfoElement.textContent =
          'Por favor, insira um número válido'
        this.isBadOperation = true
      }
    } else {
      if (
        typeof controller.getNumberA === 'undefined' &&
        !this.isBadOperation
      ) {
        console.log('entrou aqui')
        controller.setNumberA = this.input.value
        controller.setResult = undefined
        this.removeNegativeIndicator()
        // controller.setIsNegative = !controller.getIsNegative
        // console.log('NumberB', controller.getNumberB)
      } else {
        controller.setNumberB = this.input.value
        this.removeNegativeIndicator()
        // controller.setIsNegative = !controller.getIsNegative
        // console.log('NumberA', controller.getNumberA)
      }
      this.operationInfoElement.classList.remove('no-visibility')
      // this.operationInfoElement.textContent = 'teste'
    }
    this.input.value = ''
  }

  processResult() {
    console.log('Operation name no proccess result: ', controller.getOperation)
    if (!this.isBadOperation) {
      if (controller.getHasTwoOperands) {
        // controller.setNumberB = this.input.value

        controller.setResult = calculator[controller.operation](
          +controller.getNumberA,
          +controller.getNumberB
        )
        console.log('NumberA from process: ', controller.getNumberA)
        console.log('NumberB from process: ', controller.getNumberB)
        console.log('Result from process: ', controller.getResult)
      } else {
        controller.setResult = calculator[controller.operation](
          +controller.getNumberA
        )
        console.log('NumberA from process: ', controller.getNumberA)
        console.log('Result from process: ', controller.getResult)
      }
      this.input.value = controller.getResult

      // this.operationText = this.operationText + `= ${controller.getResult}`
    }
  }
}

class Controller {
  constructor() {
    this.numberA = undefined
    this.numberB = undefined
    this.isNegative = false
    this.result = undefined
    this.operation = undefined
    this.operationSymbol = undefined
    this.history = []
    this.hasTwoOperands = undefined
  }

  get getResult() {
    return this.result
  }

  get getHistory() {
    this.history.map(historyItem => {
      console.log('Histórico: ', historyItem)
    })
    return this.history
  }

  get getNumberA() {
    return this.numberA
  }

  get getNumberB() {
    return this.numberB
  }

  get getOperation() {
    return this.operation
  }

  get getOperationSymbol() {
    return this.operationSymbol
  }

  get getIsNegative() {
    return this.isNegative
  }

  get getHasTwoOperands() {
    return this.hasTwoOperands
  }

  set setResult(newResult) {
    this.result = newResult
  }

  set setHistory(newHistoryElement) {
    this.history.push(newHistoryElement)
  }

  set setNumberA(newOperand) {
    if (this.isNegative) {
      this.numberA = '-' + newOperand
    } else {
      this.numberA = newOperand
    }
    this.isNegative = false

    // console.log(this.numberA)
  }

  set setNumberB(newOperand) {
    if (this.isNegative) {
      this.numberB = '-' + newOperand
    } else {
      this.numberB = newOperand
    }
    this.isNegative = false
  }

  set setOperation(name) {
    this.operation = name

    operations.map(operation => {
      if (operation.title === this.operation) {
        this.operationSymbol = operation.symbol
        this.hasTwoOperands = operation.hasTwoOperands
        console.log('tem dois: ', this.hasTwoOperands)
      }
    })
  }

  set setIsNegative(newSign) {
    this.isNegative = newSign
  }
}

class Calculator {
  sum(numberA, numberB) {
    console.log(numberA + numberB)
    return numberA + numberB
  }
  subtract(numberA, numberB) {
    return numberA - numberB
  }
  multiply(numberA, numberB) {
    return numberA * numberB
  }
  divide(numberA, numberB) {
    return numberA / numberB
  }
  square(numberA) {
    return numberA * numberA
  }
  cube(numberA) {
    return numberA * numberA * numberA
  }
  squareRoot(numberA) {
    return Math.sqrt(numberA)
  }
  cubicRoot(numberA) {
    return Math.cbrt(numberA)
  }
  log(numberA) {
    return Math.log10(numberA)
  }
}

const controller = new Controller()
const calculator = new Calculator()
const interface = new Interface(
  document.querySelector('.calculator-input'),
  document.querySelector('.operation-info'),
  document.querySelector('.history-element'),
  document.querySelector('.history-modal'),
  document.querySelector('.history-element-wrapper'),
  document.querySelector('.negative-indicator-image')
)

// const test = document.querySelector('.operation-info')

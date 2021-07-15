var number;
var expression;
function calc(valor) {
  document.getElementById('number').value += valor;
}

function cl() {
  document.getElementById('number').value = 0;
}

function soma() {
  number = document.getElementById('number').value;
  document.getElementById('number').value = '';
  expression = '+';
  console.log(number);
  console.log(expression);
  return number;
}

function result() {
  console.log(number);

  var result =
    parseInt(number) + parseInt(document.getElementById('number').value);
  console.log(result);
  document.getElementById('number').value = result;
}

const input = document.querySelector('input');

document.querySelectorAll('.num__key').forEach((elmnt) => {
  elmnt.onclick = () =>
    (input.value =
      input.value !== '0' ? input.value + elmnt.innerText : elmnt.innerText);
});

const buffer = [];

const opCallBack = (opName) => () => {
  let currentValue = parseFloat(input.value);
  if (opName === 'percent') {
    currentValue *= 0.01;
    input.value = currentValue;
  } else {
    if (buffer && buffer.length) {
      buffer.push({ value: currentValue });

      const result = evaluate(buffer);

      buffer.push({ value: result });
      buffer.push({ value: opName });

      input.value = '';
    } else {
      buffer.push({ value: currentValue });
      buffer.push({ value: opName });
      input.value = '';
    }
  }
};

const evaluate = (buffer) => {
  const secondOperand = buffer.pop().value;
  const operator = buffer.pop().value;
  const firstOperand = buffer.pop().value;

  switch (operator) {
    case 'add':
      return firstOperand + secondOperand;
      break;
    case 'subtract':
      return firstOperand - secondOperand;
      break;
    case 'multiply':
      return firstOperand * secondOperand;
      break;
    case 'devide':
      return firstOperand / secondOperand;
      break;
    default:
      return secondOperand;
  }
};

for (const opName of ['add', 'subtract', 'multiply', 'devide', 'percent']) {
  document.querySelector(`.op__key[op=${opName}]`).onclick = opCallBack(opName);
}

document.querySelector('.eq__key').onclick = () => {
  if (buffer && buffer.length) {
    buffer.push({ value: parseFloat(input.value) });
    input.value = evaluate(buffer);
  }
};

document.querySelector('.op__key[op=clear]').onclick = () => {
  input.value = 0;
  buffer.length = 0;
};

document.querySelector('.op__key[op=negate]').onclick = () =>
  (input.value = -parseFloat(input.value));

let defaultSum = 0;
const MAX_SUM = 29999;
const MIN_SUM = 10;
const CURRENCY_SYMBOL = '₴';

const sumToAddElem = document.getElementById('sum-to-add');
const sumToAddWrapperElem = document.getElementById('sum-to-add-wrapper');
const incorrectSumMsgElem = document.getElementById('incorrect-sum-message');

const formValues = {
  name: '',
  comment: '',
};

const getNumberWithSpaces = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const setCurrentSum = (amount = defaultSum) => {
  if (typeof amount === 'number') {
    const parsedAmount = getNumberWithSpaces(amount);
    const sumAmountTextElem = document.getElementById('sum-amount-text');
    const labelResult = `${parsedAmount} ${CURRENCY_SYMBOL}`;

    sumAmountTextElem.innerHTML = labelResult;
  }
};

setCurrentSum();

const handleAddToSum = (amount) => {
  const unparsedSum = sumToAddElem.textContent.split(' ').join('');
  const currentSum = Number(unparsedSum);
  const sumResult = getNumberWithSpaces(currentSum + amount);

  sumToAddElem.innerHTML = sumResult;
  sumToAddWrapperElem.classList.remove('empty');
  sumToAddWrapperElem.classList.remove('incorrect');
};

let previousInputData = '0';

sumToAddElem.oninput = (event) => {
  const unparsedValue = event.srcElement.textContent.split(' ').join('');
  const inputDataNum = Number(unparsedValue);

  if (!isNaN(inputDataNum)) {
    if (inputDataNum > MAX_SUM) {
      sumToAddElem.innerHTML = getNumberWithSpaces(MAX_SUM);
    } else {
      if (inputDataNum < MIN_SUM) {
        sumToAddWrapperElem.classList.add('incorrect');
        incorrectSumMsgElem.classList.remove('hidden-elem');
      } else {
        sumToAddWrapperElem.classList.remove('incorrect');

        sumToAddWrapperElem.classList.remove('empty');
        incorrectSumMsgElem.classList.add('hidden-elem');
      }

      sumToAddElem.innerHTML = getNumberWithSpaces(inputDataNum);
    }
  } else {
    sumToAddElem.innerHTML = previousInputData;
  }

  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(sumToAddElem);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

const tooglePaySystem = (event, paymentMethod) => {
  event.preventDefault();

  const unparsedAddToSum = sumToAddElem.textContent.split(' ').join('');
  const currentAddToSum = Number(unparsedAddToSum);
  const newSum = currentAddToSum + defaultSum;
  console.log(newSum);
  defaultSum = newSum;
  sumToAddElem.textContent = '0';
  sumToAddWrapperElem.classList.add('empty');

  setCurrentSum(newSum);

  alert(`
    Payment method: ${paymentMethod}
    Amount added: ${getNumberWithSpaces(currentAddToSum)}
    Name: ${formValues.name || '-'}
    Comment: ${formValues.comment || '-'}
  `);
};

const handleChangeInput = (event, fieldName) => {
  const value = event.target.value || '';
  const inputElem = document.getElementById(fieldName);

  if (value) {
    inputElem.classList.add('active');
  } else {
    inputElem.classList.remove('active');
  }

  formValues[fieldName] = value;
};

const redirectTo = (url) => {
  window.open(url, '_blank');
};

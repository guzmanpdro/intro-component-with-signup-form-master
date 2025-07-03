/* global Toastify:readonly */

const $form = document.querySelector('form')
const $inputs = document.querySelectorAll('input')
const toastMessage = Toastify({
  text: 'Free trial requested, thanks',
  duration: 3000,
  style: {
    background: "linear-gradient(to right, hsl(154, 59%, 51%), hsl(248, 32%, 49%)",
  }
})

$form.addEventListener('submit', (event) => {  
  event.preventDefault()

  let formIsValid = true

  $inputs.forEach(input => {
    clearErrorMessage(input)
    if (!validateInputs(input)) {
      formIsValid = false
    }
  })

  if (formIsValid) {
    toastMessage.showToast();
    $form.reset()
  }
})

function validateInputs(input) {
  let isValid = true
  
  if (!input.validity.valid) {
    input.classList.add('invalid')
    showErrorMessage(input)
    isValid = false
  } else {
    input.classList.remove('invalid')
  }

  return isValid
}

function showErrorMessage(input) {
  const $errorMessage = document.createElement('p')
  $errorMessage.classList.add('error-message')

  if (input.validity.valueMissing) {
    $errorMessage.textContent = `${input.placeholder} cannot be empty`
  } else if (input.validity.typeMismatch) {
    $errorMessage.textContent = 'Looks like this is not an email'
  }


  input.insertAdjacentElement('afterend', $errorMessage)
}

function clearErrorMessage(input) {
  const $existingErrorMessage = input.nextElementSibling
  if ($existingErrorMessage && $existingErrorMessage.classList.contains('error-message')) {
    $existingErrorMessage.remove()
  }
}
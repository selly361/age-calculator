const yearsElement = document.querySelector('.years')
const monthsElement = document.querySelector('.months')
const daysElement = document.querySelector('.days')

const buttonElement = document.querySelector('.button')

function resetState() {
	yearsElement.textContent = '--'
	monthsElement.textContent = '--'
	daysElement.textContent = '--'
	buttonElement.classList.remove('button--active')
}

function calculateAge() {
	const yearValue = parseInt(document.getElementById('year-input').value)
	const monthValue = parseInt(document.getElementById('month-input').value) - 1
	const dayValue = parseInt(document.getElementById('day-input').value)

	const inputsEmpty = !yearValue || !monthValue || !dayValue

	if (inputsEmpty) {
		resetState()
		return
	}

	const birthDate = new Date(yearValue, monthValue, dayValue)
	const currentDate = new Date()

	let years = currentDate.getFullYear() - birthDate.getFullYear()
	let months = currentDate.getMonth() - birthDate.getMonth()
	let days = currentDate.getDate() - birthDate.getDate()

	if (
		months < 0 ||
		(months === 0 && currentDate.getDate() < birthDate.getDate())
	) {
		years--
		months += 12
	}
	if (days < 0) {
		months--
		const prevMonth = new Date(currentDate)
		prevMonth.setMonth(currentDate.getMonth() - 1)
		days = Math.floor((currentDate - prevMonth) / (1000 * 60 * 60 * 24))
	}

	yearsElement.textContent = years
	monthsElement.textContent = months
	daysElement.textContent = days

	buttonElement.classList.add('button--active')
}

function handleInputChange() {
	const yearValue = document.getElementById('year-input').value
	const monthValue = document.getElementById('month-input').value
	const dayValue = document.getElementById('day-input').value

	if (yearValue === '' || monthValue === '' || dayValue === '') {
		resetState()
	}
}

const inputs = document.querySelectorAll('input[type="number"]')

inputs.forEach((input) => {
	input.addEventListener('input', handleInputChange)
})

buttonElement.addEventListener('click', calculateAge)


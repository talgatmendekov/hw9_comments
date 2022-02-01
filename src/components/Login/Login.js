import React, { useEffect, useState } from 'react'

import Card from '../UI/Card/Card'
import classes from './Login.module.css'
import Button from '../UI/Button/Button'

const Login = (props) => {
	const [enteredEmail, setEnteredEmail] = useState('') //состояние для ввода данных почты, так как инпут принимает строчное значение по дефолту состояние пустая строка
	const [emailIsValid, setEmailIsValid] = useState(false) // проверка на валидность ввода данных почты, принимает булевое значение, по дефолту ложь
	const [enteredPassword, setEnteredPassword] = useState('') // состояние для ввода данных пароля
	const [passwordIsValid, setPasswordIsValid] = useState(false) // проверка на валидность ввода данных пароля, принимает булевое значение, по дефолту ложь
	const [formIsValid, setFormIsValid] = useState(false) // проверка на валидность формы, заполненна ли форма или нет, если форма пустая: значение ложь, если заполнен то истина.

	useEffect(() => {
		//debouncing
		console.log('Valid')
		const identifiyer = setTimeout(() => {
			setFormIsValid(
				enteredEmail.includes('@') && enteredPassword.trim().length > 6,
			)
		}, 2500)
		// clean up function with debouncing+++
		return () => {
			console.log('clean up')
			clearTimeout(identifiyer)
		}
	}, [setFormIsValid, enteredEmail, enteredPassword]) // 

	const emailChangeHandler = (event) => {
		// функция обработчик для  события инптута Onchange email
		setEnteredEmail(event.target.value) // функция хука useState для обновления состояиние которое принимает значение с ввода(input) почты
		// и сохраняет в константу enteredEmail
		// setFormIsValid( // вызываем функцию на валидность формы
		//   event.target.value.includes('@') && enteredPassword.trim().length > 6    // берем значение с инпута email и проверяем
		// включает ли он собачку
		// );                                                                         // && и если значения с инпута password больше 6 и нет пробелов(trim()), то состояние формы меняется на true
	}

	const passwordChangeHandler = (event) => {
		// функция обработчик для события инпута OnChange password
		setEnteredPassword(event.target.value) // функция хука useState для обновления состояиние которое принимает значение с ввода пароля
		// и сохраняет в константу enteredPassword
		// setFormIsValid(
		//   event.target.value.trim().length > 6 && enteredEmail.includes('@')   // берем значение с инпута password и проверяем
		// если значение с инпута password больше 6 и нет пробелов(trim())
		// );                                                                     // && и включает ли значение и инпута mail собачку(то состояние формы меняется на true)
	}

	const validateEmailHandler = () => {
		// функция обработчик для события интпута OnBlur email
		setEmailIsValid(enteredEmail.includes('@')) // функция хука useState которая проверяет если значение ввода почты влключает собачку то возвращает true
	} // тость проверяет введен ли email коректно, и если нет показывает ошибку

	const validatePasswordHandler = () => {
		// функция обработчик для события инпута OnBlur password
		setPasswordIsValid(enteredPassword.trim().length > 6) //функция которая проверяет если длинна строки знаечение инпута ввода пароля без пробелов больше 6, то возвращает true
	}

	const submitHandler = (event) => {
		event.preventDefault() // отменяет деволтное событие формы если не отменить форма будет стразу отправляться
		props.onLogin(enteredEmail, enteredPassword) // lifting up данных для родительского компанента App
	}

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailIsValid === false ? classes.invalid : '' // если emailIsValid равен false то примени еще стили класса Invalid
					}`}
				>
					<label htmlFor='email'>E-Mail</label>
					<input
						type='email'
						id='email'
						value={enteredEmail} //two-way data binding
						onChange={emailChangeHandler} // event OnChange
						onBlur={validateEmailHandler} // событие OnBlur (потеря фокуса, что означает что данные уже введены) принимает значение true или false.
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordIsValid === false ? classes.invalid : '' // если passwordIsValid равен false то примени еще стили класса invalid
					}`}
				>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						value={enteredPassword} //two- way data binding
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button
						type='submit'
						className={classes.btn}
						disabled={!formIsValid} // кнопка сработает только тогда когда состояние формы будет true 
					>
						Login
					</Button>
				</div>
			</form>
		</Card>
	)
}

export default Login

import React, { useEffect, useState } from 'react'

import Login from './components/Login/Login'
import Home from './components/Home/Home'
import MainHeader from './components/MainHeader/MainHeader'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false) // состояние которое проверяет пользователь залогинелся или нет

	useEffect(() => {
		const storedUserLoggedinfo = localStorage.getItem('key') // внутри call back функции берем данные с localStorage методом getItem() через ключ "key" и сохраняем в константе storedUserLoggedinfo.
		// Кух useEffect первым параметром принимает call back функцию где внутри этой фукнции опрабатывается Side Effect в нашем случае данные с local storage
		if (storedUserLoggedinfo === '1') { // если равен 1 поменяй буловое состояние на true (isLoggenIn будет хранить true)
			setIsLoggedIn(true)
		}
	}, []) // useEffect вторым параметром принимает пустой массив чтобы call back фунция сработала один раз и после прекратилась. И не реагировала не на один рендер.
	const loginHandler = (email, password) => { //обработчик события Login
		
		// We should of course check email and password
		// But it's just a dummy/ demo anyways
		localStorage.setItem('key', '1') // сохранили в локальное хранилище число(строку) 1. Side effect localStorage можно писать внутри обработчиков событий так как он не повлияет на flow
		setIsLoggedIn(true) //поменяли на true
	}

	const logoutHandler = () => { // обработчик Logout
		setIsLoggedIn(false) // поменяли на false
		localStorage.removeItem('key') // удалили данные с localStorage 
	}

	return (
		<React.Fragment> 
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> 
			<main>
				{!isLoggedIn && <Login onLogin={loginHandler} />}
				{isLoggedIn && <Home onLogout={logoutHandler} />}
			</main>
		</React.Fragment>
	)
}

export default App

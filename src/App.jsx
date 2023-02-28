import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    Link,
    Outlet,
    RouterProvider
} from 'react-router-dom';

import { Contact } from './Contact';
import { Data, dataLoader } from './Data';
import { Home } from './Home';

const App = () => {

    /** Здесь создаем наш роутер, который будет создавать 
     * роутеры по всем нашим компонентам */
    const router = createBrowserRouter(
        createRoutesFromElements(
            /** Создаем индексный роут (Главная страница) */
            <Route path="/" element={<Root />}>
                {/* Главная странци. index - указывает, что это наша главна страница,
                которая доступна по коревому пути "/" */}
                <Route index element={<Home />} />
                {/* Далее создаем роуты для всех остальных наших компонентов */}
                {/* В роут Data мы указываем новый пропс "loader", в который передаем нашу функцию из компонента
                Data, который получает данные с сервера. */}
                <Route path="/data" element={<Data />} loader={dataLoader} />
                <Route path="/contact" element={<Contact />} />
            </Route>
        )
    );

    return (
        <div>
            {/* Теперь указываем наши роуты здесь в компоненте RouterProvider
            и передаем ему в качестве пропса router наш роутер, который мы создали */}
            <RouterProvider router={router} />
        </div>
    );
};

const Root = () => {
    return <>
        {/* На каждой странице будет рендериться Root - это наша навигационная панель */}
        <div>
            <Link to="/">Home</Link>
            <Link to="/data">Data</Link>
        </div>

        {/* Outlet - просто плейсхолдер для всех других роутов */}
        <div>
            <Outlet />
        </div>
    </>
};

export default App;

/**
 * Но это не заменит никакую другую библиотеку по загрузке данных.
 * Удобно использовать useLoaderData из коробки react-router-dom, но,
 * например, RTK Query мне нравится больше.
 */
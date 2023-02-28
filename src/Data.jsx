/** useLoaderData из react-router-dom позволяет нам делать запрос на сервер
 * и получать данные еще до того, как пользователь перейдет по какому-либо роуту,
 * т.е. параллельно пользуясь остальным нашим приложением.
 * Это полезно, когда у вас есть боь=льшой объем данных в вашем приложении и, чтобы оптимизировать
 * работу, можно грузить данные параллельно.
 * 
 * И теперь не нужно создавать в таком случае useState, useEffect в компоненте. Удобно для отображения данных
 */

// Импортируем этот хук
// P.2 Добавим хук useNavigation
import { useLoaderData, useNavigation } from "react-router-dom";

export const Data = () => {

    // И теперь в нашей переменной dogUrl уже будут данные с сервера. Добавим на страницу.
    const dogUrl = useLoaderData();

    /** Этот хук дает нам много преимуществ при навигации.
     * С его помощью можем сделать что-то до отображения страницы нашего приложения
     * при переходе. Например, показать спиннер, сделать к-л другое действие и т.д.
     */
    const navigation = useNavigation();

    // Например, отобразим загрузку до загрузки компонента
    if (navigation.state === "loading") {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h1>Data</h1>
            <img src={dogUrl} alt="dog" width="360" />
        </div>
    );
};

/** Создадим функцию, которая будет грузить данные с сервера.
 * В качестве сервера выберем https://random.dog/woof.json
 */

/** Экспортируем нашу функцию по получению данных и добавляем ее в роут нашего компонента в App.jsx.
 * Указываем в роуте новый пропс "loader", который будет получать нашу функцию.
*/
export const dataLoader = async () => {
    const res = await fetch("https://random.dog/woof.json");
    const dog = await res.json();

    return dog.url;
};
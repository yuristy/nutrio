import { FC } from 'react';
import './NotFound.scss';

export const NotFound: FC = () => {
    return (
        <div className="wrapper__not_found">
            <h2>Ой! 404</h2>
            <p>Такой страницы не найдено</p>
        </div>
    );
};

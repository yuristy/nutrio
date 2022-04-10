import { useEffect, useCallback, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { At, Lock, Check } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { doRegistration } from '../../../store/sagas/authSaga/actions';

import { IAuthInfo } from '../../../interfaces';

const AuthRegForm: FC = () => {
  const dispatcher = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.authInfo?.isAuthenticated
  );

  const { register, handleSubmit } = useForm<IAuthInfo>();
  const { isRegLoading } = useAppSelector((state) => state.uiInfo);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/');
    }
  });

  const onSubmit: SubmitHandler<IAuthInfo> = useCallback(
    (data) => dispatcher(doRegistration(data)),
    [dispatcher]
  );

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextInput
            icon={<At />}
            placeholder="Ваша почта"
            label="Ваша почта"
            description="Мы ни с кем не поделимся Вашей почтой."
            className="form-control"
            id="email"
            type="email"
            required
            mb={10}
            {...register('email')}
          />
        </div>
        <div>
          <PasswordInput
            icon={<Lock />}
            placeholder="Пароль"
            label="Пароль"
            description="Должен быть больше 4 и меньше 10 символов"
            className="form-control"
            id="password"
            required
            mb={10}
            {...register('password')}
          />
        </div>
        <Button
          leftIcon={<Check size={18} />}
          loading={isRegLoading}
          type="submit"
          variant="gradient"
          gradient={{ from: 'violet', to: 'grape', deg: 105 }}
        >
          Регистрация
        </Button>
      </form>
    </div>
  );
};

export default AuthRegForm;

import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, PasswordInput, Button } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { doLogin } from '../../../store/sagas/authSaga/actions';
import { IAuthInfo } from '../../../interfaces';

const AuthLoginForm: FC = () => {
  const dispatcher = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.authInfo?.isAuthenticated
  );
  const { isLoginLoading } = useAppSelector((state) => state.uiInfo);

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      return navigate('/');
    }
  });

  const { register, handleSubmit } = useForm<IAuthInfo>();

  const onSubmit: SubmitHandler<IAuthInfo> = useCallback(
    (data) => dispatcher(doLogin(data)),
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
            className="form-control"
            id="email"
            type="email"
            required
            aria-describedby="emailHelp"
            mb={10}
            {...register('email')}
          />
        </div>
        <div>
          <PasswordInput
            icon={<Lock />}
            placeholder="Пароль"
            label="Пароль"
            className="form-control"
            id="password"
            required
            autoComplete="on"
            mb={10}
            {...register('password')}
          />
        </div>
        <Button
          loading={isLoginLoading}
          type="submit"
          variant="gradient"
          gradient={{ from: 'violet', to: 'grape', deg: 105 }}
        >
          Войти
        </Button>
      </form>
    </div>
  );
};

export default AuthLoginForm;

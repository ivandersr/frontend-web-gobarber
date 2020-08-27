// src/pages/SignUp/index.tsx
import React, { useCallback, useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';

import {
  FiChevronLeft, FiMail, FiUser, FiLock,
} from 'react-icons/fi';

import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';

import Button from '../../components/Button';

import { useToast } from '../../hooks/toast';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

import api from '../../services/apiClient';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      history.push('/');

      addToast({
        type: 'success',
        title: 'Usuário cadastrado com sucesso',
        description: 'Realize seu login e acesse seu dashboard',
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro realilzar o cadastro. Tente novamente',
      });
    }
  }, [addToast, history]);
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiChevronLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>

      </Content>

    </Container>

  );
};

export default SignUp;
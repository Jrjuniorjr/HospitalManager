import React, { useContext, useState } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthLessThan,
  hasLengthGreaterThan,
} from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";
import { observer } from "mobx-react-lite";

const validate = combineValidators({
  username: composeValidators(
    isRequired("username"),
    hasLengthLessThan(20)({
      message: "username nao pode ter mais que 20 letras.",
    }),
    hasLengthGreaterThan(3)({
      message: "username nao pode ter menos de 3 letras.",
    })
  )(),
  email: isRequired("email"),
  password: isRequired("password"),
  nomeHospital: isRequired("nome do hospital"),
});
const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register, loadingInitial } = rootStore.userStore;

  const [error, setError]: any | null = useState(null);

  const handleFinalFormSubmit = (values: IUserFormValues) => {
     register(values).catch(error => setError(error));
    }

  return (
    <FinalForm
      onSubmit={handleFinalFormSubmit}
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Hospital Manager"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="nomeHospital"
            component={TextInput}
            placeholder="Nome do Hospital"
          />

          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />
          {error && !dirtySinceLastSubmit && (
            <ErrorMessage error={error} text={error.data.message} />
          )}
          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            content="Register"
            loading={loadingInitial}
            fluid
            color="teal"
          />
        </Form>
      )}
    />
  );
};

export default observer(RegisterForm);

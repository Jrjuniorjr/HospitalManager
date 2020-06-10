import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid, Divider, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../app/common/form/TextInput";
import { combineValidators, isRequired } from "revalidate";
import { RootStoreContext } from "../../app/stores/rootStore";
import { PacienteFormValues } from "../../app/models/paciente";
import { Notification, INotification } from "../../app/models/notification";
import { IUser, IUserItem } from "../../app/models/user";
import TextAreaInput from "../../app/common/form/TextAreaInput";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  mensagem: isRequired("mensagem"),

});

interface DetailParams {
  id: string;
}

const NotificationForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const {loadUser} = rootStore.userStore;
  const {createNotification} = rootStore.notificationStore;
  const [error, setError]: any = useState(null);


  const [notification, setNotification] = useState(new Notification());
  const [loading, setLoading] = useState(false);

  const handleFinalFormSubmit = (values: any) => {
    let sender : IUser = {
        id : parseInt(window.localStorage.getItem("id")!),
        email: "",
        nomeHospital: "",
        username: "",
        roles:[],
        token:"",
        type: "",
    };
    let receiver : IUser = {
        id : parseInt(match.params.id)!,
        email: "",
        nomeHospital: "",
        username: "",
        roles:[],
        token:"",
        type: "",
    };
    notification.receiver = receiver;
    notification.sender = sender;
    notification.mensagem = values.mensagem;

    createNotification(notification).then(setError(null)).catch(error => setError(error));


  };

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
  }

  return (
    <FinalForm
    onSubmit={handleFinalFormSubmit}
    validate={validate}
    render={({
      handleSubmit,
      submitting,
      invalid,
      pristine,
      dirtySinceLastSubmit,
    }) => (
      <Form onSubmit={handleSubmit} error>
        <Header
          as="h3"
          content="Enviar Notificação"
          color="blue"
          textAlign="center"
        />
        <Field
          name="mensagem"
          component={TextAreaInput}
          rows={4}
          placeholder="Escreva a mensagem..."
        />
        {error && (<ErrorMessage error={error} text={error.data.message}/>)}
        <Button
          disabled={(invalid && !dirtySinceLastSubmit) || pristine}
          content="Enviar"
          loading={submitting}
          fluid
          color="blue"
        />
      </Form>
    )}
  />
);
};

export default observer(NotificationForm);

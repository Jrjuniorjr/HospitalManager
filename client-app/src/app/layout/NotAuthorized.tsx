import React from "react";
import { Segment, Button, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name="lock" />
        Oops - Você não tem autorização para seguir!
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/" primary>
          Return to Home
        </Button>
      </Segment.Inline>
    </Segment>
  );
};

export default NotAuthorized;

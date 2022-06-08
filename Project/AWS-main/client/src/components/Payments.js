import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

// once the user click the botton, the first interaction between the client and
// stripe will return a token.
// then the token will be passed to handleToken to execute the second interaction
class Payments extends Component {

  render() {
    return (
      <StripeCheckout
        name="Emaily"
        description="$5 for 5 email credits"
        // 5$
        amount={500}
        // get the token from stripe and then send it to handleToken
        token={token => this.props.handleToken(token)}
        // the public key of stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn orange lighten-2">
          Add Credits
        </button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);

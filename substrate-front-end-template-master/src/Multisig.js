import React, { useState } from "react";
import { Form, Input, Grid, Label, Icon } from "semantic-ui-react";
import { TxButton } from "./substrate-lib/components";
import { useSubstrate } from "./substrate-lib";

export default function Main(props) {
  const [status, setStatus] = useState(null);
  const [formState, setFormState] = useState({
    addressTo: null,
    amount: 0,
    threshold: 2,
    other_signatories: "",
  });
  const { accountPair } = props;
  const { api } = useSubstrate();

  const onChange = (_, data) =>
    setFormState((prev) => ({ ...prev, [data.state]: data.value }));

  const { addressTo, amount, threshold, other_signatories } = formState;

  return (
    <Grid.Column width={8}>
      <h1>Multisig</h1>
      <Form>
        <Form.Field>
          <Input
            fluid
            label="To"
            type="text"
            placeholder="address"
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Threshold"
            type="number"
            state="threshold"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>Other signatories, semicolon separated </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Other"
            type="text"
            state="other_signatories"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: "center" }}>
          <TxButton
            accountPair={accountPair}
            label="Submit"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: "multisig",
              callable: "asMulti",
              inputParams: [
                threshold,
                other_signatories.split(";"),
                null,
                api.tx.balances.transfer(addressTo, amount),
                false,
                1000000,
              ],
              paramFields: [true, true, { optional: true }, true, true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: "break-word" }}>{status}</div>
      </Form>
    </Grid.Column>
  );
}

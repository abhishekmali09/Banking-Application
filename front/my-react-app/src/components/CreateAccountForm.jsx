import { useState } from "react";

function CreateAccountForm({ onSubmit, onCancel }) {
  const [accountHolderName, setAccountHolderName] = useState("");
  const [balance, setBalance] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      accountHolderName,
      balance: parseFloat(balance) || 0,
    };
    onSubmit(payload);
    setAccountHolderName("");
    setBalance(0);
  };

  return (
    <form onSubmit={handleSubmit} className="card form">
      <div className="card-header">
        <div>
          <div className="title">Create New Account</div>
          <div className="caption">Add holder name and initial balance</div>
        </div>
      </div>
      <div className="divider" />
      <div className="form-row">
        <label className="label">Account Holder Name</label>
        <input
          className="input"
          type="text"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label className="label">Initial Balance</label>
        <input
          className="input"
          type="number"
          step="0.01"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          required
        />
      </div>
      <div className="actions">
        <button className="btn btn-primary" type="submit">Create Account</button>
        <button className="btn btn-ghost" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}

export default CreateAccountForm;

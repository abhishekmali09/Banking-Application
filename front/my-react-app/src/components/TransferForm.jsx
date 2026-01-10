import { useState } from "react";

function TransferForm({ accounts, onSubmit }) {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      fromAccount: Number(fromAccount),
      toAccount: Number(toAccount),
      amount: parseFloat(amount) || 0,
    };
    onSubmit(payload);
    setAmount("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="card-header">
        <div className="title">Transfer Funds</div>
        <div className="caption">Move money between your accounts</div>
      </div>
      <div className="divider" />
      <div className="form-row">
        <label className="label">From Account</label>
        <select className="input" value={fromAccount} onChange={(e) => setFromAccount(e.target.value)} required>
          <option value="" disabled>Select account</option>
          {accounts.map(a => (
            <option key={a.id} value={a.id}>
              {a.accountHolderName} • ${a.balance?.toFixed(2) || '0.00'}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label className="label">To Account</label>
        <select className="input" value={toAccount} onChange={(e) => setToAccount(e.target.value)} required>
          <option value="" disabled>Select account</option>
          {accounts.map(a => (
            <option key={a.id} value={a.id}>
              {a.accountHolderName} • ${a.balance?.toFixed(2) || '0.00'}
            </option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label className="label">Amount</label>
        <input
          className="input"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="actions">
        <button className="btn btn-primary" type="submit">Transfer</button>
      </div>
    </form>
  );
}

export default TransferForm;

function AccountItem({
  account,
  transactionData,
  setTransactionData,
  onDeposit,
  onWithdraw,
  onDelete,
}) {
  const depositKey = `deposit-${account.id}`;
  const withdrawKey = `withdraw-${account.id}`;

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="title">{account.accountHolderName}</div>
          <div className="account-id">ID: {account.id}</div>
        </div>
        <div className="balance-badge">${account.balance?.toFixed(2) || '0.00'}</div>
      </div>
      <div className="row">
        <div className="row">
          <input
            className="amount-input"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={transactionData[depositKey] || ''}
            onChange={(e) => setTransactionData({ ...transactionData, [depositKey]: e.target.value })}
          />
          <button className="btn btn-primary" onClick={() => onDeposit(account.id)}>
            Deposit
          </button>
        </div>
        <div className="row">
          <input
            className="amount-input"
            type="number"
            step="0.01"
            placeholder="Amount"
            value={transactionData[withdrawKey] || ''}
            onChange={(e) => setTransactionData({ ...transactionData, [withdrawKey]: e.target.value })}
          />
          <button className="btn" onClick={() => onWithdraw(account.id)}>
            Withdraw
          </button>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button className="btn btn-danger" onClick={() => onDelete(account.id)}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;

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
          <div className="account-id">Account #{account.id}</div>
          <div className="account-type">Savings Account</div>
        </div>
        <div className="balance-badge">${account.balance?.toFixed(2) || '0.00'}</div>
      </div>

      <div className="divider" />

      <div className="card-actions">
        <div className="action-group">
          <span className="action-group-label">Deposit</span>
          <input
            className="amount-input"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={transactionData[depositKey] || ''}
            onChange={(e) => setTransactionData({ ...transactionData, [depositKey]: e.target.value })}
          />
          <button className="btn btn-primary" onClick={() => onDeposit(account.id)}>
            Deposit
          </button>
        </div>
        <div className="action-group">
          <span className="action-group-label">Withdraw</span>
          <input
            className="amount-input"
            type="number"
            step="0.01"
            placeholder="0.00"
            value={transactionData[withdrawKey] || ''}
            onChange={(e) => setTransactionData({ ...transactionData, [withdrawKey]: e.target.value })}
          />
          <button className="btn" onClick={() => onWithdraw(account.id)}>
            Withdraw
          </button>
        </div>
        <div className="card-footer">
          <button className="btn btn-danger" onClick={() => onDelete(account.id)}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountItem;

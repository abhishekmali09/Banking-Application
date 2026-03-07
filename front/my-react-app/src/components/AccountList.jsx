import AccountItem from "./AccountItem";

function AccountList({
  accounts,
  status,
  transactionData,
  setTransactionData,
  onDeposit,
  onWithdraw,
  onDelete,
}) {
  if (status === "loading") {
    return (
      <div className="grid">
        {[1, 2, 3].map((i) => (
          <div className="skeleton-card" key={i}>
            <div className="skeleton skeleton-line medium" />
            <div className="skeleton skeleton-line short" />
            <div className="skeleton skeleton-line long" />
            <div className="skeleton skeleton-line badge" />
          </div>
        ))}
      </div>
    );
  }

  if (status === "succeeded" && accounts.length === 0) {
    return (
      <div className="card empty-state">
        <div className="empty-icon">🏦</div>
        <div className="empty-title">No accounts yet</div>
        <div className="empty-description">
          Create your first bank account to get started
        </div>
      </div>
    );
  }

  if (status !== "succeeded") return null;

  return (
    <div className="grid">
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account}
          transactionData={transactionData}
          setTransactionData={setTransactionData}
          onDeposit={onDeposit}
          onWithdraw={onWithdraw}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default AccountList;

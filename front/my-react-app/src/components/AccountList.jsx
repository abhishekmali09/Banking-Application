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
  if (status === "loading") return <div className="card">Loading...</div>;
  if (status === "succeeded" && accounts.length === 0) return <div className="card">No accounts found.</div>;

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

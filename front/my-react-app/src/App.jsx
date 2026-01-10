import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccounts, createAccount, deposit, withdraw, deleteAccount, clearError, transferMoney } from './store/accountsSlice';
import CreateAccountForm from "./components/CreateAccountForm";
import ErrorBanner from "./components/ErrorBanner";
import AccountList from "./components/AccountList";
import TransferForm from "./components/TransferForm";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { items: accounts, status, error } = useSelector((state) => state.accounts);
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const totalBalance = (accounts || []).reduce((sum, acc) => sum + (acc.balance || 0), 0);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAccounts());
    }
  }, [dispatch, status]);

  const handleCreateAccount = async (payload) => {
    await dispatch(createAccount(payload));
    setShowCreateForm(false);
    dispatch(fetchAccounts());
  };

  const handleDeposit = async (id) => {
    const amount = parseFloat(transactionData[`deposit-${id}`]);
    if (amount && amount > 0) {
      await dispatch(deposit({ id, amount }));
      setTransactionData({ ...transactionData, [`deposit-${id}`]: '' });
      dispatch(fetchAccounts());
    }
  };

  const handleWithdraw = async (id) => {
    const amount = parseFloat(transactionData[`withdraw-${id}`]);
    if (amount && amount > 0) {
      await dispatch(withdraw({ id, amount }));
      setTransactionData({ ...transactionData, [`withdraw-${id}`]: '' });
      dispatch(fetchAccounts());
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      await dispatch(deleteAccount(id));
      dispatch(fetchAccounts());
    }
  };
  
  const handleTransfer = async ({ fromAccount, toAccount, amount }) => {
    const result = await dispatch(transferMoney({ fromAccount, toAccount, amount }));
    if (result.payload) {
      // Transfer successful, refresh accounts from backend
      setTimeout(() => {
        dispatch(fetchAccounts());
      }, 300);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo" />
          <div className="title">AbhiRa Bank</div>
        </div>
        <nav className="nav">
          <div className="nav-item active">
            <span className="icon">🏠</span>
            Home
          </div>
          <div className="nav-item">
            <span className="icon">🏦</span>
            My Banks
          </div>
          <div className="nav-item">
            <span className="icon">📄</span>
            Transaction History
          </div>
          <div className="nav-item">
            <span className="icon">🔁</span>
            Transfer Funds
          </div>
          <div className="nav-item">
            <span className="icon">🔗</span>
            Connect Bank
          </div>
        </nav>
      </aside>

      <main className="content">
        <div className="header">
          <div className="title">Welcome</div>
          <div className="actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              {showCreateForm ? 'Cancel' : 'Create Account'}
            </button>
          </div>
        </div>

        <div className="summary-card">
          <div>
            <div className="caption">Total Current Balance</div>
            <div className="balance">${totalBalance.toFixed(2)}</div>
          </div>
          <div className="caption">{accounts?.length || 0} Bank Accounts</div>
        </div>

        <ErrorBanner error={error} onClear={() => dispatch(clearError())} />

        {showCreateForm && (
          <CreateAccountForm
            onSubmit={handleCreateAccount}
            onCancel={() => setShowCreateForm(false)}
          />
        )}

        <section className="section">
          <div className="section-title">
            <span>Accounts</span>
          </div>
          <AccountList
            accounts={accounts}
            status={status}
            transactionData={transactionData}
            setTransactionData={setTransactionData}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
            onDelete={handleDelete}
          />
        </section>
        
        <section className="section">
          <div className="section-title">
            <span>Transfer Funds</span>
          </div>
          <TransferForm accounts={accounts} onSubmit={handleTransfer} />
        </section>
      </main>
    </div>
  );
}

export default App;

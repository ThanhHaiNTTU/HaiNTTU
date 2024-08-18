"use client";
import React, { useState, useEffect } from 'react';
import './globals.css';
import { FaMoneyBillWave, FaPlus, FaHome, FaChartPie, FaUtensils, FaPlane, FaShoppingCart, FaHeartbeat, FaCar, FaBook, FaGamepad, FaEllipsisH, FaMoneyCheckAlt, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

interface Transaction {
  id: number;
  date: string;
  amount: string;
  type: string;
}

const categories = [
  { icon: FaMoneyCheckAlt, label: 'Lương', color: 'text-yellow-600' },
  { icon: FaUtensils, label: 'Ăn uống', color: 'text-blue-600' },
  { icon: FaPlane, label: 'Du lịch', color: 'text-red-600' },
  { icon: FaShoppingCart, label: 'Mua sắm', color: 'text-pink-600' },
  { icon: FaHeartbeat, label: 'Y tế', color: 'text-green-600' },
  { icon: FaCar, label: 'Xe cộ', color: 'text-yellow-600' },
  { icon: FaBook, label: 'Sách', color: 'text-blue-600' },
  { icon: FaGamepad, label: 'Giải trí', color: 'text-red-600' },
  { icon: FaEllipsisH, label: 'Khác', color: 'text-gray-600' }
];

const incomeCategories = [
  { label: 'Lương' },
  { label: 'Thưởng' },
  { label: 'Làm thêm' },
  { label: 'Quà tặng' },
  { label: 'Đầu tư' },
  { label: 'Trúng số' }
];

const expenseCategories = categories.filter(category => category.label !== 'Lương');

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const calculateBalance = (transactions: Transaction[]) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(transaction => {
    const amount = parseInt(transaction.amount, 10);
    if (incomeCategories.some(category => category.label === transaction.type)) {
      totalIncome += amount;
    } else if (expenseCategories.some(category => category.label === transaction.type)) {
      totalExpense += amount;
    }
  });

  return totalIncome - totalExpense;
};

const Page: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionData, setTransactionData] = useState<Transaction>({
    id: Date.now(),
    date: '',
    amount: '',
    type: ''
  });
  const [showStatistics, setShowStatistics] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ date: boolean; amount: boolean }>({ date: false, amount: false });

  useEffect(() => {
    const existingData = localStorage.getItem('transactions');
    if (existingData) {
      setTransactions(JSON.parse(existingData));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTransactionData({ id: Date.now(), date: '', amount: '', type: category });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransactionData({ ...transactionData, [name]: value });
  };

  const handleFormSubmit = () => {
    const { date, amount } = transactionData;
    const errors = { date: !date, amount: !amount };
    setFormErrors(errors);

    if (!errors.date && !errors.amount) {
      let newTransactions;
      if (editingId !== null) {
        newTransactions = transactions.map(transaction =>
          transaction.id === editingId ? { ...transaction, ...transactionData } : transaction
        );
        setEditingId(null);
      } else {
        newTransactions = [...transactions, transactionData];
      }
      setTransactions(newTransactions);
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      setSelectedCategory(null);
      alert('Transaction saved successfully');
    }
  };

  const handleEdit = (id: number) => {
    const transactionToEdit = transactions.find(transaction => transaction.id === id);
    if (transactionToEdit) {
      setEditingId(id);
      setTransactionData(transactionToEdit);
    }
  };

  const handleDelete = (id: number) => {
    const newTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTransactionData({ id: Date.now(), date: '', amount: '', type: '' });
  };

  const closeModal = () => {
    setSelectedCategory(null);
    setEditingId(null);
  };

  const handleShowStatistics = () => {
    setShowStatistics(true);
  };

  const closeStatisticsModal = () => {
    setShowStatistics(false);
  };

  const balance = calculateBalance(transactions);
  const balanceColor = balance >= 0 ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-teal-600 shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Quản lý chi tiêu</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Balance Display */}
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mt-2">HUỲNH THANH HẢI</h2>
            <h2 className={`text-lg font-semibold ${balanceColor}`}>
              Số dư: {formatCurrency(balance)}
            </h2>
            <div className="mt-4 flex justify-center space-x-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Chi tiêu')}>
                Thêm chi tiêu
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setSelectedCategory('Thu nhập')}>
                Thêm thu nhập
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded">
                Tổng kết
              </button>
            </div>
          </div>

          {/* Category Icons Grid */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.label}
                className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleCategoryClick(category.label)}
              >
                <category.icon className={`text-2xl mx-auto ${category.color}`} />
                <p className="mt-2">{category.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Transaction Form Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Thêm {selectedCategory}</h3>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Ngày {selectedCategory.toLowerCase()}</label>
              <input
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleInputChange}
                className={`mt-1 px-4 py-2 border rounded-lg w-full ${formErrors.date ? 'border-red-500' : ''}`}
              />
              {formErrors.date && <p className="text-red-500 text-xs mt-1">Ngày không được để trống</p>}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Số tiền</label>
              <input
                type="text"
                name="amount"
                value={transactionData.amount}
                onChange={handleInputChange}
                className={`mt-1 px-4 py-2 border rounded-lg w-full ${formErrors.amount ? 'border-red-500' : ''}`}
              />
              {formErrors.amount && <p className="text-red-500 text-xs mt-1">Số tiền không được để trống</p>}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Diễn giải</label>
              {selectedCategory === 'Chi tiêu' ? (
                <select
                  name="type"
                  value={transactionData.type}
                  onChange={handleInputChange}
                  className="mt-1 px-4 py-2 border rounded-lg w-full bg-white"
                >
                  <option value="">Chọn loại chi tiêu</option>
                  {expenseCategories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              ) : selectedCategory === 'Thu nhập' ? (
                <select
                  name="type"
                  value={transactionData.type}
                  onChange={handleInputChange}
                  className="mt-1 px-4 py-2 border rounded-lg w-full bg-white"
                >
                  <option value="">Chọn loại thu nhập</option>
                  {incomeCategories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  name="type"
                  value={transactionData.type}
                  readOnly
                  className="mt-1 px-4 py-2 border rounded-lg w-full bg-gray-100"
                />
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleFormSubmit}>
                <FaSave />
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={closeModal}>
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatistics && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <h3 className="text-lg font-medium text-gray-900">Thống kê giao dịch</h3>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-blue-500 text-white">Ngày</th>
                    <th className="py-2 px-4 bg-blue-500 text-white">Số tiền</th>
                    <th className="py-2 px-4 bg-blue-500 text-white">Diễn giải</th>
                    <th className="py-2 px-4 bg-blue-500 text-white">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="h-12">
                      <td className="py-2 px-4 border">
                        {editingId === transaction.id ? (
                          <input
                            type="date"
                            name="date"
                            value={transactionData.date}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border rounded-lg w-full"
                          />
                        ) : (
                          formatDate(transaction.date)
                        )}
                      </td>
                      <td className={`py-2 px-4 border text-right ${expenseCategories.some(category => category.label === transaction.type) ? 'text-red-500' : 'text-green-500'}`}>
                        {editingId === transaction.id ? (
                          <input
                            type="text"
                            name="amount"
                            value={transactionData.amount}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border rounded-lg w-full"
                          />
                        ) : (
                          formatCurrency(parseInt(transaction.amount, 10))
                        )}
                      </td>
                      <td className="py-2 px-4 border">
                        {editingId === transaction.id ? (
                          <input
                            type="text"
                            name="type"
                            value={transactionData.type}
                            onChange={handleInputChange}
                            className="mt-1 px-4 py-2 border rounded-lg w-full"
                          />
                        ) : (
                          transaction.type
                        )}
                      </td>
                      <td className="py-2 px-4 border flex space-x-2 justify-center">
                        {editingId === transaction.id ? (
                          <>
                            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={handleFormSubmit}>
                              <FaSave />
                            </button>
                            <button className="bg-gray-500 text-white px-2 py-1 rounded ml-2" onClick={handleCancelEdit}>
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(transaction.id)} />
                            <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(transaction.id)} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-gray-500 text-white px-4 py-2 rounded ml-2" onClick={closeStatisticsModal}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
            <FaHome className="text-2xl" />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-gray-800" onClick={() => setSelectedCategory('Chi tiêu')}>
            <FaPlus className="text-2xl" />
            <span className="text-xs">Thêm</span>
          </a>
          <a href="#" className="flex flex-col items-center text-gray-600 hover:text-gray-800" onClick={handleShowStatistics}>
            <FaChartPie className="text-2xl" />
            <span className="text-xs">Thống kê</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Page;

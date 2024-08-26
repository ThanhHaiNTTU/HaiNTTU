"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import {
  FaUserCircle,
  FaPlus,
  FaHome,
  FaChartPie,
  FaBook,
  FaUtensils,
  FaPlane,
  FaShoppingCart,
  FaHeartbeat,
  FaCar,
  FaGamepad,
  FaEllipsisH,
  FaMoneyCheckAlt,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaUserEdit,
  FaSignOutAlt,
  FaQuestionCircle,
  FaLink,
  FaLock,
  FaApple,
  FaFacebook,
  FaGoogle,
} from "react-icons/fa";

interface Transaction {
  id: number;
  date: string;
  amount: string;
  type: string;
}

const categories = [
  { icon: FaMoneyCheckAlt, label: "Lương", color: "text-yellow-600" },
  { icon: FaUtensils, label: "Ăn uống", color: "text-blue-600" },
  { icon: FaPlane, label: "Du lịch", color: "text-red-600" },
  { icon: FaShoppingCart, label: "Mua sắm", color: "text-pink-600" },
  { icon: FaHeartbeat, label: "Y tế", color: "text-green-600" },
  { icon: FaCar, label: "Xe cộ", color: "text-yellow-600" },
  { icon: FaBook, label: "Sách", color: "text-blue-600" },
  { icon: FaGamepad, label: "Giải trí", color: "text-red-600" },
  { icon: FaEllipsisH, label: "Khác", color: "text-gray-600" },
];

const incomeCategories = [
  { label: "Lương" },
  { label: "Thưởng" },
  { label: "Làm thêm" },
  { label: "Quà tặng" },
  { label: "Đầu tư" },
  { label: "Trúng số" },
];

const expenseCategories = categories.filter(
  (category) => category.label !== "Lương"
);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatCurrency = (amount: number) => {
  return amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const calculateTotals = (transactions: Transaction[], selectedMonth: Date) => {
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((transaction) => {
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === selectedMonth.getMonth() &&
      transactionDate.getFullYear() === selectedMonth.getFullYear()
    ) {
      const amount = parseInt(transaction.amount, 10);
      if (
        incomeCategories.some((category) => category.label === transaction.type)
      ) {
        totalIncome += amount;
      } else if (
        expenseCategories.some((category) => category.label === transaction.type)
      ) {
        totalExpense += amount;
      }
    }
  });

  return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
};

const LoginPage: React.FC<{
  onLogin: () => void;
  onRegister: () => void;
  onForgotPassword: () => void;
  defaultUsername?: string;
  defaultPassword?: string;
}> = ({
  onLogin,
  onRegister,
  onForgotPassword,
  defaultUsername = "",
  defaultPassword = "",
}) => {
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);

  const handleLogin = () => {
    if (username === "hthai" && password === "123") {
      onLogin();
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center text-red-600 mb-4">
            NTTU
          </h1>
        </div>
        <h2 className="text-3xl font-bold text-center text-teal-600 mb-4">
          Đăng nhập
        </h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="bg-teal-600 text-white w-full px-4 py-2 rounded-lg"
        >
          Đăng nhập
        </button>
        <div className="flex justify-between mt-4">
          <button
            onClick={onForgotPassword}
            className="text-blue-600 hover:underline"
          >
            Quên mật khẩu
          </button>
          <button onClick={onRegister} className="text-blue-600 hover:underline">
            Đăng ký
          </button>
        </div>
        <div className="flex justify-center mt-4">
          <FaApple className="text-2xl mx-2 cursor-pointer" />
          <FaFacebook className="text-2xl mx-2 cursor-pointer" />
          <FaGoogle className="text-2xl mx-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const RegisterPage: React.FC<{
  onRegisterComplete: (username: string, password: string) => void;
  onCancel: () => void;
}> = ({ onRegisterComplete, onCancel }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Xử lý đăng ký (ví dụ: lưu thông tin người dùng)
    onRegisterComplete(username, password);
    alert("Đăng ký thành công");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-4">
          Đăng ký
        </h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email hoặc Số điện thoại"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Xác nhận lại Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleRegister}
          className="bg-teal-600 text-white w-full px-4 py-2 rounded-lg"
        >
          Đăng ký
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white w-full px-4 py-2 rounded-lg mt-2"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};

const ForgotPasswordPage: React.FC<{
  onResetComplete: () => void;
  onCancel: () => void;
}> = ({ onResetComplete, onCancel }) => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    // Xử lý yêu cầu đặt lại mật khẩu
    onResetComplete();
    alert("Yêu cầu đặt lại mật khẩu đã được gửi");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-teal-600 mb-4">
          Quên mật khẩu
        </h2>
        <input
          type="email"
          placeholder="Email hoặc Số điện thoại"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          onClick={handleResetPassword}
          className="bg-teal-600 text-white w-full px-4 py-2 rounded-lg mb-2"
        >
          Đặt lại mật khẩu
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white w-full px-4 py-2 rounded-lg text-center"
        >
          Hủy bỏ
        </button>
      </div>
    </div>
  );
};

const MainPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transactionData, setTransactionData] = useState<Transaction>({
    id: Date.now(),
    date: "",
    amount: "",
    type: "",
  });
  const [showStatistics, setShowStatistics] = useState<boolean>(false);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{
    date: boolean;
    amount: boolean;
  }>({ date: false, amount: false });
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  const [showAccountModal, setShowAccountModal] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showLinkBank, setShowLinkBank] = useState<boolean>(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState<boolean>(
    false
  );
  const [showHelp, setShowHelp] = useState<boolean>(false);

  useEffect(() => {
    const existingData = localStorage.getItem("transactions");
    if (existingData) {
      setTransactions(JSON.parse(existingData));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setTransactionData({ id: Date.now(), date: "", amount: "", type: category });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        newTransactions = transactions.map((transaction) =>
          transaction.id === editingId
            ? { ...transaction, ...transactionData }
            : transaction
        );
        setEditingId(null);
      } else {
        newTransactions = [...transactions, transactionData];
      }
      setTransactions(newTransactions);
      localStorage.setItem("transactions", JSON.stringify(newTransactions));
      setSelectedCategory(null);
      alert("Giao dịch đã được lưu thành công");
    }
  };

  const handleEdit = (id: number) => {
    const transactionToEdit = transactions.find(
      (transaction) => transaction.id === id
    );
    if (transactionToEdit) {
      setEditingId(id);
      setTransactionData(transactionToEdit);
    }
  };

  const handleHelpClick = () => {
    setShowHelp(true);
  };

  const closeHelpModal = () => {
    setShowHelp(false);
  };

  const handleDelete = (id: number) => {
    const newTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(newTransactions);
    localStorage.setItem("transactions", JSON.stringify(newTransactions));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTransactionData({ id: Date.now(), date: "", amount: "", type: "" });
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

  const handleNextMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.setMonth(selectedMonth.getMonth() + 1))
    );
  };

  const handlePreviousMonth = () => {
    setSelectedMonth(
      new Date(selectedMonth.setMonth(selectedMonth.getMonth() - 1))
    );
  };

  const handleShowAll = () => {
    setSelectedMonth(new Date());
  };

  const handleShowSummary = () => {
    setShowSummary(true);
  };

  const closeSummaryModal = () => {
    setShowSummary(false);
  };

  const handleAccountClick = () => {
    setShowAccountModal(true);
  };

  const closeAccountModal = () => {
    setShowAccountModal(false);
    setShowEditProfile(false);
    setShowLinkBank(false);
    setShowSecuritySettings(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    closeAccountModal();
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getMonth() === selectedMonth.getMonth() &&
      transactionDate.getFullYear() === selectedMonth.getFullYear()
    );
  });

  const { totalIncome, totalExpense, balance } = calculateTotals(
    transactions,
    selectedMonth
  );
  const balanceColor = balance >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-teal-600 shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">QUẢN LÝ CHI TIÊU</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              HUỲNH THANH HẢI
            </h2>
            <h2
              className="text-lg font-bold text-blue-800"
              style={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Số dư:{" "}
              <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                {formatCurrency(balance)}
              </span>
            </h2>
            <div className="mt-4 flex justify-center space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedCategory("Chi tiêu")}
              >
                Thêm chi tiêu
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => setSelectedCategory("Thu nhập")}
              >
                Thêm thu nhập
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleShowSummary}
              >
                Tổng kết
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.label}
                className="bg-gray-200 p-4 rounded-lg text-center cursor-pointer"
                onClick={() => handleCategoryClick(category.label)}
              >
                <category.icon className={`text-3xl mx-auto ${category.color}`} />
                <p className="mt-2 text-blue-800 text-sm">{category.label}</p>
              </div>
            ))}
          </div>
          <div className="p-6"></div>
        </div>
      </main>

      {selectedCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">
              Thêm {selectedCategory}
            </h3>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Ngày {selectedCategory.toLowerCase()}
              </label>
              <input
                type="date"
                name="date"
                value={transactionData.date}
                onChange={handleInputChange}
                className={`mt-1 px-4 py-2 border rounded-lg w-full ${
                  formErrors.date ? "border-red-500" : ""
                }`}
              />
              {formErrors.date && (
                <p className="text-red-500 text-xs mt-1">
                  Ngày không được để trống
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Số tiền
              </label>
              <input
                type="text"
                name="amount"
                value={transactionData.amount}
                onChange={handleInputChange}
                className={`mt-1 px-4 py-2 border rounded-lg w-full ${
                  formErrors.amount ? "border-red-500" : ""
                }`}
              />
              {formErrors.amount && (
                <p className="text-red-500 text-xs mt-1">
                  Số tiền không được để trống
                </p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Diễn giải
              </label>
              {selectedCategory === "Chi tiêu" ? (
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
              ) : selectedCategory === "Thu nhập" ? (
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
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleFormSubmit}
              >
                <FaSave />
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                onClick={closeModal}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        </div>
      )}

      {showSummary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <button
                className="text-gray-700 px-2"
                onClick={handlePreviousMonth}
              >
                <FaChevronLeft />
              </button>
              <h3 className="text-lg font-medium text-gray-900">Tổng kết</h3>
              <button className="text-gray-700 px-2" onClick={handleNextMonth}>
                <FaChevronRight />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                Tổng thu nhập: {formatCurrency(totalIncome)}
              </p>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">
                Tổng chi tiêu: {formatCurrency(totalExpense)}
              </p>
            </div>
            <div className="mt-4">
              <p className={`text-sm font-medium ${balanceColor}`}>
                Số dư hiện tại: {formatCurrency(balance)}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleShowAll}
              >
                Tất cả
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeSummaryModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showStatistics && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <button
                className="text-gray-700 px-2"
                onClick={handlePreviousMonth}
              >
                <FaChevronLeft />
              </button>
              <h3 className="text-lg font-medium text-gray-900">
                Thống kê giao dịch
              </h3>
              <button className="text-gray-700 px-2" onClick={handleNextMonth}>
                <FaChevronRight />
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 bg-blue-500 text-white">Ngày</th>
                    <th className="py-2 px-4 bg-blue-500 text-white">Số tiền</th>
                    <th className="py-2 px-4 bg-blue-500 text-white">
                      Diễn giải
                    </th>
                    <th className="py-2 px-4 bg-blue-500 text-white">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="h-12">
                      <td className="py-2 px-4 border h-12">
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
                      <td
                        className={`py-2 px-4 border text-right ${
                          expenseCategories.some(
                            (category) => category.label === transaction.type
                          )
                            ? "text-red-500"
                            : "text-green-500"
                        } h-12`}
                      >
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
                      <td className="py-2 px-4 border h-12">
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
                      <td className="py-2 px-4 border flex space-x-2 justify-center h-12">
                        {editingId === transaction.id ? (
                          <>
                            <button
                              className="bg-blue-500 text-white px-2 py-1 rounded"
                              onClick={handleFormSubmit}
                            >
                              <FaSave />
                            </button>
                            <button
                              className="bg-gray-500 text-white px-2 py-1 rounded ml-2"
                              onClick={handleCancelEdit}
                            >
                              <FaTimes />
                            </button>
                          </>
                        ) : (
                          <>
                            <FaEdit
                              className="text-blue-500 cursor-pointer"
                              onClick={() => handleEdit(transaction.id)}
                            />
                            <FaTrash
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleDelete(transaction.id)}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleShowAll}
              >
                Tất cả
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeStatisticsModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {showAccountModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">
              Thông tin tài khoản
            </h3>
            <div className="mt-4 space-y-4">
              <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-between"
                onClick={() => setShowEditProfile(true)}
              >
                <span>Chỉnh sửa thông tin cá nhân</span>
                <FaUserEdit />
              </button>
              <button
                className="w-full bg-green-500 text-white px-4 py-2 rounded flex items-center justify-between"
                onClick={() => setShowLinkBank(true)}
              >
                <span>Liên kết tài khoản ngân hàng</span>
                <FaLink />
              </button>
              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded flex items-center justify-between"
                onClick={() => setShowSecuritySettings(true)}
              >
                <span>Bảo mật</span>
                <FaLock />
              </button>
              <button
                className="w-full bg-gray-500 text-white px-4 py-2 rounded flex items-center justify-between"
                onClick={handleLogoutClick}
              >
                <span>Đăng xuất</span>
                <FaSignOutAlt />
              </button>
            </div>

            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={closeAccountModal}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Trợ giúp</h3>
            <div className="mt-4">
              <p>
                Nếu bạn cần hỗ trợ, vui lòng liên hệ bộ phận hỗ trợ khách hàng
                qua email hoặc Hotline.
              </p>
              <ul className="mt-4 list-disc list-inside">
                <li>Email: hthai@ntt.edu.vn</li>
                <li>Hotline: 0888 472 111</li>
              </ul>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeHelpModal}
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">
              Chỉnh sửa thông tin cá nhân
            </h3>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Tên đầy đủ"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Mật khẩu hiện tại"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeAccountModal}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {showLinkBank && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">
              Liên kết tài khoản ngân hàng
            </h3>
            <div className="mt-4 space-y-2">
              <input
                type="text"
                placeholder="Tên ngân hàng"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Số tài khoản"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Chi nhánh"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeAccountModal}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      {showSecuritySettings && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900">Bảo mật</h3>
            <div className="mt-4 space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Kích hoạt xác thực hai yếu tố (2FA)
              </label>
              <input
                type="password"
                placeholder="Mật khẩu hiện tại"
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeAccountModal}
            >
              Lưu
            </button>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md py-2">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6 flex justify-around space-x-2">
          <a
            href="#"
            className="flex flex-col items-center text-teal-600 hover:text-teal-800"
          >
            <FaHome className="text-2xl" />
            <span className="text-xs">Trang chủ</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-red-600 hover:text-red-800"
            onClick={handleShowStatistics}
          >
            <FaChartPie className="text-2xl" />
            <span className="text-xs">Thống kê</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-green-600 hover:text-green-800"
            onClick={() => setSelectedCategory("Chi tiêu")}
          >
            <FaPlus className="text-4xl" />
            <span className="text-xs">Thêm</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-blue-600 hover:text-blue-800"
            onClick={handleHelpClick}
          >
            <FaQuestionCircle className="text-2xl" />
            <span className="text-xs">Trợ giúp</span>
          </a>
          <a
            href="#"
            className="flex flex-col items-center text-teal-600 hover:text-teal-800"
            onClick={handleAccountClick}
          >
            <FaUserCircle className="text-2xl" />
            <span className="text-xs">Tài khoản</span>
          </a>
        </div>
      </nav>
    </div>
  );
};

const Page: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [defaultUsername, setDefaultUsername] = useState<string>("");
  const [defaultPassword, setDefaultPassword] = useState<string>("");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsRegistering(true);
  };

  const handleRegisterComplete = (username: string, password: string) => {
    setIsRegistering(false);
    setDefaultUsername(username);
    setDefaultPassword(password);
    setIsLoggedIn(false); // Quay trở lại màn hình đăng nhập
  };

  const handleForgotPassword = () => {
    setIsResettingPassword(true);
  };

  const handleResetComplete = () => {
    setIsResettingPassword(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const handleCancel = () => {
    setIsResettingPassword(false);
  };

  const handleCancelRegister = () => {
    setIsRegistering(false); // Quay trở lại màn hình đăng nhập
  };

  if (isLoggedIn) {
    return <MainPage onLogout={handleLogout} />;
  } else if (isRegistering) {
    return (
      <RegisterPage
        onRegisterComplete={handleRegisterComplete}
        onCancel={handleCancelRegister}
      />
    );
  } else if (isResettingPassword) {
    return (
      <ForgotPasswordPage onResetComplete={handleResetComplete} onCancel={handleCancel} />
    );
  } else {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegister}
        onForgotPassword={handleForgotPassword}
        defaultUsername={defaultUsername}
        defaultPassword={defaultPassword}
      />
    );
  }
};

export default Page;

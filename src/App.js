import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, Trash2, Search, X, Save, Filter,
  TrendingUp, TrendingDown, Calendar, Tag,
  Layout, List, ChevronDown, CreditCard,
  ArrowUpCircle, ArrowDownCircle, RefreshCw,
  AlertCircle, Wifi, WifiOff, Download,
  BarChart3, PieChart as PieChartIcon,
  CalendarDays, ChevronLeft, ChevronRight,
  MoreVertical, Edit, FileText, Menu,
  Home, BarChart, PieChart, DollarSign
} from 'lucide-react';

// ==========================================
// 🔧 CONFIGURATION
// ==========================================
const API_BASE_URL = 'http://localhost:5000/api';

// Color palette for charts
const CHART_COLORS = {
  income: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
  expense: ['#ef4444', '#f87171', '#fca5a5', '#fecaca'],
  categories: [
    '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef',
    '#ec4899', '#f43f5e', '#ef4444', '#f97316',
    '#f59e0b', '#eab308', '#84cc16', '#22c55e',
    '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9'
  ]
};

// ==========================================
// 🛠️ API SERVICE
// ==========================================
const apiService = {
  checkConnection: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },

  fetchTransactions: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/transactions?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return await response.json();
    } catch (error) {
      console.error('Fetch transactions error:', error);
      throw error;
    }
  },

  fetchSummary: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/summary?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch summary');
      return await response.json();
    } catch (error) {
      console.error('Fetch summary error:', error);
      throw error;
    }
  },

  fetchCategoryAnalytics: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== '' && value !== null) {
          queryParams.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE_URL}/analytics/categories?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch category analytics');
      return await response.json();
    } catch (error) {
      console.error('Fetch category analytics error:', error);
      throw error;
    }
  },

  fetchAvailableYears: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/years`);
      if (!response.ok) throw new Error('Failed to fetch years');
      return await response.json();
    } catch (error) {
      console.error('Fetch years error:', error);
      return [new Date().getFullYear()];
    }
  },

  createTransaction: async (transaction) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transaction)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create transaction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Create transaction error:', error);
      throw error;
    }
  },

  deleteTransaction: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete transaction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Delete transaction error:', error);
      throw error;
    }
  },

  updateTransaction: async (id, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update transaction');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update transaction error:', error);
      throw error;
    }
  }
};

// ==========================================
// 📊 SIMPLE CHART COMPONENTS (No recharts needed)
// ==========================================

// Simple Bar Chart Component
const SimpleBarChart = ({ data, title, height = 200 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg">
        <p className="text-slate-400">No data available</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => Math.max(item.income || 0, item.expense || 0)));
  
  return (
    <div className="bg-white p-4 rounded-xl">
      <h3 className="font-bold text-slate-800 mb-4">{title}</h3>
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-slate-500">
          <span>₹{maxValue.toLocaleString('en-IN')}</span>
          <span>₹{(maxValue * 0.75).toLocaleString('en-IN')}</span>
          <span>₹{(maxValue * 0.5).toLocaleString('en-IN')}</span>
          <span>₹{(maxValue * 0.25).toLocaleString('en-IN')}</span>
          <span>₹0</span>
        </div>
        
        {/* Bars container */}
        <div className="ml-12 h-full flex items-end justify-between gap-2">
          {data.slice(-6).map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              {/* Bars */}
              <div className="w-full flex flex-col items-center justify-end h-36 gap-1">
                {item.income > 0 && (
                  <div
                    className="w-3/4 bg-emerald-500 rounded-t"
                    style={{ height: `${(item.income / maxValue) * 100}%` }}
                    title={`Income: ₹${item.income.toLocaleString('en-IN')}`}
                  />
                )}
                {item.expense > 0 && (
                  <div
                    className="w-3/4 bg-red-500 rounded-t"
                    style={{ height: `${(item.expense / maxValue) * 100}%` }}
                    title={`Expense: ₹${item.expense.toLocaleString('en-IN')}`}
                  />
                )}
              </div>
              
              {/* X-axis label */}
              <div className="text-xs text-slate-500 mt-2 truncate w-full text-center">
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-xs text-slate-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-xs text-slate-600">Expense</span>
        </div>
      </div>
    </div>
  );
};

// Simple Pie Chart Component
const SimplePieChart = ({ data, title, type = 'expense' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-48 flex items-center justify-center bg-slate-50 rounded-lg">
        <p className="text-slate-400">No {type} data available</p>
      </div>
    );
  }

  const topCategories = data
    .filter(item => item.totalAmount > 0)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, 5);

  const total = topCategories.reduce((sum, item) => sum + item.totalAmount, 0);
  
  return (
    <div className="bg-white p-4 rounded-xl">
      <h3 className="font-bold text-slate-800 mb-4">{title}</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Pie Chart Visualization */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border-8 border-slate-100"></div>
          
          {topCategories.map((category, index) => {
            const percentage = (category.totalAmount / total) * 100;
            const cumulativePercentage = topCategories
              .slice(0, index)
              .reduce((sum, item) => sum + (item.totalAmount / total) * 360, 0);
            
            return (
              <div
                key={index}
                className="absolute inset-0 rounded-full border-8 border-transparent"
                style={{
                  borderTopColor: CHART_COLORS.categories[index % CHART_COLORS.categories.length],
                  transform: `rotate(${cumulativePercentage}deg)`,
                  borderWidth: '8px',
                  clipPath: `inset(0 0 0 50%)`,
                }}
              />
            );
          })}
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-800">
                {type === 'income' ? '₹' : '₹'}
              </div>
              <div className="text-xs text-slate-500">{topCategories.length} categories</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex-1 space-y-2">
          {topCategories.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: CHART_COLORS.categories[index % CHART_COLORS.categories.length] }}
                />
                <span className="text-sm text-slate-700 truncate max-w-[100px]">
                  {category._id}
                </span>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-800">
                  ₹{category.totalAmount.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-500">
                  {((category.totalAmount / total) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ value, max, color = 'indigo', label }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };
  
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="font-medium text-slate-800">
          ₹{value.toLocaleString('en-IN')} / ₹{max.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${colorClasses[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-xs text-slate-500 text-right">
        {percentage.toFixed(1)}%
      </div>
    </div>
  );
};

// ==========================================
// 🎨 MOBILE-FIRST UI COMPONENTS
// ==========================================

// Mobile Bottom Navigation
const BottomNav = ({ activeView, setActiveView }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'transactions', label: 'Transactions', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'add', label: 'Add', icon: Plus }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 shadow-lg">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => item.id === 'add' ? setActiveView('add_transaction') : setActiveView(item.id)}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all active:scale-95 ${
              activeView === item.id || (item.id === 'add' && activeView === 'add_transaction')
                ? 'text-indigo-600'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <div className={`p-2 rounded-full ${
              activeView === item.id || (item.id === 'add' && activeView === 'add_transaction')
                ? 'bg-indigo-100'
                : ''
            }`}>
              <item.icon size={20} />
            </div>
            <span className="text-xs font-medium mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Mobile Header
const MobileHeader = ({ title, onMenuClick, onRefresh, loading }) => (
  <div className="sticky top-0 z-40 bg-white border-b border-slate-200">
    <div className="flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 active:scale-95"
        >
          <Menu size={22} className="text-slate-700" />
        </button>
        <h1 className="text-lg font-bold text-slate-800">{title}</h1>
      </div>
      <button
        onClick={onRefresh}
        disabled={loading}
        className="p-2 active:scale-95"
      >
        <RefreshCw size={18} className={`text-slate-600 ${loading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  </div>
);

// Transaction Card (Mobile Optimized)
const TransactionCard = ({ transaction, onDelete, onEdit }) => {
  const isIncome = transaction.type === 'income';
  const formattedDate = new Date(transaction.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short'
  });

  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-lg p-3 mb-2 shadow-sm border border-slate-100 active:scale-[0.98] transition-transform">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`p-2 rounded-lg flex-shrink-0 ${isIncome ? 'bg-emerald-100' : 'bg-red-100'}`}>
          {isIncome ? (
            <ArrowUpCircle size={18} className="text-emerald-600" />
          ) : (
            <ArrowDownCircle size={18} className="text-red-600" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-slate-800 truncate text-sm">{transaction.title}</h4>
            <span className={`text-sm font-bold ml-2 ${isIncome ? 'text-emerald-600' : 'text-red-600'}`}>
              {isIncome ? '+' : '-'}₹{Number(transaction.amount).toLocaleString('en-IN')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {transaction.category}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500">{formattedDate}</span>
          </div>
        </div>

        {/* Actions Button */}
        <button
          onClick={() => setShowActions(!showActions)}
          className="p-1 text-slate-400 active:scale-95"
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Action Menu */}
      {showActions && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2 animate-fade-in">
          <button
            onClick={() => {
              onEdit(transaction);
              setShowActions(false);
            }}
            className="flex-1 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium flex items-center justify-center gap-1 active:scale-95"
          >
            <Edit size={14} />
            Edit
          </button>
          <button
            onClick={() => {
              if (window.confirm("Delete this transaction?")) {
                onDelete(transaction._id);
              }
              setShowActions(false);
            }}
            className="flex-1 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center justify-center gap-1 active:scale-95"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

// Mobile Filter Modal
const FilterModal = ({ isOpen, onClose, filters, setFilters, applyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  if (!isOpen) return null;

  const handleApply = () => {
    setFilters(localFilters);
    applyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      type: '',
      category: '',
      month: '',
      year: '',
      search: ''
    };
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
    applyFilters(resetFilters);
    onClose();
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-hidden">
        {/* Handle Bar */}
        <div className="pt-4 pb-2">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">Filters</h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 active:scale-95"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Filter Content */}
        <div className="overflow-y-auto h-[calc(85vh-120px)] px-4 py-4">
          <div className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Transaction Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLocalFilters({...localFilters, type: localFilters.type === 'income' ? '' : 'income'})}
                  className={`py-3 rounded-xl text-center font-medium ${
                    localFilters.type === 'income'
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  } active:scale-95`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setLocalFilters({...localFilters, type: localFilters.type === 'expense' ? '' : 'expense'})}
                  className={`py-3 rounded-xl text-center font-medium ${
                    localFilters.type === 'expense'
                      ? 'bg-red-100 text-red-700 border-2 border-red-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  } active:scale-95`}
                >
                  Expense
                </button>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={localFilters.category}
                onChange={(e) => setLocalFilters({...localFilters, category: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
              >
                <option value="">All Categories</option>
                <option value="Salary">Salary</option>
                <option value="Home Rent">Home Rent</option>
                <option value="Food & Essentials">Food & Essentials</option>
                <option value="Transport">Transport</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>

            {/* Year & Month */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Year</label>
                <select
                  value={localFilters.year}
                  onChange={(e) => setLocalFilters({...localFilters, year: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                >
                  <option value="">All Years</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Month</label>
                <select
                  value={localFilters.month}
                  onChange={(e) => setLocalFilters({...localFilters, month: e.target.value})}
                  className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                >
                  <option value="">All Months</option>
                  {[
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
                  ].map((month, index) => (
                    <option key={index + 1} value={index + 1}>{month}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={localFilters.search}
                  onChange={(e) => setLocalFilters({...localFilters, search: e.target.value})}
                  placeholder="Search transactions..."
                  className="w-full bg-white border border-slate-300 rounded-xl py-3 pl-10 pr-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-slate-200 p-4">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleReset}
              className="py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium active:scale-95"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="py-3 bg-indigo-600 text-white rounded-xl font-medium active:scale-95"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobile Transaction Modal
const MobileTransactionModal = ({ isOpen, onClose, onSave, initialData, mode = 'add' }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: 'Other Expense',
    date: new Date().toISOString().split('T')[0],
    description: '',
    ...initialData
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const incomeCategories = ['Salary', 'Freelance', 'Business', 'Investment', 'Gift', 'Other Income'];
  const expenseCategories = ['Home Rent', 'Food & Essentials', 'Transport', 'Entertainment', 'Healthcare', 'Other Expense'];

  const categories = formData.type === 'income' ? incomeCategories : expenseCategories;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave({ 
        ...formData, 
        amount: Number(formData.amount)
      });
      if (mode === 'add') {
        setFormData({ 
          title: '', 
          amount: '', 
          type: 'expense', 
          category: 'Other Expense', 
          date: new Date().toISOString().split('T')[0], 
          description: ''
        });
      }
      onClose();
    } catch (error) {
      alert(error.message || 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-hidden">
        {/* Handle Bar */}
        <div className="pt-4 pb-2">
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto"></div>
        </div>

        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800">
              {mode === 'edit' ? 'Edit Transaction' : 'New Transaction'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 active:scale-95"
            >
              <X size={20} className="text-slate-500" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto h-[calc(90vh-120px)] px-4 py-4">
          <div className="space-y-4">
            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Amount (₹)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-slate-700">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                  className="w-full bg-white border-2 border-slate-300 rounded-xl py-3 pl-10 pr-4 text-2xl font-bold text-slate-800 focus:border-indigo-500 outline-none"
                  placeholder="0"
                  autoFocus
                />
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'expense'})}
                  className={`py-3 rounded-xl text-center font-medium flex items-center justify-center gap-2 ${
                    formData.type === 'expense'
                      ? 'bg-red-100 text-red-700 border-2 border-red-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  } active:scale-95`}
                >
                  <ArrowDownCircle size={16} />
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, type: 'income'})}
                  className={`py-3 rounded-xl text-center font-medium flex items-center justify-center gap-2 ${
                    formData.type === 'income'
                      ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  } active:scale-95`}
                >
                  <ArrowUpCircle size={16} />
                  Income
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                placeholder="e.g. Grocery Shopping"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description (Optional)</label>
              <textarea
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-white border border-slate-300 rounded-xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-indigo-200 outline-none"
                placeholder="Add a note..."
                rows="3"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold text-white ${
                formData.type === 'income' 
                  ? 'bg-emerald-600 hover:bg-emerald-700' 
                  : 'bg-red-600 hover:bg-red-700'
              } disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  {mode === 'edit' ? 'Updating...' : 'Saving...'}
                </div>
              ) : (
                `${mode === 'edit' ? 'Update' : 'Save'} ${formData.type === 'income' ? 'Income' : 'Expense'}`
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Mobile Summary Cards
const MobileSummaryCards = ({ summary }) => (
  <div className="grid grid-cols-3 gap-2 mb-4">
    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-3 text-white shadow-sm">
      <div className="flex items-center gap-1 mb-1">
        <TrendingUp size={14} />
        <span className="text-xs opacity-90">Income</span>
      </div>
      <p className="text-base font-bold truncate">₹{summary.totals.income.toLocaleString('en-IN')}</p>
    </div>
    
    <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-3 text-white shadow-sm">
      <div className="flex items-center gap-1 mb-1">
        <TrendingDown size={14} />
        <span className="text-xs opacity-90">Expense</span>
      </div>
      <p className="text-base font-bold truncate">₹{summary.totals.expense.toLocaleString('en-IN')}</p>
    </div>
    
    <div className={`bg-gradient-to-br rounded-xl p-3 text-white shadow-sm ${
      summary.totals.balance >= 0 
        ? 'from-blue-500 to-blue-600' 
        : 'from-amber-500 to-amber-600'
    }`}>
      <div className="flex items-center gap-1 mb-1">
        <CreditCard size={14} />
        <span className="text-xs opacity-90">Balance</span>
      </div>
      <p className="text-base font-bold truncate">₹{summary.totals.balance.toLocaleString('en-IN')}</p>
    </div>
  </div>
);

// Quick Actions Bar
const QuickActionsBar = ({ onAddClick, onFilterClick, onExportClick }) => (
  <div className="sticky top-14 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 px-4 py-3">
    <div className="flex items-center gap-2">
      <button
        onClick={onAddClick}
        className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 active:scale-95"
      >
        <Plus size={16} />
        <span>Add Transaction</span>
      </button>
      <button
        onClick={onFilterClick}
        className="p-2.5 border border-slate-300 text-slate-700 rounded-xl active:scale-95"
      >
        <Filter size={16} />
      </button>
      <button
        onClick={onExportClick}
        className="p-2.5 border border-slate-300 text-slate-700 rounded-xl active:scale-95"
      >
        <Download size={16} />
      </button>
    </div>
  </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse p-4">
    <div className="grid grid-cols-3 gap-2 mb-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-slate-200 rounded-xl p-3 h-16"></div>
      ))}
    </div>
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="h-6 bg-slate-200 rounded w-32 mb-4"></div>
      <div className="h-48 bg-slate-100 rounded-lg"></div>
    </div>
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="bg-white rounded-lg p-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-slate-200 rounded w-24 mb-2"></div>
            <div className="h-3 bg-slate-100 rounded w-16"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-12"></div>
        </div>
      </div>
    ))}
  </div>
);

// ==========================================
// 🚀 MAIN MOBILE APP COMPONENT
// ==========================================

export default function MobileExpenseTracker() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totals: { income: 0, expense: 0, balance: 0 },
    byCategory: {},
    monthly: []
  });
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [availableYears, setAvailableYears] = useState([]);
  
  // Mobile UI states
  const [activeView, setActiveView] = useState('overview');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingTransaction, setEditingTransaction] = useState(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    month: '',
    year: '',
    search: ''
  });

  // Initialize
  useEffect(() => {
    loadInitialData();
  }, []);

  // Load data when filters change
  useEffect(() => {
    if (activeView !== 'add_transaction') {
      loadData();
    }
  }, [filters, activeView]);

  const loadInitialData = async () => {
    try {
      const isConnected = await apiService.checkConnection();
      setConnectionStatus(isConnected ? 'connected' : 'disconnected');
      
      if (isConnected) {
        const years = await apiService.fetchAvailableYears();
        setAvailableYears(years);
      }
    } catch (error) {
      console.error('Initial load error:', error);
      setConnectionStatus('disconnected');
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch transactions with current filters
      const transactionsData = await apiService.fetchTransactions(filters);
      setTransactions(transactionsData.transactions || []);
      
      // Fetch summary with same filters
      const summaryData = await apiService.fetchSummary(filters);
      setSummary(summaryData);
      
      // Fetch category analytics for current filters
      const analyticsData = await apiService.fetchCategoryAnalytics(filters);
      setCategoryAnalytics(analyticsData);
      
    } catch (error) {
      console.error('Error loading data:', error);
      setError('Failed to load data. Please check your connection.');
      
      // Fallback to demo data for mobile
      const demoTransactions = [
        { _id: '1', title: 'Salary', amount: 50000, type: 'income', category: 'Salary', date: new Date().toISOString() },
        { _id: '2', title: 'Rent', amount: 15000, type: 'expense', category: 'Home Rent', date: new Date().toISOString() },
        { _id: '3', title: 'Groceries', amount: 5000, type: 'expense', category: 'Food & Essentials', date: new Date().toISOString() },
      ];
      setTransactions(demoTransactions);
      setSummary({
        totals: { income: 50000, expense: 20000, balance: 30000 },
        byCategory: {},
        monthly: [
          { month: '2024-01', income: 50000, expense: 20000 },
          { month: '2024-02', income: 45000, expense: 18000 },
          { month: '2024-03', income: 52000, expense: 22000 }
        ]
      });
      setCategoryAnalytics([
        { _id: 'Salary', totalAmount: 50000, count: 1 },
        { _id: 'Home Rent', totalAmount: 15000, count: 1 },
        { _id: 'Food & Essentials', totalAmount: 5000, count: 1 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (data) => {
    try {
      const savedTransaction = await apiService.createTransaction(data);
      setTransactions(prev => [savedTransaction, ...prev]);
      setShowTransactionModal(false);
      setActiveView('transactions');
      loadData();
    } catch (error) {
      // If offline, add locally
      if (error.message.includes('Failed to fetch')) {
        const localTransaction = {
          ...data,
          _id: Date.now().toString(),
          date: new Date(data.date).toISOString()
        };
        setTransactions(prev => [localTransaction, ...prev]);
        setShowTransactionModal(false);
        setActiveView('transactions');
      } else {
        alert(error.message || 'Failed to save transaction');
      }
    }
  };

  const handleUpdateTransaction = async (id, updates) => {
    try {
      const updatedTransaction = await apiService.updateTransaction(id, updates);
      setTransactions(prev => prev.map(t => 
        t._id === id ? updatedTransaction : t
      ));
      setShowTransactionModal(false);
      loadData();
    } catch (error) {
      alert(error.message || 'Failed to update transaction');
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
      loadData();
    } catch (error) {
      // If offline, delete locally
      if (error.message.includes('Failed to fetch')) {
        setTransactions(prev => prev.filter(t => t._id !== id));
      } else {
        alert(error.message || 'Failed to delete transaction');
      }
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setModalMode('edit');
    setShowTransactionModal(true);
  };

  const handleSaveTransaction = (data) => {
    if (modalMode === 'edit' && editingTransaction) {
      return handleUpdateTransaction(editingTransaction._id, data);
    } else {
      return handleAddTransaction(data);
    }
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Title', 'Amount', 'Type', 'Category'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [
        new Date(t.date).toLocaleDateString('en-IN'),
        `"${t.title.replace(/"/g, '""')}"`,
        t.amount,
        t.type,
        t.category
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('CSV file downloaded!');
  };

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="p-4 pb-20">
            {/* Connection Status */}
            <div className={`mb-4 p-3 rounded-xl flex items-center gap-3 ${
              connectionStatus === 'connected'
                ? 'bg-emerald-50 border border-emerald-200'
                : 'bg-amber-50 border border-amber-200'
            }`}>
              <div className={`p-2 rounded-full ${
                connectionStatus === 'connected' ? 'bg-emerald-100' : 'bg-amber-100'
              }`}>
                {connectionStatus === 'connected' ? (
                  <Wifi size={16} className="text-emerald-600" />
                ) : (
                  <WifiOff size={16} className="text-amber-600" />
                )}
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  {connectionStatus === 'connected' ? 'Online' : 'Offline Mode'}
                </p>
                <p className="text-sm text-slate-500">
                  {connectionStatus === 'connected' 
                    ? 'Data synced with server' 
                    : 'Working with local data'}
                </p>
              </div>
            </div>

            {/* Summary Cards */}
            <MobileSummaryCards summary={summary} />

            {/* Monthly Trends Chart */}
            <div className="mb-4">
              <SimpleBarChart 
                data={summary.monthly} 
                title="Monthly Trends"
                height={200}
              />
            </div>

            {/* Category Breakdown */}
            <div className="mb-4">
              <SimplePieChart 
                data={categoryAnalytics} 
                title="Category Breakdown"
                type="expense"
              />
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">Recent Transactions</h3>
                <button
                  onClick={() => setActiveView('transactions')}
                  className="text-sm text-indigo-600 font-medium active:scale-95"
                >
                  See All
                </button>
              </div>
              <div className="space-y-2">
                {transactions.slice(0, 3).map(transaction => (
                  <div key={transaction._id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg active:scale-95">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-emerald-100' : 'bg-red-100'}`}>
                        {transaction.type === 'income' ? (
                          <ArrowUpCircle size={16} className="text-emerald-600" />
                        ) : (
                          <ArrowDownCircle size={16} className="text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{transaction.title}</p>
                        <p className="text-xs text-slate-500">{transaction.category}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                      ₹{transaction.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'transactions':
        return (
          <div className="pb-20">
            <QuickActionsBar
              onAddClick={() => {
                setModalMode('add');
                setShowTransactionModal(true);
              }}
              onFilterClick={() => setShowFilterModal(true)}
              onExportClick={exportToCSV}
            />
            
            <div className="p-4">
              {/* Filter Status */}
              {(filters.type || filters.category || filters.month || filters.year || filters.search) && (
                <div className="mb-4 p-3 bg-indigo-50 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 flex-wrap">
                      <span className="text-sm text-indigo-700">Filters:</span>
                      {filters.type && (
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                          {filters.type}
                        </span>
                      )}
                      {filters.category && (
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                          {filters.category}
                        </span>
                      )}
                      {filters.search && (
                        <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs">
                          Search: {filters.search}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setFilters({ type: '', category: '', month: '', year: '', search: '' })}
                      className="text-sm text-indigo-600 font-medium active:scale-95"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}

              {/* Transactions List */}
              {loading ? (
                <LoadingSkeleton />
              ) : transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <List size={24} className="text-slate-400" />
                  </div>
                  <h4 className="text-lg font-medium text-slate-700 mb-2">No transactions</h4>
                  <p className="text-slate-500 mb-6">
                    {Object.values(filters).some(f => f) 
                      ? 'No transactions match your filters' 
                      : 'Start by adding your first transaction'}
                  </p>
                  <button
                    onClick={() => {
                      setModalMode('add');
                      setShowTransactionModal(true);
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium active:scale-95"
                  >
                    Add Transaction
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-800">Transactions ({transactions.length})</h3>
                    <span className="text-sm text-slate-500">
                      Total: ₹{summary.totals.balance.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    {transactions.map(transaction => (
                      <TransactionCard
                        key={transaction._id}
                        transaction={transaction}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div className="p-4 pb-20">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Analytics</h2>
            
            {/* Summary Cards */}
            <MobileSummaryCards summary={summary} />

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl p-4 mb-4">
              <h3 className="font-bold text-slate-800 mb-4">Top Categories</h3>
              <div className="space-y-3">
                {categoryAnalytics
                  .filter(c => c.totalAmount > 0)
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .slice(0, 5)
                  .map((category, index) => (
                    <ProgressBar
                      key={index}
                      value={category.totalAmount}
                      max={Math.max(...categoryAnalytics.map(c => c.totalAmount))}
                      color={['indigo', 'emerald', 'blue', 'purple', 'amber'][index]}
                      label={category._id}
                    />
                  ))}
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-white rounded-xl p-4">
              <h3 className="font-bold text-slate-800 mb-4">Monthly Summary</h3>
              <div className="space-y-3">
                {summary.monthly.slice(-3).reverse().map((month, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{month.month}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-emerald-600">
                          +₹{month.income?.toLocaleString('en-IN') || 0}
                        </span>
                        <span className="text-xs text-red-600">
                          -₹{month.expense?.toLocaleString('en-IN') || 0}
                        </span>
                      </div>
                    </div>
                    <span className={`font-bold ${
                      (month.income - month.expense) >= 0 ? 'text-emerald-600' : 'text-red-600'
                    }`}>
                      ₹{(month.income - month.expense).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header */}
      <MobileHeader
        title={
          activeView === 'overview' ? 'Overview' :
          activeView === 'transactions' ? 'Transactions' :
          activeView === 'analytics' ? 'Analytics' : 'Expense Tracker'
        }
        onMenuClick={() => setShowFilterModal(true)}
        onRefresh={loadData}
        loading={loading}
      />

      {/* Main Content */}
      <main className="min-h-screen pb-16">
        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
            <button
              onClick={loadData}
              className="mt-2 text-sm text-red-700 font-medium flex items-center gap-1 active:scale-95"
            >
              <RefreshCw size={12} /> Retry
            </button>
          </div>
        )}

        {renderView()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeView={activeView} setActiveView={setActiveView} />

      {/* Modals */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        setFilters={setFilters}
        applyFilters={(newFilters) => {
          setFilters(newFilters);
          setActiveView('transactions');
        }}
      />

      <MobileTransactionModal
        isOpen={showTransactionModal}
        onClose={() => {
          setShowTransactionModal(false);
          setEditingTransaction(null);
          setModalMode('add');
        }}
        onSave={handleSaveTransaction}
        initialData={editingTransaction}
        mode={modalMode}
      />

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
        @media (max-width: 640px) {
          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
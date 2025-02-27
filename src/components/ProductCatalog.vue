<template>
  <div class="erp-management">
    <h2>ERP 系统集成</h2>
    
    <div class="erp-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id">
        {{ tab.name }}
      </button>
    </div>
    
    <div class="tab-content">
      <!-- 1688一键铺货 -->
      <div v-if="activeTab === '1688'" class="tab-pane">
        <div class="connection-status" :class="{ connected: connected1688 }">
          <span class="status-indicator"></span>
          <span>1688账号状态: {{ connected1688 ? '已连接' : '未连接' }}</span>
          <button v-if="!connected1688" @click="connect1688">连接账号</button>
          <button v-else @click="disconnect1688" class="disconnect">断开连接</button>
        </div>
        
        <div class="product-import">
          <h3>商品导入</h3>
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="搜索1688商品..." />
            <button @click="search1688Products">搜索</button>
          </div>
          
          <div class="products-grid" v-if="products1688.length > 0">
            <div v-for="product in products1688" :key="product.id" class="product-card">
              <div class="product-image">
                <img :src="product.image" :alt="product.name" />
              </div>
              <div class="product-info">
                <h4>{{ product.name }}</h4>
                <p class="price">¥{{ product.price }}</p>
              </div>
              <div class="product-actions">
                <button @click="importProduct(product)" :disabled="product.imported">
                  {{ product.imported ? '已导入' : '导入商品' }}
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="no-products">
            <p>没有找到商品，请尝试其他搜索词</p>
          </div>
        </div>
      </div>
      
      <!-- 库存管理 -->
      <div v-if="activeTab === 'inventory'" class="tab-pane">
        <h3>库存管理</h3>
        <table class="inventory-table">
          <thead>
            <tr>
              <th>商品ID</th>
              <th>商品名称</th>
              <th>SKU</th>
              <th>库存数量</th>
              <th>库存状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in inventory" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.sku }}</td>
              <td>
                <input type="number" v-model="item.quantity" min="0" />
              </td>
              <td :class="getStockStatusClass(item.quantity)">
                {{ getStockStatus(item.quantity) }}
              </td>
              <td>
                <button @click="updateInventory(item)">更新</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- 订单同步 -->
      <div v-if="activeTab === 'orders'" class="tab-pane">
        <h3>订单同步</h3>
        <div class="sync-controls">
          <button @click="syncOrders" :disabled="syncing">
            {{ syncing ? '同步中...' : '同步订单' }}
          </button>
          <span v-if="lastSync">上次同步: {{ lastSync }}</span>
        </div>
        
        <table class="orders-table">
          <thead>
            <tr>
              <th>订单ID</th>
              <th>客户</th>
              <th>金额</th>
              <th>状态</th>
              <th>ERP状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customer }}</td>
              <td>{{ order.amount }} {{ order.currency }}</td>
              <td>{{ order.status }}</td>
              <td :class="order.syncStatus">{{ getSyncStatusText(order.syncStatus) }}</td>
              <td>
                <button @click="syncOrder(order)" :disabled="order.syncStatus === 'synced'">
                  推送到ERP
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '1688',
      tabs: [
        { id: '1688', name: '1688一键铺货' },
        { id: 'inventory', name: '库存管理' },
        { id: 'orders', name: '订单同步' }
      ],
      connected1688: false,
      searchQuery: '',
      products1688: [],
      inventory: [
        { id: '1001', name: '智能手表', sku: 'SW-001', quantity: 15 },
        { id: '1002', name: '无线耳机', sku: 'WH-002', quantity: 8 },
        { id: '1003', name: '便携充电器', sku: 'PC-003', quantity: 3 },
        { id: '1004', name: '蓝牙音箱', sku: 'BS-004', quantity: 0 }
      ],
      orders: [
        { id: 'ORD-1001', customer: '张三', amount: 299.99, currency: 'USD', status: '已付款', syncStatus: 'not_synced' },
        { id: 'ORD-1002', customer: '李四', amount: 129.99, currency: 'USD', status: '已发货', syncStatus: 'synced' },
        { id: 'ORD-1003', customer: '王五', amount: 459.98, currency: 'USD', status: '已完成', syncStatus: 'failed' }
      ],
      syncing: false,
      lastSync: '2023-11-20 15:30'
    }
  },
  methods: {
    connect1688() {
      // 实际应用中这里会调用API连接1688账号
      setTimeout(() => {
        this.connected1688 = true;
        this.loadSampleProducts();
      }, 1000);
    },
    disconnect1688() {
      this.connected1688 = false;
      this.products1688 = [];
    },
    search1688Products() {
      // 实际应用中这里会调用1688 API搜索商品
      console.log(`搜索1688商品: ${this.searchQuery}`);
      this.loadSampleProducts();
    },
    loadSampleProducts() {
      this.products1688 = [
        { id: '1688-001', name: '高品质智能手表', price: 199.00, image: 'https://via.placeholder.com/150', imported: false },
        { id: '1688-002', name: '无线蓝牙耳机', price: 89.00, image: 'https://via.placeholder.com/150', imported: false },
        { id: '1688-003', name: '快充移动电源', price: 59.00, image: 'https://via.placeholder.com/150', imported: true },
        { id: '1688-004', name: '便携式蓝牙音箱', price: 129.00, image: 'https://via.placeholder.com/150', imported: false }
      ];
    },
    importProduct(product) {
      // 实际应用中这里会调用API导入商品
      console.log(`导入商品: ${product.id}`);
      product.imported = true;
    },
    getStockStatus(quantity) {
      if (quantity <= 0) return '缺货';
      if (quantity < 5) return '库存低';
      return '有库存';
    },
    getStockStatusClass(quantity) {
      if (quantity <= 0) return 'out-of-stock';
      if (quantity < 5) return 'low-stock';
      return 'in-stock';
    },
    updateInventory(item) {
      // 实际应用中这里会调用API更新库存
      console.log(`更新库存: ${item.id}, 数量: ${item.quantity}`);
      // 模拟成功提示
      alert(`${item.name} 库存已更新为 ${item.quantity}`);
    },
    syncOrders() {
      this.syncing = true;
      // 实际应用中这里会调用API同步订单
      setTimeout(() => {
        this.syncing = false;
        this.lastSync = new Date().toLocaleString();
        // 模拟同步结果
        this.orders.forEach(order => {
          if (order.syncStatus === 'not_synced') {
            order.syncStatus = 'synced';
          }
        });
      }, 2000);
    },
    syncOrder(order) {
      // 实际应用中这里会调用API同步单个订单
      console.log(`同步订单: ${order.id}`);
      order.syncStatus = 'syncing';
      setTimeout(() => {
        order.syncStatus = 'synced';
      }, 1000);
    },
    getSyncStatusText(status) {
      switch (status) {
        case 'not_synced': return '未同步';
        case 'syncing': return '同步中';
        case 'synced': return '已同步';
        case 'failed': return '同步失败';
        default: return status;
      }
    }
  }
}
</script>

<style>
.erp-management {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.erp-tabs {
  display: flex;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.erp-tabs button {
  padding: 0.5rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #4a5568;
  border-bottom: 2px solid transparent;
}

.erp-tabs button.active {
  color: #4299e1;
  border-bottom-color: #4299e1;
}

.tab-pane {
  margin-top: 1rem;
}

.connection-status {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e53e3e;
  margin-right: 0.5rem;
}

.connected .status-indicator {
  background: #38a169;
}

.connection-status button {
  margin-left: auto;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #4299e1;
  color: white;
  cursor: pointer;
}

.connection-status button.disconnect {
  background: #e53e3e;
}

.search-bar {
  display: flex;
  margin-bottom: 1rem;
}

.search-bar input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px 0 0 4px;
}

.search-bar button {
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.product-card {
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.product-info {
  padding: 0.5rem;
}

.product-info h4 {
  margin: 0;
  font-size: 0.9rem;
}

.product-actions {
  padding: 0.5rem;
}

.product-actions button {
  width: 100%;
  padding: 0.5rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.product-actions button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.no-products {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 4px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f7fafc;
  font-weight: bold;
}

.out-of-stock {
  color: #e53e3e;
}

.low-stock {
  color: #dd6b20;
}

.in-stock {
  color: #38a169;
}

.sync-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.sync-controls button {
  padding: 0.5rem 1rem;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.sync-controls button:disabled {
  background: #cbd5e0;
  cursor: not-allowed;
}

.not_synced {
  color: #718096;
}

.syncing {
  color: #4299e1;
}

.synced {
  color: #38a169;
}

.failed {
  color: #e53e3e;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  table {
    font-size: 0.9rem;
  }
  
  th, td {
    padding: 0.5rem;
  }
}
</style>
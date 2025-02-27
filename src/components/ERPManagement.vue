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
        <div v-if="activeTab === '1688'" class="tab-pane">
          <h3>1688一键铺货</h3>
          <p>连接您的1688账号，一键导入商品</p>
        </div>
        
        <div v-if="activeTab === 'inventory'" class="tab-pane">
          <h3>库存管理</h3>
          <p>管理您的商品库存</p>
        </div>
        
        <div v-if="activeTab === 'orders'" class="tab-pane">
          <h3>订单同步</h3>
          <p>同步订单到ERP系统</p>
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
        ]
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
  
  @media (max-width: 768px) {
    .erp-tabs {
      flex-wrap: wrap;
    }
  }
  </style>
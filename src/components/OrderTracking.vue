<template>
  <div class="order-tracking">
    <h2>订单跟踪</h2>
    
    <div class="tracking-search">
      <input type="text" v-model="trackingNumber" placeholder="输入订单号或跟踪号" />
      <button @click="trackOrder">查询</button>
    </div>
    
    <div v-if="currentOrder" class="order-details">
      <div class="order-header">
        <div>
          <h3>订单 #{{ currentOrder.orderNumber }}</h3>
          <p class="order-date">下单日期: {{ currentOrder.orderDate }}</p>
        </div>
        <div class="order-status" :class="currentOrder.status.toLowerCase()">
          {{ currentOrder.status }}
        </div>
      </div>
      
      <div class="tracking-timeline">
        <div class="timeline-step" 
             v-for="(step, index) in currentOrder.trackingSteps" 
             :key="index"
             :class="{ 'completed': step.completed }">
          <div class="step-indicator"></div>
          <div class="step-content">
            <div class="step-title">{{ step.title }}</div>
            <div class="step-time" v-if="step.completed">{{ step.time }}</div>
          </div>
        </div>
      </div>
      
      <div class="shipping-details">
        <div class="shipping-info">
          <h4>配送信息</h4>
          <p><strong>承运商:</strong> {{ currentOrder.carrier }}</p>
          <p><strong>跟踪号:</strong> {{ currentOrder.trackingNumber }}</p>
          <p><strong>预计送达:</strong> {{ currentOrder.estimatedDelivery }}</p>
        </div>
        <div class="shipping-address">
          <h4>收货地址</h4>
          <p>{{ currentOrder.shippingAddress.name }}</p>
          <p>{{ currentOrder.shippingAddress.street }}</p>
          <p>{{ currentOrder.shippingAddress.city }}, {{ currentOrder.shippingAddress.state }} {{ currentOrder.shippingAddress.zip }}</p>
          <p>{{ currentOrder.shippingAddress.country }}</p>
        </div>
      </div>
      
      <div class="order-items">
        <h4>订单商品</h4>
        <div class="item" v-for="(item, index) in currentOrder.items" :key="index">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-quantity">数量: {{ item.quantity }}</div>
          </div>
          <div class="item-price">{{ item.price }} {{ item.currency }}</div>
        </div>
      </div>
    </div>
    
    <div v-else-if="searched" class="no-order-found">
      <p>未找到订单信息，请检查订单号或跟踪号是否正确。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trackingNumber: '',
      searched: false,
      currentOrder: {
        orderNumber: 'ORD-12345',
        orderDate: '2023-11-15',
        status: '运输中',
        carrier: 'DHL Express',
        trackingNumber: 'DHL7891234567',
        estimatedDelivery: '2023-11-22',
        trackingSteps: [
          { title: '订单确认', completed: true, time: '2023-11-15 10:30' },
          { title: '订单处理', completed: true, time: '2023-11-16 14:45' },
          { title: '已发货', completed: true, time: '2023-11-17 09:15' },
          { title: '运输中', completed: true, time: '2023-11-18 08:20' },
          { title: '派送中', completed: false },
          { title: '已送达', completed: false }
        ],
        shippingAddress: {
          name: '张三',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          country: '美国'
        },
        items: [
          { 
            name: '智能手表', 
            quantity: 1, 
            price: '299.99', 
            currency: 'USD', 
            image: 'https://via.placeholder.com/60' 
          },
          { 
            name: '无线耳机', 
            quantity: 2, 
            price: '259.98', 
            currency: 'USD', 
            image: 'https://via.placeholder.com/60' 
          }
        ]
      }
    }
  },
  methods: {
    trackOrder() {
      // 实际应用中这里会调用API查询订单
      this.searched = true;
      // 示例中我们总是返回相同的订单
      // 在实际应用中，您会根据API响应设置currentOrder
    }
  }
}
</script>

<style>
.order-tracking {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
}

.tracking-search {
  display: flex;
  margin-bottom: 1.5rem;
}

.tracking-search input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
  font-size: 1rem;
}

.tracking-search button {
  padding: 0.75rem 1.5rem;
  background: #4a5568;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.order-details {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #edf2f7;
}

.order-header h3 {
  margin: 0;
}

.order-date {
  color: #718096;
  margin: 0.5rem 0 0;
}

.order-status {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: bold;
  font-size: 0.875rem;
}

.order-status.pending {
  background: #feebc8;
  color: #c05621;
}

.order-status.processing {
  background: #bee3f8;
  color: #2b6cb0;
}

.order-status.shipped, .order-status.运输中 {
  background: #c6f6d5;
  color: #2f855a;
}

.order-status.delivered {
  background: #e9d8fd;
  color: #6b46c1;
}

.tracking-timeline {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid #edf2f7;
}

.timeline-step {
  display: flex;
  position: relative;
}

.timeline-step:not(:last-child) {
  padding-bottom: 2rem;
}

.timeline-step:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 30px;
  bottom: 0;
  width: 2px;
  background: #e2e8f0;
}

.step-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #e2e8f0;
  margin-right: 1rem;
  margin-top: 6px;
}

.timeline-step.completed .step-indicator {
  background: #4299e1;
}

.step-content {
  flex-grow: 1;
}

.step-title {
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.step-time {
  color: #718096;
  font-size: 0.875rem;
}

.shipping-details {
  display: flex;
  padding: 1.5rem;
  border-bottom: 1px solid #edf2f7;
}

.shipping-info, .shipping-address {
  flex: 1;
}

.shipping-details h4 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.order-items {
  padding: 1.5rem;
}

.order-items h4 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.item {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #edf2f7;
}

.item:last-child {
  border-bottom: none;
}

.item-image img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details {
  flex-grow: 1;
  margin-left: 1rem;
}

.item-name {
  font-weight: bold;
}

.item-quantity {
  color: #718096;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.item-price {
  font-weight: bold;
}

.no-order-found {
  background: white;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  color: #e53e3e;
}

@media (max-width: 768px) {
  .tracking-timeline {
    padding: 0.5rem;
  }
  
  .shipping-details {
    flex-direction: column;
  }
  
  .shipping-info, .shipping-address {
    width: 100%;
  }
}
</style> 
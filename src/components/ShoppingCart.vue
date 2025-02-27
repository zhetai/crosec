<template>
  <div class="shopping-cart">
    <h2>购物车</h2>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>您的购物车是空的</p>
      <button class="shop-now-btn">立即购物</button>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-price">{{ item.price }} {{ item.currency }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(index)" :disabled="item.quantity <= 1">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </div>
          <div class="item-total">
            {{ (item.price * item.quantity).toFixed(2) }} {{ item.currency }}
          </div>
          <button class="remove-btn" @click="removeItem(index)">×</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>小计:</span>
          <span>{{ calculateSubtotal() }} USD</span>
        </div>
        <div class="summary-row">
          <span>运费:</span>
          <span>{{ shipping }} USD</span>
        </div>
        <div class="summary-row total">
          <span>总计:</span>
          <span>{{ (calculateSubtotal() + shipping).toFixed(2) }} USD</span>
        </div>
        
        <button class="checkout-btn">结算</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [
        { 
          name: '智能手表', 
          price: 299.99, 
          currency: 'USD', 
          quantity: 1, 
          image: 'https://via.placeholder.com/80' 
        },
        { 
          name: '无线耳机', 
          price: 129.99, 
          currency: 'USD', 
          quantity: 2, 
          image: 'https://via.placeholder.com/80' 
        }
      ],
      shipping: 15.00
    }
  },
  methods: {
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      }
    },
    removeItem(index) {
      this.cartItems.splice(index, 1);
    },
    calculateSubtotal() {
      return this.cartItems.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0).toFixed(2);
    }
  }
}
</script>

<style>
.shopping-cart {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.empty-cart {
  text-align: center;
  padding: 2rem 0;
}

.shop-now-btn {
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.cart-items {
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  position: relative;
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

.item-details h3 {
  margin: 0;
  font-size: 1rem;
}

.item-price {
  color: #718096;
}

.item-quantity {
  display: flex;
  align-items: center;
  margin: 0 1rem;
}

.item-quantity button {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.item-quantity span {
  margin: 0 0.5rem;
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  color: #e53e3e;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.cart-summary {
  background: white;
  padding: 1rem;
  border-radius: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.total {
  font-weight: bold;
  font-size: 1.1rem;
  border-top: 1px solid #ddd;
  padding-top: 0.5rem;
  margin-top: 0.5rem;
}

.checkout-btn {
  width: 100%;
  background: #38a169;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #2f855a;
}
</style> 
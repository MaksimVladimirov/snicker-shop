<script setup lang="ts">
import { Button as AntButton } from 'ant-design-vue'
import { ref, computed } from 'vue'
import axios from 'axios'

import type { DrawerProps } from './DrawerProps'
import { useCartStore } from '@/store/CartStore'
import CartItemList from '../CartItemList/CartItemList.vue'
import DrawerHead from '../DrawerHead/DrawerHead.vue'
import InfoBlock from '../InfoBlock/InfoBlock.vue'

const props = defineProps<DrawerProps>()

const cartStore = useCartStore()
const isButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
const cartIsEmpty = computed(() => cartStore.cart.length === 0)
const isCreating = ref<boolean>(false)
const orderId = ref<null | number>(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://9e5263ce0c7354f2.mokky.dev/orders`, {
      items: cartStore.cart,
      totalPrice: props.totalPrice
    })
    cartStore.$reset()
    orderId.value = data.id
    return data
  } catch (err) {
    console.error(err)
  } finally {
    isCreating.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <div></div>
    <DrawerHead />
    <div v-if="!totalPrice || orderId" class="flex h-full items-center">
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Корзина пустая"
        description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="Заказ оформлен"
        :description="`Ваш заказ #${orderId} будет отправлен в ближайшее время`"
        image-url="/order-success-icon.png"
      />
    </div>

    <div v-else>
      <CartItemList />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} rub</b>
        </div>

        <div class="flex gap-2">
          <span>Налог 5%:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} rub</b>
        </div>
        <AntButton
          :disabled="isButtonDisabled"
          @click="createOrder"
          class="drawer__set-order-button"
        >
          Оформить заказ
        </AntButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drawer__set-order-button {
  margin-top: 20px;
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
  height: 44px;
  background: rgb(6, 199, 6) !important;
  color: aliceblue !important;
  border: none !important;
  transition: 0.6s;
}
.drawer__set-order-button:hover {
  background: rgb(22, 164, 22) !important;
}
</style>
./DrawerProps

<script setup lang="ts">
import { ref, computed } from 'vue'
import axios from 'axios'

import { useCartStore } from '@/store/CartStore'
import CartItemList from './CartItemList.vue'
import DrawerHead from './DrawerHead.vue'
import InfoBlock from './InfoBlock.vue'
import { storeToRefs } from 'pinia'

const props = defineProps({
  totalPrice: Number,
  vatPrice: Number
})

const { cart } = storeToRefs(useCartStore())

const isButtonDisabled = computed(() => isCreating.value || cartIsEmpty.value)
const cartIsEmpty = computed(() => cart.value.length === 0)
const isCreating = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreating.value = true
    const { data } = await axios.post(`https://9e5263ce0c7354f2.mokky.dev/orders`, {
      items: cart,
      //@ts-ignore
      totalPrice: props.totalPrice.value
    })
    cart.value = []
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
        <button
          :disabled="isButtonDisabled"
          @click="createOrder"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white transition hover:bg-lime-600 action:bg-lime-700 disabled:bg-slate-300 cursor-pointer"
        >
          Оформить заказ
        </button>
      </div>
    </div>
  </div>
</template>

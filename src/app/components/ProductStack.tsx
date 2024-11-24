'use client'

import { useState } from 'react'
import { Container, Paper, Title, Table, Group, Button, Text, NumberInput, Stack } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

// This would typically come from your global state management or API
const initialCartItems = [
  { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
  { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
  { id: 3, name: 'Product 3', price: 39.99, quantity: 3 },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Container size="md" py="xl">
      <Title order={1} mb="xl">Your Cart</Title>
      {cartItems.length === 0 ? (
        <Text>Your cart is empty.</Text>
      ) : (
        <Paper shadow="xs" p="md">
          <Table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <NumberInput
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value || 0)}
                      min={0}
                      max={99}
                      style={{ width: 80 }}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="subtle"
                      color="red"
                      onClick={() => removeItem(item.id)}
                      leftSection={<IconTrash size={16} />}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Stack align="flex-end" mt="xl">
            <Title order={3}>Total: ${total.toFixed(2)}</Title>
            <Button size="lg" onClick={() => console.log('Proceed to checkout')}>
              Proceed to Checkout
            </Button>
          </Stack>
        </Paper>
      )}
    </Container>
  )
}
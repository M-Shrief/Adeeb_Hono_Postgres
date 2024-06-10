import { OrderDB } from './repository';
import { OrderType } from './interface';

export const OrderService = {
  async getGuestOrders(
    name: string,
    phone: string,
  ): Promise<OrderType[] | false> {
    let orders: OrderType[];

    orders = await OrderDB.getGuestOrders(name, phone);

    if (orders.length === 0) return false;
    return orders;
  },

  async getPartnerOrders(partner: string): Promise<OrderType[] | false> {
    let orders: OrderType[];

    orders = await OrderDB.getPartnerOrders(partner);

    if (orders.length === 0) return false;
    return orders;
  },

  async post(orderData: OrderType): Promise<OrderType | false> {
    const newOrder = await OrderDB.post(orderData);
    if (!newOrder) return false;
    return newOrder;
  },

  async update(id: string, orderData: OrderType): Promise<OrderType | false> {
    const newOrder = await OrderDB.update(id, orderData);
    if (!newOrder) return false;
    return newOrder;
  },

  async delete(id: string): Promise<OrderType | false> {
    const order = await OrderDB.delete(id);
    if (!order) return false;
    return order;
  },
};

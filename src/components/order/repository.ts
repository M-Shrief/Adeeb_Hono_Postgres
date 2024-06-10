import { Order } from './model';
import { OrderType } from './interface';

export const OrderDB = {
  async getGuestOrders(name: string, phone: string): Promise<OrderType[]> {
    // having partner=null is crucial, so that non-partners can't access partners orders by knowing their name & phone.
    return await Order.find(
      { name, phone, partner: null },
      {
        name: 1,
        phone: 1,
        address: 1,
        reviewed: 1,
        completed: 1,
        products: 1,
        createdAt: 1,
        partner: 1
      },
      {
        sort: {
          createdAt: -1,
        },
        
      },
    );
  },

  async getPartnerOrders(partner: string): Promise<OrderType[]> {
    return await Order.find(
      { partner },
      {
        partner: 1,
        name: 1,
        phone: 1,
        address: 1,
        reviewed: 1,
        completed: 1,
        products: 1,
        createdAt: 1,
      },
      {
        sort: {
          createdAt: -1,
        },
      },
    );
  },

  async post(orderData: OrderType): Promise<OrderType> {
    const order = new Order();
    if (orderData.partner) order.partner = orderData.partner;

    order.name = orderData.name;
    order.phone = orderData.phone;
    order.address = orderData.address;
    order.reviewed = orderData.reviewed;
    order.completed = orderData.completed;
    order.products = orderData.products;

    return await order.save();
  },

  async update(id: string, orderData: OrderType): Promise<OrderType | null> {
    return await Order.findByIdAndUpdate(id, { $set: orderData }, {new: true});
  },

  async delete(id: string): Promise<OrderType | null> {
    return await Order.findByIdAndDelete(id);
  },
};

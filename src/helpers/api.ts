const API_URL = 'https://mate-uber-eats-api.herokuapp.com/api/v1/';

export const fetchProducts = async(): Promise<Product[]> => {
  const res = await fetch(`${API_URL}restaurants`);
  const json = await res.json();

  const { feedItems, storesMap } = json.data;

  interface Item {
    type: string;
    uuid: string;
  }

  return feedItems.map((item: Item) => storesMap[item.uuid]);
}

export const fetchProductsDetails = async (productId: string): Promise<ProductDetails> => {
  const res = await fetch(`${API_URL}restaurants/${productId}`);
  const json = await res.json();

  return json.data;
}

export const fetchMenuDish = async (productId: string): Promise<MenuDish> => {
  const res = await fetch(`${API_URL}menu-items/${productId}`);
  const json = await res.json();

  return json.data;
};

export const fetchCartItems = async (data: Cart[]): Promise<MenuDish[]> => {
  const result: MenuDish[] = [];

  for (const key of data) {
    result.push(await fetchMenuDish(key.id));
  }

  return result;
};

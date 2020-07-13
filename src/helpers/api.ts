const API_URL = 'https://mate-uber-eats-api.herokuapp.com/api/v1/';

export const fetchProducts = async() => {
  const result = await fetch(`${API_URL}restaurants`);
  const json = await result.json();

  const { feedItems, storesMap } = json.data;

  interface Item {
    type: string;
    uuid: string;
  }

  return feedItems.map((item: Item) => storesMap[item.uuid]);
}

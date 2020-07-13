/// <reference types="react-scripts" />

interface Product {
  categories: string[],
  citySlug: string,
  closedMessage: string,
  etaRange: {
    iconUrl: string,
    text: string,
  },
  feedback: {
    rating: number
    ratingCount: string,
  },
  heroImageUrl: string,
  isDeliveryThirdParty: boolean,
  isOpen: boolean,
  slug: string,
  title: string,
  uuid: string,
}

interface HeaderInput {
  iconUrl?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string,
  placeholder: string,
  name: string,
  className: string,
}

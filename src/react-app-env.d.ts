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

interface ProductDetails {
  title: string;
  uuid: string;
  etaRange: {
    text: strin;
  } | null;
  categories: string[];
  cuisineList: string[];
  priceBucket: string;
  ratingBadge: {
    text: string;
  } | null;
  disclaimerBadge: {
    text: string;
  } | null;
  heroImageUrls: HeroImage[];
  slug: string;
  sitySlug: string;
  phoneNumber: string;
  [key: string]:
  | string
  | null
  | boolean
  | number
  | {
    [key: string]: string | number | null | boolean;
  };
  sections: string[];
  sectionsMap: {
    [key: string]: {
      itemUuids: string[];
      title: string;
      uuid: string;
    };
  };
}

interface MenuDish {
  itemDescription: string;
  price: number;
  sectionUuid: string;
  subsectionUuid: string;
  title: string;
  uuid: string;
  customizationsList: [];
  imageUrl: string | null;
  suspendUntil: number;
  itemPromotion: null;
  rules: null;
  classifications: [];
}

interface Section {
  itemUuids: string[];
  title: string;
  uuid: string;
}

interface HeroImage {
  url: string;
  width: number;
}

interface HeaderInput {
  query?: string,
  iconUrl?: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string,
  placeholder: string,
  name: string,
  className: string,
}

interface Cart {
  id: string;
  count: number;
}

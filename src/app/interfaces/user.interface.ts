export interface User {
  id: number;
  name: string | undefined;
  username: string | undefined;
  email: string | undefined;
  address: {
    street: string | undefined;
    suite: string | undefined;
    city: string | undefined;
    zipcode: string | undefined;
    geo: {
      lat: string | undefined;
      lng: string | undefined;
    };
  };
  phone: string | undefined;
  website: string | undefined;
  company: {
    name: string | undefined;
    catchPhrase: string | undefined;
    bs: string | undefined;
  };
}

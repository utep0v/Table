export interface DataInterface {
  id?: string;
  age?: number;
  name?: Name;
  tags?: any[];
  email?: string;
  picture?: string;
  balance?: string;
  address?: string;
  company?: string;
  isActive?: boolean;
  favoriteFruit?: string;
}

interface Name {
  first?: string;
  last?: string;
}

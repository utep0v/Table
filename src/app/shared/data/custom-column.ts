import {DataInterface} from "../interfaces/data.interface";

export let customColumn = [
  {
    name: 'Name',
    value: 'name',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.name?.first || '').localeCompare(b.name?.first || ''),
    sortOrder: null
  },
  {
    name: 'Age',
    value: 'age',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.age ?? 0) - (b.age ?? 0),
    sortOrder: null
  },
  {
    name: 'Address',
    value: 'address',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.address || '').localeCompare(b.address || ''),
    sortOrder: null
  },
  {
    name: 'Status',
    value: 'isActive',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => Number(a.isActive) - Number(b.isActive),
    sortOrder: null
  },
  {
    name: 'Balance',
    value: 'balance',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => parseFloat(a.balance?.replace(/[^\d.-]/g, '') || '0') - parseFloat(b.balance?.replace(/[^\d.-]/g, '') || '0'),
    sortOrder: null
  },
  {
    name: 'Company',
    value: 'company',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.company || '').localeCompare(b.company || ''),
    sortOrder: null
  },
  {
    name: 'Email',
    value: 'email',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.email || '').localeCompare(b.email || ''),
    sortOrder: null
  },
  {
    name: 'Tags',
    value: 'tags',
    default: true,
    sortFn: null,
    sortOrder: null
  },
  {
    name: 'Picture',
    value: 'picture',
    default: true,
    sortFn: null,
    sortOrder: null
  },
  {
    name: 'Favorite Fruit',
    value: 'favoriteFruit',
    default: true,
    sortFn: (a: DataInterface, b: DataInterface) => (a.favoriteFruit || '').localeCompare(b.favoriteFruit || ''),
    sortOrder: null
  }
];


export const order = [
  {
    id: '1',
    userId: '1',
    fooItems: [
      { foodId: '1', quantity: 3 },
      { foodId: '2', quantity: 2 },
      { foodId: '3', quantity: 1 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    status: 'accepted',
  },
  {
    id: '2',
    userId: '1',
    fooItems: [
      { foodId: '3', quantity: 1 },
      { foodId: '2', quantity: 1 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    status: 'declined',
  },
  {
    id: '3',
    userId: '1',
    fooItems: [
      { foodId: '1', quantity: 3 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    status: 'pending',
  },
];

export const user = [
  {
    id: '1',
    name: 'john doe',
    email: 'johndoe@gmail.com',
    phone: '08038935647',
  },
  {
    id: '2',
    name: 'Mike Don',
    email: 'mikedon@gmail.com',
    phone: '08038655642',
  },
]

export const food = [
  {
    id: '1',
    name: 'Chinese Chips',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
  {
    id: '2',
    name: 'Chinese source',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
  {
    id: '3',
    name: 'Chinese meli',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
];

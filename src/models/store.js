import { image } from '../resource/base64encode';

exports.order = [
  {
    id: '1',
    userId: '1',
    fooItems: [
      { foodId: '1', qty: 3 },
      { foodId: '2', qty: 2 },
      { foodId: '3', qty: 1 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    staus: 'accepted',
  },
  {
    id: '2',
    userId: '1',
    fooItems: [
      { foodId: '3', qty: 1 },
      { foodId: '2', qty: 1 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    staus: 'declined',
  },
  {
    id: '3',
    userId: '1',
    fooItems: [
      { foodId: '1', qty: 3 },
    ],
    date: '2018-09-15T20:02:09.451Z',
    staus: 'pending',
  },
];

exports.user = [
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

exports.food = [
  {
    id: '1',
    name: 'Chinese Chips',
    photo: image[0],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
  {
    id: '2',
    name: 'Chinese source',
    photo: image[0],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
  {
    id: '3',
    name: 'Chinese meli',
    photo: image[0],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mi augue, viverra sit amet ultricies at, vulputate id lorem. Nulla facilisi.',
    price: 270,
  },
];
